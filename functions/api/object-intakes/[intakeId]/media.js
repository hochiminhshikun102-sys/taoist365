import { createAuditLog, intakeStatuses, json, makeId, nowIso, updateStore } from "../../../_object-intake.js";

const mediaTypes = new Set(["original", "normalized", "main", "detail", "scene", "pc", "mobile", "social", "motion"]);

export async function onRequestPost(context) {
  const { intakeId } = context.params;
  let form;
  try {
    form = await context.request.formData();
  } catch {
    return json({ error: "Invalid media upload." }, 400);
  }

  const files = form.getAll("files").filter((item) => typeof item === "object" && item && "arrayBuffer" in item);
  const requestedType = String(form.get("media_type") || "original");
  const mediaType = mediaTypes.has(requestedType) ? requestedType : "original";

  if (files.length === 0) {
    return json({ error: "Upload at least one image or media file." }, 400);
  }

  let created = [];
  let missing = false;

  await updateStore(context.env, async (store) => {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) {
      missing = true;
      return store;
    }

    const now = nowIso();
    const nextMedia = [];

    for (const [index, file] of files.entries()) {
      const contentType = file.type || "application/octet-stream";
      const id = makeId("media");
      const storageKey = [mediaType, intakeId, safeFileName(file.name || `asset-${index}`)].join("/");
      const hasR2 = Boolean(context.env.OBJECT_MEDIA_BUCKET);
      const dataUrl = hasR2 ? "" : await fileToDataUrl(file, contentType);
      if (hasR2) {
        await context.env.OBJECT_MEDIA_BUCKET.put(storageKey, await file.arrayBuffer(), {
          httpMetadata: { contentType },
          customMetadata: { intake_id: intakeId, media_type: mediaType },
        });
      }
      const record = {
        id,
        intake_id: intakeId,
        object_id: intake.object_id || "",
        media_type: mediaType,
        file_url: hasR2 ? `/api/object-media/${id}` : "",
        data_url: dataUrl,
        storage_key: storageKey,
        width: 0,
        height: 0,
        mime_type: contentType,
        status: "uploaded",
        sort_order: store.objectMedia.filter((item) => item.intake_id === intakeId).length + index,
        created_at: now,
      };
      nextMedia.push(record);
    }

    created = nextMedia;
    const before = { ...intake };
    const after = { ...intake, status: intakeStatuses.UPLOADED, updated_at: now };

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === intakeId ? after : item)),
      objectMedia: [...store.objectMedia, ...nextMedia],
      adminAuditLogs: [
        createAuditLog("media_uploaded", "object_intake", intakeId, before, after, `${nextMedia.length} media file(s) uploaded.`),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Intake not found." }, 404);
  return json({ rows: created, status: intakeStatuses.UPLOADED }, 201);
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
  return String(fileName || "asset")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
