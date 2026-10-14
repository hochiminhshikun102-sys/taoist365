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

export function readOaAppMetadata(user: { app_metadata?: Record<string, unknown> } | null): {
  role: string | null;
  accountStatus: string | null;
} {
  const meta = user?.app_metadata ?? {};
  return {
    role: typeof meta.role === "string" ? meta.role : null,
    accountStatus: typeof meta.account_status === "string" ? meta.account_status : null,
  };
}

export function isOaAllowedRole(role: string | null): role is OaAllowedRole {
  return role !== null && (OA_ALLOWED_ROLES as readonly string[]).includes(role);
}

export function decideOaAccess(input: {
  previewRuntime: boolean;
  publicEnvPresent: boolean;
  user: { app_metadata?: Record<string, unknown> } | null;
}): OaAuthDecision {
  if (!input.previewRuntime) return { ok: false, reason: "runtime_not_preview" };
  if (!input.publicEnvPresent) return { ok: false, reason: "env_missing" };
  if (!input.user) return { ok: false, reason: "auth_required" };
  const { role, accountStatus } = readOaAppMetadata(input.user);
  if (!isOaAllowedRole(role)) return { ok: false, reason: "role_not_allowed" };
  if (accountStatus !== OA_ACTIVE_ACCOUNT_STATUS) return { ok: false, reason: "account_inactive" };
  return { ok: true, role, accountStatus: OA_ACTIVE_ACCOUNT_STATUS };
}
