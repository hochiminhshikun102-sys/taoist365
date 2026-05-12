"use client";

import { deskCirculationLine } from "@/data/living-presence-runtime/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

/** Sparse desk margin — climate + domestic rhythm + occasional circulation. */
export function DeskTemporalNote() {
  const { presence, rhythm, aging } = useWorldRuntime();
  const deskLine = deskCirculationLine(presence.dayKey, presence.worldId);

  return (
    <div className="mt-4 max-w-2xl space-y-2 rounded-xl border border-border-subtle/16 bg-background/32 px-4 py-3">
      <p className="text-[0.62rem] leading-5 text-text-muted/54">
        Same day as Home today · <span className="text-text-muted/68">{presence.worldLabel}</span>.
      </p>
      <p className="text-[0.62rem] leading-5 text-text-muted/52">{rhythm.atmosphereSummary}</p>
      <p className="text-[0.62rem] leading-5 text-text-muted/50">{rhythm.interruptionLine}</p>
      <p className="text-[0.62rem] leading-5 text-text-muted/50">{aging.roomDustLine}</p>
      <p className="text-[0.62rem] leading-5 text-text-muted/50">{presence.browserTemporalLine}</p>
      {deskLine ? <p className="text-[0.62rem] leading-5 text-text-muted/56">{deskLine}</p> : null}
    </div>
  );
}
