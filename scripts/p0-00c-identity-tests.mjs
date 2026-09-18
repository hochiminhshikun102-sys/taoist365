import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateKeyPair, exportJWK, SignJWT } from "jose";
import { onRequestGet as sessionGet } from "../functions/api/account/session.js";
import { requireIdentity } from "../functions/_auth/require-identity.js";
import { runAuthCallback, shouldInitSupabaseBrowserAuth } from "../src/lib/auth/preview-gate.js";
import {
  classifyCallbackCredential,
  CALLBACK_LINK_INVALID,
  callbackPageView,
  clearPasswordSetupPending,
  decideAuthModalSurface,
  decideCallbackNext,
  markPasswordSetupPending,
  previewAuthCallbackUrl,
  readPasswordSetupPending,
  resolveAuthCallback,
  runPreviewCallbackPage,
  shouldShowPasswordSetup,
  stripOneTimeAuthHref,
  updatePasswordAndLoadSession,
} from "../src/lib/auth/callback-flow.js";
import { signOutAndVerifyCleared } from "../src/lib/auth/logout.js";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

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
const previewOrigin = "https://feat-admin-os-p0-01a-preview.taoist365.pages.dev";
const inviteListeners = [];
const inviteResolved = await resolveAuthCallback({
  ...previewHost,
  href: `${previewOrigin}/auth/callback#access_token=invite-access-not-logged&refresh_token=invite-refresh-not-logged&expires_in=3600&token_type=bearer&type=invite`,
  search: "",
  hash: "#access_token=invite-access-not-logged&refresh_token=invite-refresh-not-logged&expires_in=3600&token_type=bearer&type=invite",
  setSession: async () => {
    for (const cb of inviteListeners) cb("SIGNED_IN");
    return { data: { session: { access_token: "invite-session-not-logged" } }, error: null };
  },
  subscribeAuthEvents: (cb) => {
    inviteListeners.push(cb);
    return () => {};
  },
});
record(
  "invite callback next is set-password",
  inviteResolved.handled === true && inviteResolved.ok === true && inviteResolved.showPasswordSetup === true && inviteResolved.next === "set-password",
);

const recoveryE3Listeners = [];
const recoveryResolved = await resolveAuthCallback({
  ...previewHost,
  href: `${previewOrigin}/auth/callback?code=preview-code`,
  search: "?code=preview-code",
  hash: "",
  exchangeCode: async () => {
    for (const cb of recoveryE3Listeners) cb("PASSWORD_RECOVERY");
    return { data: { session: { access_token: "recovery-session-not-logged" }, redirectType: "recovery" }, error: null };
  },
  subscribeAuthEvents: (cb) => {
    recoveryE3Listeners.push(cb);
    return () => {};
  },
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

record(
  "reset redirectTo is Preview /auth/callback",
  previewAuthCallbackUrl("https://feat-admin-os-p0-01a-preview.taoist365.pages.dev") ===
    "https://feat-admin-os-p0-01a-preview.taoist365.pages.dev/auth/callback",
);

const pkceWithoutType = await resolveAuthCallback({
  ...previewHost,
  search: "?code=pkce-not-logged",
  hash: "",
  getSession: async () => ({ data: { session: { access_token: "recovery-session-not-logged" } }, error: null }),
});
record(
  "pkce without classified event is not ordinary login",
  pkceWithoutType.type === "" &&
    pkceWithoutType.next === "error" &&
    pkceWithoutType.showPasswordSetup === false &&
    pkceWithoutType.error === CALLBACK_LINK_INVALID,
);

function memoryStorage() {
  const store = new Map();
  return {
    setItem: (key, value) => store.set(key, value),
    getItem: (key) => store.get(key) ?? null,
    removeItem: (key) => store.delete(key),
  };
}

function createCallbackLocation(initialHref) {
  let href = initialHref;
  return {
    get href() {
      return href;
    },
    get search() {
      return new URL(href).search;
    },
    get hash() {
      return new URL(href).hash;
    },
    replace(path) {
      href = new URL(path, href).href;
    },
  };
}

async function runCallbackPage(input = {}) {
  const storage = input.storage || memoryStorage();
  const location =
    input.location ||
    createCallbackLocation(`${previewOrigin}/auth/callback${input.search || ""}${input.hash || ""}`);
  const listeners = [];
  let unsubscribed = false;
  let exchangeCalls = 0;
  let setSessionCalls = 0;
  const result = await runPreviewCallbackPage({
    ...previewHost,
    search: location.search,
    hash: location.hash,
    href: location.href,
    getSession: input.getSession,
    exchangeCode: input.exchangeCode
      ? async (code) => {
          exchangeCalls += 1;
          return input.exchangeCode(code);
        }
      : input.exchangeCode,
    setSession: input.setSession
      ? async (tokens) => {
          setSessionCalls += 1;
          return input.setSession(tokens);
        }
      : input.setSession,
    verifyOtp: input.verifyOtp,
    replaceLocation: (path) => location.replace(path),
    subscribeAuthEvents: (cb) => {
      listeners.push(cb);
      if (typeof input.subscribeAuthEvents === "function") input.subscribeAuthEvents(cb);
      return () => {
        unsubscribed = true;
      };
    },
    readPending: () => readPasswordSetupPending(storage),
    markPending: (flow) => markPasswordSetupPending(flow, storage),
    clearPending: () => clearPasswordSetupPending(storage),
  });
  return { result, view: callbackPageView(result), storage, listeners, unsubscribed, location, exchangeCalls, setSessionCalls };
}

const recoveryListeners = [];
const pkceRecoverySettled = await runCallbackPage({
  search: "?code=pkce-not-logged",
  subscribeAuthEvents: (cb) => recoveryListeners.push(cb),
  exchangeCode: async () => {
    for (const cb of recoveryListeners) cb("PASSWORD_RECOVERY");
    return { data: { session: { access_token: "recovery-session-not-logged" }, redirectType: "recovery" }, error: null };
  },
});
record(
  "pkce recovery completes inside exchangeCodeForSession",
  pkceRecoverySettled.view.view === "set-password" &&
    pkceRecoverySettled.view.flow === "recovery" &&
    pkceRecoverySettled.result.next === "set-password" &&
    pkceRecoverySettled.result.authEvent === "PASSWORD_RECOVERY" &&
    pkceRecoverySettled.result.type === "recovery" &&
    pkceRecoverySettled.unsubscribed === true &&
    readPasswordSetupPending(pkceRecoverySettled.storage) === "recovery",
);

const magicListeners = [];
const ordinaryPkce = await runCallbackPage({
  search: "?code=pkce-not-logged",
  subscribeAuthEvents: (cb) => magicListeners.push(cb),
  exchangeCode: async () => {
    for (const cb of magicListeners) cb("SIGNED_IN");
    return { data: { session: { access_token: "login-session-not-logged" } }, error: null };
  },
});
record(
  "ordinary pkce callback stays session",
  ordinaryPkce.view.view === "redirect-session" &&
    ordinaryPkce.result.next === "session" &&
    ordinaryPkce.result.showPasswordSetup === false &&
    ordinaryPkce.result.authEvent === "SIGNED_IN",
);

const expiredLink = await runCallbackPage({
  search: "?error=access_denied&error_code=otp_expired",
  getSession: async () => ({ data: { session: { access_token: "must-not-use" } }, error: null }),
});
record(
  "expired recovery link is error not session",
  expiredLink.view.view === "error" &&
    expiredLink.view.note === CALLBACK_LINK_INVALID &&
    expiredLink.result.next === "error" &&
    expiredLink.result.showPasswordSetup === false,
);

const invalidCode = await runCallbackPage({
  search: "?code=pkce-not-logged",
  exchangeCode: async () => ({ data: { session: null }, error: { message: "invalid grant" } }),
});
record(
  "invalid or expired pkce code is error not set-password",
  invalidCode.view.view === "error" &&
    invalidCode.result.next === "error" &&
    invalidCode.result.showPasswordSetup === false &&
    invalidCode.result.hasSession !== true,
);

const lateListeners = [];
const lateRecovery = await runCallbackPage({
  search: "?code=pkce-not-logged",
  subscribeAuthEvents: (cb) => lateListeners.push(cb),
  exchangeCode: async () => ({ data: { session: { access_token: "session-without-event" } }, error: null }),
});
record(
  "exchange without recovery event stays on error page",
  lateRecovery.view.view === "error" &&
    lateRecovery.result.next === "error" &&
    lateRecovery.result.showPasswordSetup === false &&
    lateRecovery.unsubscribed === true,
);
await new Promise((resolve) => {
  setTimeout(() => {
    for (const cb of lateListeners) cb("PASSWORD_RECOVERY");
    resolve();
  }, 25);
});
record(
  "late PASSWORD_RECOVERY after unsubscribe cannot become session",
  lateRecovery.result.next === "error" && lateRecovery.view.view === "error",
);

const recoveryWithoutSessionListeners = [];
const recoveryNoSession = await runCallbackPage({
  search: "?code=pkce-not-logged",
  subscribeAuthEvents: (cb) => recoveryWithoutSessionListeners.push(cb),
  exchangeCode: async () => {
    for (const cb of recoveryWithoutSessionListeners) cb("PASSWORD_RECOVERY");
    return { data: { session: null }, error: null };
  },
});
record(
  "PASSWORD_RECOVERY without session cannot open set-password",
  recoveryNoSession.view.view === "error" &&
    recoveryNoSession.result.next === "error" &&
    recoveryNoSession.result.showPasswordSetup === false,
);

const inviteNoSession = await resolveAuthCallback({
  ...previewHost,
  search: "",
  hash: "#type=invite",
  getSession: async () => ({ data: { session: null }, error: null }),
});
record(
  "invite without session is error not set-password",
  inviteNoSession.next === "error" && inviteNoSession.showPasswordSetup === false,
);

const inviteTypeOnlyOldSession = await runCallbackPage({
  hash: "#type=invite",
  getSession: async () => ({ data: { session: { access_token: "old-session-not-logged" } }, error: null }),
});
record(
  "invite type without url credential cannot use old session",
  inviteTypeOnlyOldSession.view.view === "error" &&
    classifyCallbackCredential({ hash: "#type=invite" }).kind === "type-only",
);

const pendingStore = new Map();
const pendingStorage = {
  setItem: (key, value) => pendingStore.set(key, value),
  getItem: (key) => pendingStore.get(key) ?? null,
  removeItem: (key) => pendingStore.delete(key),
};
markPasswordSetupPending("recovery", pendingStorage);
record(
  "pending recovery flag with restored session keeps set-password",
  decideCallbackNext({
    hasSession: true,
    pendingSetup: readPasswordSetupPending(pendingStorage),
    sessionSource: "pending-restore",
  }).next === "set-password",
);
record(
  "pending flag without session cannot replace session",
  decideCallbackNext({
    hasSession: false,
    pendingSetup: readPasswordSetupPending(pendingStorage),
  }).next === "error",
);

let persistedRecovery = null;
const refreshLocation = createCallbackLocation(`${previewOrigin}/auth/callback?code=pkce-not-logged`);
const refreshStorage = memoryStorage();
const firstVisitListeners = [];
const firstVisit = await runCallbackPage({
  location: refreshLocation,
  storage: refreshStorage,
  subscribeAuthEvents: (cb) => firstVisitListeners.push(cb),
  exchangeCode: async () => {
    for (const cb of firstVisitListeners) cb("PASSWORD_RECOVERY");
    persistedRecovery = { access_token: "recovery-session-not-logged" };
    return { data: { session: persistedRecovery, redirectType: "recovery" }, error: null };
  },
});
const hrefAfterFirst = refreshLocation.href;
record(
  "successful exchange strips one-time code from the real location",
  firstVisit.view.view === "set-password" &&
    firstVisit.exchangeCalls === 1 &&
    !new URL(hrefAfterFirst).searchParams.has("code") &&
    new URL(hrefAfterFirst).pathname === "/auth/callback" &&
    stripOneTimeAuthHref(`${previewOrigin}/auth/callback?code=pkce-not-logged`) === "/auth/callback" &&
    hrefAfterFirst.endsWith(firstVisit.result.locationAfter),
);

const refreshVisit = await runCallbackPage({
  location: refreshLocation,
  storage: refreshStorage,
  getSession: async () => ({ data: { session: persistedRecovery }, error: null }),
  exchangeCode: async () => {
    throw new Error("refresh must not re-consume code");
  },
});
record(
  "real page refresh uses stripped href and keeps set-password",
  refreshVisit.view.view === "set-password" &&
    refreshVisit.exchangeCalls === 0 &&
    refreshLocation.href === hrefAfterFirst &&
    readPasswordSetupPending(refreshStorage) === "recovery" &&
    refreshVisit.result.sessionSource === "pending-restore",
);

const returnLoginStorage = memoryStorage();
markPasswordSetupPending("recovery", returnLoginStorage);
const returnToLoginNoSession = await runCallbackPage({
  storage: returnLoginStorage,
  search: "",
  hash: "",
  getSession: async () => ({ data: { session: null }, error: null }),
});
record(
  "return to login without session clears pending and errors",
  returnToLoginNoSession.view.view === "error" &&
    decideAuthModalSurface({ pendingSetup: "recovery", hasSession: false }) === "clear-pending-signin" &&
    readPasswordSetupPending(returnLoginStorage) === "",
);
record(
  "return to login with pending session shows set-password not restored identity",
  decideAuthModalSurface({ pendingSetup: "recovery", hasSession: true }) === "set-password" &&
    decideAuthModalSurface({ pendingSetup: "", hasSession: true }) === "identity" &&
    decideAuthModalSurface({ pendingSetup: "", hasSession: false }) === "signin",
);

const implicitInviteListeners = [];
const implicitInvite = await runCallbackPage({
  hash: "#access_token=invite-access-not-logged&refresh_token=invite-refresh-not-logged&expires_in=3600&token_type=bearer&type=invite",
  subscribeAuthEvents: (cb) => implicitInviteListeners.push(cb),
  setSession: async (tokens) => {
    if (!tokens.access_token || !tokens.refresh_token) {
      return { data: { session: null }, error: { message: "missing tokens" } };
    }
    for (const cb of implicitInviteListeners) cb("SIGNED_IN");
    return { data: { session: { access_token: "invite-session-not-logged" } }, error: null };
  },
  getSession: async () => ({ data: { session: { access_token: "must-not-use-old-session" } }, error: null }),
});
record(
  "implicit invite tokens establish session via setSession",
  implicitInvite.view.view === "set-password" &&
    implicitInvite.view.flow === "invite" &&
    implicitInvite.setSessionCalls === 1 &&
    implicitInvite.result.sessionSource === "url-set-session" &&
    !new URL(implicitInvite.location.href).hash.includes("access_token") &&
    readPasswordSetupPending(implicitInvite.storage) === "invite",
);

const dashboardRecoveryListeners = [];
const dashboardRecovery = await runCallbackPage({
  hash: "#access_token=recovery-access-not-logged&refresh_token=recovery-refresh-not-logged&expires_in=3600&token_type=bearer&type=recovery",
  subscribeAuthEvents: (cb) => dashboardRecoveryListeners.push(cb),
  setSession: async () => {
    for (const cb of dashboardRecoveryListeners) cb("SIGNED_IN");
    return { data: { session: { access_token: "recovery-session-not-logged" } }, error: null };
  },
});
record(
  "dashboard recovery implicit tokens stay on set-password",
  dashboardRecovery.view.view === "set-password" &&
    dashboardRecovery.view.flow === "recovery" &&
    dashboardRecovery.result.sessionSource === "url-set-session",
);

const otpInviteListeners = [];
const otpInvite = await runCallbackPage({
  search: "?token_hash=invite-hash-not-logged&type=invite",
  subscribeAuthEvents: (cb) => otpInviteListeners.push(cb),
  verifyOtp: async (params) => {
    if (params.type !== "invite" || !params.token_hash) {
      return { data: { session: null }, error: { message: "invalid otp" } };
    }
    for (const cb of otpInviteListeners) cb("SIGNED_IN");
    return { data: { session: { access_token: "invite-session-not-logged" } }, error: null };
  },
});
record(
  "invite token_hash verifies a new session",
  otpInvite.view.view === "set-password" && otpInvite.result.sessionSource === "url-verify-otp",
);

const thrownExchange = await runCallbackPage({
  search: "?code=pkce-not-logged",
  exchangeCode: async () => {
    throw new Error("exchange exploded");
  },
});
record(
  "thrown exchangeCode is error and unsubscribes",
  thrownExchange.view.view === "error" &&
    thrownExchange.unsubscribed === true &&
    thrownExchange.result.sessionSource === "exception",
);

const thrownSetSession = await runCallbackPage({
  hash: "#access_token=invite-access-not-logged&refresh_token=invite-refresh-not-logged&type=invite",
  setSession: async () => {
    throw new Error("setSession exploded");
  },
});
record(
  "thrown setSession is error and unsubscribes",
  thrownSetSession.view.view === "error" && thrownSetSession.unsubscribed === true,
);

await updatePasswordAndLoadSession({
  updateUser: async () => ({ error: null }),
  fetchTrustedSession: async () => ({
    status: 200,
    body: {
      authenticated: true,
      user_id: memberClaims.sub,
      roles: ["member"],
      account_status: "active",
      member_id: "MEM-PREVIEW-1",
      windseeker_id: null,
    },
  }),
  password: passwordProbe,
  storage: pendingStorage,
});
record("password update clears pending recovery flag", readPasswordSetupPending(pendingStorage) === "");

const callbackPageSrc = readFileSync(join(repoRoot, "src/app/auth/callback/page.tsx"), "utf8");
record(
  "callback page wires pending, exchange, setSession, replaceState, and try/finally",
  callbackPageSrc.includes("runPreviewCallbackPage") &&
    callbackPageSrc.includes("callbackPageView") &&
    callbackPageSrc.includes("readPasswordSetupPending") &&
    callbackPageSrc.includes("markPasswordSetupPending") &&
    callbackPageSrc.includes("clearPasswordSetupPending") &&
    callbackPageSrc.includes("exchangeCodeForSession") &&
    callbackPageSrc.includes("setSession") &&
    callbackPageSrc.includes("verifyOtp") &&
    callbackPageSrc.includes("history.replaceState") &&
    callbackPageSrc.includes("try {") &&
    callbackPageSrc.includes("finally {") &&
    !callbackPageSrc.includes("setTimeout(0)"),
);

const authModalSrc = readFileSync(join(repoRoot, "src/components/auth/AuthModal.tsx"), "utf8");
record(
  "AuthModal session-gates pending refresh and return-to-login",
  authModalSrc.includes("decideAuthModalSurface") &&
    authModalSrc.includes("clearPasswordSetupPending") &&
    authModalSrc.includes("getSession") &&
    authModalSrc.includes("This invite or recovery link is invalid or expired."),
);

const clientSrc = readFileSync(join(repoRoot, "src/lib/supabase/client.ts"), "utf8");
record(
  "browser client disables detectSessionInUrl",
  clientSrc.includes("detectSessionInUrl: false") &&
    clientSrc.includes('flowType: "pkce"') &&
    clientSrc.includes("shouldInitSupabaseBrowserAuth"),
);

const previewGateSrc = readFileSync(join(repoRoot, "src/lib/auth/preview-gate.js"), "utf8");
record(
  "preview-gate still fail-closes production hosts",
  previewGateSrc.includes('PAGES_PRODUCTION_HOST = "taoist365.pages.dev"') &&
    previewGateSrc.includes("www.taoist365.com") &&
    previewGateSrc.includes("shouldInitSupabaseBrowserAuth"),
);

const authJsSrc = readFileSync(join(repoRoot, "node_modules/@supabase/auth-js/dist/module/GoTrueClient.js"), "utf8");
record(
  "locked auth-js notifies PASSWORD_RECOVERY inside exchange await",
  authJsSrc.includes(
    "await this._notifyAllSubscribers(redirectType === 'recovery' ? 'PASSWORD_RECOVERY' : 'SIGNED_IN', data.session)",
  ),
);
record(
  "locked auth-js implicit URL detect still uses setTimeout(0)",
  authJsSrc.includes("setTimeout(async () => {") && authJsSrc.includes("PASSWORD_RECOVERY"),
);
record(
  "locked auth-js setSession validates access_token via _getUser",
  authJsSrc.includes("async setSession(currentSession)") &&
    authJsSrc.includes("const { data, error } = await this._getUser(currentSession.access_token)") &&
    authJsSrc.includes("await this._notifyAllSubscribers('SIGNED_IN', session)"),
);
record(
  "locked auth-js implicit getSessionFromURL clears location.hash",
  authJsSrc.includes("window.location.hash = ''") &&
    authJsSrc.includes("this._debug('#_getSessionFromURL()', 'clearing window.location.hash')"),
);

const failed = results.filter((item) => !item.pass);
console.log(
  JSON.stringify(
    {
      batch: "P0-00C-E4-R2",
      total: results.length,
      passed: results.length - failed.length,
      failed: failed.map((item) => item.name),
      E1_PRESERVED: e1Count,
      LOGOUT_OLD_SESSION: "SDK_SESSION_NULL; UNEXPIRED_JWT_STILL_VALID_ON_FUNCTIONS",
      NO_TOKEN_401: "SEPARATE_FROM_LOGOUT",
      PASSWORD_IN_OUTPUT: false,
      HASH_TYPE_RECOVERY: "UI_ONLY",
      PKCE_RECOVERY_WITHOUT_TYPE: "EXCHANGE_AWAIT_PASSWORD_RECOVERY",
      DETECT_SESSION_IN_URL: false,
      CALLBACK_STRIP_ONE_TIME_PARAMS: true,
      REAL_RECOVERY_EMAIL: "NOT_RUN_THIS_CHANNEL",
      LOCKED_SUPABASE_JS: "2.112.3",
      LOCKED_AUTH_JS: "2.112.3",
    },
    null,
    2,
  ),
);
if (failed.length > 0) process.exit(1);
