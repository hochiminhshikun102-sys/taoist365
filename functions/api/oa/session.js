import { authCodes, authJson, deny, makeRequestId } from "../../_auth/auth-errors.js";
import { requireIdentity } from "../../_auth/require-identity.js";
import {
  FIXED_PREVIEW_ISSUER,
  FIXED_PREVIEW_JWKS_URL,
  FIXED_PREVIEW_SUPABASE_URL,
  isAllowedPreviewFunctionHost,
} from "../../_auth/supabase-identity.js";

const OA_ALLOWED_ROLES = Object.freeze(["oa_admin", "oa_operator", "oa_viewer"]);

/** An explicit Preview-only boundary, including when issuer/JWKS are preconfigured. */
export function isOaPreviewRequest(context) {
  const env = context?.env ?? {};
  let host;
  try {
    host = new URL(context.request.url).hostname.toLowerCase();
  } catch {
    return false;
  }

  if (!isAllowedPreviewFunctionHost(host)) return false;
  if (String(env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV || "").trim() !== "preview") return false;
  if (String(env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "") !== FIXED_PREVIEW_SUPABASE_URL) return false;

  // Synthetic local JWKS and issuers are allowed only for local offline tests.
  const local = host === "127.0.0.1" || host === "localhost";
  if (!local) {
    if (String(env.SUPABASE_JWKS_JSON || "").trim()) return false;
    const issuer = String(env.SUPABASE_ISSUER || "").trim();
    const jwksUrl = String(env.SUPABASE_JWKS_URL || "").trim();
    if (issuer && issuer !== FIXED_PREVIEW_ISSUER) return false;
    if (jwksUrl && jwksUrl !== FIXED_PREVIEW_JWKS_URL) return false;
  }
  return true;
}

export async function onRequestGet(context) {
  if (!isOaPreviewRequest(context)) {
    return deny(authCodes.AUTH_REQUIRED, "Authentication required.", 401, makeRequestId());
  }

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
