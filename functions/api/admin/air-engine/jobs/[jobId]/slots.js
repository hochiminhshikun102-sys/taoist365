import { createAuditLog, json, nowIso, updateStore } from "../../../../../_object-intake.js";

const outputTypes = new Set(["main", "detail", "scene", "pc", "mobile", "social", "motion"]);
const slotStatuses = new Set(["missing", "reference_only", "needs_rebuild", "queued", "processing", "ready", "failed", "optional"]);
const outputSpecs = {
  main: { label: "White product image", dimensions: "2400x2400", ratio: "1:1", publishable: true, required: true },
  detail: { label: "Detail image", dimensions: "1800x2400", ratio: "3:4", publishable: true, required: false },
  scene: { label: "Room scene image", dimensions: "2400x1600", ratio: "3:2", publishable: true, required: false },
  pc: { label: "Desktop hero image", dimensions: "3200x1800", ratio: "16:9", publishable: true, required: false },
  mobile: { label: "Mobile atmosphere image", dimensions: "1600x2400", ratio: "2:3", publishable: true, required: false },
  social: { label: "Social image", dimensions: "2400x1600", ratio: "3:2", publishable: true, required: false },
  motion: { label: "Loop video", dimensions: "1920x1080", ratio: "16:9", publishable: true, required: false },
};

export async function onRequestPatch(context) {
  const { jobId } = context.params;
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid Air Engine slot payload." }, 400);
  }

  const slot = String(payload.slot || payload.media_type || "").trim();
  const status = String(payload.status || "").trim();
  if (!outputTypes.has(slot)) return json({ error: "Invalid Air Engine slot." }, 400);
  if (!slotStatuses.has(status)) return json({ error: "Invalid Air Engine slot status." }, 400);

  const actorId = String(payload.actor_id || "admin-os").trim();
  const reason = String(payload.reason || defaultReason(status)).trim();
  const now = nowIso();
  let updatedJob = null;
  let updatedIntake = null;
  let missing = false;
  let invalid = "";

  await updateStore(context.env, (store) => {
    const job = (store.airEngineJobs || []).find((item) => item.id === jobId);
    if (!job) {
      missing = true;
      return store;
    }
    const intake = store.objectIntakes.find((item) => item.id === job.intake_id) || null;
    const media = (store.objectMedia || []).filter((item) => item.intake_id === job.intake_id);
    const beforeJob = { ...job };
    const beforeIntake = intake ? { ...intake } : null;
    const existingManifest = normalizeManifest(job, media);
    if (status === "ready" && outputSpecs[slot]?.publishable && !findReadyMedia(media, slot)) {
      invalid = "Upload or attach a file for this slot before marking it ready.";
      return store;
    }
    const nextManifest = existingManifest.map((item) => {
      if (item.media_type !== slot) return item;
      const readyMedia = status === "ready" ? findReadyMedia(media, slot) : null;
      return {
        ...item,
        status,
        media_id: readyMedia?.id || item.media_id || "",
        url: readyMedia ? mediaUrl(readyMedia) : item.url || "",
        note: reason,
        source: status === "ready" ? readyMedia?.source || "manual_or_air_engine_output" : item.source || "",
        publishable: Boolean(outputSpecs[slot]?.publishable) && status === "ready",
        reason,
        updated_at: now,
      };
    });
    const readyOutputs = nextManifest.filter((item) => item.status === "ready").map((item) => item.media_type);
    const blockedOutputs = nextManifest.filter((item) => ["reference_only", "needs_rebuild"].includes(item.status)).map((item) => item.media_type);
    const missingOutputs = nextManifest.filter((item) => ["missing", "queued", "processing", "failed"].includes(item.status)).map((item) => item.media_type);
    const nextJobStatus = status === "failed" ? "failed" : readyOutputs.includes("main") ? "ready" : "processing";

    updatedJob = {
      ...job,
      status: nextJobStatus,
      output_manifest: nextManifest,
      ready_outputs: readyOutputs,
      blocked_outputs: blockedOutputs,
      missing_outputs: missingOutputs,
      notes: reason,
      updated_at: now,
      completed_at: nextJobStatus === "ready" ? now : job.completed_at || "",
    };

    updatedIntake = intake
      ? {
          ...intake,
          air_engine_status: nextJobStatus,
          media_transform_required: intake.media_transform_required && !readyOutputs.includes("main"),
          updated_at: now,
        }
      : null;

    return {
      ...store,
      airEngineJobs: (store.airEngineJobs || []).map((item) => (item.id === jobId ? updatedJob : item)),
      objectIntakes: updatedIntake ? store.objectIntakes.map((item) => (item.id === updatedIntake.id ? updatedIntake : item)) : store.objectIntakes,
      adminAuditLogs: [
        createAuditLog("air_engine_slot_updated", "air_engine_job", jobId, beforeJob, updatedJob, `${slot} marked ${status}: ${reason}`, actorId),
        ...(updatedIntake ? [createAuditLog("air_engine_status_synced", "object_intake", updatedIntake.id, beforeIntake, updatedIntake, `Air Engine ${slot} slot marked ${status}.`, actorId)] : []),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Air Engine job not found." }, 404);
  if (invalid) return json({ error: invalid }, 400);
  return json({ job: updatedJob, intake: updatedIntake });
}

function normalizeManifest(job, media) {
  const requested = Array.isArray(job.requested_outputs) && job.requested_outputs.length ? job.requested_outputs : ["main", "detail", "scene", "pc", "mobile", "social", "motion"];
  const current = new Map((job.output_manifest || []).map((item) => [item.media_type, item]));
  return requested
    .filter((type) => outputTypes.has(type))
    .map((type) => {
      const spec = outputSpecs[type];
      const existing = current.get(type);
      const readyMedia = findReadyMedia(media, type);
      return {
        media_type: type,
        label: spec.label,
        dimensions: spec.dimensions,
        ratio: spec.ratio,
        publishable: Boolean(existing?.publishable) || false,
        required: type === "main",
        status: readyMedia ? "ready" : existing?.status || (type === "motion" ? "optional" : "missing"),
        media_id: readyMedia?.id || existing?.media_id || "",
        source_media_id: existing?.source_media_id || "",
        url: readyMedia ? mediaUrl(readyMedia) : existing?.url || "",
        note: existing?.note || existing?.reason || defaultReason(readyMedia ? "ready" : "missing"),
        source: existing?.source || "",
        reason: existing?.reason || existing?.note || "",
        updated_at: existing?.updated_at || "",
      };
    });
}

function findReadyMedia(media, type) {
  return media.find((item) => item.media_type === type && ["uploaded", "air_engine_uploaded", "air_engine_ready", "publish_ready"].includes(String(item.status || "")) && mediaUrl(item));
}

function mediaUrl(media) {
  return media?.file_url || media?.data_url || "";
}

function defaultReason(status) {
  if (status === "ready") return "Slot confirmed as publish-ready by OA.";
  if (status === "needs_rebuild") return "Slot needs Air Engine rebuild or manual replacement.";
  if (status === "reference_only") return "External marketplace source is reference-only and cannot publish directly.";
  if (status === "optional") return "Optional output slot for later enhancement.";
  return `Slot marked ${status}.`;
}
