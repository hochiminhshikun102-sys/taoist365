import { readStore } from "../../_object-intake.js";

export async function onRequestGet(context) {
  const { mediaId } = context.params;
  const store = await readStore(context.env);
  const media = store.objectMedia.find((item) => item.id === mediaId);

  if (!media) {
    return new Response("Media not found", { status: 404 });
  }

  if (context.env.OBJECT_MEDIA_BUCKET && media.storage_key) {
    const object = await context.env.OBJECT_MEDIA_BUCKET.get(media.storage_key);
    if (!object) {
      return new Response("Media asset missing", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "content-type": object.httpMetadata?.contentType || media.mime_type || "application/octet-stream",
        "cache-control": "public, max-age=31536000, immutable",
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
