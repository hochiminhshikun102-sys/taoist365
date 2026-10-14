import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { FIXED_PREVIEW_SUPABASE_URL } from "../functions/_auth/supabase-identity.js";
import { onRequestGet as oaSessionGet } from "../functions/api/oa/session.js";
import { onRequestGet as adminOrdersGet } from "../functions/api/admin/orders.js";
import { onRequestPatch as adminOrderPatch } from "../functions/api/admin/orders/[orderId].js";
import { onRequestGet as adminIntakesGet } from "../functions/api/admin/object-intakes.js";
import { onRequestGet as adminObjectsGet } from "../functions/api/admin/objects.js";
import { onRequestGet as adminAssetsGet, onRequestPost as adminAssetsPost } from "../functions/api/admin/assets.js";
import { onRequestGet as airJobsGet } from "../functions/api/admin/air-engine/jobs.js";
import { onRequestGet as rawIntakesGet, onRequestPost as rawIntakesPost } from "../functions/api/object-intakes.js";
import { onRequestGet as objectMediaGet, classifyObjectMediaAccess } from "../functions/api/object-media/[mediaId].js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const issuer = "https://preview-identity.example.invalid/auth/v1";
const audience = "authenticated";
const results = [];
let kvWrites = 0;

function record(name, pass, detail = "") {
  results.push({ name, pass, detail });
  if (!pass) console.error(`FAIL ${name}${detail ? ` :: ${detail}` : ""}`);
  else console.log(`PASS ${name}`);
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function emptyStore(extra = {}) {
  return {
    objectIntakes: extra.objectIntakes || [],
    objectMedia: extra.objectMedia || [],
    objectAiDrafts: extra.objectAiDrafts || [],
    objectReviewQueue: extra.objectReviewQueue || [],
    airEngineJobs: extra.airEngineJobs || [],
    objects: extra.objects || [],
    assetRegistry: extra.assetRegistry || [],
    commerceOrders: extra.commerceOrders || [],
    buyerProfiles: extra.buyerProfiles || [],
    adminAuditLogs: extra.adminAuditLogs || [],
  };
}

const PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function syntheticStore() {
  return emptyStore({
    commerceOrders: [
      {
        id: "SYN-ORDER-1",
        order_id: "SYN-ORDER-1",
        status: "paid",
        contact: { name: "SYNTHETIC_ONLY", email: "synthetic@example.invalid", address: "n/a" },
        items: [],
        created_at: "2026-01-01T00:00:00.000Z",
      },
    ],
    objectIntakes: [{ id: "intake-pub", status: "published", created_at: "2026-01-01T00:00:00.000Z" }],
    objectMedia: [
      { id: "media-public-main", media_type: "main", intake_id: "intake-pub", data_url: PIXEL, mime_type: "image/png" },
      { id: "media-original", media_type: "original", intake_id: "intake-pub", data_url: PIXEL, mime_type: "image/png" },
      { id: "media-rights", media_type: "rights", intake_id: "intake-pub", data_url: PIXEL, mime_type: "image/png" },
      { id: "media-draft-main", media_type: "main", intake_id: "intake-draft", data_url: PIXEL, mime_type: "image/png" },
      { id: "media-new-unapproved-main", media_type: "main", intake_id: "intake-pub", data_url: PIXEL, mime_type: "image/png" },
    ],
    objects: [
      {
        object_id: "OBJ-PUB",
        intake_id: "intake-pub",
        status: "published",
        media_ids: ["media-public-main"],
      },
    ],
    assetRegistry: [{ id: "asset-1", file_name: "synth.png", scope: "object_intake", status: "uploaded" }],
    airEngineJobs: [{ id: "job-1", intake_id: "intake-pub", status: "queued", created_at: "2026-01-01T00:00:00.000Z" }],
  });
}

function makeKvEnv(baseEnv, store) {
  return {
    ...baseEnv,
    OBJECT_INTAKE_KV: {
      async get() {
        return JSON.stringify(store);
      },
      async put() {
        kvWrites += 1;
        throw new Error("isolated test blocked write");
      },
    },
  };
}

function ctx(env, url, { method = "GET", token, params = {}, body } = {}) {
  const headers = {};
  if (token) headers.authorization = `Bearer ${token}`;
  if (body) headers["content-type"] = "application/json";
  return {
    request: new Request(url, { method, headers, body }),
    env,
    params,
  };
}

async function statusOf(handler, context) {
  const response = await handler(context);
  let body = null;
  try {
    body = await response.clone().json();
  } catch {
    body = null;
  }
  return { status: response.status, body, cache: response.headers.get("cache-control") };
}

async function makeEnv(publicJwk) {
  return {
    NEXT_PUBLIC_DOHARA_RUNTIME_ENV: "preview",
    NEXT_PUBLIC_SUPABASE_URL: FIXED_PREVIEW_SUPABASE_URL,
    SUPABASE_ISSUER: issuer,
    SUPABASE_JWT_AUD: audience,
    SUPABASE_JWKS_JSON: JSON.stringify({ keys: [publicJwk] }),
  };
}

async function signToken(privateKey, claims, kid = "preview-kid-1") {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "ES256", kid, typ: "JWT" })
    .setIssuer(issuer)
    .setAudience(audience)
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);
}

const { publicKey, privateKey } = await generateKeyPair("ES256", { extractable: true });
const publicJwk = { ...(await exportJWK(publicKey)), kid: "preview-kid-1", alg: "ES256", use: "sig" };
const other = await generateKeyPair("ES256", { extractable: true });
const env = await makeEnv(publicJwk);
const store = syntheticStore();
const kvEnv = makeKvEnv(env, store);

const adminToken = await signToken(privateKey, {
  sub: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  app_metadata: { role: "oa_admin", account_status: "active" },
});
const operatorToken = await signToken(privateKey, {
  sub: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  app_metadata: { role: "oa_operator", account_status: "active" },
});
const viewerToken = await signToken(privateKey, {
  sub: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
  app_metadata: { role: "oa_viewer", account_status: "active" },
});
const inactiveToken = await signToken(privateKey, {
  sub: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
  app_metadata: { role: "oa_admin", account_status: "disabled" },
});
const forgedToken = await signToken(other.privateKey, {
  sub: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  app_metadata: { role: "oa_admin", account_status: "active" },
}, "other-kid");

const gets = [
  ["orders", adminOrdersGet, "http://127.0.0.1/api/admin/orders"],
  ["admin-intakes", adminIntakesGet, "http://127.0.0.1/api/admin/object-intakes"],
  ["admin-objects", adminObjectsGet, "http://127.0.0.1/api/admin/objects"],
  ["admin-assets", adminAssetsGet, "http://127.0.0.1/api/admin/assets"],
  ["air-engine", airJobsGet, "http://127.0.0.1/api/admin/air-engine/jobs"],
  ["raw-intakes", rawIntakesGet, "http://127.0.0.1/api/object-intakes"],
];

for (const [name, handler, url] of gets) {
  const none = await statusOf(handler, ctx(kvEnv, url));
  record(`${name} no token 401`, none.status === 401 && none.body?.code === "AUTH_REQUIRED" && none.body?.ok === false);
  const bad = await statusOf(handler, ctx(kvEnv, url, { token: forgedToken }));
  record(`${name} invalid token 401`, bad.status === 401);
  const viewer = await statusOf(handler, ctx(kvEnv, url, { token: viewerToken }));
  record(`${name} viewer 403`, viewer.status === 403 && viewer.body?.code === "PERMISSION_DENIED");
  const inactive = await statusOf(handler, ctx(kvEnv, url, { token: inactiveToken }));
  record(`${name} inactive 403`, inactive.status === 403 && inactive.body?.code === "ACCOUNT_RESTRICTED");
  const admin = await statusOf(handler, ctx(kvEnv, url, { token: adminToken }));
  record(
    `${name} oa_admin 200`,
    admin.status === 200 && Array.isArray(admin.body?.rows) && String(admin.cache || "").includes("no-store"),
  );
  const operator = await statusOf(handler, ctx(kvEnv, url, { token: operatorToken }));
  record(`${name} oa_operator 200`, operator.status === 200 && Array.isArray(operator.body?.rows));
  const prod = await statusOf(
    handler,
    ctx({ ...kvEnv, NEXT_PUBLIC_DOHARA_RUNTIME_ENV: "production" }, url.replace("127.0.0.1", "taoist365.com"), { token: adminToken }),
  );
  record(`${name} production host fail-closed`, prod.status === 401);
}

kvWrites = 0;
const patchUrl = "http://127.0.0.1/api/admin/orders/SYN-ORDER-1";
const patchBody = JSON.stringify({ status: "shipped", admin_note: "synthetic" });
const patchNone = await statusOf(adminOrderPatch, ctx(kvEnv, patchUrl, { method: "PATCH", body: patchBody, params: { orderId: "SYN-ORDER-1" } }));
record("order PATCH no token 401 ZERO_WRITE", patchNone.status === 401 && kvWrites === 0);
const patchViewer = await statusOf(
  adminOrderPatch,
  ctx(kvEnv, patchUrl, { method: "PATCH", token: viewerToken, body: patchBody, params: { orderId: "SYN-ORDER-1" } }),
);
record("order PATCH viewer 403 ZERO_WRITE", patchViewer.status === 403 && kvWrites === 0);
const patchAdmin = await statusOf(
  adminOrderPatch,
  ctx(kvEnv, patchUrl, { method: "PATCH", token: adminToken, body: patchBody, params: { orderId: "SYN-ORDER-1" } }),
);
record(
  "order PATCH oa_admin without write contract 403 ZERO_WRITE",
  patchAdmin.status === 403 && patchAdmin.body?.code === "PERMISSION_DENIED" && kvWrites === 0,
);

const publicMedia = await objectMediaGet(ctx(kvEnv, "http://127.0.0.1/api/object-media/media-public-main", { params: { mediaId: "media-public-main" } }));
record("published main media remains readable without token", publicMedia.status === 200);
const originalNone = await objectMediaGet(ctx(kvEnv, "http://127.0.0.1/api/object-media/media-original", { params: { mediaId: "media-original" } }));
record("original media no token 401", originalNone.status === 401);
const rightsNone = await objectMediaGet(ctx(kvEnv, "http://127.0.0.1/api/object-media/media-rights", { params: { mediaId: "media-rights" } }));
record("rights media no token 401", rightsNone.status === 401);
const draftMain = await objectMediaGet(ctx(kvEnv, "http://127.0.0.1/api/object-media/media-draft-main", { params: { mediaId: "media-draft-main" } }));
record("unpublished main media no token 401", draftMain.status === 401);
const newUnapproved = await objectMediaGet(
  ctx(kvEnv, "http://127.0.0.1/api/object-media/media-new-unapproved-main", { params: { mediaId: "media-new-unapproved-main" } }),
);
record("new media on published intake still requires explicit published media binding", newUnapproved.status === 401);
record(
  "published media_ids snapshot does not leak later draft upload",
  classifyObjectMediaAccess(store, store.objectMedia[4]) === "private",
);

const originalAdmin = await objectMediaGet(
  ctx(kvEnv, "http://127.0.0.1/api/object-media/media-original", { token: adminToken, params: { mediaId: "media-original" } }),
);
record("original media oa_admin 200 no-store", originalAdmin.status === 200 && String(originalAdmin.headers.get("cache-control") || "").includes("no-store"));
record(
  "media classifier distinguishes public vs private",
  classifyObjectMediaAccess(store, store.objectMedia[0]) === "public" &&
    classifyObjectMediaAccess(store, store.objectMedia[1]) === "private" &&
    classifyObjectMediaAccess(store, store.objectMedia[3]) === "private",
);

const session = await statusOf(oaSessionGet, ctx(env, "http://127.0.0.1/api/oa/session", { token: adminToken }));
record("R84 session oa_admin still 200", session.status === 200 && session.body?.authenticated === true && session.body?.oa_role === "oa_admin");
const sessionNone = await statusOf(oaSessionGet, ctx(env, "http://127.0.0.1/api/oa/session"));
record("R84 session no token still 401", sessionNone.status === 401);

const assetsPost = read("functions/api/admin/assets.js");
record("admin assets POST still uses enforceOfficialAction", assetsPost.includes("onRequestPost") && assetsPost.includes('enforceOfficialAction(context, "mutate_intake")'));
const intakes = read("functions/api/object-intakes.js");
record("object-intakes POST still uses enforceServerAuthz", intakes.includes("onRequestPost") && intakes.includes('enforceServerAuthz(context, "intake_create")'));
record("R85 publish source untouched", read("src/components/oa-publish/Publish.tsx").includes("submitPublishIntake") && read("src/app/admin/oa/co/intake/page.tsx").includes("<Publish embedded"));
record("R86 shell source untouched", read("src/components/oa-shell/OaSharedShell.tsx").includes("oa-hover-bridge") && read("src/styles/oa/oa-shell.css").includes("oa-nav-toggle"));
record("R84 session helper reused", read("functions/_auth/require-oa-private-read.js").includes("requireIdentity") && read("functions/_auth/require-oa-private-read.js").includes("isOaPreviewRequest"));
record("publish policy file not rewritten", read("functions/_publish-policy.js").includes("enforceOfficialAction") && !read("functions/_publish-policy.js").includes("requireOaPrivateRead"));
record("order updater preserved", read("functions/api/admin/orders/[orderId].js").includes("export async function applyOrderStatusUpdate") && read("functions/api/admin/orders/[orderId].js").includes("updateStore"));

const rawPost = await statusOf(rawIntakesPost, ctx(kvEnv, "http://127.0.0.1/api/object-intakes", { method: "POST", body: JSON.stringify({ title: "x" }) }));
record("raw intakes POST still denied without server authz", rawPost.status === 401 || rawPost.status === 403);
record("assets POST helper still imported", typeof adminAssetsPost === "function");

const failed = results.filter((item) => !item.pass);
console.log(JSON.stringify({ batch: "R87", total: results.length, passed: results.length - failed.length, failed: failed.map((item) => item.name) }, null, 2));
if (failed.length) process.exit(1);
