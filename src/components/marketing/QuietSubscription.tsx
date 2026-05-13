"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { subscriptionSurface } from "@/config/frontstage-operations";

export function QuietSubscription() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    window.localStorage.setItem("taoist365-quiet-subscription-draft", email.trim());
    setSaved(true);
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-border-subtle/70 bg-white/48 p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{subscriptionSurface.title}</p>
      <p className="mt-3 text-sm leading-7 text-text-secondary">{subscriptionSurface.body}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder={subscriptionSurface.placeholder}
          className="min-h-11 flex-1 rounded-md border border-border-subtle bg-white/58 px-3 text-sm text-foreground outline-none placeholder:text-text-muted/55"
        />
        <button type="submit" className="rounded-md border border-foreground/12 bg-foreground px-4 py-2 text-sm text-white hover:bg-foreground/88">
          Keep me posted
        </button>
      </div>
      <p className="mt-3 text-xs leading-6 text-text-muted">
        {saved ? "Saved in this browser for mail setup. No list is contacted yet." : "Low-frequency only. No popup and no automated pressure."}
      </p>
    </form>
  );
}
