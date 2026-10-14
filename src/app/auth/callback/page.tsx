"use client";

import { useEffect, useState } from "react";

import { PreviewAuthGate } from "@/components/auth/PreviewAuthGate";
import { SetPasswordForm } from "@/components/auth/SetPasswordForm";
import {
  CALLBACK_LINK_INVALID,
  callbackPageView,
  clearPasswordSetupPending,
  markPasswordSetupPending,
  readPasswordSetupPending,
  runPreviewCallbackPage,
} from "@/lib/auth/callback-flow.js";
import { getSupabaseBrowserClient, readSupabaseBrowserConfig } from "@/lib/supabase/client";

function AuthCallbackInner() {
  const [note, setNote] = useState("Restoring Preview session…");
  const [passwordFlow, setPasswordFlow] = useState<"invite" | "recovery" | null>(null);

  useEffect(() => {
    const config = readSupabaseBrowserConfig();
    const search = window.location.search;
    const hash = window.location.hash;
    const href = window.location.href;
    let cancelled = false;
    let unsubscribe: { unsubscribe?: () => void } | undefined;

    void (async () => {
      try {
        const supabase = config.configured ? getSupabaseBrowserClient() : null;
        const result = await runPreviewCallbackPage({
          hostname: window.location.hostname,
          runtimeEnv: process.env.NEXT_PUBLIC_DOHARA_RUNTIME_ENV,
          configured: config.configured,
          search,
          hash,
          href,
          getSession: () => {
            if (!supabase) {
              return Promise.resolve({ data: { session: null }, error: { message: "Preview auth is not configured." } });
            }
            return supabase.auth.getSession();
          },
          exchangeCode: (code) => {
            if (!supabase) {
              return Promise.resolve({ data: { session: null }, error: { message: "Preview auth is not configured." } });
            }
            return supabase.auth.exchangeCodeForSession(code);
          },
          setSession: (tokens) => {
            if (!supabase) {
              return Promise.resolve({ data: { session: null }, error: { message: "Preview auth is not configured." } });
            }
            return supabase.auth.setSession(tokens);
          },
          verifyOtp: (params) => {
            if (!supabase) {
              return Promise.resolve({ data: { session: null }, error: { message: "Preview auth is not configured." } });
            }
            return supabase.auth.verifyOtp({
              token_hash: params.token_hash,
              type: params.type as "invite" | "recovery" | "magiclink" | "email" | "signup",
            });
          },
          replaceLocation: (path) => {
            window.history.replaceState(window.history.state, "", path);
          },
          readPending: () => readPasswordSetupPending(),
          markPending: (flow) => markPasswordSetupPending(flow),
          clearPending: () => clearPasswordSetupPending(),
          subscribeAuthEvents: (cb) => {
            if (!supabase) return;
            const { data } = supabase.auth.onAuthStateChange((event) => {
              if (cancelled) return;
              cb(event);
            });
            unsubscribe = data.subscription;
            return () => data.subscription.unsubscribe();
          },
        });
        if (cancelled) return;
        const view = callbackPageView(result);
        if (view.view === "closed") {
          setNote(view.note);
          return;
        }
        if (view.view === "set-password") {
          setPasswordFlow(view.flow);
          return;
        }
        if (view.view === "error") {
          setNote(view.note);
          return;
        }
        window.location.replace("/preview/p0-00c");
      } catch {
        if (!cancelled) setNote(CALLBACK_LINK_INVALID);
      } finally {
        unsubscribe?.unsubscribe?.();
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe?.unsubscribe?.();
    };
  }, []);

  if (passwordFlow) {
    return <SetPasswordForm flowLabel={passwordFlow} />;
  }

  return (
    <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground">
      <p className="mx-auto max-w-xl pt-16 text-sm" data-testid="p0-00c-callback-note">
        {note}
      </p>
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
