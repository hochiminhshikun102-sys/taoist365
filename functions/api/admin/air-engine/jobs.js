import { createAuditLog, json, makeId, nowIso, readStore, updateStore } from "../../../_object-intake.js";

const requestedOutputs = ["main", "detail", "scene", "pc", "mobile", "social", "motion"];

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid Air Engine job payload." }, 400);
  }

  const intakeId = String(payload.intake_id || "").trim();
  if (!intakeId) return json({ error: "intake_id is required." }, 400);

  let job = null;
  let created = false;
  let missing = false;
  const now = nowIso();
  const actorId = String(payload.actor_id || "admin-os").trim();

  await updateStore(context.env, (store) => {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) {
      missing = true;
      return store;
    }

    const existing = (store.airEngineJobs || []).find((item) => item.intake_id === intakeId);
    if (existing) {
      job = existing;
      return store;
    }

    job = makeAirEngineJob(intake, now);
    created = true;
    const before = { ...intake };
    const after = {
      ...intake,
      air_engine_status: intake.air_engine_status === "ready" || intake.air_engine_status === "processing" ? intake.air_engine_status : "pending",
      updated_at: now,
    };

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === intakeId ? after : item)),
      airEngineJobs: [job, ...(store.airEngineJobs || [])],
      adminAuditLogs: [
        createAuditLog("air_engine_job_created", "air_engine_job", job.id, null, job, "Air Engine job created from intake backfill.", actorId),
        createAuditLog("air_engine_status_synced", "object_intake", intakeId, before, after, "Air Engine status synced to pending.", actorId),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Intake not found." }, 404);
  return json({ job, air_engine_job_id: job.id, created }, created ? 201 : 200);
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get("status") || "all";
  const jobType = url.searchParams.get("job_type") || "";
  const sourcePlatform = url.searchParams.get("source_platform") || "";
  const sourceType = url.searchParams.get("source_type") || "";
  const outputState = url.searchParams.get("output_state") || "";
  const store = await readStore(context.env);

  const allRows = [...(store.airEngineJobs || [])]
    .map((job) => enrichJob(store, job))
    .sort((a, b) => String(b.updated_at || b.created_at || "").localeCompare(String(a.updated_at || a.created_at || "")));
  let rows = allRows;
  if (status !== "all") rows = rows.filter((job) => job.status === status);
  if (jobType) rows = rows.filter((job) => job.job_type === jobType);
  if (sourcePlatform) rows = rows.filter((job) => job.source_platform === sourcePlatform);
  if (sourceType) rows = rows.filter((job) => job.source_type === sourceType);
  if (outputState === "missing_main") rows = rows.filter((job) => job.missing_outputs?.includes("main"));
  if (outputState === "main_ready") rows = rows.filter((job) => job.ready_outputs?.includes("main"));

  return json({
    rows,
    counts: makeCounts(allRows),
    facets: makeFacets(allRows),
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  });
}

function enrichJob(store, job) {
  const intake = store.objectIntakes.find((item) => item.id === job.intake_id) || null;
  const draft = [...store.objectAiDrafts].reverse().find((item) => item.intake_id === job.intake_id) || null;
  const review = store.objectReviewQueue.find((item) => item.intake_id === job.intake_id) || null;
  const ready = Array.isArray(job.ready_outputs) ? job.ready_outputs : [];
  const missing = Array.isArray(job.missing_outputs) ? job.missing_outputs : [];
  const blocked = Array.isArray(job.blocked_outputs) ? job.blocked_outputs : [];

  return {
    ...job,
    title: draft?.draft_title || intake?.original_title || job.source_item_id || job.source_url || job.id,
    source_type: intake?.source_type || "",
    entry_surface: intake?.entry_surface || "",
    identity_scope: intake?.identity_scope || "",
    supply_program: intake?.supply_program || "",
    buyer_id: intake?.buyer_id || "",
    submitted_by: intake?.submitted_by || "",
    professional_buyer_required: Boolean(intake?.professional_buyer_required),
    review_id: review?.id || "",
    review_status: review?.review_status || "",
    intake_status: intake?.status || "",
    ready_count: ready.length,
    missing_count: missing.length,
    blocked_count: blocked.length,
    next_action: nextAction(job, ready, missing, blocked),
  };
}

function nextAction(job, ready, missing, blocked) {
  if (job.status === "failed") return "Failed, retry required";
  if (blocked.length > 0 || job.media_rights_status === "reference_only" || job.transform_required) return "Blocked by reference-only source";
  if (missing.includes("main")) return "Needs main output";
  const optionalMissing = missing.filter((item) => item !== "main");
  if (optionalMissing.length > 0) return "Needs detail/scene outputs";
  if (ready.length > 0 && missing.length === 0) return "Ready for review";
  return "Needs main output";
}

function makeCounts(rows) {
  const totalReadyOutputs = rows.reduce((sum, job) => sum + (job.ready_count || 0), 0);
  return {
    all: rows.length,
    pending: rows.filter((job) => job.status === "pending").length,
    processing: rows.filter((job) => job.status === "processing").length,
    ready: rows.filter((job) => job.status === "ready").length,
    failed: rows.filter((job) => job.status === "failed").length,
    missing_main: rows.filter((job) => job.missing_outputs?.includes("main")).length,
    main_ready: rows.filter((job) => job.ready_outputs?.includes("main")).length,
    average_ready_outputs: rows.length ? Number((totalReadyOutputs / rows.length).toFixed(2)) : 0,
  };
}

function makeFacets(rows) {
  return {
    source_platforms: Array.from(new Set(rows.map((job) => job.source_platform).filter(Boolean))).sort(),
    source_types: Array.from(new Set(rows.map((job) => job.source_type).filter(Boolean))).sort(),
  };
}

function makeAirEngineJob(intake, now) {
  const isExternal = Boolean(intake.source_url) || intake.media_rights_status === "reference_only" || intake.media_transform_required;
  return {
    id: makeId("airjob"),
    intake_id: intake.id,
    object_id: intake.object_id || "",
    job_type: isExternal ? "source_fetch_and_rebuild" : `${intake.source_type || "object_intake"}_media_outputs`,
    source_platform: intake.source_platform || "manual",
    source_url: intake.source_url || "",
    source_item_id: intake.source_snapshot?.source_item_id || "",
    canonical_source_url: intake.source_snapshot?.canonical_source_url || intake.source_url || "",
    commerce_channel: intake.commerce_channel || "commerce_new",
    goods_condition: intake.goods_condition || "new",
    status: "pending",
    priority: intake.source_type === "buyer_upload" ? "buyer_normal" : "normal",
    media_rights_status: isExternal ? "reference_only" : "owned_or_original",
    transform_required: isExternal,
    rights_review_required: isExternal,
    source_capture_status: intake.source_snapshot?.source_capture_status || "direct_upload_pending",
    source_parse_status: intake.source_snapshot?.source_parse_status || "manual_upload",
    air_engine_policy: isExternal ? "rebuild_or_replace_before_publish" : "direct_review",
    requested_outputs: requestedOutputs,
    output_manifest: requestedOutputs.map((type) => makeOutputSlot(type, isExternal)),
    ready_outputs: [],
    blocked_outputs: isExternal ? requestedOutputs : [],
    missing_outputs: isExternal ? [] : requestedOutputs,
    generated_media_ids: [],
    notes: "Created from unified Object Intake workflow.",
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
