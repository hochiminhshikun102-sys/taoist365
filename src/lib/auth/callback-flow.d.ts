export const PASSWORD_SETUP_STORAGE_KEY: string;
export const CALLBACK_LINK_INVALID: string;

export function previewAuthCallbackUrl(origin?: string): string;

export function readCallbackType(input?: { search?: string; hash?: string }): string;

export function readCallbackError(input?: { search?: string; hash?: string }): string;

export function hasPkceCode(input?: { search?: string; hash?: string }): boolean;

export function readPkceCode(input?: { search?: string; hash?: string }): string;

export const ONE_TIME_AUTH_QUERY_KEYS: readonly string[];
export const ONE_TIME_AUTH_HASH_KEYS: readonly string[];

export function hasImplicitSessionParams(input?: { search?: string; hash?: string }): boolean;

export function hasOtpToken(input?: { search?: string; hash?: string }): boolean;

export function classifyCallbackCredential(input?: { search?: string; hash?: string }): {
  kind: "url-error" | "pkce" | "implicit" | "otp" | "type-only" | "none";
};

export function stripOneTimeAuthHref(href?: string): string;

export function shouldShowPasswordSetup(input?: { type?: string; authEvent?: string }): boolean;

export function markPasswordSetupPending(
  flow: "invite" | "recovery",
  storage?: { setItem?: (key: string, value: string) => void } | null,
): void;

export function readPasswordSetupPending(storage?: { getItem?: (key: string) => string | null } | null): "" | "invite" | "recovery";

export function clearPasswordSetupPending(storage?: { removeItem?: (key: string) => void } | null): void;

export function decideAuthModalSurface(input?: {
  pendingSetup?: string;
  hasSession?: boolean;
}): "set-password" | "clear-pending-signin" | "identity" | "signin";

export function decideCallbackNext(input?: {
  type?: string;
  authEvent?: string;
  hasSession?: boolean;
  urlError?: string;
  pendingSetup?: string;
  handled?: boolean;
  ok?: boolean;
  gateError?: string;
  hadPkceCode?: boolean;
  hadUrlCredential?: boolean;
  sessionSource?: string;
}): {
  next: "closed" | "error" | "set-password" | "session";
  showPasswordSetup: boolean;
  error?: string;
  passwordFlow?: "invite" | "recovery";
};

export function callbackPageView(result?: {
  handled?: boolean;
  reason?: string;
  next?: string;
  ok?: boolean;
  error?: string;
  passwordFlow?: string;
}):
  | { view: "closed"; note: string }
  | { view: "set-password"; flow: "invite" | "recovery" }
  | { view: "error"; note: string }
  | { view: "redirect-session" };

export function runPreviewCallbackPage(input?: {
  hostname?: string;
  runtimeEnv?: string;
  configured?: boolean;
  search?: string;
  hash?: string;
  href?: string;
  authEvent?: string;
  pendingSetup?: string;
  getSession?: () => Promise<{ data?: { session?: unknown }; error?: { message?: string } | null }>;
  exchangeCode?: (code: string) => Promise<{
    data?: { session?: unknown; redirectType?: string };
    error?: { message?: string } | null;
  }>;
  setSession?: (tokens: {
    access_token: string;
    refresh_token: string;
  }) => Promise<{ data?: { session?: unknown }; error?: { message?: string } | null }>;
  verifyOtp?: (params: {
    token_hash: string;
    type: string;
  }) => Promise<{ data?: { session?: unknown }; error?: { message?: string } | null }>;
  replaceLocation?: (path: string) => void;
  subscribeAuthEvents?: (cb: (event: string) => void) => (() => void) | void;
  readPending?: () => string;
  markPending?: (flow: "invite" | "recovery") => void;
  clearPending?: () => void;
}): Promise<{
  handled: boolean;
  ok?: boolean;
  reason?: string;
  error?: string;
  hasSession?: boolean;
  type: string;
  urlError: string;
  authEvent: string;
  hadPkceCode: boolean;
  hadUrlCredential?: boolean;
  pendingSetup?: string;
  showPasswordSetup: boolean;
  next?: "closed" | "error" | "set-password" | "session";
  passwordFlow?: "invite" | "recovery";
  sessionSource?: string;
  locationAfter?: string;
}>;

export function resolveAuthCallback(input?: {
  hostname?: string;
  runtimeEnv?: string;
  configured?: boolean;
  getSession?: () => Promise<{ data?: { session?: unknown }; error?: { message?: string } | null }>;
  search?: string;
  hash?: string;
  authEvent?: string;
  pendingSetup?: string;
}): Promise<{
  handled: boolean;
  ok?: boolean;
  reason?: string;
  error?: string;
  hasSession?: boolean;
  type: string;
  urlError: string;
  hadPkceCode: boolean;
  showPasswordSetup: boolean;
  next?: "closed" | "error" | "set-password" | "session";
  passwordFlow?: "invite" | "recovery";
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
  storage?: { removeItem?: (key: string) => void } | null;
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
