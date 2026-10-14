import { readStore } from "../../_object-intake.js";
import { requireOaPrivateRead } from "../../_auth/require-oa-private-read.js";

/**
 * Asset Registry is an internal asset store, NOT a publication authority.
 * Only an explicit published-object media URL may make a registry byte public.
 * Uploaded/published status or a client-supplied scope/tag alone never grants access.
 */
const PUBLIC_MEDIA_TYPES = new Set(["main", "detail", "scene", "pc", "mobile", "social", "motion"]);
const PUBLIC_ASSET_SCOPES = new Set(["product_media", "social"]);
const PRIVATE_ASSET_TOKENS = /(^|[^a-z])(original|rights?|evidence|private|prompt|secret|source)([^a-z]|$)/i;

export function classifyAssetByteAccess(store, asset) {
  if (!asset || typeof asset.id !== "string" || !asset.id) return "private";
  if (asset.status !== "published" || !PUBLIC_ASSET_SCOPES.has(String(asset.scope || ""))) return "private";

  const unsafeLabels = [asset.usage, ...(Array.isArray(asset.tags) ? asset.tags : [])]
    .map((value) => String(value || "").toLowerCase());
  if (unsafeLabels.some((value) => PRIVATE_ASSET_TOKENS.test(value))) return "private";

  const canonicalPath = `/api/assets/${encodeURIComponent(asset.id)}`;
  const explicitlyPublished = (store?.objects || []).some((object) => {
    if (object.status !== "published" || !Array.isArray(object.media)) return false;
    return object.media.some((item) =>
      item &&
      PUBLIC_MEDIA_TYPES.has(String(item.type || "")) &&
      item.url === canonicalPath
    );
  });
  return explicitlyPublished ? "public" : "private";
}

export async function onRequestGet(context) {
  const { assetId } = context.params;
  const store = await readStore(context.env);
  const asset = store.assetRegistry.find((item) => item.id === assetId);

  if (!asset) {
    return new Response("Asset not found", { status: 404, headers: { "cache-control": "no-store" } });
  }

  const access = classifyAssetByteAccess(store, asset);
  if (access !== "public") {
    const gate = await requireOaPrivateRead(context);
    if (!gate.ok) return gate.response;
  }

  // Publication may be revoked: never serve mutable public status with immutable year-long caching.
  const cacheControl = access === "public" ? "public, max-age=60, must-revalidate" : "no-store";
  const headers = {
    "cache-control": cacheControl,
    "vary": "Authorization",
  };

  if (context.env.OBJECT_MEDIA_BUCKET && asset.storage_key) {
    const object = await context.env.OBJECT_MEDIA_BUCKET.get(asset.storage_key);
    if (!object) {
      return new Response("Asset file missing", { status: 404, headers: { "cache-control": "no-store" } });
    }

    return new Response(object.body, {
      headers: {
        ...headers,
        "content-type": object.httpMetadata?.contentType || asset.mime_type || "application/octet-stream",
      },
    });
  }

  if (asset.data_url) {
    const match = /^data:([^;]+);base64,(.+)$/.exec(asset.data_url);
    if (match) {
      return new Response(base64ToBytes(match[2]), {
        headers: {
          ...headers,
          "content-type": match[1],
          "cache-control": "no-store",
        },
      });
    }
  }

  return new Response("Asset file unavailable", { status: 404, headers: { "cache-control": "no-store" } });
}

function base64ToBytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
