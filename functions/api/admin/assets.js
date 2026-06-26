import { createAuditLog, json, makeId, nowIso, updateStore, readStore } from "../../_object-intake.js";

const assetScopes = new Set(["brand", "product_media", "social", "prompt_pack", "safe_area", "object_intake", "air_engine"]);
const assetStatuses = new Set(["uploaded", "draft", "review_pending", "approved", "published", "archived"]);

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const scope = url.searchParams.get("scope");
  const objectId = url.searchParams.get("object_id");
  const query = String(url.searchParams.get("q") || "").toLowerCase();
  const includeArchived = url.searchParams.get("include_archived") === "1";
  const store = await readStore(context.env);

  let rows = [...store.assetRegistry].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  if (scope && scope !== "all") rows = rows.filter((item) => item.scope === scope);
  if (objectId) rows = rows.filter((item) => item.object_id === objectId || item.linked_object_id === objectId);
  if (!includeArchived) rows = rows.filter((item) => item.status !== "archived");
  if (query) {
    rows = rows.filter((item) =>
      [item.file_name, item.alt_text, item.usage, item.scope, item.object_id, item.intake_id, ...(item.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  return json({
    rows: rows.map(publicAssetRecord),
    storage: context.env.OBJECT_MEDIA_BUCKET ? "OBJECT_MEDIA_BUCKET" : "memory-preview",
  });
}

export async function onRequestPost(context) {
  let form;
  try {
    form = await context.request.formData();
  } catch {
    return json({ error: "Invalid asset upload." }, 400);
  }

  const files = form.getAll("files").filter((item) => typeof item === "object" && item && "arrayBuffer" in item);
  if (files.length === 0) return json({ error: "Upload at least one asset file." }, 400);

  const requestedScope = String(form.get("scope") || "product_media");
  const scope = assetScopes.has(requestedScope) ? requestedScope : "product_media";
  const requestedStatus = String(form.get("status") || "uploaded");
  const status = assetStatuses.has(requestedStatus) ? requestedStatus : "uploaded";
  const objectId = String(form.get("object_id") || form.get("linked_object_id") || "");
  const intakeId = String(form.get("intake_id") || "");
  const usage = String(form.get("usage") || "");
  const altText = String(form.get("alt_text") || "");
  const tags = String(form.get("tags") || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);

  const created = [];

  await updateStore(context.env, async (store) => {
    const now = nowIso();
    const nextAssets = [];

    for (const [index, file] of files.entries()) {
      const id = makeId("asset");
      const contentType = file.type || "application/octet-stream";
      const fileName = file.name || `asset-${index}`;
      const storageKey = ["asset-registry", scope, id, safeFileName(fileName)].join("/");
      const hasR2 = Boolean(context.env.OBJECT_MEDIA_BUCKET);
      const dataUrl = hasR2 ? "" : await fileToDataUrl(file, contentType);

      if (hasR2) {
        await context.env.OBJECT_MEDIA_BUCKET.put(storageKey, await file.arrayBuffer(), {
          httpMetadata: { contentType },
          customMetadata: { asset_id: id, scope, object_id: objectId, intake_id: intakeId },
        });
      }

      const record = {
        id,
        scope,
        object_id: objectId,
        linked_object_id: objectId,
        intake_id: intakeId,
        source: "admin_asset_center",
        file_name: fileName,
        file_url: hasR2 ? `/api/assets/${id}` : "",
        data_url: dataUrl,
        storage_key: storageKey,
        mime_type: contentType,
        size: file.size || 0,
        width: 0,
        height: 0,
        usage,
        alt_text: altText,
        tags,
        status,
        created_at: now,
        updated_at: now,
      };

      nextAssets.push(record);
      created.push(record);
    }

    return {
      ...store,
      assetRegistry: [...nextAssets, ...store.assetRegistry],
      adminAuditLogs: [
        createAuditLog("asset_uploaded", "asset_registry", scope, null, { count: nextAssets.length, scope }, `${nextAssets.length} asset file(s) uploaded to ${scope}.`),
        ...store.adminAuditLogs,
      ],
    };
  });

  return json({ rows: created.map(publicAssetRecord) }, 201);
}

function publicAssetRecord(asset) {
  return {
    ...asset,
    public_url: asset.file_url || asset.data_url || "",
    data_url: asset.data_url ? asset.data_url : undefined,
  };
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
