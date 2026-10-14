import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function isOaPreviewRuntime(): boolean {
  return process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV === "preview";
}

export function hasOaSupabasePublicEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

/** Browser client with publishable key only. No service role. */
export function getOaSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
