"use client";

import { useState } from "react";

import { quietAdminAccess } from "@/config/admin-access";

function readStoredAccess() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(quietAdminAccess.storageKey) === quietAdminAccess.storageValue;
}

export function QuietAdminAccess({ children }: Readonly<{ children: React.ReactNode }>) {
  const [phrase, setPhrase] = useState("");
  const [isOpen, setIsOpen] = useState(readStoredAccess);
  const [note, setNote] = useState("");

  function enterAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!quietAdminAccess.enabled) {
      setNote("This static build needs a quiet phrase or host-level access.");
      return;
    }

    if (phrase.trim() !== quietAdminAccess.phrase) {
      setPhrase("");
      setNote("Still closed.");
      return;
    }

    window.sessionStorage.setItem(quietAdminAccess.storageKey, quietAdminAccess.storageValue);
    setIsOpen(true);
  }

  if (isOpen) {
    return children;
  }

  return (
    <main className="min-h-dvh bg-[#eef1f4] px-4 py-6 text-foreground sm:px-6">
      <section className="mx-auto flex min-h-[82dvh] w-full max-w-xl flex-col justify-center">
        <p className="text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">Quiet access</p>
        <h1 className="mt-3 text-2xl font-normal leading-tight text-foreground">Reverent Inquiry</h1>
        <p className="mt-4 text-sm leading-7 text-text-secondary">
          Access shell only. This room is for quiet maintenance and guardrail repair.
        </p>

        <form onSubmit={enterAdmin} className="mt-7 space-y-4 border-t border-border-subtle/70 pt-5">
          <label className="block text-xs leading-6 text-text-muted" htmlFor="quiet-admin-phrase">
            Phrase
          </label>
          <input
            id="quiet-admin-phrase"
            value={phrase}
            onChange={(event) => setPhrase(event.target.value)}
            type="password"
            autoComplete="off"
            className="w-full border border-border-subtle bg-white/55 px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-border-default"
          />
          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="border border-border-subtle bg-white/60 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-border-default hover:text-foreground"
            >
              Enter quietly
            </button>
            <p className="text-right text-[0.68rem] leading-5 text-text-muted">{note}</p>
          </div>
        </form>
      </section>
    </main>
  );
}
