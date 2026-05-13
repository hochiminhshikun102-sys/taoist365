"use client";

import { useState } from "react";
import Link from "next/link";

export function QuietAiConcierge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-30 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
      {open ? (
        <section className="w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-border-subtle bg-background/96 p-4 shadow-[0_18px_60px_rgba(29,42,56,0.12)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">AI concierge</p>
              <p className="mt-2 text-sm leading-7 text-text-secondary">
                Ask for object pairing, sizing, shipping notes, or help finding a quiet gift. It stays closed unless you open it.
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-xs text-text-muted hover:text-foreground">
              Close
            </button>
          </div>
          <div className="mt-4 grid gap-2">
            <Link href="/search" className="rounded-md border border-border-subtle bg-white/54 px-3 py-2 text-sm text-text-secondary hover:bg-white">
              Find an object
            </Link>
            <Link href="/inquiry" className="rounded-md border border-border-subtle bg-white/54 px-3 py-2 text-sm text-text-secondary hover:bg-white">
              Write for human help
            </Link>
          </div>
        </section>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full border border-border-subtle bg-background/90 px-4 py-2 text-xs text-text-secondary shadow-[0_10px_30px_rgba(29,42,56,0.08)] hover:bg-white"
      >
        Concierge
      </button>
    </div>
  );
}
