import { readStore } from "../../_object-intake.js";
import { requireOaPrivateRead } from "../../_auth/require-oa-private-read.js";

const PRIVATE_MEDIA_TYPES = new Set(["original", "rights", "private"]);
const PUBLIC_PRODUCT_MEDIA_TYPES = new Set(["main", "detail", "scene", "pc", "mobile", "social"]);

export function classifyObjectMediaAccess(store, media) {
  const type = String(media?.media_type || "");
  if (PRIVATE_MEDIA_TYPES.has(type)) return "private";
  if (!PUBLIC_PRODUCT_MEDIA_TYPES.has(type)) return "unmapped";
  const published = (store.objects || []).some((object) => {
    if (object.status !== "published") return false;
    if (Array.isArray(object.media_ids) && object.media_ids.includes(media.id)) return true;
    return Boolean(object.intake_id && media.intake_id && object.intake_id === media.intake_id);
  });
  return published ? "public" : "private";
}

export async function onRequestGet(context) {
  const { mediaId } = context.params;
  const store = await readStore(context.env);
  const media = store.objectMedia.find((item) => item.id === mediaId);

  if (!media) {
    return new Response("Media not found", { status: 404 });
  }

  const access = classifyObjectMediaAccess(store, media);
  if (access === "private") {
    const gate = await requireOaPrivateRead(context);
    if (!gate.ok) return gate.response;
    return serveMedia(context, media, "no-store");
  }

  if (access === "unmapped") {
    return serveMedia(context, media, media.data_url ? "no-store" : "public, max-age=31536000, immutable");
  }

  return serveMedia(context, media, media.data_url ? "no-store" : "public, max-age=31536000, immutable");
}

async function serveMedia(context, media, cacheControl) {
  if (context.env.OBJECT_MEDIA_BUCKET && media.storage_key) {
    const object = await context.env.OBJECT_MEDIA_BUCKET.get(media.storage_key);
    if (!object) {
      return new Response("Media asset missing", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "content-type": object.httpMetadata?.contentType || media.mime_type || "application/octet-stream",
        "cache-control": cacheControl,
      },
    });
  }

  if (media.data_url) {
    const match = /^data:([^;]+);base64,(.+)$/.exec(media.data_url);
    if (match) {
      return new Response(base64ToBytes(match[2]), {
        headers: {
          "content-type": match[1],
          "cache-control": "no-store",
        },
      });
    }
  }

  return Response.redirect("/homepage-hero/windkeep-lantern-sea.png", 302);
}

function base64ToBytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
