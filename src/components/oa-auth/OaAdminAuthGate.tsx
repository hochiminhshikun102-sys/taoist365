"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { decideOaAccess, type OaAuthDecision } from "@/lib/oa-auth/oaAuthClaims";
import {
  getOaSupabaseBrowserClient,
  hasOaSupabasePublicEnv,
  isOaPreviewRuntime,
} from "@/lib/oa-auth/supabaseClient";
import { OaAdminAuthState } from "./OaAdminAuthState";

type Props = {
  children: ReactNode;
};

export function OaAdminAuthGate({ children }: Props) {
  const [phase, setPhase] = useState<OaAuthDecision>({ ok: false, reason: "auth_required" });
  const [checking, setChecking] = useState(true);
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  const evaluate = useCallback((user: User | null) => {
    setPhase(
      decideOaAccess({
        previewRuntime: isOaPreviewRuntime(),
        publicEnvPresent: hasOaSupabasePublicEnv(),
        user,
      }),
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    const client = getOaSupabaseBrowserClient();
    const preview = isOaPreviewRuntime();
    const envOk = hasOaSupabasePublicEnv();

    if (!preview || !envOk || !client) {
      evaluate(null);
      setChecking(false);
      return;
    }

    client.auth
      .getUser()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) evaluate(null);
        else evaluate(data.user ?? null);
      })
      .catch(() => {
        if (!cancelled) evaluate(null);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      evaluate(session?.user ?? null);
      setChecking(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [evaluate]);

  async function signIn(email: string, password: string) {
    setPending(true);
    setNotice("");
    const client = getOaSupabaseBrowserClient();
    if (!client) {
      evaluate(null);
      setPending(false);
      return;
    }
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setNotice("Sign-in failed. OA content stays closed.");
      evaluate(null);
      setPending(false);
      return;
    }
    evaluate(data.user);
    setPending(false);
  }

  if (checking) {
    return <OaAdminAuthState reason="checking" />;
  }

  if (!phase.ok) {
    return (
      <OaAdminAuthState
        reason={phase.reason}
        notice={notice}
        pending={pending}
        onSignIn={phase.reason === "auth_required" ? signIn : undefined}
      />
    );
  }

  return children;
}
