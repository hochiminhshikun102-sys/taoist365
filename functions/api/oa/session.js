import { authCodes, authJson, deny } from "../../_auth/auth-errors.js";
import { requireIdentity } from "../../_auth/require-identity.js";

const OA_ALLOWED_ROLES = Object.freeze(["oa_admin", "oa_operator", "oa_viewer"]);

export async function onRequestGet(context) {
  const gate = await requireIdentity(context.request, context.env);
  if (!gate.ok) return gate.response;

  const identity = gate.identity;
  const oaRole = typeof identity.oa_role === "string" ? identity.oa_role : null;
  if (!oaRole || !OA_ALLOWED_ROLES.includes(oaRole)) {
    return deny(authCodes.PERMISSION_DENIED, "Permission denied.", 403, gate.requestId);
  }

  return authJson(
    {
      authenticated: true,
      oa_role: oaRole,
      account_status: identity.account_status,
    },
    200,
    gate.requestId,
  );
}

export async function onRequest(context) {
  if (context.request.method === "GET") return onRequestGet(context);
  return new Response(JSON.stringify({ ok: false, code: "METHOD_NOT_ALLOWED", error: "Method not allowed." }), {
    status: 405,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
