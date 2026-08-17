"use client";

import { useEffect, useState } from "react";

import { PreviewAuthGate } from "@/components/auth/PreviewAuthGate";
import { runAuthCallback } from "@/lib/auth/preview-gate.js";
import { getSupabaseBrowserClient, readSupabaseBrowserConfig } from "@/lib/supabase/client";

function AuthCallbackInner() {
  const [note, setNote] = useState("Restoring Preview session…");

  useEffect(() => {
    const config = readSupabaseBrowserConfig();
    let cancelled = false;
    void runAuthCallback({
      hostname: window.location.hostname,
      runtimeEnv: process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV,
      configured: config.configured,
      getSession: () => getSupabaseBrowserClient().auth.getSession(),
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
      window.location.replace("/preview/p0-00c");
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
