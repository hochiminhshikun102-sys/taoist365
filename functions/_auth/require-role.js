import { authCodes, deny } from "./auth-errors.js";

export function requireRole(identity, requiredRoles, requestId) {
  const needed = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  const have = new Set(identity?.roles || []);
  const missing = needed.filter((role) => !have.has(role));
  if (missing.length > 0) {
    return {
      ok: false,
      response: deny(authCodes.PERMISSION_DENIED, "Permission denied.", 403, requestId),
    };
  }

  if (needed.includes("wind_seeker") && !identity?.windseeker_id) {
    return {
      ok: false,
      response: deny(authCodes.PERMISSION_DENIED, "Permission denied.", 403, requestId),
    };
  }

  if (needed.includes("member") && !identity?.member_id) {
    return {
      ok: false,
      response: deny(authCodes.PERMISSION_DENIED, "Permission denied.", 403, requestId),
    };
  }

  return { ok: true };
}
