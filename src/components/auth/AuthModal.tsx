"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchTrustedSession } from "@/lib/auth/private-api";
import { signOutAndVerifyCleared } from "@/lib/auth/logout.js";
import { trustedIdentityFromServer, type ServerSessionDto } from "@/lib/auth/identity";
import { getSupabaseBrowserClient, readSupabaseBrowserConfig } from "@/lib/supabase/client";

type Mode = "signin" | "signup" | "magic" | "reset";
type Phase = "idle" | "loading" | "error" | "success";

function messageFromUnknown(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }
  return fallback;
}

export function AuthModal() {
  const config = readSupabaseBrowserConfig();
  const [mode, setMode] = useState<Mode>("signin");
  const [phase, setPhase] = useState<Phase>("idle");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverSession, setServerSession] = useState<ServerSessionDto | null>(null);

  const identity = useMemo(() => trustedIdentityFromServer(serverSession), [serverSession]);

  useEffect(() => {
    if (!config.configured) return;
    let cancelled = false;
    const supabase = getSupabaseBrowserClient();

    async function applySessionFromServer() {
      setPhase("loading");
      try {
        const tokenProbe = await fetchTrustedSession();
        if (cancelled) return;
        if (tokenProbe.status === 401) {
          setServerSession(null);
          setPhase("idle");
          setNote("");
          return;
        }
        if (tokenProbe.status === 403) {
          setServerSession(null);
          setPhase("error");
          const restricted = tokenProbe.body.code === "ACCOUNT_RESTRICTED" ? "Account is restricted." : tokenProbe.body.error || "Permission denied.";
          const cleared = await signOutAndVerifyCleared(supabase.auth);
          setNote(cleared.ok ? restricted : `${restricted} ${cleared.error}`);
          return;
        }
        if (tokenProbe.status === 200 && tokenProbe.body.authenticated) {
          setServerSession(tokenProbe.body);
          setPhase("success");
          setNote("Server session restored.");
          return;
        }
        setServerSession(null);
        setPhase("error");
        setNote(tokenProbe.body.error || "Session request failed.");
      } catch (error) {
        if (!cancelled) {
          setPhase("error");
          setNote(messageFromUnknown(error, "Session request failed."));
        }
      }
    }

    void applySessionFromServer();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setServerSession(null);
        setPhase("idle");
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        void applySessionFromServer();
      }
    });
    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, [config.configured]);

  async function run(action: () => Promise<void>, successNote: string) {
    setPhase("loading");
    setNote("");
    try {
      await action();
      setPhase("success");
      setNote(successNote);
    } catch (error) {
      setPhase("error");
      setNote(messageFromUnknown(error, "Request failed."));
    }
  }

  async function afterPasswordAuth() {
    const result = await fetchTrustedSession();
    if (result.status === 403) {
      const cleared = await signOutAndVerifyCleared(getSupabaseBrowserClient().auth);
      setServerSession(null);
      const restricted = result.body.code === "ACCOUNT_RESTRICTED" ? "Account is restricted." : result.body.error || "Permission denied.";
      throw new Error(cleared.ok ? restricted : `${restricted} ${cleared.error}`);
    }
    if (result.status === 401) {
      setServerSession(null);
      throw new Error(result.body.error || "Authentication required.");
    }
    if (result.status !== 200 || !result.body.authenticated) {
      setServerSession(null);
      throw new Error(result.body.error || "Session request failed.");
    }
    setServerSession(result.body);
  }

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    await run(async () => {
      const { error } = await getSupabaseBrowserClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      await afterPasswordAuth();
    }, "Signed in. Identity is from GET /api/account/session.");
  }

  async function signUp(event: React.FormEvent) {
    event.preventDefault();
    await run(async () => {
      const { data, error } = await getSupabaseBrowserClient().auth.signUp({ email, password });
      if (error) throw error;
      if (!data.session) {
        setServerSession(null);
        return;
      }
      await afterPasswordAuth();
    }, "Sign-up submitted. Confirm email if Preview requires it.");
  }

  async function sendMagic(event: React.FormEvent) {
    event.preventDefault();
    await run(async () => {
      const { error } = await getSupabaseBrowserClient().auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
      setServerSession(null);
    }, "Magic link / OTP requested. Check the Preview inbox.");
  }

  async function resetPassword(event: React.FormEvent) {
    event.preventDefault();
    await run(async () => {
      const { error } = await getSupabaseBrowserClient().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      if (error) throw error;
      setServerSession(null);
    }, "Password reset requested. Check the Preview inbox.");
  }

  async function signOut() {
    await run(async () => {
      const cleared = await signOutAndVerifyCleared(getSupabaseBrowserClient().auth);
      if (!cleared.ok) {
        throw new Error(cleared.error);
      }
      setEmail("");
      setPassword("");
      setServerSession(null);
    }, "Local SDK session is null. Unexpired access JWT is not denylisted by Functions.");
  }

  if (!config.configured) {
    return (
      <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground">
        <section className="mx-auto max-w-xl pt-16">
          <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">P0-00C AuthModal</p>
          <h1 className="mt-3 text-2xl font-normal">Preview auth is not configured.</h1>
          <p className="mt-4 text-sm leading-7 text-text-secondary">
            Browser needs NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Preview. No fake success.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground sm:px-6">
      <section className="mx-auto flex min-h-[82dvh] w-full max-w-xl flex-col justify-center">
        <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">P0-00C Preview identity</p>
        <h1 className="mt-3 text-2xl font-normal leading-tight text-foreground">Sign in</h1>
        <p className="mt-4 text-sm leading-7 text-text-secondary">
          Roles come only from GET /api/account/session. Email, user_metadata, and page-written roles are not trusted.
        </p>

        {identity ? (
          <div className="mt-7 space-y-3 border-t border-border-subtle/70 pt-5 text-sm">
            <p>status: {phase}</p>
            <p>user_id: {identity.user_id}</p>
            <p>roles: {identity.roles.join(", ") || "(none)"}</p>
            <p>account_status: {identity.account_status}</p>
            <p>member_id: {identity.member_id || "null"}</p>
            <p>windseeker_id: {identity.windseeker_id || "null"}</p>
            <p className="text-text-muted">{note}</p>
            <button
              type="button"
              onClick={() => void signOut()}
              disabled={phase === "loading"}
              className="border border-border-subtle bg-white/60 px-3 py-2 text-xs text-text-secondary"
            >
              Sign out
            </button>
          </div>
        ) : (
          <form
            onSubmit={mode === "signin" ? signIn : mode === "signup" ? signUp : mode === "magic" ? sendMagic : resetPassword}
            className="mt-7 space-y-4 border-t border-border-subtle/70 pt-5"
          >
            <div className="flex flex-wrap gap-2 text-xs">
              {(["signin", "signup", "magic", "reset"] as Mode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setMode(item);
                    setNote("");
                    setPhase("idle");
                  }}
                  className={`border px-2 py-1 ${mode === item ? "border-border-default text-foreground" : "border-border-subtle text-text-muted"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="block text-xs leading-6 text-text-muted" htmlFor="p0-00c-email">
              Email
            </label>
            <input
              id="p0-00c-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="username"
              required
              className="w-full border border-border-subtle bg-white/55 px-3 py-2 text-sm outline-none focus:border-border-default"
            />
            {mode === "signin" || mode === "signup" ? (
              <>
                <label className="block text-xs leading-6 text-text-muted" htmlFor="p0-00c-password">
                  Password
                </label>
                <input
                  id="p0-00c-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  className="w-full border border-border-subtle bg-white/55 px-3 py-2 text-sm outline-none focus:border-border-default"
                />
              </>
            ) : null}
            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={phase === "loading"}
                className="border border-border-subtle bg-white/60 px-3 py-2 text-xs text-text-secondary"
              >
                {phase === "loading" ? "Working…" : "Submit"}
              </button>
              <p className="text-right text-[0.68rem] leading-5 text-text-muted" data-phase={phase}>
                {phase === "idle" ? "" : `${phase}: ${note}`}
              </p>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
