"use client";

import { useEffect, useState } from "react";

import { shouldInitSupabaseBrowserAuth } from "@/lib/auth/preview-gate.js";

export function PreviewAuthGate({ children }: { children: React.ReactNode }) {
  const [gate, setGate] = useState({ ready: false, allowed: false });

  useEffect(() => {
    setGate({
      ready: true,
      allowed: shouldInitSupabaseBrowserAuth({
        hostname: window.location.hostname,
        runtimeEnv: process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV,
      }),
    });
  }, []);

  if (!gate.ready) {
    return (
      <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground">
        <section className="mx-auto max-w-xl pt-16">
          <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">P0-00C Preview only</p>
          <h1 className="mt-3 text-2xl font-normal">Checking Preview gate…</h1>
        </section>
      </main>
    );
  }

  if (!gate.allowed) {
    return (
      <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground">
        <section className="mx-auto max-w-xl pt-16">
          <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">P0-00C Preview only</p>
          <h1 className="mt-3 text-2xl font-normal">This login surface is closed on this host.</h1>
        </section>
      </main>
    );
  }

  return children;
}
