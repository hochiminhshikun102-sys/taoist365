import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, readAccessToken, readSupabaseBrowserConfig } from "@/lib/supabase/client";
import { shouldInitSupabaseBrowserAuth } from "@/lib/auth/preview-gate.js";
import type { OaServerSessionBody } from "@/lib/oa-auth/oaAuthClaims";

export function isOaPreviewRuntime(): boolean {
  return process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV === "preview";
}

export function hasOaSupabasePublicEnv(): boolean {
  return readSupabaseBrowserConfig().configured;
}

export function canUseOaPreviewAuthClient(): boolean {
  if (typeof window === "undefined") return false;
  return shouldInitSupabaseBrowserAuth({
    hostname: window.location.hostname,
    runtimeEnv: process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV,
  });
}

/** Canonical Preview PKCE client only. No second Auth singleton. */
export function getOaSupabaseBrowserClient(): SupabaseClient | null {
  if (!isOaPreviewRuntime() || !hasOaSupabasePublicEnv() || !canUseOaPreviewAuthClient()) return null;
  try {
    return getSupabaseBrowserClient();
  } catch {
    return null;
  }
}

export async function fetchOaServerSession(accessToken: string): Promise<{
  status: number;
  body: OaServerSessionBody;
}> {
  const token = String(accessToken || "").trim();
  const response = await fetch("/api/oa/session", {
    method: "GET",
    cache: "no-store",
    headers: token
      ? { authorization: `Bearer ${token}`, accept: "application/json" }
      : { accept: "application/json" },
  });
  const body = (await response.json()) as OaServerSessionBody;
  return { status: response.status, body };
}

export async function fetchTrustedOaSession(): Promise<{
  status: number;
  body: OaServerSessionBody;
}> {
  const token = await readAccessToken();
  return fetchOaServerSession(token);
}
