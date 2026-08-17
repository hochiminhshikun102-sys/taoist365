import { authCodes, deny, makeRequestId } from "./auth-errors.js";
import { readBearerToken, verifySupabaseAccessToken } from "./supabase-identity.js";

export async function requireIdentity(request, env = {}) {
  const requestId = request?.headers?.get?.("x-dohara-request-id") || makeRequestId();
  const token = readBearerToken(request);
  if (!token) {
    return {
      ok: false,
      requestId,
      response: deny(authCodes.AUTH_REQUIRED, "Authentication required.", 401, requestId),
    };
  }

  const verified = await verifySupabaseAccessToken(token, env);
  if (!verified.ok) {
    const status = verified.code === authCodes.TOKEN_EXPIRED ? 401 : 401;
    return {
      ok: false,
      requestId,
      response: deny(verified.code, verified.error, status, requestId),
    };
  }

  if (verified.identity.account_status !== "active") {
    return {
      ok: false,
      requestId,
      response: deny(authCodes.ACCOUNT_RESTRICTED, "Account is restricted.", 403, requestId),
    };
  }

  return { ok: true, requestId, identity: verified.identity };
}
