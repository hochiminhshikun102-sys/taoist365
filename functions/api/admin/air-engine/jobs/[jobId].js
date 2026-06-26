import { createAuditLog, json, makeId, nowIso, publicUrlForMedia, updateStore } from "../../../../_object-intake.js";

const allowedStatuses = new Set(["pending", "processing", "ready", "failed"]);
const defaultOutputs = ["original", "main", "detail", "scene", "pc", "mobile", "social"];
const publishOutputTypes = new Set(["main", "detail", "scene", "pc", "mobile", "social", "motion"]);
const outputSpecs = {
  original: { label: "Source reference", dimensions: "source", ratio: "source", publishable: false },
  main: { label: "White product image", dimensions: "2400x2400", ratio: "1:1", publishable: true },
  detail: { label: "Detail image", dimensions: "1800x2400", ratio: "3:4", publishable: true },
  scene: { label: "Room scene image", dimensions: "2400x1600", ratio: "3:2", publishable: true },
  pc: { label: "Desktop hero image", dimensions: "3200x1800", ratio: "16:9", publishable: true },
  mobile: { label: "Mobile atmosphere image", dimensions: "1600x2400", ratio: "2:3", publishable: true },
  social: { label: "Social image", dimensions: "2400x1600", ratio: "3:2", publishable: true },
  motion: { label: "Loop video", dimensions: "1920x1080", ratio: "16:9", publishable: true },
};

export async function onRequestPatch(context) {
  const { jobId } = context.params;
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid Air Engine job payload." }, 400);
  }

  const nextStatus = String(payload.status || "").trim();
  if (!allowedStatuses.has(nextStatus)) return json({ error: "Invalid Air Engine job status." }, 400);

  let updatedJob = null;
  let missing = false;
  const now = nowIso();
  const actorId = String(payload.actor_id || "admin-os").trim();
  const note = String(payload.note || `Air Engine job moved to ${nextStatus}.`).trim();

  await updateStore(context.env, (store) => {
    const job = (store.airEngineJobs || []).find((item) => item.id === jobId);
    if (!job) {
      missing = true;
      return store;
    }

    const beforeJob = { ...job };
    const beforeIntake = store.objectIntakes.find((item) => item.id === job.intake_id) || null;
    const media = (store.objectMedia || []).filter((item) => item.intake_id === job.intake_id);
    const outputPlan = buildOutputPlan(job, beforeIntake, media, now, nextStatus === "ready");
    updatedJob = {
      ...job,
      status: nextStatus,
      notes: note || job.notes || "",
      ...(nextStatus === "ready"
        ? {
            output_manifest: outputPlan.manifest,
            ready_outputs: outputPlan.readyOutputs,
            blocked_outputs: outputPlan.blockedOutputs,
            missing_outputs: outputPlan.missingOutputs,
            generated_media_ids: Array.from(new Set([...(job.generated_media_ids || []), ...outputPlan.generatedMedia.map((item) => item.id)])),
          }
        : {
            output_manifest: outputPlan.manifest,
            ready_outputs: outputPlan.readyOutputs,
            blocked_outputs: outputPlan.blockedOutputs,
            missing_outputs: outputPlan.missingOutputs,
          }),
      updated_at: now,
      completed_at: nextStatus === "ready" || nextStatus === "failed" ? now : job.completed_at || "",
    };

    const nextAirStatus = nextStatus === "ready" ? "ready" : nextStatus === "failed" ? "failed" : nextStatus;
    const nextIntake = beforeIntake
      ? {
          ...beforeIntake,
          air_engine_status: nextAirStatus,
          updated_at: now,
        }
      : null;

    return {
      ...store,
      airEngineJobs: (store.airEngineJobs || []).map((item) => (item.id === jobId ? updatedJob : item)),
      objectIntakes: nextIntake ? store.objectIntakes.map((item) => (item.id === nextIntake.id ? nextIntake : item)) : store.objectIntakes,
      objectMedia: [...store.objectMedia, ...outputPlan.generatedMedia],
      assetRegistry: [
        ...outputPlan.generatedMedia.map((item) => ({
          id: makeId("asset"),
          scope: "product_media",
          object_id: item.object_id || "",
          linked_object_id: item.object_id || "",
          intake_id: item.intake_id,
          source: "air_engine_output",
          file_name: item.storage_key.split("/").pop() || item.id,
          file_url: item.file_url,
          data_url: item.data_url,
          storage_key: item.storage_key,
          mime_type: item.mime_type,
          size: 0,
          width: item.width || 0,
          height: item.height || 0,
          usage: item.media_type,
          alt_text: beforeIntake?.original_title || beforeIntake?.intake_no || item.id,
          tags: ["air-engine", item.media_type],
          status: item.status,
          created_at: now,
          updated_at: now,
        })),
        ...store.assetRegistry,
      ],
      adminAuditLogs: [
        createAuditLog("air_engine_job_updated", "air_engine_job", jobId, beforeJob, updatedJob, makeAuditNote(note, outputPlan), actorId),
        ...(nextIntake ? [createAuditLog("air_engine_status_synced", "object_intake", nextIntake.id, beforeIntake, nextIntake, `Air Engine status synced to ${nextAirStatus}.`, actorId)] : []),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Air Engine job not found." }, 404);
  return json({ job: updatedJob });
}

function buildOutputPlan(job, intake, media, now, allowGenerate) {
  const requested = normalizeOutputs(job.requested_outputs);
  const existingByType = new Map();
  media
    .filter((item) => hasMediaUrl(item))
    .forEach((item) => {
      if (!existingByType.has(item.media_type)) existingByType.set(item.media_type, item);
    });

  const publishSource = media.find((item) => publishOutputTypes.has(item.media_type) && !isVideoMedia(item) && hasMediaUrl(item));
  const generatedMedia = [];
  const manifest = [];
  const readyOutputs = [];
  const blockedOutputs = [];
  const missingOutputs = [];

  requested.forEach((type) => {
    const spec = outputSpecs[type] || { label: type, dimensions: "to_confirm", ratio: "to_confirm", publishable: publishOutputTypes.has(type) };
    const existing = existingByType.get(type);
    if (existing) {
      readyOutputs.push(type);
      manifest.push(makeManifestEntry(type, spec, "ready", existing, null, "Existing media is attached to this output slot."));
      return;
    }

    if (allowGenerate && spec.publishable && type !== "motion" && publishSource) {
      const derived = makeDerivedMedia(type, publishSource, intake, now, media.length + generatedMedia.length);
      generatedMedia.push(derived);
      readyOutputs.push(type);
      existingByType.set(type, derived);
      manifest.push(makeManifestEntry(type, spec, "ready", derived, publishSource, "MVP Air Engine output uses the approved source media slot until true image processing replaces it."));
      return;
    }

    const blocked = isReferenceOnly(job, intake) && spec.publishable;
    if (blocked) {
      blockedOutputs.push(type);
      manifest.push(makeManifestEntry(type, spec, "blocked_reference_only", null, null, "External marketplace source is reference-only. Upload, license, re-shoot, or rebuild Dohara-owned media before this output can publish."));
      return;
    }

    missingOutputs.push(type);
    manifest.push(makeManifestEntry(type, spec, "missing", null, null, "Awaiting uploaded media or a real Air Engine generation result."));
  });

  return { manifest, readyOutputs, blockedOutputs, missingOutputs, generatedMedia };
}

function normalizeOutputs(outputs) {
  const values = Array.isArray(outputs) && outputs.length > 0 ? outputs : defaultOutputs;
  return Array.from(new Set(values.map((item) => String(item || "").trim()).filter(Boolean)));
}

function makeManifestEntry(type, spec, status, media, sourceMedia, note) {
  return {
    media_type: type,
    label: spec.label,
    dimensions: spec.dimensions,
    ratio: spec.ratio,
    publishable: Boolean(spec.publishable),
    required: type === "main",
    status,
    media_id: media?.id || "",
    source_media_id: sourceMedia?.id || "",
    url: media ? publicUrlForMedia(media) : "",
    note,
  };
}

function makeDerivedMedia(type, source, intake, now, sortOrder) {
  const id = makeId("media");
  return {
    id,
    intake_id: source.intake_id,
    object_id: source.object_id || intake?.object_id || "",
    media_type: type,
    file_url: source.file_url || "",
    data_url: source.data_url || "",
    storage_key: `air-engine/${source.intake_id}/${type}/${source.id}`,
    width: source.width || 0,
    height: source.height || 0,
    mime_type: source.mime_type || "image/jpeg",
    status: "air_engine_ready",
    sort_order: sortOrder,
    created_at: now,
    derived_from_media_id: source.id,
    air_engine_output: true,
  };
}

function isReferenceOnly(job, intake) {
  return (
    job.media_rights_status === "reference_only" ||
    job.transform_required === true ||
    intake?.media_rights_status === "reference_only" ||
    intake?.media_transform_required === true ||
    Boolean(job.source_url || intake?.source_url)
  );
}

function isVideoMedia(media) {
  return media?.media_type === "motion" || String(media?.mime_type || "").startsWith("video/");
}

function hasMediaUrl(media) {
  return Boolean(media?.file_url || media?.data_url);
}

function makeAuditNote(note, outputPlan) {
  const ready = outputPlan.readyOutputs.length;
  const blocked = outputPlan.blockedOutputs.length;
  const missing = outputPlan.missingOutputs.length;
  return `${note} Outputs ready: ${ready}; blocked: ${blocked}; missing: ${missing}.`;
}
