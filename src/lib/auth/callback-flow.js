import { runAuthCallback, shouldInitSupabaseBrowserAuth } from "./preview-gate.js";

const PASSWORD_SETUP_TYPES = new Set(["invite", "recovery"]);
export const PASSWORD_SETUP_STORAGE_KEY = "dohara.p0-00c.password-setup";
export const CALLBACK_LINK_INVALID = "This invite or recovery link is invalid or expired.";

function paramsFrom(search = "", hash = "") {
  const query = new URLSearchParams(String(search).startsWith("?") ? String(search).slice(1) : String(search));
  const fragment = new URLSearchParams(String(hash).startsWith("#") ? String(hash).slice(1) : String(hash));
  return { query, fragment };
}

function defaultSessionStorage() {
  try {
    if (typeof sessionStorage === "undefined") return null;
    return sessionStorage;
  } catch {
    return null;
  }
}

/**
 * @param {string} [origin]
 */
export function previewAuthCallbackUrl(origin) {
  return `${String(origin || "").replace(/\/$/, "")}/auth/callback`;
}

/**
 * @param {{ search?: string, hash?: string }} [input]
 */
export function readCallbackType(input = {}) {
  const { query, fragment } = paramsFrom(input.search || "", input.hash || "");
  return String(fragment.get("type") || query.get("type") || "")
    .trim()
    .toLowerCase();
}

/**
 * @param {{ search?: string, hash?: string }} [input]
 */
export function readCallbackError(input = {}) {
  const { query, fragment } = paramsFrom(input.search || "", input.hash || "");
  const error = String(fragment.get("error") || query.get("error") || "").trim();
  const errorCode = String(fragment.get("error_code") || query.get("error_code") || "").trim();
  if (error || errorCode) return "invalid_or_expired";
  return "";
}

/**
 * Presence only for flow control. Callers that must exchange the code should
 * read it from the URL themselves and never log it.
 * @param {{ search?: string, hash?: string }} [input]
 */
export function hasPkceCode(input = {}) {
  const { query, fragment } = paramsFrom(input.search || "", input.hash || "");
  return Boolean(String(fragment.get("code") || query.get("code") || "").trim());
}

/**
 * @param {{ search?: string, hash?: string }} [input]
 */
export function readPkceCode(input = {}) {
  const { query, fragment } = paramsFrom(input.search || "", input.hash || "");
  return String(fragment.get("code") || query.get("code") || "").trim();
}

export const ONE_TIME_AUTH_QUERY_KEYS = Object.freeze([
  "code",
  "error",
  "error_code",
  "error_description",
  "token",
  "token_hash",
  "type",
]);

export const ONE_TIME_AUTH_HASH_KEYS = Object.freeze([
  "access_token",
  "refresh_token",
  "expires_in",
  "expires_at",
  "token_type",
  "type",
  "error",
  "error_code",
  "error_description",
  "provider_token",
  "provider_refresh_token",
]);

const OTP_TYPES = new Set(["invite", "recovery", "magiclink", "email", "signup"]);

function readParam(search, hash, key) {
  const { query, fragment } = paramsFrom(search, hash);
  return String(fragment.get(key) || query.get(key) || "").trim();
}

/**
 * Presence only. Callers that must consume tokens read them from the URL
 * themselves and never log them.
 * @param {{ search?: string, hash?: string }} [input]
 */
export function hasImplicitSessionParams(input = {}) {
  return Boolean(readParam(input.search || "", input.hash || "", "access_token") && readParam(input.search || "", input.hash || "", "refresh_token"));
}

/**
 * Presence only.
 * @param {{ search?: string, hash?: string }} [input]
 */
export function hasOtpToken(input = {}) {
  const search = input.search || "";
  const hash = input.hash || "";
  const tokenHash = readParam(search, hash, "token_hash") || readParam(search, hash, "token");
  const otpType = readCallbackType({ search, hash });
  return Boolean(tokenHash && OTP_TYPES.has(otpType));
}

/**
 * Classify the one-time credential on this visit. Does not return secrets.
 * @param {{ search?: string, hash?: string }} [input]
 */
export function classifyCallbackCredential(input = {}) {
  const search = input.search || "";
  const hash = input.hash || "";
  if (readCallbackError({ search, hash })) return { kind: "url-error" };
  if (hasPkceCode({ search, hash })) return { kind: "pkce" };
  if (hasImplicitSessionParams({ search, hash })) return { kind: "implicit" };
  if (hasOtpToken({ search, hash })) return { kind: "otp" };
  const type = readCallbackType({ search, hash });
  if (type === "invite" || type === "recovery") return { kind: "type-only" };
  return { kind: "none" };
}

/**
 * Strip one-time auth query/hash params so a real refresh cannot re-consume them.
 * @param {string} [href]
 */
export function stripOneTimeAuthHref(href) {
  const fallback = "https://callback.invalid/auth/callback";
  let url;
  try {
    url = new URL(String(href || fallback));
  } catch {
    url = new URL(fallback);
  }
  for (const key of ONE_TIME_AUTH_QUERY_KEYS) url.searchParams.delete(key);
  const hashSource = url.hash.startsWith("#") ? url.hash.slice(1) : url.hash;
  const fragment = new URLSearchParams(hashSource);
  for (const key of ONE_TIME_AUTH_HASH_KEYS) fragment.delete(key);
  const remaining = fragment.toString();
  url.hash = remaining;
  return `${url.pathname}${url.search}${url.hash}`;
}

/**
 * @param {{ type?: string, authEvent?: string }} [input]
 */
export function shouldShowPasswordSetup(input = {}) {
  const type = String(input.type || "")
    .trim()
    .toLowerCase();
  if (PASSWORD_SETUP_TYPES.has(type)) return true;
  return String(input.authEvent || "") === "PASSWORD_RECOVERY";
}

/**
 * @param {string} flow
 * @param {{ setItem?: Function } | null} [storage]
 */
export function markPasswordSetupPending(flow, storage) {
  const store = storage || defaultSessionStorage();
  if (!store || typeof store.setItem !== "function") return;
  if (flow === "invite" || flow === "recovery") store.setItem(PASSWORD_SETUP_STORAGE_KEY, flow);
}

/**
 * @param {{ getItem?: Function } | null} [storage]
 */
export function readPasswordSetupPending(storage) {
  const store = storage || defaultSessionStorage();
  if (!store || typeof store.getItem !== "function") return "";
  const value = String(store.getItem(PASSWORD_SETUP_STORAGE_KEY) || "").trim();
  return value === "invite" || value === "recovery" ? value : "";
}

/**
 * @param {{ removeItem?: Function } | null} [storage]
 */
export function clearPasswordSetupPending(storage) {
  const store = storage || defaultSessionStorage();
  if (!store || typeof store.removeItem !== "function") return;
  store.removeItem(PASSWORD_SETUP_STORAGE_KEY);
}

/**
 * Pending flag only chooses the surface. It never replaces a valid session.
 * @param {{ pendingSetup?: string, hasSession?: boolean }} [input]
 */
export function decideAuthModalSurface(input = {}) {
  const pending = input.pendingSetup === "invite" || input.pendingSetup === "recovery" ? input.pendingSetup : "";
  if (pending && input.hasSession) return "set-password";
  if (pending && !input.hasSession) return "clear-pending-signin";
  if (input.hasSession) return "identity";
  return "signin";
}

/**
 * Session is required before set-password. A PKCE code without a completed
 * SIGNED_IN / PASSWORD_RECOVERY event must not fall through to ordinary login.
 *
 * @param {{
 *   type?: string,
 *   authEvent?: string,
 *   hasSession?: boolean,
 *   urlError?: string,
 *   pendingSetup?: string,
 *   handled?: boolean,
 *   ok?: boolean,
 *   gateError?: string,
 *   hadPkceCode?: boolean,
 *   hadUrlCredential?: boolean,
 *   sessionSource?: string,
 * }} [input]
 */
export function decideCallbackNext(input = {}) {
  const handled = input.handled !== false;
  if (!handled) {
    return { next: "closed", showPasswordSetup: false };
  }
  if (input.urlError) {
    return { next: "error", showPasswordSetup: false, error: CALLBACK_LINK_INVALID };
  }
  if (input.ok === false) {
    return {
      next: "error",
      showPasswordSetup: false,
      error: input.gateError || CALLBACK_LINK_INVALID,
    };
  }
  if (input.sessionSource === "type-only") {
    return { next: "error", showPasswordSetup: false, error: CALLBACK_LINK_INVALID };
  }

  const wantsPasswordSetup =
    shouldShowPasswordSetup({ type: input.type, authEvent: input.authEvent }) ||
    input.pendingSetup === "invite" ||
    input.pendingSetup === "recovery";

  if (wantsPasswordSetup && !input.hasSession) {
    return { next: "error", showPasswordSetup: false, error: CALLBACK_LINK_INVALID };
  }
  if (wantsPasswordSetup) {
    const fromUrl = input.hadUrlCredential === true;
    const fromPendingRestore = input.sessionSource === "pending-restore";
    if (!fromUrl && !fromPendingRestore) {
      return { next: "error", showPasswordSetup: false, error: CALLBACK_LINK_INVALID };
    }
    const passwordFlow = input.type === "invite" || input.pendingSetup === "invite" ? "invite" : "recovery";
    return { next: "set-password", showPasswordSetup: true, passwordFlow };
  }

  if (input.hadPkceCode && input.authEvent !== "SIGNED_IN" && input.authEvent !== "PASSWORD_RECOVERY") {
    return { next: "error", showPasswordSetup: false, error: CALLBACK_LINK_INVALID };
  }
  if (input.hadUrlCredential && input.authEvent !== "SIGNED_IN" && input.authEvent !== "PASSWORD_RECOVERY" && input.type !== "magiclink" && input.type !== "email" && input.type !== "signup") {
    if (input.sessionSource !== "url-exchange" && input.sessionSource !== "url-set-session" && input.sessionSource !== "url-verify-otp") {
      return { next: "error", showPasswordSetup: false, error: CALLBACK_LINK_INVALID };
    }
  }

  if (!input.hasSession) {
    return { next: "error", showPasswordSetup: false, error: CALLBACK_LINK_INVALID };
  }
  return { next: "session", showPasswordSetup: false };
}

/**
 * Page-level mapping used by `/auth/callback`. Tests should assert this, not a
 * detached wait.
 *
 * @param {{
 *   handled?: boolean,
 *   reason?: string,
 *   next?: string,
 *   ok?: boolean,
 *   error?: string,
 *   passwordFlow?: string,
 * }} [result]
 */
export function callbackPageView(result = {}) {
  if (result.handled === false) {
    return {
      view: "closed",
      note: result.reason === "NOT_CONFIGURED" ? "Preview auth is not configured." : "This login surface is closed on this host.",
    };
  }
  if (result.next === "set-password") {
    return { view: "set-password", flow: result.passwordFlow === "invite" ? "invite" : "recovery" };
  }
  if (result.next === "error" || result.ok === false) {
    return { view: "error", note: result.error || CALLBACK_LINK_INVALID };
  }
  return { view: "redirect-session" };
}

function closedResult(reason, extra = {}) {
  return {
    handled: false,
    reason,
    type: extra.type || "",
    urlError: extra.urlError || "",
    hadPkceCode: Boolean(extra.hadPkceCode),
    hadUrlCredential: Boolean(extra.hadUrlCredential),
    authEvent: "",
    showPasswordSetup: false,
    next: "closed",
    sessionSource: "none",
    locationAfter: extra.locationAfter || "",
  };
}

function errorPageResult(extra = {}) {
  return {
    handled: true,
    ok: false,
    hasSession: false,
    type: extra.type || "",
    urlError: extra.urlError || "",
    hadPkceCode: Boolean(extra.hadPkceCode),
    hadUrlCredential: Boolean(extra.hadUrlCredential),
    authEvent: extra.authEvent || "",
    pendingSetup: extra.pendingSetup || "",
    showPasswordSetup: false,
    next: "error",
    error: CALLBACK_LINK_INVALID,
    sessionSource: extra.sessionSource || "none",
    locationAfter: extra.locationAfter || "",
  };
}

async function establishUrlSession(input, credential, search, hash, type) {
  if (credential.kind === "url-error") {
    return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "none", flowType: type };
  }
  if (credential.kind === "pkce") {
    if (typeof input.exchangeCode !== "function") {
      return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "none", flowType: type };
    }
    const exchanged = await input.exchangeCode(readPkceCode({ search, hash }));
    if (exchanged?.error) {
      return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "none", flowType: type };
    }
    const redirectType = String(exchanged?.data?.redirectType || "").trim().toLowerCase();
    return {
      gate: { handled: true, ok: true, hasSession: Boolean(exchanged?.data?.session) },
      sessionSource: "url-exchange",
      flowType: redirectType || type,
    };
  }
  if (credential.kind === "implicit") {
    if (typeof input.setSession !== "function") {
      return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "none", flowType: type };
    }
    const established = await input.setSession({
      access_token: readParam(search, hash, "access_token"),
      refresh_token: readParam(search, hash, "refresh_token"),
    });
    if (established?.error || !established?.data?.session) {
      return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "none", flowType: type };
    }
    return {
      gate: { handled: true, ok: true, hasSession: true },
      sessionSource: "url-set-session",
      flowType: type,
    };
  }
  if (credential.kind === "otp") {
    if (typeof input.verifyOtp !== "function") {
      return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "none", flowType: type };
    }
    const verified = await input.verifyOtp({
      token_hash: readParam(search, hash, "token_hash") || readParam(search, hash, "token"),
      type: type === "invite" || type === "recovery" || type === "magiclink" || type === "email" || type === "signup" ? type : "email",
    });
    if (verified?.error || !verified?.data?.session) {
      return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "none", flowType: type };
    }
    return {
      gate: { handled: true, ok: true, hasSession: true },
      sessionSource: "url-verify-otp",
      flowType: type,
    };
  }
  if (credential.kind === "type-only") {
    return { gate: { handled: true, ok: false, hasSession: false, error: CALLBACK_LINK_INVALID }, sessionSource: "type-only", flowType: type };
  }
  const pendingSetup = input.readPending?.() || input.pendingSetup || "";
  const gate = await runAuthCallback({
    hostname: input.hostname,
    runtimeEnv: input.runtimeEnv,
    configured: true,
    getSession: input.getSession,
  });
  return {
    gate,
    sessionSource: pendingSetup && gate.hasSession ? "pending-restore" : "existing-session",
    flowType: type,
  };
}

/**
 * Callback-page orchestrator. URL credentials must establish a new session.
 * After success, one-time params are stripped so a real refresh cannot
 * re-consume the code/token. Completion is exchange/setSession/verifyOtp
 * resolving (auth-js 2.112.3 notifies inside those awaits).
 *
 * @param {{
 *   hostname?: string,
 *   runtimeEnv?: string,
 *   configured?: boolean,
 *   search?: string,
 *   hash?: string,
 *   href?: string,
 *   authEvent?: string,
 *   pendingSetup?: string,
 *   getSession?: () => Promise<{ data?: { session?: unknown }, error?: { message?: string } | null }>,
 *   exchangeCode?: (code: string) => Promise<{ data?: { session?: unknown, redirectType?: string }, error?: { message?: string } | null }>,
 *   setSession?: (tokens: { access_token: string, refresh_token: string }) => Promise<{ data?: { session?: unknown }, error?: { message?: string } | null }>,
 *   verifyOtp?: (params: { token_hash: string, type: string }) => Promise<{ data?: { session?: unknown }, error?: { message?: string } | null }>,
 *   replaceLocation?: (path: string) => void,
 *   subscribeAuthEvents?: (cb: (event: string) => void) => (() => void) | void,
 *   readPending?: () => string,
 *   markPending?: (flow: "invite" | "recovery") => void,
 *   clearPending?: () => void,
 * }} [input]
 */
export async function runPreviewCallbackPage(input = {}) {
  const search = input.search || "";
  const hash = input.hash || "";
  const href = input.href || `https://callback.invalid/auth/callback${search}${hash}`;
  const type = readCallbackType({ search, hash });
  const urlError = readCallbackError({ search, hash });
  const credential = classifyCallbackCredential({ search, hash });
  const hadPkceCode = credential.kind === "pkce";
  const hadUrlCredential = credential.kind === "pkce" || credential.kind === "implicit" || credential.kind === "otp";
  const locationAfterClosed = stripOneTimeAuthHref(href);

  if (!shouldInitSupabaseBrowserAuth({ hostname: input.hostname, runtimeEnv: input.runtimeEnv })) {
    return closedResult("NOT_PREVIEW", { type, urlError, hadPkceCode, hadUrlCredential, locationAfter: locationAfterClosed });
  }
  if (!input.configured) {
    return closedResult("NOT_CONFIGURED", { type, urlError, hadPkceCode, hadUrlCredential, locationAfter: locationAfterClosed });
  }

  let unsubscribe = () => {};
  let authEvent = String(input.authEvent || "");
  let established = false;
  let pendingSetup = "";

  try {
    const maybeUnsub = input.subscribeAuthEvents?.((event) => {
      if (event === "PASSWORD_RECOVERY") authEvent = event;
      else if (event === "SIGNED_IN" && authEvent !== "PASSWORD_RECOVERY") authEvent = event;
    });
    if (typeof maybeUnsub === "function") unsubscribe = maybeUnsub;

    const establishedSession = await establishUrlSession(input, credential, search, hash, type);
    const gate = establishedSession.gate;
    const sessionSource = establishedSession.sessionSource;
    const flowType = establishedSession.flowType || type;
    pendingSetup = input.readPending?.() || input.pendingSetup || "";

    const decision = decideCallbackNext({
      type: flowType,
      authEvent,
      hasSession: gate.hasSession,
      urlError,
      pendingSetup,
      handled: gate.handled,
      ok: gate.ok,
      gateError: gate.error,
      hadPkceCode,
      hadUrlCredential,
      sessionSource,
    });

    if (decision.next === "set-password" && decision.passwordFlow) {
      input.markPending?.(decision.passwordFlow);
    }
    if (decision.next === "error" && pendingSetup && !gate.hasSession) {
      input.clearPending?.();
    }

    const locationAfter = stripOneTimeAuthHref(href);
    if (decision.next === "set-password" || decision.next === "session") {
      established = true;
      try {
        input.replaceLocation?.(locationAfter);
      } catch {
        // Session already established; refresh tests must still assert replaceLocation ran.
      }
    }

    return {
      ...gate,
      type: flowType,
      urlError,
      authEvent,
      hadPkceCode,
      hadUrlCredential,
      pendingSetup,
      sessionSource,
      locationAfter,
      ...decision,
    };
  } catch {
    if (!established) {
      try {
        input.clearPending?.();
      } catch {
        // ignore storage failures while failing closed
      }
    }
    return errorPageResult({
      type,
      urlError,
      hadPkceCode,
      hadUrlCredential,
      authEvent,
      pendingSetup,
      sessionSource: "exception",
      locationAfter: stripOneTimeAuthHref(href),
    });
  } finally {
    try {
      unsubscribe();
    } catch {
      // ignore
    }
  }
}

/**
 * @param {{
 *   hostname?: string,
 *   runtimeEnv?: string,
 *   configured?: boolean,
 *   getSession?: () => Promise<{ data?: { session?: unknown }, error?: { message?: string } | null }>,
 *   exchangeCode?: (code: string) => Promise<{ data?: { session?: unknown, redirectType?: string }, error?: { message?: string } | null }>,
 *   setSession?: (tokens: { access_token: string, refresh_token: string }) => Promise<{ data?: { session?: unknown }, error?: { message?: string } | null }>,
 *   verifyOtp?: (params: { token_hash: string, type: string }) => Promise<{ data?: { session?: unknown }, error?: { message?: string } | null }>,
 *   search?: string,
 *   hash?: string,
 *   href?: string,
 *   authEvent?: string,
 *   pendingSetup?: string,
 * }} [input]
 */
export async function resolveAuthCallback(input = {}) {
  return runPreviewCallbackPage({
    ...input,
    readPending: input.readPending || (() => input.pendingSetup || ""),
  });
}

/**
 * @param {{
 *   updateUser: (payload: { password: string }) => Promise<{ error?: { message?: string } | null }>,
 *   fetchTrustedSession: () => Promise<{ status: number, body?: Record<string, unknown> }>,
 *   password: string,
 *   storage?: { removeItem?: Function } | null,
 * }} input
 */
export async function updatePasswordAndLoadSession(input) {
  const updateUser = input.updateUser;
  const fetchTrustedSession = input.fetchTrustedSession;
  const password = input.password;
  if (typeof password !== "string" || password.length < 8) {
    return { ok: false, error: "Password is too short." };
  }
  const { error } = await updateUser({ password });
  if (error) {
    return { ok: false, error: String(error.message || "Password update failed.") };
  }
  const session = await fetchTrustedSession();
  if (session.status === 403) {
    return {
      ok: false,
      error: session.body?.code === "ACCOUNT_RESTRICTED" ? "Account is restricted." : session.body?.error || "Permission denied.",
    };
  }
  if (session.status !== 200 || !session.body?.authenticated) {
    return { ok: false, error: session.body?.error || "Session request failed." };
  }
  clearPasswordSetupPending(input.storage);
  return {
    ok: true,
    identity: {
      user_id: session.body.user_id,
      roles: session.body.roles,
      account_status: session.body.account_status,
      member_id: session.body.member_id,
      windseeker_id: session.body.windseeker_id,
    },
  };
}
