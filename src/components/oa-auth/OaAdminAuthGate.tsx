"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { decideOaAccess, type OaAuthDecision } from "@/lib/oa-auth/oaAuthClaims";
import {
  fetchOaServerSession,
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
  const generationRef = useRef(0);

  const close = useCallback((reason: Extract<OaAuthDecision, { ok: false }>) => {
    setPhase(reason);
    setChecking(false);
  }, []);

  const refreshFromServer = useCallback(async (accessToken: string | null) => {
    const generation = ++generationRef.current;
    const previewRuntime = isOaPreviewRuntime();
    const publicEnvPresent = hasOaSupabasePublicEnv();

    if (!previewRuntime || !publicEnvPresent) {
      if (generation !== generationRef.current) return;
      setPhase(
        decideOaAccess({
          previewRuntime,
          publicEnvPresent,
          httpStatus: null,
          body: null,
        }),
      );
      setChecking(false);
      return;
    }

    if (!accessToken) {
      if (generation !== generationRef.current) return;
      setPhase({ ok: false, reason: "auth_required" });
      setChecking(false);
      return;
    }

    try {
      const result = await fetchOaServerSession(accessToken);
      if (generation !== generationRef.current) return;
      setPhase(
        decideOaAccess({
          previewRuntime: true,
          publicEnvPresent: true,
          httpStatus: result.status,
          body: result.body,
        }),
      );
    } catch {
      if (generation !== generationRef.current) return;
      setPhase({ ok: false, reason: "auth_required" });
    } finally {
      if (generation === generationRef.current) setChecking(false);
    }
  }, []);

  useEffect(() => {
    const client = getOaSupabaseBrowserClient();
    if (!isOaPreviewRuntime() || !hasOaSupabasePublicEnv() || !client) {
      void refreshFromServer(null);
      return;
    }

    void client.auth.getSession().then(({ data, error }) => {
      const token = error ? "" : String(data.session?.access_token || "").trim();
      void refreshFromServer(token || null);
    });

    const { data: sub } = client.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        generationRef.current += 1;
        close({ ok: false, reason: "auth_required" });
        return;
      }
      const token = String(session?.access_token || "").trim();
      void refreshFromServer(token || null);
    });

    return () => {
      generationRef.current += 1;
      sub.subscription.unsubscribe();
    };
  }, [close, refreshFromServer]);

  if (checking) {
    return <OaAdminAuthState reason="checking" />;
  }

  if (!phase.ok) {
    return <OaAdminAuthState reason={phase.reason} />;
  }

  return children;
}
