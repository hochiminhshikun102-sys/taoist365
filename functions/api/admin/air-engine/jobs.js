import { json, readStore } from "../../../_object-intake.js";

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
