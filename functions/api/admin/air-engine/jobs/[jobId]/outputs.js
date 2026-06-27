import { createAuditLog, json, makeId, nowIso, publicUrlForMedia, updateStore } from "../../../../../_object-intake.js";

const outputTypes = new Set(["main", "detail", "scene", "pc", "mobile", "social", "motion"]);
const outputSpecs = {
  main: { label: "White product image", dimensions: "2400x2400", ratio: "1:1", publishable: true },
  detail: { label: "Detail image", dimensions: "1800x2400", ratio: "3:4", publishable: true },
  scene: { label: "Room scene image", dimensions: "2400x1600", ratio: "3:2", publishable: true },
  pc: { label: "Desktop hero image", dimensions: "3200x1800", ratio: "16:9", publishable: true },
  mobile: { label: "Mobile atmosphere image", dimensions: "1600x2400", ratio: "2:3", publishable: true },
  social: { label: "Social image", dimensions: "2400x1600", ratio: "3:2", publishable: true },
  motion: { label: "Loop video", dimensions: "1920x1080", ratio: "16:9", publishable: true },
};

export async function onRequestPost(context) {
  const { jobId } = context.params;
  let form;
  try {
    form = await context.request.formData();
  } catch {
    return json({ error: "Invalid Air Engine output upload." }, 400);
  }

  const mediaType = String(form.get("media_type") || "").trim();
  if (!outputTypes.has(mediaType)) return json({ error: "Invalid Air Engine output type." }, 400);

  const files = form.getAll("files").filter((item) => typeof item === "object" && item && "arrayBuffer" in item);
  if (files.length === 0) return json({ error: "Upload at least one output file." }, 400);

  const actorId = String(form.get("actor_id") || "admin-os").trim();
  const now = nowIso();
  let created = [];
  let updatedJob = null;
  let missing = false;

  await updateStore(context.env, async (store) => {
    const job = (store.airEngineJobs || []).find((item) => item.id === jobId);
    if (!job) {
      missing = true;
      return store;
    }

    const intake = store.objectIntakes.find((item) => item.id === job.intake_id);
    if (!intake) {
      missing = true;
      return store;
    }

    const nextMedia = [];
    for (const [index, file] of files.entries()) {
      const contentType = file.type || "application/octet-stream";
      const id = makeId("media");
      const storageKey = ["air-engine", job.intake_id, mediaType, `${Date.now()}-${index}-${safeFileName(file.name || "output")}`].join("/");
      const hasR2 = Boolean(context.env.OBJECT_MEDIA_BUCKET);
      const dataUrl = hasR2 ? "" : await fileToDataUrl(file, contentType);
      if (hasR2) {
        await context.env.OBJECT_MEDIA_BUCKET.put(storageKey, await file.arrayBuffer(), {
          httpMetadata: { contentType },
          customMetadata: { intake_id: job.intake_id, media_type: mediaType, air_engine_job_id: jobId },
        });
      }

      nextMedia.push({
        id,
        intake_id: job.intake_id,
        object_id: intake.object_id || "",
        media_type: mediaType,
        file_url: hasR2 ? `/api/object-media/${id}` : "",
        data_url: dataUrl,
        storage_key: storageKey,
        width: 0,
        height: 0,
        mime_type: contentType,
        status: "air_engine_uploaded",
        sort_order: store.objectMedia.filter((item) => item.intake_id === job.intake_id).length + index,
        created_at: now,
        air_engine_job_id: jobId,
      });
    }

    const mediaAfterUpload = [...store.objectMedia.filter((item) => item.intake_id === job.intake_id), ...nextMedia];
    const outputPlan = buildOutputPlan(job, mediaAfterUpload);
    const beforeJob = { ...job };
    updatedJob = {
      ...job,
      status: job.status === "pending" ? "processing" : job.status,
      output_manifest: outputPlan.manifest,
      ready_outputs: outputPlan.readyOutputs,
      blocked_outputs: outputPlan.blockedOutputs,
      missing_outputs: outputPlan.missingOutputs,
      updated_at: now,
      notes: `Air Engine ${mediaType} output uploaded. ${job.notes || ""}`.trim(),
    };

    const beforeIntake = { ...intake };
    const nextIntake = {
      ...intake,
      air_engine_status: intake.air_engine_status === "ready" ? "ready" : "processing",
      updated_at: now,
    };
    created = nextMedia;

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === nextIntake.id ? nextIntake : item)),
      objectMedia: [...store.objectMedia, ...nextMedia],
      airEngineJobs: (store.airEngineJobs || []).map((item) => (item.id === jobId ? updatedJob : item)),
      assetRegistry: [
        ...nextMedia.map((item) => ({
          id: makeId("asset"),
          scope: "product_media",
          object_id: item.object_id || "",
          linked_object_id: item.object_id || "",
          intake_id: item.intake_id,
          source: "air_engine_output_upload",
          file_name: item.storage_key.split("/").pop() || item.id,
          file_url: item.file_url,
          data_url: item.data_url,
          storage_key: item.storage_key,
          mime_type: item.mime_type,
          size: 0,
          width: item.width,
          height: item.height,
          usage: item.media_type,
          alt_text: intake.original_title || intake.intake_no,
          tags: ["air-engine", item.media_type],
          status: item.status,
          created_at: now,
          updated_at: now,
        })),
        ...store.assetRegistry,
      ],
      adminAuditLogs: [
        createAuditLog("air_engine_output_uploaded", "air_engine_job", jobId, beforeJob, updatedJob, `${nextMedia.length} ${mediaType} output file(s) uploaded.`, actorId),
        createAuditLog("air_engine_status_synced", "object_intake", nextIntake.id, beforeIntake, nextIntake, `Air Engine output uploaded for ${mediaType}.`, actorId),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Air Engine job or intake not found." }, 404);
  return json({ rows: created, job: updatedJob }, 201);
}

function buildOutputPlan(job, media) {
  const requested = normalizeOutputs(job.requested_outputs);
  const existingByType = new Map();
  media
    .filter((item) => isReadyOutputMedia(item))
    .forEach((item) => {
      existingByType.set(item.media_type, item);
    });

  const manifest = [];
  const readyOutputs = [];
  const blockedOutputs = [];
  const missingOutputs = [];

  requested.forEach((type) => {
    if (type === "original") return;
    const spec = outputSpecs[type] || { label: type, dimensions: "to_confirm", ratio: "to_confirm", publishable: outputTypes.has(type) };
    const existing = existingByType.get(type);
    if (existing) {
      readyOutputs.push(type);
      manifest.push(makeManifestEntry(type, spec, "ready", existing, "Uploaded Air Engine output is attached to this slot."));
      return;
    }

    missingOutputs.push(type);
    manifest.push(makeManifestEntry(type, spec, "missing", null, "Awaiting uploaded media or a real Air Engine generation result."));
  });

  return { manifest, readyOutputs, blockedOutputs, missingOutputs };
}

function normalizeOutputs(outputs) {
  const values = Array.isArray(outputs) && outputs.length > 0 ? outputs : ["main", "detail", "scene", "pc", "mobile", "social"];
  return Array.from(new Set(values.map((item) => String(item || "").trim()).filter(Boolean)));
}

function makeManifestEntry(type, spec, status, media, note) {
  return {
    media_type: type,
    label: spec.label,
    dimensions: spec.dimensions,
    ratio: spec.ratio,
    publishable: Boolean(spec.publishable),
    required: type === "main",
    status,
    media_id: media?.id || "",
    source_media_id: "",
    url: media ? publicUrlForMedia(media) : "",
    note,
  };
}

function hasMediaUrl(media) {
  return Boolean(media?.file_url || media?.data_url);
}

function isReadyOutputMedia(media) {
  return hasMediaUrl(media) && ["air_engine_uploaded", "air_engine_ready", "publish_ready"].includes(String(media?.status || ""));
}

async function fileToDataUrl(file, contentType) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return `data:${contentType};base64,${btoa(binary)}`;
}

function safeFileName(fileName) {
  return String(fileName || "output")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
