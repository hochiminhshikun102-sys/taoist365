import { generateKeyPair, exportJWK, SignJWT } from "jose";
import { onRequestGet as sessionGet } from "../functions/api/account/session.js";
import { requireIdentity } from "../functions/_auth/require-identity.js";
import { requireRole } from "../functions/_auth/require-role.js";
import { verifySupabaseAccessToken } from "../functions/_auth/supabase-identity.js";

const issuer = "https://preview-identity.example.invalid/auth/v1";
const audience = "authenticated";
const results = [];

function record(name, pass, detail = "") {
  results.push({ name, pass, detail });
  if (!pass) console.error(`FAIL ${name}${detail ? ` :: ${detail}` : ""}`);
  else console.log(`PASS ${name}`);
}

function requestWithBearer(token) {
  return new Request("http://127.0.0.1:8788/api/account/session", {
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
const otherJwk = { ...(await exportJWK(other.publicKey)), kid: "other-kid", alg: "ES256", use: "sig" };
const env = await makeEnv(publicJwk);

const memberClaims = {
  sub: "11111111-1111-4111-8111-111111111111",
  app_metadata: {
    dohara_roles: ["member"],
    member_id: "MEM-PREVIEW-1",
    account_status: "active",
  },
};

const buyerClaims = {
  sub: "22222222-2222-4222-8222-222222222222",
  app_metadata: {
    dohara_roles: ["member", "wind_seeker"],
    member_id: "MEM-PREVIEW-2",
    windseeker_id: "WS-PREVIEW-2",
    account_status: "active",
  },
};

const disabledClaims = {
  sub: "33333333-3333-4333-8333-333333333333",
  app_metadata: {
    dohara_roles: ["member"],
    member_id: "MEM-PREVIEW-3",
    account_status: "disabled",
  },
};

const missingStatusClaims = {
  sub: "44444444-4444-4444-8444-444444444444",
  app_metadata: {
    dohara_roles: ["member"],
    member_id: "MEM-PREVIEW-4",
  },
};

const emptyStatusClaims = {
  sub: "55555555-5555-4555-8555-555555555555",
  app_metadata: {
    dohara_roles: ["member"],
    member_id: "MEM-PREVIEW-5",
    account_status: "",
  },
};

const unknownStatusClaims = {
  sub: "66666666-6666-4666-8666-666666666666",
  app_metadata: {
    dohara_roles: ["member"],
    member_id: "MEM-PREVIEW-6",
    account_status: "unknown",
  },
};

const memberToken = await signToken(privateKey, memberClaims);
const buyerToken = await signToken(privateKey, buyerClaims);
const disabledToken = await signToken(privateKey, disabledClaims);
const missingStatusToken = await signToken(privateKey, missingStatusClaims);
const emptyStatusToken = await signToken(privateKey, emptyStatusClaims);
const unknownStatusToken = await signToken(privateKey, unknownStatusClaims);
const forgedToken = await signToken(other.privateKey, memberClaims, "other-kid");
const expiredToken = await new SignJWT(memberClaims)
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer(issuer)
  .setAudience(audience)
  .setSubject(memberClaims.sub)
  .setIssuedAt(Math.floor(Date.now() / 1000) - 120)
  .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
  .sign(privateKey);
const metadataSpoofToken = await signToken(privateKey, {
  ...memberClaims,
  role: "admin",
  user_metadata: { dohara_roles: ["admin"], role: "admin", email: "spoof@example.invalid" },
});
const wrongIssToken = await new SignJWT(memberClaims)
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer("https://production-identity.example.invalid/auth/v1")
  .setAudience(audience)
  .setSubject(memberClaims.sub)
  .setIssuedAt()
  .setExpirationTime("5m")
  .sign(privateKey);
const wrongAudToken = await new SignJWT(memberClaims)
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer(issuer)
  .setAudience("anon")
  .setSubject(memberClaims.sub)
  .setIssuedAt()
  .setExpirationTime("5m")
  .sign(privateKey);

const member = await verifySupabaseAccessToken(memberToken, env);
record("member token verifies", member.ok === true && member.identity.roles.includes("member") && member.identity.user_id === memberClaims.sub);

const buyer = await verifySupabaseAccessToken(buyerToken, env);
record("wind_seeker token verifies", buyer.ok === true && buyer.identity.roles.includes("wind_seeker") && buyer.identity.windseeker_id === "WS-PREVIEW-2");

const none = await requireIdentity(requestWithBearer(""), env);
record("no token 401 AUTH_REQUIRED", none.ok === false && none.response.status === 401 && (await none.response.clone().json()).code === "AUTH_REQUIRED");

const forged = await verifySupabaseAccessToken(forgedToken, env);
record("forged signature 401", forged.ok === false && forged.code === "TOKEN_INVALID");

const expired = await verifySupabaseAccessToken(expiredToken, env);
record("expired token TOKEN_EXPIRED", expired.ok === false && expired.code === "TOKEN_EXPIRED");

const wrongIss = await verifySupabaseAccessToken(wrongIssToken, env);
record("production issuer on preview rejected", wrongIss.ok === false && (wrongIss.code === "ISSUER_MISMATCH" || wrongIss.code === "TOKEN_INVALID"));

const wrongAud = await verifySupabaseAccessToken(wrongAudToken, env);
record("wrong audience rejected", wrongAud.ok === false);

const disabled = await requireIdentity(requestWithBearer(disabledToken), env);
record("disabled identity 403 ACCOUNT_RESTRICTED", disabled.ok === false && disabled.response.status === 403 && (await disabled.response.clone().json()).code === "ACCOUNT_RESTRICTED");

const missingStatus = await requireIdentity(requestWithBearer(missingStatusToken), env);
record(
  "missing account_status 403 ACCOUNT_RESTRICTED",
  missingStatus.ok === false &&
    missingStatus.response.status === 403 &&
    (await missingStatus.response.clone().json()).code === "ACCOUNT_RESTRICTED",
);

const emptyStatus = await requireIdentity(requestWithBearer(emptyStatusToken), env);
record(
  "empty account_status 403 ACCOUNT_RESTRICTED",
  emptyStatus.ok === false &&
    emptyStatus.response.status === 403 &&
    (await emptyStatus.response.clone().json()).code === "ACCOUNT_RESTRICTED",
);

const unknownStatus = await requireIdentity(requestWithBearer(unknownStatusToken), env);
record(
  "unknown account_status 403 ACCOUNT_RESTRICTED",
  unknownStatus.ok === false &&
    unknownStatus.response.status === 403 &&
    (await unknownStatus.response.clone().json()).code === "ACCOUNT_RESTRICTED",
);

const roleGate = requireRole(member.identity, ["wind_seeker"], "req_test");
record("member missing wind_seeker 403", roleGate.ok === false && roleGate.response.status === 403);

const buyerRole = requireRole(buyer.identity, ["wind_seeker"], "req_test");
record("wind_seeker role + id passes", buyerRole.ok === true);

const rotatedEnv = await makeEnv([publicJwk, otherJwk]);
const rotated = await verifySupabaseAccessToken(memberToken, rotatedEnv);
record("JWKS rotation still verifies current kid", rotated.ok === true);

const unknownKidEnv = await makeEnv(otherJwk);
const unknownKid = await verifySupabaseAccessToken(memberToken, unknownKidEnv);
record("unknown kid rejected after rotation", unknownKid.ok === false);

const metadataSpoof = await verifySupabaseAccessToken(metadataSpoofToken, env);
record(
  "user_metadata is not used for roles",
  metadataSpoof.ok === true &&
    metadataSpoof.identity.roles.includes("member") &&
    !metadataSpoof.identity.roles.includes("admin"),
);

const sessionOk = await sessionGet({ request: requestWithBearer(memberToken), env });
const sessionBody = await sessionOk.json();
record(
  "GET /api/account/session 200 member DTO",
  sessionOk.status === 200 &&
    sessionBody.authenticated === true &&
    sessionBody.user_id === memberClaims.sub &&
    Array.isArray(sessionBody.roles) &&
    sessionBody.roles.includes("member") &&
    !("token" in sessionBody) &&
    !("email" in sessionBody) &&
    !("access_token" in sessionBody),
);

const sessionNone = await sessionGet({ request: requestWithBearer(""), env });
const sessionNoneBody = await sessionNone.json();
record(
  "GET /api/account/session no token 401",
  sessionNone.status === 401 && sessionNoneBody.code === "AUTH_REQUIRED",
);

const sessionBuyer = await sessionGet({ request: requestWithBearer(buyerToken), env });
const sessionBuyerBody = await sessionBuyer.json();
record(
  "GET /api/account/session wind_seeker DTO",
  sessionBuyer.status === 200 &&
    sessionBuyerBody.roles.includes("member") &&
    sessionBuyerBody.roles.includes("wind_seeker") &&
    sessionBuyerBody.windseeker_id === "WS-PREVIEW-2",
);

const failed = results.filter((item) => !item.pass);
console.log(JSON.stringify({ batch: "P0-00B", total: results.length, passed: results.length - failed.length, failed: failed.map((item) => item.name) }, null, 2));
if (failed.length > 0) process.exit(1);
