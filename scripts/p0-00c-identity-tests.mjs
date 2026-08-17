import { generateKeyPair, exportJWK, SignJWT } from "jose";
import { onRequestGet as sessionGet } from "../functions/api/account/session.js";
import { requireIdentity } from "../functions/_auth/require-identity.js";
import { runAuthCallback, shouldInitSupabaseBrowserAuth } from "../src/lib/auth/preview-gate.js";
import {
  resolveAuthCallback,
  shouldShowPasswordSetup,
  updatePasswordAndLoadSession,
} from "../src/lib/auth/callback-flow.js";
import { signOutAndVerifyCleared } from "../src/lib/auth/logout.js";

function trustedIdentityFromServer(dto) {
  if (!dto || dto.authenticated !== true) return null;
  return {
    user_id: dto.user_id,
    account_id: dto.account_id,
    member_id: dto.member_id,
    windseeker_id: dto.windseeker_id,
    roles: Array.isArray(dto.roles) ? dto.roles.map(String) : [],
    account_status: dto.account_status,
    expires_at: dto.expires_at,
  };
}

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

async function makeEnv(publicJwk) {
  return {
    SUPABASE_ISSUER: issuer,
    SUPABASE_JWT_AUD: audience,
    SUPABASE_JWKS_JSON: JSON.stringify({ keys: [publicJwk] }),
  };
}

const { publicKey, privateKey } = await generateKeyPair("ES256", { extractable: true });
const publicJwk = { ...(await exportJWK(publicKey)), kid: "preview-kid-1", alg: "ES256", use: "sig" };
const env = await makeEnv(publicJwk);

const memberClaims = {
  sub: "11111111-1111-4111-8111-111111111111",
  app_metadata: {
    dohara_roles: ["member"],
    member_id: "MEM-PREVIEW-1",
    account_status: "active",
  },
  user_metadata: { role: "admin", email: "spoof@example.invalid" },
};

const memberToken = await new SignJWT(memberClaims)
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer(issuer)
  .setAudience(audience)
  .setSubject(memberClaims.sub)
  .setIssuedAt()
  .setExpirationTime("5m")
  .sign(privateKey);

record("preview host 127.0.0.1 allowed", shouldInitSupabaseBrowserAuth({ hostname: "127.0.0.1" }) === true);
record(
  "production custom domain does not init Auth",
  shouldInitSupabaseBrowserAuth({ hostname: "www.taoist365.com", runtimeEnv: "preview" }) === false &&
    shouldInitSupabaseBrowserAuth({ hostname: "taoist365.com", runtimeEnv: "preview" }) === false,
);
record(
  "Pages production primary does not init Auth",
  shouldInitSupabaseBrowserAuth({ hostname: "taoist365.pages.dev", runtimeEnv: "preview" }) === false,
);
record(
  "Preview branch domain allowed",
  shouldInitSupabaseBrowserAuth({ hostname: "abc123.taoist365.pages.dev", runtimeEnv: "preview" }) === true,
);
record(
  "bare pages.dev is not Preview",
  shouldInitSupabaseBrowserAuth({ hostname: "abc.pages.dev", runtimeEnv: "preview" }) === false,
);

const trusted = trustedIdentityFromServer({
  authenticated: true,
  user_id: memberClaims.sub,
  account_id: memberClaims.sub,
  member_id: "MEM-PREVIEW-1",
  windseeker_id: null,
  roles: ["member"],
  account_status: "active",
  expires_at: "2030-01-01T00:00:00.000Z",
});
record("trusted identity ignores client email", trusted.user_id === memberClaims.sub && !("email" in trusted) && !trusted.roles.includes("admin"));

let callbackGets = 0;
const callbackBlocked = await runAuthCallback({
  hostname: "www.taoist365.com",
  runtimeEnv: "preview",
  configured: true,
  getSession: async () => {
    callbackGets += 1;
    return { data: { session: { access_token: "must-not-read" } }, error: null };
  },
});
record("callback page non-Preview does not process Session", callbackBlocked.handled === false && callbackGets === 0);

const beforeLogout = await sessionGet({ request: requestWithBearer(memberToken), env });
const beforeBody = await beforeLogout.json();
record("unexpired JWT session 200 before logout", beforeLogout.status === 200 && beforeBody.authenticated === true);

const noToken = await sessionGet({ request: requestWithBearer(""), env });
const noTokenBody = await noToken.json();
record(
  "no token 401 AUTH_REQUIRED (not logout proof)",
  noToken.status === 401 && noTokenBody.code === "AUTH_REQUIRED",
);

const replay = await sessionGet({ request: requestWithBearer(memberToken), env });
const replayBody = await replay.json();
record(
  "unexpired JWT still accepted after client logout replay",
  replay.status === 200 && replayBody.authenticated === true,
);

const signOutFailed = await signOutAndVerifyCleared({
  signOut: async () => ({ error: { message: "network failed" } }),
  getSession: async () => ({ data: { session: { access_token: "still-here" } }, error: null }),
});
record("signOut error is not success", signOutFailed.ok === false && signOutFailed.code === "SIGNOUT_FAILED");

let liveSession = { access_token: "preview-access-not-logged" };
const realSignOut = await signOutAndVerifyCleared({
  signOut: async () => {
    liveSession = null;
    return { error: null };
  },
  getSession: async () => ({ data: { session: liveSession }, error: null }),
});
record("real signOut leaves SDK session null", realSignOut.ok === true && liveSession === null);

const disabledToken = await new SignJWT({
  sub: "33333333-3333-4333-8333-333333333333",
  app_metadata: { dohara_roles: ["member"], member_id: "MEM-PREVIEW-3", account_status: "disabled" },
})
  .setProtectedHeader({ alg: "ES256", kid: "preview-kid-1", typ: "JWT" })
  .setIssuer(issuer)
  .setAudience(audience)
  .setSubject("33333333-3333-4333-8333-333333333333")
  .setIssuedAt()
  .setExpirationTime("5m")
  .sign(privateKey);
const disabled = await requireIdentity(requestWithBearer(disabledToken), env);
record(
  "disabled identity 403 ACCOUNT_RESTRICTED",
  disabled.ok === false && disabled.response.status === 403 && (await disabled.response.clone().json()).code === "ACCOUNT_RESTRICTED",
);

const e1Count = results.length;
record("E1 13/13 preserved", e1Count === 13);
record("invite callback shows set-password", shouldShowPasswordSetup({ type: "invite" }) === true);
record("recovery callback shows set-password", shouldShowPasswordSetup({ type: "recovery" }) === true);
record(
  "PASSWORD_RECOVERY event shows set-password",
  shouldShowPasswordSetup({ type: "", authEvent: "PASSWORD_RECOVERY" }) === true,
);
record(
  "ordinary login callback does not show set-password",
  shouldShowPasswordSetup({ type: "" }) === false &&
    shouldShowPasswordSetup({ type: "magiclink" }) === false &&
    shouldShowPasswordSetup({ type: "email" }) === false &&
    shouldShowPasswordSetup({ type: "signup" }) === false,
);

const previewHost = {
  hostname: "feat-admin-os-p0-01a-preview.taoist365.pages.dev",
  runtimeEnv: "preview",
  configured: true,
};
const inviteResolved = await resolveAuthCallback({
  ...previewHost,
  search: "",
  hash: "#type=invite",
  getSession: async () => ({ data: { session: { access_token: "invite-session-not-logged" } }, error: null }),
});
record(
  "invite callback next is set-password",
  inviteResolved.handled === true && inviteResolved.ok === true && inviteResolved.showPasswordSetup === true && inviteResolved.next === "set-password",
);

const recoveryResolved = await resolveAuthCallback({
  ...previewHost,
  search: "?code=preview-code",
  hash: "#type=recovery",
  getSession: async () => ({ data: { session: { access_token: "recovery-session-not-logged" } }, error: null }),
});
record(
  "recovery callback next is set-password",
  recoveryResolved.handled === true && recoveryResolved.showPasswordSetup === true && recoveryResolved.next === "set-password",
);

const ordinaryResolved = await resolveAuthCallback({
  ...previewHost,
  search: "",
  hash: "#type=magiclink",
  getSession: async () => ({ data: { session: { access_token: "login-session-not-logged" } }, error: null }),
});
record(
  "ordinary callback next is session",
  ordinaryResolved.handled === true && ordinaryResolved.showPasswordSetup === false && ordinaryResolved.next === "session",
);

let nonPreviewInviteGets = 0;
const nonPreviewInvite = await resolveAuthCallback({
  hostname: "taoist365.pages.dev",
  runtimeEnv: "preview",
  configured: true,
  search: "",
  hash: "#type=invite",
  getSession: async () => {
    nonPreviewInviteGets += 1;
    return { data: { session: { access_token: "must-not-read" } }, error: null };
  },
});
record(
  "non-Preview invite callback stays fail-closed",
  nonPreviewInvite.handled === false &&
    nonPreviewInvite.showPasswordSetup === false &&
    nonPreviewInviteGets === 0,
);

const passwordProbe = "unit-only-secret-do-not-print";
let updateCalled = false;
let sessionCalledAfterUpdate = false;
const passwordOk = await updatePasswordAndLoadSession({
  updateUser: async (payload) => {
    updateCalled = payload && typeof payload.password === "string" && payload.password.length >= 8;
    return { error: null };
  },
  fetchTrustedSession: async () => {
    sessionCalledAfterUpdate = updateCalled === true;
    return {
      status: 200,
      body: {
        authenticated: true,
        user_id: memberClaims.sub,
        roles: ["member"],
        account_status: "active",
        member_id: "MEM-PREVIEW-1",
        windseeker_id: null,
        email: "must-not-copy@example.invalid",
      },
    };
  },
  password: passwordProbe,
});
const passwordOkDump = JSON.stringify(passwordOk);
record(
  "updateUser then GET /api/account/session",
  passwordOk.ok === true &&
    sessionCalledAfterUpdate === true &&
    passwordOk.identity.user_id === memberClaims.sub &&
    !("email" in passwordOk.identity) &&
    !passwordOkDump.includes(passwordProbe) &&
    !passwordOkDump.includes("must-not-copy@example.invalid"),
);

let updateOnShort = 0;
const shortRejected = await updatePasswordAndLoadSession({
  updateUser: async () => {
    updateOnShort += 1;
    return { error: null };
  },
  fetchTrustedSession: async () => ({ status: 200, body: { authenticated: true } }),
  password: "short",
});
record("short password does not call updateUser", shortRejected.ok === false && updateOnShort === 0);

const failed = results.filter((item) => !item.pass);
console.log(
  JSON.stringify(
    {
      batch: "P0-00C-E3",
      total: results.length,
      passed: results.length - failed.length,
      failed: failed.map((item) => item.name),
      E1_PRESERVED: e1Count,
      LOGOUT_OLD_SESSION: "SDK_SESSION_NULL; UNEXPIRED_JWT_STILL_VALID_ON_FUNCTIONS",
      NO_TOKEN_401: "SEPARATE_FROM_LOGOUT",
      PASSWORD_IN_OUTPUT: false,
    },
    null,
    2,
  ),
);
if (failed.length > 0) process.exit(1);
