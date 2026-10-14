import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { FIXED_PREVIEW_SUPABASE_URL } from "../functions/_auth/supabase-identity.js";
import { classifyAssetByteAccess, onRequestGet as getAsset } from "../functions/api/assets/[assetId].js";
import { classifyObjectMediaAccess, onRequestGet as getObjectMedia } from "../functions/api/object-media/[mediaId].js";

const issuer = "https://preview-identity.example.invalid/auth/v1";
const results = [];
function check(name, condition) {
  results.push({ name, pass: Boolean(condition) });
  console.log(`${condition ? "PASS" : "FAIL"} ${name}`);
}
const PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

const publicAsset = {
  id: "asset-public-photo",
  scope: "product_media",
  status: "published",
  usage: "main",
  mime_type: "image/png",
  data_url: PIXEL,
};
const rightsAsset = {
  id: "asset-rights",
  scope: "product_media",
  status: "published",
  usage: "rights_evidence",
  mime_type: "image/png",
  data_url: PIXEL,
};
const privateAsset = {
  id: "asset-prompt-pack",
  scope: "prompt_pack",
  status: "published",
  usage: "prompt_template",
  mime_type: "image/png",
  data_url: PIXEL,
};
const unboundAsset = {
  id: "asset-not-released",
  scope: "product_media",
  status: "published",
  usage: "main",
  mime_type: "image/png",
  data_url: PIXEL,
};
const draftAsset = {
  id: "asset-draft",
  scope: "product_media",
  status: "draft",
  usage: "main",
  mime_type: "image/png",
  data_url: PIXEL,
};
const store = {
  assetRegistry: [publicAsset, rightsAsset, privateAsset, unboundAsset, draftAsset],
  objectIntakes: [],
  objectMedia: [
    { id: "media-main-pub", media_type: "main", data_url: PIXEL, mime_type: "image/png" },
    { id: "media-brand-prompt", media_type: "brand_prompt", data_url: PIXEL, mime_type: "image/png" },
  ],
  objects: [
    {
      object_id: "DH-OBJ-PUBLIC",
      status: "published",
      media_ids: ["media-main-pub"],
      media: [
        { type: "main", url: "/api/assets/asset-public-photo" },
        { type: "main", url: "/api/assets/asset-rights" },
      ],
    },
    {
      object_id: "DH-OBJ-DRAFT",
      status: "draft",
      media: [{ type: "main", url: "/api/assets/asset-not-released" }],
    },
  ],
};
let writes = 0;
const env = {
  NEXT_PUBLIC_DOHARA_RUNTIME_ENV: "preview",
  NEXT_PUBLIC_SUPABASE_URL: FIXED_PREVIEW_SUPABASE_URL,
  SUPABASE_ISSUER: issuer,
  SUPABASE_JWT_AUD: "authenticated",
  OBJECT_INTAKE_KV: {
    async get() { return JSON.stringify(store); },
    async put() { writes++; throw new Error("write must not occur"); },
  },
};
const { publicKey, privateKey } = await generateKeyPair("ES256", { extractable: true });
const publicJwk = { ...(await exportJWK(publicKey)), kid: "r89-kid", use: "sig", alg: "ES256" };
env.SUPABASE_JWKS_JSON = JSON.stringify({ keys: [publicJwk] });
async function tokenFor(role, status = "active") {
  return new SignJWT({ app_metadata: { role, account_status: status } })
    .setProtectedHeader({ alg: "ES256", kid: "r89-kid", typ: "JWT" })
    .setIssuer(issuer).setAudience("authenticated")
    .setSubject("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa")
    .setIssuedAt().setExpirationTime("5m").sign(privateKey);
}
const admin = await tokenFor("oa_admin");
const viewer = await tokenFor("oa_viewer");
const inactive = await tokenFor("oa_admin", "disabled");
const badKey = await generateKeyPair("ES256", { extractable: true });
const forged = await new SignJWT({ app_metadata: { role: "oa_admin", account_status: "active" } })
  .setProtectedHeader({ alg: "ES256", kid: "r89-kid", typ: "JWT" })
  .setIssuer(issuer).setAudience("authenticated")
  .setSubject("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa")
  .setIssuedAt().setExpirationTime("5m").sign(badKey.privateKey);
function context(id, token, type = "asset", origin = "http://localhost:8788") {
  const headers = token ? { authorization: `Bearer ${token}` } : {};
  const route = type === "asset" ? `assets/${id}` : `object-media/${id}`;
  const param = type === "asset" ? { assetId: id } : { mediaId: id };
  return { request: new Request(`${origin}/api/${route}`, { headers }), env, params: param };
}

check("public object asset exact URL proof", classifyAssetByteAccess(store, publicAsset) === "public");
check("rights remains private even when public object references URL", classifyAssetByteAccess(store, rightsAsset) === "private");
check("prompt pack never public", classifyAssetByteAccess(store, privateAsset) === "private");
check("published flag alone does not grant public byte", classifyAssetByteAccess(store, unboundAsset) === "private");
check("draft flag never grants public byte", classifyAssetByteAccess(store, draftAsset) === "private");

const assetPublished = await getAsset(context("asset-public-photo"));
check("published asset anonymous 200", assetPublished.status === 200);
check("public byte caching revalidates within one minute", String(assetPublished.headers.get("cache-control")).includes("no-store") || String(assetPublished.headers.get("cache-control")).includes("max-age=60"));
const assetRights = await getAsset(context("asset-rights"));
check("rights anonymously 401", assetRights.status === 401);
check("rights forged jwt 401", (await getAsset(context("asset-rights", forged))).status === 401);
check("rights viewer 403", (await getAsset(context("asset-rights", viewer))).status === 403);
check("rights inactive 403", (await getAsset(context("asset-rights", inactive))).status === 403);
const rightsAdmin = await getAsset(context("asset-rights", admin));
check("rights verified admin 200 no-store", rightsAdmin.status === 200 && rightsAdmin.headers.get("cache-control") === "no-store");
check("private prompt pack anonymous 401", (await getAsset(context("asset-prompt-pack"))).status === 401);
check("published status unbound asset anonymous 401", (await getAsset(context("asset-not-released"))).status === 401);
check("private byte production host closed", (await getAsset(context("asset-prompt-pack", admin, "asset", "https://taoist365.com"))).status === 401);
check("missing asset remains 404", (await getAsset(context("no-such-asset"))).status === 404);

check("unknown media type classifier stays unmapped", classifyObjectMediaAccess(store, store.objectMedia[1]) === "unmapped");
check("known published main classifier public", classifyObjectMediaAccess(store, store.objectMedia[0]) === "public");
check("unmapped media anonymously 401", (await getObjectMedia(context("media-brand-prompt", "", "object-media"))).status === 401);
const mediaAdmin = await getObjectMedia(context("media-brand-prompt", admin, "object-media"));
check("unmapped media admin no-store", mediaAdmin.status === 200 && mediaAdmin.headers.get("cache-control") === "no-store");
check("published main still 200", (await getObjectMedia(context("media-main-pub", "", "object-media"))).status === 200);
check("zero real store writes", writes === 0);

const failed = results.filter((x) => !x.pass);
console.log(JSON.stringify({ batch: "R89", total: results.length, passed: results.length - failed.length, failed: failed.map((x) => x.name) }));
if (failed.length) process.exit(1);
