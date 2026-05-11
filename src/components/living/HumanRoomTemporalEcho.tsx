"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

/** Human-room traces from calendar drift — not characters, not plot. */
export function HumanRoomTemporalEcho() {
  const { presence, rhythm } = useWorldRuntime();

  return (
    <aside className="rounded-xl border border-border-subtle/18 bg-background/28 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/46">Human room · time</p>
      <p className="mt-2 text-[0.7rem] leading-6 text-text-muted/68">{presence.humanRoomTemporalLine}</p>
      <p className="mt-3 text-[0.7rem] leading-6 text-text-muted/64">{rhythm.unfinishedLine}</p>
      <p className="mt-2 text-[0.7rem] leading-6 text-text-muted/60">{rhythm.interruptionLine}</p>
      <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/42">
        Ordinary residue—chairs and lamps, not cast arcs.
      </p>
    </aside>
  );
}
