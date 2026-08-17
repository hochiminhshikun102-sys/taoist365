"use client";

import { useState } from "react";

import { updatePasswordAndLoadSession } from "@/lib/auth/callback-flow.js";
import { fetchTrustedSession } from "@/lib/auth/private-api";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ServerSessionDto } from "@/lib/auth/identity";

type Phase = "idle" | "loading" | "error" | "success";

type VisibleIdentity = {
  user_id: ServerSessionDto["user_id"];
  roles: ServerSessionDto["roles"];
  account_status: ServerSessionDto["account_status"];
  member_id: ServerSessionDto["member_id"];
  windseeker_id: ServerSessionDto["windseeker_id"];
};

export function SetPasswordForm({ flowLabel }: { flowLabel: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [note, setNote] = useState("");
  const [identity, setIdentity] = useState<VisibleIdentity | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPhase("loading");
    setNote("");
    if (password !== confirm) {
      setPhase("error");
      setNote("The two passwords do not match.");
      return;
    }
    const result = await updatePasswordAndLoadSession({
      updateUser: (payload) => getSupabaseBrowserClient().auth.updateUser(payload),
      fetchTrustedSession,
      password,
    });
    setPassword("");
    setConfirm("");
    if (!result.ok) {
      setPhase("error");
      setNote(result.error);
      return;
    }
    setIdentity({
      user_id: result.identity.user_id ?? null,
      roles: Array.isArray(result.identity.roles) ? result.identity.roles : [],
      account_status: result.identity.account_status ?? null,
      member_id: result.identity.member_id ?? null,
      windseeker_id: result.identity.windseeker_id ?? null,
    });
    setPhase("success");
    setNote("Password saved. Identity is from GET /api/account/session.");
  }

  return (
    <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground sm:px-6">
      <section className="mx-auto flex min-h-[82dvh] w-full max-w-xl flex-col justify-center">
        <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">P0-00C Preview {flowLabel}</p>
        <h1 data-testid="p0-00c-set-password" className="mt-3 text-2xl font-normal leading-tight">
          Set a new password
        </h1>
        <p className="mt-4 text-sm leading-7 text-text-secondary">
          Invite and recovery sessions can set a password here. Ordinary login callbacks do not use this form.
        </p>
        {identity ? (
          <div className="mt-7 space-y-3 border-t border-border-subtle/70 pt-5 text-sm">
            <p>status: {phase}</p>
            <p>user_id: {identity.user_id}</p>
            <p>roles: {(identity.roles || []).join(", ") || "(none)"}</p>
            <p>account_status: {identity.account_status}</p>
            <p className="text-text-muted">{note}</p>
            <a href="/preview/p0-00c" className="inline-block border border-border-subtle bg-white/60 px-3 py-2 text-xs">
              Continue
            </a>
          </div>
        ) : (
          <form onSubmit={(event) => void submit(event)} className="mt-7 space-y-4 border-t border-border-subtle/70 pt-5">
            <label className="block text-xs leading-6 text-text-muted" htmlFor="p0-00c-new-password">
              New password
            </label>
            <input
              id="p0-00c-new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-border-subtle bg-white/55 px-3 py-2 text-sm outline-none focus:border-border-default"
            />
            <label className="block text-xs leading-6 text-text-muted" htmlFor="p0-00c-confirm-password">
              Confirm password
            </label>
            <input
              id="p0-00c-confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="w-full border border-border-subtle bg-white/55 px-3 py-2 text-sm outline-none focus:border-border-default"
            />
            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={phase === "loading"}
                className="border border-border-subtle bg-white/60 px-3 py-2 text-xs text-text-secondary"
              >
                {phase === "loading" ? "Working…" : "Save password"}
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
