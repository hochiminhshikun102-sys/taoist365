import { authCodes, deny, makeRequestId } from "./auth-errors.js";
import { requireIdentity } from "./require-identity.js";
import { isOaPreviewRequest } from "../api/oa/session.js";

/** Server-side raw admin reads: PII-capable payloads. Viewer UI access is not enough. */
const PRIVATE_READ_ROLES = Object.freeze(["oa_admin", "oa_operator"]);

export async function requireOaPrivateRead(context) {
  const requestId = context?.request?.headers?.get?.("x-dohara-request-id") || makeRequestId();
  if (!isOaPreviewRequest(context)) {
    return {
      ok: false,
      requestId,
      response: deny(authCodes.AUTH_REQUIRED, "Authentication required.", 401, requestId),
    };
  }

  const gate = await requireIdentity(context.request, context.env);
  if (!gate.ok) return gate;

  const role = typeof gate.identity.oa_role === "string" ? gate.identity.oa_role : null;
  if (!role || !PRIVATE_READ_ROLES.includes(role)) {
    return {
      ok: false,
      requestId: gate.requestId,
      response: deny(authCodes.PERMISSION_DENIED, "Permission denied.", 403, gate.requestId),
    };
  }

  return { ok: true, requestId: gate.requestId, identity: gate.identity };
}
