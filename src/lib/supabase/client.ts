"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { shouldInitSupabaseBrowserAuth } from "@/lib/auth/preview-gate.js";

const url = String(process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const publishableKey = String(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "").trim();

let browserClient: SupabaseClient | null = null;

function readBrowserGateInput() {
  if (typeof window === "undefined") {
    return { hostname: "", runtimeEnv: String(process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV || "") };
  }
  return {
    hostname: window.location.hostname,
    runtimeEnv: String(process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV || ""),
  };
}

export function readSupabaseBrowserConfig() {
  return {
    url,
    publishableKey,
    configured: Boolean(url && publishableKey),
  };
}

export function getSupabaseBrowserClient(): SupabaseClient {
  if (!shouldInitSupabaseBrowserAuth(readBrowserGateInput())) {
    throw new Error("Preview auth is closed on this host.");
  }
  if (!url || !publishableKey) {
    throw new Error("Preview auth is not configured.");
  }
  if (!browserClient) {
    browserClient = createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    });
  }
  return browserClient;
}

export async function readAccessToken(): Promise<string> {
  const { data, error } = await getSupabaseBrowserClient().auth.getSession();
  if (error) throw error;
  if (!data.session) return "";
  return String(data.session.access_token || "").trim();
}
