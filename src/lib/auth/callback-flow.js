import { runAuthCallback } from "./preview-gate.js";

const PASSWORD_SETUP_TYPES = new Set(["invite", "recovery"]);

/**
 * @param {{ search?: string, hash?: string }} [input]
 */
export function readCallbackType(input = {}) {
  const search = input.search || "";
  const hash = input.hash || "";
  const query = new URLSearchParams(String(search).startsWith("?") ? String(search).slice(1) : String(search));
  const fragment = new URLSearchParams(String(hash).startsWith("#") ? String(hash).slice(1) : String(hash));
  return String(fragment.get("type") || query.get("type") || "")
    .trim()
    .toLowerCase();
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
 * @typedef {object} ResolveAuthCallbackInput
 * @property {string} [hostname]
 * @property {string} [runtimeEnv]
 * @property {boolean} [configured]
 * @property {() => Promise<{ data?: { session?: unknown }, error?: { message?: string } | null }>} [getSession]
 * @property {string} [search]
 * @property {string} [hash]
 * @property {string} [authEvent]
 */

/**
 * @param {ResolveAuthCallbackInput} [input]
 */
export async function resolveAuthCallback(input = {}) {
  const hostname = input.hostname;
  const runtimeEnv = input.runtimeEnv;
  const configured = input.configured;
  const getSession = input.getSession;
  const search = input.search || "";
  const hash = input.hash || "";
  const authEvent = input.authEvent || "";
  const type = readCallbackType({ search, hash });
  const gate = await runAuthCallback({ hostname, runtimeEnv, configured, getSession });
  if (!gate.handled) {
    return { ...gate, type, showPasswordSetup: false };
  }
  if (!gate.ok) {
    return { ...gate, type, showPasswordSetup: false };
  }
  const showPasswordSetup = shouldShowPasswordSetup({ type, authEvent });
  return {
    ...gate,
    type,
    showPasswordSetup,
    next: showPasswordSetup ? "set-password" : "session",
  };
}

/**
 * @param {{
 *   updateUser: (payload: { password: string }) => Promise<{ error?: { message?: string } | null }>,
 *   fetchTrustedSession: () => Promise<{ status: number, body?: Record<string, unknown> }>,
 *   password: string
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
