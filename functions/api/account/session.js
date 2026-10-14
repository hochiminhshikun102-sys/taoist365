import { authJson } from "../../_auth/auth-errors.js";
import { requireIdentity } from "../../_auth/require-identity.js";

export async function onRequestGet(context) {
  const gate = await requireIdentity(context.request, context.env);
  if (!gate.ok) return gate.response;

  const identity = gate.identity;
  return authJson(
    {
      authenticated: true,
      user_id: identity.user_id,
      account_id: identity.account_id,
      member_id: identity.member_id,
      windseeker_id: identity.windseeker_id,
      roles: identity.roles,
      account_status: identity.account_status,
      expires_at: identity.expires_at,
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
