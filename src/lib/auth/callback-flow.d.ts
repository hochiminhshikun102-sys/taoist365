export function readCallbackType(input?: { search?: string; hash?: string }): string;

export function shouldShowPasswordSetup(input?: { type?: string; authEvent?: string }): boolean;

export function resolveAuthCallback(input?: {
  hostname?: string;
  runtimeEnv?: string;
  configured?: boolean;
  getSession?: () => Promise<{ data?: { session?: unknown }; error?: { message?: string } | null }>;
  search?: string;
  hash?: string;
  authEvent?: string;
}): Promise<{
  handled: boolean;
  ok?: boolean;
  reason?: string;
  error?: string;
  hasSession?: boolean;
  type: string;
  showPasswordSetup: boolean;
  next?: "set-password" | "session";
}>;

export function updatePasswordAndLoadSession(input: {
  updateUser: (payload: { password: string }) => Promise<{ error?: { message?: string } | null }>;
  fetchTrustedSession: () => Promise<{
    status: number;
    body?: {
      authenticated?: boolean;
      user_id?: string | null;
      roles?: string[];
      account_status?: string | null;
      member_id?: string | null;
      windseeker_id?: string | null;
      code?: string;
      error?: string;
    };
  }>;
  password: string;
}): Promise<
  | { ok: false; error: string }
  | {
      ok: true;
      identity: {
        user_id?: string | null;
        roles?: string[];
        account_status?: string | null;
        member_id?: string | null;
        windseeker_id?: string | null;
      };
    }
>;
