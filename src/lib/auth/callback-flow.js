import { runAuthCallback } from "./preview-gate.js";

const PASSWORD_SETUP_TYPES = new Set(["invite", "recovery"]);

export function readCallbackType({ search = "", hash = "" } = {}) {
  const query = new URLSearchParams(String(search).startsWith("?") ? String(search).slice(1) : String(search));
  const fragment = new URLSearchParams(String(hash).startsWith("#") ? String(hash).slice(1) : String(hash));
  return String(fragment.get("type") || query.get("type") || "")
    .trim()
    .toLowerCase();
}

export function shouldShowPasswordSetup({ type = "", authEvent = "" } = {}) {
  if (PASSWORD_SETUP_TYPES.has(String(type).trim().toLowerCase())) return true;
  return String(authEvent) === "PASSWORD_RECOVERY";
}

export async function resolveAuthCallback({
  hostname,
  runtimeEnv,
  configured,
  getSession,
  search = "",
  hash = "",
  authEvent = "",
} = {}) {
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

export async function updatePasswordAndLoadSession({ updateUser, fetchTrustedSession, password }) {
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
