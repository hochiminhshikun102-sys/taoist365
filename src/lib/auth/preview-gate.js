export const PAGES_PRODUCTION_HOST = "taoist365.pages.dev";
export const PRODUCTION_CUSTOM_HOSTS = Object.freeze(["taoist365.com", "www.taoist365.com"]);

export function shouldInitSupabaseBrowserAuth({ hostname, runtimeEnv } = {}) {
  const host = String(hostname || "")
    .trim()
    .toLowerCase()
    .replace(/\.$/, "");
  const env = String(runtimeEnv || "").trim();

  if (!host) return false;
  if (PRODUCTION_CUSTOM_HOSTS.includes(host)) return false;
  if (host === PAGES_PRODUCTION_HOST) return false;

  const isLocal = host === "127.0.0.1" || host === "localhost";
  const isPreviewPages = host.endsWith(`.${PAGES_PRODUCTION_HOST}`);

  if (isLocal) return true;
  if (isPreviewPages && env === "preview") return true;
  return false;
}

export function canHandleAuthCallback(input) {
  return shouldInitSupabaseBrowserAuth(input);
}

export async function runAuthCallback({ hostname, runtimeEnv, configured, getSession }) {
  if (!shouldInitSupabaseBrowserAuth({ hostname, runtimeEnv })) {
    return { handled: false, reason: "NOT_PREVIEW" };
  }
  if (!configured) {
    return { handled: false, reason: "NOT_CONFIGURED" };
  }
  const { error } = await getSession();
  if (error) {
    return { handled: true, ok: false, error: String(error.message || "Session restore failed.") };
  }
  return { handled: true, ok: true };
}
