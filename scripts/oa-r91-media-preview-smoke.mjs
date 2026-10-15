import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isTrustedMediaBytePath, mapAdminAsset } from "../src/lib/oa-media/trustedReadAdapter.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const results = [];

function record(name, pass, detail = "") {
  results.push({ name, pass, detail });
  if (!pass) console.error(`FAIL ${name}${detail ? ` :: ${detail}` : ""}`);
  else console.log(`PASS ${name}`);
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

record("trusted path assets", isTrustedMediaBytePath("/api/assets/asset-1"));
record("trusted path object-media", isTrustedMediaBytePath("/api/object-media/media-1"));
record("reject query token path", !isTrustedMediaBytePath("/api/assets/asset-1?token=x"));
record("reject public_url https", !isTrustedMediaBytePath("https://cdn.example/x.png"));
record("reject data url", !isTrustedMediaBytePath("data:image/png;base64,aaa"));

const image = mapAdminAsset(
  {
    id: "asset-main",
    file_name: "hero.png",
    usage: "main",
    mime_type: "image/png",
    file_url: "/api/object-media/media-main",
    public_url: "/api/assets/asset-main",
    data_url: "data:image/png;base64,SECRET",
  },
  "2026-10-15T00:00:00.000Z",
);
record("preview_path prefers trusted file_url", image.preview_path === "/api/object-media/media-main");
record("preview_kind image", image.preview_kind === "image");
record("slot main retained", image.media_slot === "main");
record("public_url not used as preview_path", image.preview_path !== image.public_url);
record("data_url not used as preview_path", !String(image.preview_path).includes("data:"));
record("is_public_asset not invented", image.is_public_asset === false);

const video = mapAdminAsset(
  { id: "asset-motion", usage: "motion", mime_type: "video/mp4", file_name: "clip.mp4" },
  "2026-10-15T00:00:00.000Z",
);
record("video slot motion", video.media_slot === "motion" && video.preview_kind === "video");
record("video preview_path assets id", video.preview_path === "/api/assets/asset-motion");

const missing = mapAdminAsset({ file_name: "none" }, "2026-10-15T00:00:00.000Z");
record("unknown id has no invented path beyond unknown asset", missing.preview_path === "/api/assets/unknown" || missing.preview_path === "");

const ui = read("src/components/oa-media/MediaRuntimeWorkbench.tsx");
const client = read("src/lib/oa-auth/oaPrivateReadClient.ts");
record("workbench uses oaPrivateGetBlob", ui.includes("oaPrivateGetBlob"));
record("workbench creates blob url", ui.includes("createObjectURL"));
record("workbench revokes on unmount/auth", ui.includes("revokeObjectURL") && ui.includes("subscribeOaAuthEpoch"));
record("no token in img src template", !ui.includes("access_token") && !ui.includes("Bearer ${"));
record("img uses blob preview.url", ui.includes("<img src={preview.url}"));
record("video element for motion", ui.includes("<video src={preview.url}"));
record("401 403 not_found states", ui.includes("auth_required") && ui.includes("permission_denied") && ui.includes("not_found"));
record("client blob helper fail-closed path", client.includes("oaPrivateGetBlob") && client.includes('code: "not_found"'));
record("legacy product-media not rewritten", !read("src/components/admin/AssetRegistryAdmin.tsx").includes("oaPrivateGetBlob"));
record("r90 public objects untouched", !read("functions/api/public/objects.js").includes("oaPrivateGetBlob"));

const failed = results.filter((item) => !item.pass);
console.log(`R91_SMOKE ${results.filter((i) => i.pass).length}/${results.length}`);
if (failed.length) process.exit(1);
