"use client";

import { useEffect, useState } from "react";

import { PreviewAuthGate } from "@/components/auth/PreviewAuthGate";
import { SetPasswordForm } from "@/components/auth/SetPasswordForm";
import { readCallbackType, resolveAuthCallback } from "@/lib/auth/callback-flow.js";
import { getSupabaseBrowserClient, readSupabaseBrowserConfig } from "@/lib/supabase/client";

function AuthCallbackInner() {
  const [note, setNote] = useState("Restoring Preview session…");
  const [passwordFlow, setPasswordFlow] = useState<"invite" | "recovery" | null>(null);

  useEffect(() => {
    const config = readSupabaseBrowserConfig();
    const search = window.location.search;
    const hash = window.location.hash;
    const capturedType = readCallbackType({ search, hash });
    let cancelled = false;
    const supabase = config.configured ? getSupabaseBrowserClient() : null;

    void resolveAuthCallback({
      hostname: window.location.hostname,
      runtimeEnv: process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV,
      configured: config.configured,
      search,
      hash,
      getSession: () => {
        if (!supabase) return Promise.resolve({ data: { session: null }, error: { message: "Preview auth is not configured." } });
        return supabase.auth.getSession();
      },
    }).then((result) => {
      if (cancelled) return;
      if (!result.handled) {
        setNote(result.reason === "NOT_CONFIGURED" ? "Preview auth is not configured." : "This login surface is closed on this host.");
        return;
      }
      if (!result.ok) {
        setNote(result.error || "Session restore failed.");
        return;
      }
      if (result.showPasswordSetup) {
        setPasswordFlow(capturedType === "invite" ? "invite" : "recovery");
        return;
      }
      window.location.replace("/preview/p0-00c");
    });

    const subscription = supabase?.auth.onAuthStateChange((event) => {
      if (cancelled) return;
      if (event === "PASSWORD_RECOVERY") setPasswordFlow("recovery");
    });

    return () => {
      cancelled = true;
      subscription?.data.subscription.unsubscribe();
    };
  }, []);

  if (passwordFlow) {
    return <SetPasswordForm flowLabel={passwordFlow} />;
  }

  return (
    <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground">
      <p className="mx-auto max-w-xl pt-16 text-sm">{note}</p>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <PreviewAuthGate>
      <AuthCallbackInner />
    </PreviewAuthGate>
  );
}
