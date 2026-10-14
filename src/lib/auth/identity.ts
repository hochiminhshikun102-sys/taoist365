export type ServerSessionDto = {
  authenticated: boolean;
  user_id: string | null;
  account_id: string | null;
  member_id: string | null;
  windseeker_id: string | null;
  roles: string[];
  account_status: string | null;
  expires_at: string | null;
  request_id?: string;
  ok?: boolean;
  code?: string;
  error?: string;
};

export function trustedIdentityFromServer(dto: ServerSessionDto | null) {
  if (!dto || dto.authenticated !== true) return null;
  return {
    user_id: dto.user_id,
    account_id: dto.account_id,
    member_id: dto.member_id,
    windseeker_id: dto.windseeker_id,
    roles: Array.isArray(dto.roles) ? dto.roles.map(String) : [],
    account_status: dto.account_status,
    expires_at: dto.expires_at,
  };
}
