"use client";

import { useEffect, useState } from "react";
import { PERSONAL_RESIDUE_KEYS } from "@/lib/personal-residue-keys";

/** Scratch + short phrases—persisted only in localStorage; no accounts, no sync. */
export function DeskScratch() {
  const [scratch, setScratch] = useState("");
  const [phrases, setPhrases] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
      setScratch(localStorage.getItem(PERSONAL_RESIDUE_KEYS.deskScratch) ?? "");
      setPhrases(localStorage.getItem(PERSONAL_RESIDUE_KEYS.deskPhrases) ?? "");
    } catch {
      // Private mode or blocked storage—still usable for the session.
    }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(PERSONAL_RESIDUE_KEYS.deskScratch, scratch);
    } catch {
      // Ignore quota / privacy blocks.
    }
  }, [scratch, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(PERSONAL_RESIDUE_KEYS.deskPhrases, phrases);
    } catch {
      // Ignore quota / privacy blocks.
    }
  }, [phrases, ready]);

  return (
    <div className="mt-8 space-y-10 print:space-y-6">
      <div>
        <p className="text-xs text-text-muted/78">Scratch</p>
        <p className="mt-1 max-w-2xl text-[0.68rem] leading-5 text-text-muted/52">
          Longer drift—half sentences and stalled lines can stay; nothing asks you to finish for storage quotas.
        </p>
        <textarea
          value={scratch}
          onChange={(e) => setScratch(e.target.value)}
          disabled={!ready}
          spellCheck={false}
          aria-label="Scratch notes kept in this browser only"
          rows={14}
          className="taoist-ritual-shell mt-4 min-h-[16rem] w-full resize-y rounded-2xl border border-border-subtle/34 bg-background/85 p-5 font-mono text-sm leading-7 text-text-secondary shadow-none outline-none ring-0 transition placeholder:text-text-muted/45 focus:border-border-subtle/48 disabled:opacity-60 print:min-h-0 print:border-0 print:bg-white print:p-4 print:text-black"
          placeholder={
            ready
              ? "Leave a fragment open—clears only if you erase this site's data in this browser."
              : ""
          }
        />
      </div>

      <div className="print:hidden">
        <p className="text-xs text-text-muted/78">Phrases</p>
        <p className="mt-1 max-w-2xl text-[0.68rem] leading-5 text-text-muted/52">
          Shorter lines you might paste again—still local-only, not a snippet manager.
        </p>
        <textarea
          value={phrases}
          onChange={(e) => setPhrases(e.target.value)}
          disabled={!ready}
          spellCheck={false}
          aria-label="Short phrases kept in this browser only"
          rows={6}
          className="taoist-ritual-shell mt-4 min-h-[9rem] w-full resize-y rounded-2xl border border-border-subtle/30 bg-background/82 p-4 font-mono text-sm leading-7 text-text-secondary shadow-none outline-none ring-0 transition placeholder:text-text-muted/45 focus:border-border-subtle/46 disabled:opacity-60"
          placeholder={
            ready ? "Odd phrases you might reuse—no folders, no tags, no tidy inbox." : ""
          }
        />
      </div>
    </div>
  );
}
