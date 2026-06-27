import { createAuditLog, intakeStatuses, json, makeId, nowIso, updateStore } from "../../../_object-intake.js";

export async function onRequestPost(context) {
  const { intakeId } = context.params;
  let queueItem = null;
  let airEngineJobId = "";
  let airEngineJobCreated = false;
  let missing = false;

  await updateStore(context.env, (store) => {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) {
      missing = true;
      return store;
    }

    const now = nowIso();
    const before = { ...intake };
    const after = { ...intake, status: intakeStatuses.REVIEW_PENDING, updated_at: now };
    const existingJob = (store.airEngineJobs || []).find((job) => job.intake_id === intakeId);
    const airJob = existingJob || makeAirEngineJob(intake, now);
    airEngineJobId = airJob.id;
    airEngineJobCreated = !existingJob;
    queueItem = {
      id: makeId("review"),
      intake_id: intakeId,
      assigned_admin: "",
      review_status: "pending",
      review_notes: "",
      risk_level: "low",
      created_at: now,
      updated_at: now,
    };

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === intakeId ? after : item)),
      objectReviewQueue: [queueItem, ...store.objectReviewQueue.filter((item) => item.intake_id !== intakeId)],
      airEngineJobs: existingJob ? store.airEngineJobs : [airJob, ...(store.airEngineJobs || [])],
      adminAuditLogs: [
        createAuditLog("submitted_review", "object_intake", intakeId, before, after, "Object intake entered unified review queue."),
        ...(existingJob ? [] : [createAuditLog("air_engine_job_created", "air_engine_job", airJob.id, null, airJob, "Air Engine job created during review submission.")]),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Intake not found." }, 404);
  return json({ review: queueItem, status: intakeStatuses.REVIEW_PENDING, air_engine_job_id: airEngineJobId, air_engine_job_created: airEngineJobCreated }, 201);
}

function makeAirEngineJob(intake, now) {
  const requestedOutputs = ["main", "detail", "scene", "pc", "mobile", "social", "motion"];
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
    notes: "Created from unified Object Intake review submission.",
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
