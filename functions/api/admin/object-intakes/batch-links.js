import {
  createAuditLog,
  intakeStatuses,
  json,
  makeId,
  makeProductDraft,
  nowIso,
  resolveObjectIntakeSource,
  updateStore,
} from "../../../_object-intake.js";

const supportedPlatforms = new Set(["auto", "taobao", "tmall", "1688", "pdd", "xianyu", "tiktok", "temu", "amazon", "etsy", "shopify", "other"]);
const secondhandPlatforms = new Set(["xianyu"]);

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid batch payload." }, 400);
  }

  const lines = normalizeLines(payload.lines || payload.text || payload.urls);
  if (lines.length === 0) return json({ error: "No source links found." }, 400);
  if (lines.length > 300) return json({ error: "Batch limit is 300 rows per import." }, 400);

  const selectedPlatform = supportedPlatforms.has(payload.source_platform) ? payload.source_platform : "auto";
  const selectedChannel = ["auto", "commerce_new", "windkeep_secondhand"].includes(payload.import_channel) ? payload.import_channel : "auto";
  const submitReview = payload.submit_review !== false;
  const generateDraft = payload.generate_ai_draft !== false;
  const categoryHint = String(payload.category_hint || "wind-objects").trim();
  const supplier = String(payload.supplier || "").trim();
  const actorId = String(payload.actor_id || "admin-os").trim();
  const now = nowIso();

  const result = {
    created: [],
    skipped: [],
    total: lines.length,
  };

  await updateStore(context.env, (store) => {
    const existingUrls = new Set(store.objectIntakes.map((item) => String(item.source_url || "").trim()).filter(Boolean));
    const nextIntakes = [...store.objectIntakes];
    const nextDrafts = [...store.objectAiDrafts];
    const nextReviews = [...store.objectReviewQueue];
    const nextAirEngineJobs = [...(store.airEngineJobs || [])];
    const nextLogs = [...store.adminAuditLogs];

    lines.forEach((line, index) => {
      const parsed = parseImportLine(line, index + 1);
      if (!parsed.source_url) {
        result.skipped.push({ line, reason: "missing_url" });
        return;
      }
      if (existingUrls.has(parsed.source_url)) {
        result.skipped.push({ line, source_url: parsed.source_url, reason: "duplicate_source_url" });
        return;
      }

      const platform = selectedPlatform === "auto" ? detectPlatform(parsed.source_url) : selectedPlatform;
      const importChannel = resolveImportChannel(selectedChannel, platform);
      const source = resolveObjectIntakeSource(importChannel === "windkeep_secondhand" ? "windkeep_external_link" : "external_link");
      const id = makeId("intake");
      const intakeNo = `OI-${Date.now().toString().slice(-7)}-${String(index + 1).padStart(3, "0")}`;
      const baseIntake = {
        id,
        intake_no: intakeNo,
        source_type: source.source_type,
        identity_scope: source.identity_scope,
        entry_surface: source.entry_surface,
        supply_program: source.supply_program,
        commerce_channel: source.commerce_channel,
        goods_condition: source.goods_condition,
        source_label: source.source_label,
        source_note: makeSourceNote(platform, source.commerce_channel),
        reward_eligible: source.reward_eligible,
        professional_buyer_required: source.professional_buyer_required,
        member_supply_locked: source.member_supply_locked,
        source_platform: platform,
        source_url: parsed.source_url,
        source_snapshot: {
          raw_line: line,
          import_mode: "batch_links",
          source_usage_policy: "reference_only",
          publish_policy: "source media must be rebuilt or replaced before publication",
          detected_platform: platform,
        },
        media_rights_status: "reference_only",
        media_transform_required: true,
        air_engine_policy: "rebuild_before_publish",
        submitted_by: actorId,
        buyer_id: "",
        member_id: "",
        referral_code: "",
        country: "",
        original_title: parsed.original_title,
        original_description: parsed.original_description || `Imported from ${platform} source link: ${parsed.source_url}`,
        original_price: parsed.original_price,
        currency: "USD",
        category_hint: categoryHint,
        supplier,
        location: "",
        logistics_method: "platform_logistics",
        inventory: parsed.inventory,
        is_one_of_one: importChannel === "windkeep_secondhand",
        air_engine_status: "pending",
        status: generateDraft ? intakeStatuses.AI_DRAFT_READY : intakeStatuses.DRAFT,
        created_at: now,
        updated_at: now,
      };

      const draft = generateDraft
        ? {
            id: makeId("draft"),
            intake_id: id,
            ...makeProductDraft(baseIntake),
            risk_notes:
              "External source import. Source images are reference-only. Rights, material, price, inventory, shipping, and final RI media must be confirmed before publication.",
            created_at: now,
            updated_at: now,
          }
        : null;

      const finalIntake = submitReview
        ? {
            ...baseIntake,
            status: intakeStatuses.REVIEW_PENDING,
            updated_at: now,
          }
        : baseIntake;

      const review = submitReview
        ? {
            id: makeId("review"),
            intake_id: id,
            assigned_admin: "",
            review_status: "pending",
            review_notes: "External link import. Await source parsing, media rebuilding, and human review.",
            risk_level: platform === "xianyu" ? "medium" : "medium",
            created_at: now,
            updated_at: now,
          }
        : null;

      const airJob = {
        id: makeId("airjob"),
        intake_id: id,
        object_id: "",
        job_type: "source_fetch_and_rebuild",
        source_platform: platform,
        source_url: parsed.source_url,
        commerce_channel: source.commerce_channel,
        goods_condition: source.goods_condition,
        status: "pending",
        priority: "normal",
        media_rights_status: "reference_only",
        transform_required: true,
        requested_outputs: ["original", "main", "detail", "scene", "pc", "mobile", "social"],
        notes: "Fetch source metadata first. Third-party source images are references only; final publish media must be rebuilt, replaced, or transformed.",
        created_at: now,
        updated_at: now,
      };

      nextIntakes.unshift(finalIntake);
      if (draft) nextDrafts.unshift(draft);
      if (review) nextReviews.unshift(review);
      nextAirEngineJobs.unshift(airJob);
      nextLogs.unshift(
        createAuditLog(
          "batch_link_imported",
          "object_intake",
          id,
          null,
          finalIntake,
          `Batch imported ${platform} link into ${finalIntake.commerce_channel}.`,
          actorId,
        ),
      );
      existingUrls.add(parsed.source_url);
      result.created.push({
        intake_id: id,
        intake_no: intakeNo,
        source_url: parsed.source_url,
        title: parsed.original_title,
        source_platform: platform,
        commerce_channel: source.commerce_channel,
      });
    });

    return {
      ...store,
      objectIntakes: nextIntakes,
      objectAiDrafts: nextDrafts,
      objectReviewQueue: nextReviews,
      airEngineJobs: nextAirEngineJobs,
      adminAuditLogs: nextLogs,
    };
  });

  return json({
    ...result,
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  }, 201);
}

function normalizeLines(value) {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseImportLine(line, index) {
  const sourceUrl = extractUrl(line);
  const withoutUrl = sourceUrl ? line.replace(sourceUrl, " ").trim() : line.trim();
  const parts = withoutUrl.split(/\t|,/).map((part) => part.trim()).filter(Boolean);
  const price = parts.find((part) => /[$¥￥]?\s*\d+(\.\d+)?/.test(part)) || "";
  const title = parts.find((part) => part !== price) || `${detectPlatform(sourceUrl).toUpperCase()} SKU ${String(index).padStart(3, "0")}`;

  return {
    source_url: sourceUrl,
    original_title: cleanText(title, 96),
    original_description: sourceUrl ? `Imported source reference: ${sourceUrl}` : "",
    original_price: cleanText(price, 32),
    inventory: 1,
  };
}

function extractUrl(value) {
  const match = String(value || "").match(/https?:\/\/[^\s,，]+/i);
  return match ? match[0].trim() : "";
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
  if (/myshopify|shopify/.test(value)) return "shopify";
  return "other";
}

function resolveImportChannel(selectedChannel, platform) {
  if (selectedChannel === "commerce_new" || selectedChannel === "windkeep_secondhand") return selectedChannel;
  return secondhandPlatforms.has(platform) ? "windkeep_secondhand" : "commerce_new";
}

function makeSourceNote(platform, channel) {
  if (channel === "windkeep_secondhand") {
    return `Batch ${platform} link import for Windkeep secondhand continuity. Source media is reference-only and must be rebuilt or replaced.`;
  }
  return `Batch ${platform} link import for new-goods commerce. Source parsing and media rebuilding are later Air Engine jobs.`;
}

function cleanText(value, limit) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}
