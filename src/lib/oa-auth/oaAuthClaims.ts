export const OA_ALLOWED_ROLES = ["oa_admin", "oa_operator", "oa_viewer"] as const;
export type OaAllowedRole = (typeof OA_ALLOWED_ROLES)[number];
export const OA_ACTIVE_ACCOUNT_STATUS = "active";

export type OaAuthDenyReason =
  | "runtime_not_preview"
  | "env_missing"
  | "auth_required"
  | "role_not_allowed"
  | "account_inactive";

export type OaAuthDecision =
  | { ok: true; role: OaAllowedRole; accountStatus: typeof OA_ACTIVE_ACCOUNT_STATUS }
  | { ok: false; reason: OaAuthDenyReason };

export type OaServerSessionBody = {
  authenticated?: boolean;
  oa_role?: string | null;
  account_status?: string | null;
  code?: string;
  error?: string;
};

export function isOaAllowedRole(role: string | null | undefined): role is OaAllowedRole {
  return typeof role === "string" && (OA_ALLOWED_ROLES as readonly string[]).includes(role);
}

/** Authorize only from the verified GET /api/oa/session projection. Never from browser user/app_metadata. */
export function decideOaAccess(input: {
  previewRuntime: boolean;
  publicEnvPresent: boolean;
  fetchFailed?: boolean;
  httpStatus?: number | null;
  body?: OaServerSessionBody | null;
}): OaAuthDecision {
  if (!input.previewRuntime) return { ok: false, reason: "runtime_not_preview" };
  if (!input.publicEnvPresent) return { ok: false, reason: "env_missing" };
  if (input.fetchFailed) return { ok: false, reason: "auth_required" };

  const status = input.httpStatus ?? null;
  const body = input.body ?? null;
  if (status === 401 || status == null) return { ok: false, reason: "auth_required" };
  if (status === 403 && body?.code === "ACCOUNT_RESTRICTED") return { ok: false, reason: "account_inactive" };
  if (status === 403) return { ok: false, reason: "role_not_allowed" };
  if (status !== 200 || body?.authenticated !== true) return { ok: false, reason: "auth_required" };
  const role = body.oa_role ?? null;
  if (!isOaAllowedRole(role)) return { ok: false, reason: "role_not_allowed" };
  if (body.account_status !== OA_ACTIVE_ACCOUNT_STATUS) return { ok: false, reason: "account_inactive" };
  return { ok: true, role, accountStatus: OA_ACTIVE_ACCOUNT_STATUS };
}
