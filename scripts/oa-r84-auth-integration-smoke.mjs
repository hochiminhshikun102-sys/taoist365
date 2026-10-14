import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { onRequestGet as accountSessionGet } from "../functions/api/account/session.js";
import { onRequestGet as oaSessionGet } from "../functions/api/oa/session.js";
import { verifySupabaseAccessToken, resolveAuthConfig, FIXED_PREVIEW_SUPABASE_URL, FIXED_PREVIEW_ISSUER } from "../functions/_auth/supabase-identity.js";

const OA_ALLOWED_ROLES = ["oa_admin", "oa_operator", "oa_viewer"];

function decideOaAccess(input) {
  if (!input.previewRuntime) return { ok: false, reason: "runtime_not_preview" };
  if (!input.publicEnvPresent) return { ok: false, reason: "env_missing" };
  if (input.fetchFailed) return { ok: false, reason: "auth_required" };
  const status = input.httpStatus ?? null;
  const body = input.body ?? null;
  if (status === 401 || status == null) return { ok: false, reason: "auth_required" };
  if (status === 403 && body?.code === "ACCOUNT_RESTRICTED") return { ok: false, reason: "account_inactive" };
  if (status === 403) return { ok: false, reason: "role_not_allowed" };
  if (status !== 200 || body?.authenticated !== true) return { ok: false, reason: "auth_required" };
  if (!OA_ALLOWED_ROLES.includes(body.oa_role)) return { ok: false, reason: "role_not_allowed" };
  if (body.account_status !== "active") return { ok: false, reason: "account_inactive" };
  return { ok: true, role: body.oa_role, accountStatus: "active" };
}

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const issuer = "https://preview-identity.example.invalid/auth/v1";
const audience = "authenticated";
const results = [];

function record(name, pass, detail = "") {
  results.push({ name, pass, detail });
  if (!pass) console.error(`FAIL ${name}${detail ? ` :: ${detail}` : ""}`);
  else console.log(`PASS ${name}`);
}

function requestWithBearer(token, url = "http://127.0.0.1:8788/api/oa/session") {
  return new Request(url, {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
}

async function makeEnv(publicJwk, extra = {}) {
  return {
    SUPABASE_ISSUER: issuer,
    SUPABASE_JWT_AUD: audience,
    SUPABASE_JWKS_JSON: JSON.stringify({ keys: Array.isArray(publicJwk) ? publicJwk : [publicJwk] }),
    ...extra,
  };
}

async function signToken(privateKey, claims, kid = "preview-kid-1") {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "ES256", kid, typ: "JWT" })
    .setIssuer(issuer)
    .setAudience(audience)
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime(claims.expText || "5m")
    .sign(privateKey);
}

const { publicKey, privateKey } = await generateKeyPair("ES256", { extractable: true });
const publicJwk = { ...(await exportJWK(publicKey)), kid: "preview-kid-1", alg: "ES256", use: "sig" };
const other = await generateKeyPair("ES256", { extractable: true });
const env = await makeEnv(publicJwk);

const oaAdminClaims = {
  sub: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  app_metadata: {
    role: "oa_admin",
    account_status: "active",
    dohara_roles: ["member"],
    member_id: "MEM-OA-1",
  },
  user_metadata: { role: "oa_admin", email: "spoof@example.invalid" },
};

const memberOnlyClaims = {
  sub: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  app_metadata: {
    dohara_roles: ["member"],
    member_id: "MEM-ONLY-1",
    account_status: "active",
  },
};

const inactiveOaClaims = {
  sub: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
  app_metadata: {
    role: "oa_admin",
    account_status: "disabled",
  },
};

const missingRoleClaims = {
  sub: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
  app_metadata: {
    account_status: "active",
  },
};

const oaAdminToken = await signToken(privateKey, oaAdminClaims);
const memberOnlyToken = await signToken(privateKey, memberOnlyClaims);
const inactiveOaToken = await signToken(privateKey, inactiveOaClaims);
const missingRoleToken = await signToken(privateKey, missingRoleClaims);
const forgedToken = await signToken(other.privateKey, oaAdminClaims, "other-kid");
const expiredToken = await new SignJWT(oaAdminClaims)
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer(issuer)
  .setAudience(audience)
  .setSubject(oaAdminClaims.sub)
  .setIssuedAt(Math.floor(Date.now() / 1000) - 120)
  .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
  .sign(privateKey);
const wrongIssToken = await new SignJWT(oaAdminClaims)
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer("https://production-identity.example.invalid/auth/v1")
  .setAudience(audience)
  .setSubject(oaAdminClaims.sub)
  .setIssuedAt()
  .setExpirationTime("5m")
  .sign(privateKey);
const wrongAudToken = await new SignJWT(oaAdminClaims)
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer(issuer)
  .setAudience("anon")
  .setSubject(oaAdminClaims.sub)
  .setIssuedAt()
  .setExpirationTime("5m")
  .sign(privateKey);

const none = await oaSessionGet({ request: requestWithBearer(""), env });
const noneBody = await none.json();
record("OA missing token 401", none.status === 401 && noneBody.code === "AUTH_REQUIRED" && noneBody.authenticated !== true);

const forged = await oaSessionGet({ request: requestWithBearer(forgedToken), env });
record("OA forged signature 401", forged.status === 401);

const expired = await oaSessionGet({ request: requestWithBearer(expiredToken), env });
const expiredBody = await expired.json();
record("OA expired token 401", expired.status === 401 && expiredBody.code === "TOKEN_EXPIRED");

const wrongIss = await oaSessionGet({ request: requestWithBearer(wrongIssToken), env });
record("OA issuer mismatch 401", wrongIss.status === 401);

const wrongAud = await oaSessionGet({ request: requestWithBearer(wrongAudToken), env });
record("OA audience mismatch 401", wrongAud.status === 401);

const inactive = await oaSessionGet({ request: requestWithBearer(inactiveOaToken), env });
const inactiveBody = await inactive.json();
record("OA inactive account 403", inactive.status === 403 && inactiveBody.code === "ACCOUNT_RESTRICTED");

const missingRole = await oaSessionGet({ request: requestWithBearer(missingRoleToken), env });
record("OA missing role 403", missingRole.status === 403);

const memberOnly = await oaSessionGet({ request: requestWithBearer(memberOnlyToken), env });
const memberOnlyBody = await memberOnly.json();
record(
  "member dohara_roles cannot OA",
  memberOnly.status === 403 && memberOnlyBody.code === "PERMISSION_DENIED" && memberOnlyBody.authenticated !== true,
);

const allowed = await oaSessionGet({ request: requestWithBearer(oaAdminToken), env });
const allowedBody = await allowed.json();
record(
  "OA admin signed role 200 projection",
  allowed.status === 200 &&
    allowedBody.authenticated === true &&
    allowedBody.oa_role === "oa_admin" &&
    allowedBody.account_status === "active" &&
    !("roles" in allowedBody) &&
    !("user_id" in allowedBody) &&
    !("email" in allowedBody) &&
    !("access_token" in allowedBody) &&
    !("token" in allowedBody) &&
    !("refresh_token" in allowedBody),
);

const account = await accountSessionGet({ request: requestWithBearer(oaAdminToken), env });
const accountBody = await account.json();
record(
  "account session omits oa_role and keeps member roles",
  account.status === 200 &&
    accountBody.authenticated === true &&
    Array.isArray(accountBody.roles) &&
    accountBody.roles.includes("member") &&
    !("oa_role" in accountBody),
);

const spoof = await verifySupabaseAccessToken(oaAdminToken, env);
record(
  "user_metadata is not OA role source",
  spoof.ok === true && spoof.identity.oa_role === "oa_admin" && !spoof.identity.roles.includes("oa_admin"),
);

const derivedOk = resolveAuthConfig(
  {
    NEXT_PUBLIC_DOHARA_RUNTIME_ENV: "preview",
    NEXT_PUBLIC_SUPABASE_URL: FIXED_PREVIEW_SUPABASE_URL,
  },
  new Request("https://b317808a.taoist365.pages.dev/api/oa/session", { headers: { host: "b317808a.taoist365.pages.dev" } }),
);
record("preview host may derive issuer", derivedOk.issuer === FIXED_PREVIEW_ISSUER);

const derivedProd = resolveAuthConfig(
  {
    NEXT_PUBLIC_DOHARA_RUNTIME_ENV: "preview",
    NEXT_PUBLIC_SUPABASE_URL: FIXED_PREVIEW_SUPABASE_URL,
  },
  new Request("https://www.taoist365.com/api/oa/session", { headers: { host: "www.taoist365.com" } }),
);
record("production host cannot derive issuer", !derivedProd.issuer);

const derivedWrongProject = resolveAuthConfig(
  {
    NEXT_PUBLIC_DOHARA_RUNTIME_ENV: "preview",
    NEXT_PUBLIC_SUPABASE_URL: "https://other.supabase.co",
  },
  new Request("https://abc.taoist365.pages.dev/api/oa/session", { headers: { host: "abc.taoist365.pages.dev" } }),
);
record("non-fixed supabase URL cannot derive issuer", !derivedWrongProject.issuer);

record(
  "client gate fail-closed without preview",
  decideOaAccess({ previewRuntime: false, publicEnvPresent: true, httpStatus: 200, body: { authenticated: true, oa_role: "oa_admin", account_status: "active" } }).reason ===
    "runtime_not_preview",
);
record(
  "client gate fail-closed without env",
  decideOaAccess({ previewRuntime: true, publicEnvPresent: false, httpStatus: 200, body: { authenticated: true, oa_role: "oa_admin", account_status: "active" } }).reason ===
    "env_missing",
);
record(
  "client gate fail-closed fetch error",
  decideOaAccess({ previewRuntime: true, publicEnvPresent: true, fetchFailed: true }).reason === "auth_required",
);
record(
  "client gate does not trust 200 without authenticated",
  decideOaAccess({ previewRuntime: true, publicEnvPresent: true, httpStatus: 200, body: { oa_role: "oa_admin", account_status: "active" } }).reason === "auth_required",
);

const denySrc = readFileSync(join(repoRoot, "src/components/oa-auth/OaAdminAuthState.tsx"), "utf8");
const gateSrc = readFileSync(join(repoRoot, "src/components/oa-auth/OaAdminAuthGate.tsx"), "utf8");
record(
  "R82B deny page has no login form",
  !denySrc.includes('type="email"') &&
    !denySrc.includes('type="password"') &&
    !denySrc.includes("<form") &&
    !denySrc.includes("<button") &&
    !gateSrc.includes("signInWithPassword") &&
    denySrc.includes("auth_required") &&
    denySrc.includes("preview_only") &&
    denySrc.includes("real_write_false"),
);
record("OA gate uses server session not client user metadata", gateSrc.includes("fetchOaServerSession") && !gateSrc.includes("session?.user") && !gateSrc.includes("app_metadata"));
record("OA gate invalidates in-flight on sign-out", gateSrc.includes("SIGNED_OUT") && gateSrc.includes("generationRef"));

const failed = results.filter((item) => !item.pass);
console.log(JSON.stringify({ batch: "R84", total: results.length, passed: results.length - failed.length, failed: failed.map((item) => item.name) }, null, 2));
if (failed.length > 0) process.exit(1);
