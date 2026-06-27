import { createAuditLog, intakeStatuses, json, makeId, nowIso, readStore, resolveObjectIntakeSource, updateStore } from "../_object-intake.js";

const sourcePlatforms = new Set(["manual", "taobao", "tmall", "1688", "pdd", "xianyu", "tiktok", "temu", "amazon", "etsy", "shopify", "jd", "other"]);

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get("status");
  const submittedBy = url.searchParams.get("submitted_by");
  const buyerId = url.searchParams.get("buyer_id");
  const store = await readStore(context.env);
  let rows = [...store.objectIntakes].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));

  if (status) rows = rows.filter((row) => row.status === status);
  if (submittedBy) rows = rows.filter((row) => row.submitted_by === submittedBy);
  if (buyerId) rows = rows.filter((row) => row.buyer_id === buyerId);

  return json({
    rows,
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  });
}

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid intake payload." }, 400);
  }

  const now = nowIso();
  const id = makeId("intake");
  const intakeNo = `OI-${Date.now().toString().slice(-8)}`;
  const source = resolveObjectIntakeSource(payload.source_type);
  const sourceUrl = String(payload.source_url || "").trim();
  const requestedPlatform = sourcePlatforms.has(payload.source_platform) ? payload.source_platform : "manual";
  const sourcePlatform = sourceUrl && requestedPlatform === "manual" ? detectPlatform(sourceUrl) : requestedPlatform;
  const sourceMeta = sourceUrl ? parseSourceMeta(sourceUrl, sourcePlatform) : null;

  const intake = {
    id,
    intake_no: intakeNo,
    source_type: source.source_type,
    identity_scope: source.identity_scope,
    entry_surface: source.entry_surface,
    supply_program: source.supply_program,
    commerce_channel: source.commerce_channel,
    goods_condition: source.goods_condition,
    source_label: source.source_label,
    source_note: source.source_note,
    reward_eligible: source.reward_eligible,
    professional_buyer_required: source.professional_buyer_required,
    member_supply_locked: source.member_supply_locked,
    source_platform: sourcePlatform,
    source_url: sourceUrl,
    source_snapshot: payload.source_snapshot || (sourceUrl ? {
      import_mode: "single_intake",
      source_usage_policy: "reference_only",
      publish_policy: "source media must be licensed, re-shot, rebuilt, or replaced before publication",
      detected_platform: sourcePlatform,
      source_item_id: sourceMeta?.source_item_id || "",
      canonical_source_url: sourceMeta?.canonical_source_url || sourceUrl,
      source_parse_status: sourceMeta?.source_parse_status || "url_only",
      parser_version: sourceMeta?.parser_version || "source-url-v1",
      rights_review_required: true,
      source_capture_status: "metadata_pending",
      legal_note: "External marketplace images are source references only and must not be published directly.",
    } : null),
    media_rights_status: sourceUrl ? "reference_only" : "owned_or_original",
    media_transform_required: Boolean(sourceUrl),
    air_engine_policy: sourceUrl ? "rebuild_or_replace_before_publish" : "direct_review",
    submitted_by: String(payload.submitted_by || "admin-os").trim(),
    buyer_id: String(payload.buyer_id || "").trim(),
    member_id: String(payload.member_id || "").trim(),
    referral_code: String(payload.referral_code || "").trim(),
    country: String(payload.country || "").trim(),
    original_title: String(payload.original_title || "").trim(),
    original_description: String(payload.original_description || "").trim(),
    original_price: String(payload.original_price || "").trim(),
    currency: String(payload.currency || "USD").trim().toUpperCase(),
    category_hint: String(payload.category_hint || "").trim(),
    supplier: String(payload.supplier || "").trim(),
    location: String(payload.location || "").trim(),
    logistics_method: String(payload.logistics_method || "").trim(),
    inventory: Number.parseInt(payload.inventory, 10) || 1,
    is_one_of_one: Boolean(payload.is_one_of_one),
    air_engine_status: sourceUrl ? "pending" : "not_started",
    status: intakeStatuses.DRAFT,
    created_at: now,
    updated_at: now,
  };

  const airJob = makeAirEngineJob({
    id: makeId("airjob"),
    intakeId: id,
    source,
    sourcePlatform,
    sourceUrl,
    sourceMeta,
    now,
  });

  await updateStore(context.env, (store) => ({
    ...store,
    objectIntakes: [intake, ...store.objectIntakes],
    airEngineJobs: [airJob, ...(store.airEngineJobs || [])],
    adminAuditLogs: [
      createAuditLog("object_intake_created", "object_intake", id, null, intake, sourceUrl ? `Single intake created from ${sourcePlatform} external link.` : "Single intake created.", intake.submitted_by),
      createAuditLog("air_engine_job_created", "air_engine_job", airJob.id, null, airJob, `Air Engine job created for ${source.source_type}.`, intake.submitted_by),
      ...store.adminAuditLogs,
    ],
  }));

  return json({ intake_id: id, intake_no: intakeNo, status: intake.status, intake, air_engine_job_id: airJob.id }, 201);
}

function makeAirEngineJob({ id, intakeId, source, sourcePlatform, sourceUrl, sourceMeta, now }) {
  const isExternal = Boolean(sourceUrl);
  const requestedOutputs = ["main", "detail", "scene", "pc", "mobile", "social", "motion"];
  return {
    id,
    intake_id: intakeId,
    object_id: "",
    job_type: isExternal ? "source_fetch_and_rebuild" : `${source.source_type}_media_outputs`,
    source_platform: sourcePlatform,
    source_url: sourceUrl,
    source_item_id: sourceMeta?.source_item_id || "",
    canonical_source_url: sourceMeta?.canonical_source_url || sourceUrl,
    commerce_channel: source.commerce_channel,
    goods_condition: source.goods_condition,
    status: "pending",
    priority: source.source_type === "buyer_upload" ? "buyer_normal" : "normal",
    media_rights_status: isExternal ? "reference_only" : "owned_or_original",
    transform_required: isExternal,
    rights_review_required: isExternal,
    source_capture_status: isExternal ? "metadata_pending" : "direct_upload_pending",
    source_parse_status: isExternal ? sourceMeta?.source_parse_status || "url_only" : "manual_upload",
    air_engine_policy: isExternal ? "rebuild_or_replace_before_publish" : "direct_review",
    requested_outputs: requestedOutputs,
    output_manifest: requestedOutputs.map((type) => makeOutputSlot(type, isExternal)),
    ready_outputs: [],
    blocked_outputs: isExternal ? requestedOutputs : [],
    missing_outputs: isExternal ? [] : requestedOutputs,
    generated_media_ids: [],
    notes: isExternal
      ? "External source link. Source images are references only; final publish media must be licensed, re-shot, rebuilt, replaced, or transformed."
      : "Direct intake created. Upload or generate Air Engine output slots before publication.",
    created_at: now,
    updated_at: now,
  };
}

function makeOutputSlot(type, blocked) {
  const specs = {
    main: ["White product image", "2400x2400", "1:1"],
    detail: ["Detail image", "1800x2400", "3:4"],
    scene: ["Room scene image", "2400x1600", "3:2"],
    pc: ["Desktop hero image", "3200x1800", "16:9"],
    mobile: ["Mobile atmosphere image", "1600x2400", "2:3"],
    social: ["Social image", "2400x1600", "3:2"],
    motion: ["Loop video", "1920x1080", "16:9"],
  };
  const [label, dimensions, ratio] = specs[type] || [type, "to_confirm", "to_confirm"];
  return {
    media_type: type,
    label,
    dimensions,
    ratio,
    publishable: true,
    required: type === "main",
    status: blocked ? "blocked_reference_only" : "missing",
    note: blocked ? "External source is reference-only. Rebuild or replace this output." : "Awaiting Air Engine output.",
  };
}

function detectPlatform(url) {
  const value = String(url || "").toLowerCase();
  if (/xianyu|goofish|2\.taobao/.test(value)) return "xianyu";
  if (/tmall|detail\.tmall/.test(value)) return "tmall";
  if (/taobao|item\.taobao/.test(value)) return "taobao";
  if (/1688\.com|alibaba/.test(value)) return "1688";
  if (/pinduoduo|yangkeduo|pdd/.test(value)) return "pdd";
  if (/tiktok|tokopedia/.test(value)) return "tiktok";
  if (/temu/.test(value)) return "temu";
  if (/amazon|amzn\.to/.test(value)) return "amazon";
  if (/etsy/.test(value)) return "etsy";
  if (/jd\.com|360buy/.test(value)) return "jd";
  if (/myshopify|shopify/.test(value)) return "shopify";
  return "other";
}

function parseSourceMeta(sourceUrl, platform) {
  try {
    const parsed = new URL(sourceUrl);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    const path = parsed.pathname;
    const search = parsed.searchParams;
    const itemId =
      search.get("id") ||
      search.get("itemId") ||
      search.get("item_id") ||
      search.get("goods_id") ||
      search.get("goodsId") ||
      search.get("offerId") ||
      search.get("offer_id") ||
      matchPath(path, /\/listing\/(\d+)/) ||
      matchPath(path, /\/dp\/([A-Z0-9]{10})/i) ||
      matchPath(path, /\/gp\/product\/([A-Z0-9]{10})/i) ||
      matchPath(path, /\/offer\/(\d+)/) ||
      matchPath(path, /\/item\/(\d+)/) ||
      "";

    return {
      source_item_id: itemId,
      canonical_source_url: `${parsed.protocol}//${host}${path}${itemId ? `?source_id=${encodeURIComponent(itemId)}` : ""}`,
      source_parse_status: itemId ? "parsed" : "url_only",
      parser_version: `source-url-v1:${platform}`,
    };
  } catch {
    return {
      source_item_id: "",
      canonical_source_url: sourceUrl,
      source_parse_status: "url_only",
      parser_version: "source-url-v1",
    };
  }
}

function matchPath(path, pattern) {
  const match = String(path || "").match(pattern);
  return match ? match[1] : "";
}
