import { readStore } from "../../_object-intake.js";

export async function onRequestGet(context) {
  const { assetId } = context.params;
  const store = await readStore(context.env);
  const asset = store.assetRegistry.find((item) => item.id === assetId);

  if (!asset) {
    return new Response("Asset not found", { status: 404 });
  }

  if (context.env.OBJECT_MEDIA_BUCKET && asset.storage_key) {
    const object = await context.env.OBJECT_MEDIA_BUCKET.get(asset.storage_key);
    if (!object) {
      return new Response("Asset file missing", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "content-type": object.httpMetadata?.contentType || asset.mime_type || "application/octet-stream",
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  }

  if (asset.data_url) {
    const match = /^data:([^;]+);base64,(.+)$/.exec(asset.data_url);
    if (match) {
      return new Response(base64ToBytes(match[2]), {
        headers: {
          "content-type": match[1],
          "cache-control": "no-store",
        },
      });
    }
  }

  return new Response("Asset file unavailable", { status: 404 });
}

function base64ToBytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
