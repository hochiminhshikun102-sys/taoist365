export async function signOutAndVerifyCleared(auth) {
  const { error } = await auth.signOut();
  if (error) {
    return { ok: false, code: "SIGNOUT_FAILED", error: String(error.message || "Sign out failed.") };
  }

  const { data, error: sessionError } = await auth.getSession();
  if (sessionError) {
    return { ok: false, code: "SESSION_CHECK_FAILED", error: String(sessionError.message || "Session check failed.") };
  }
  if (data?.session) {
    return { ok: false, code: "SESSION_NOT_CLEARED", error: "SDK session was not cleared." };
  }

  const token = String(data?.session?.access_token || "").trim();
  if (token) {
    return { ok: false, code: "TOKEN_STILL_READABLE", error: "Access token still readable." };
  }

  return { ok: true };
}
