const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

export const authCodes = {
  AUTH_REQUIRED: "AUTH_REQUIRED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_INVALID: "TOKEN_INVALID",
  ISSUER_MISMATCH: "ISSUER_MISMATCH",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  ACCOUNT_RESTRICTED: "ACCOUNT_RESTRICTED",
};

export function makeRequestId() {
  const stamp = Date.now().toString(36);
  const tail = Math.random().toString(36).slice(2, 10);
  return `req_${stamp}_${tail}`;
}

export function authJson(payload, status, requestId) {
  return new Response(
    JSON.stringify({
      ...payload,
      request_id: requestId,
    }),
    {
      status,
      headers: {
        ...jsonHeaders,
        "x-dohara-request-id": requestId,
      },
    },
  );
}

export function deny(code, error, status, requestId) {
  return authJson({ ok: false, code, error }, status, requestId);
}
