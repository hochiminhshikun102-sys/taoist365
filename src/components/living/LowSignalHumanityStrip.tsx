"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

export function LowSignalHumanityStrip() {
  const { lowSignalHumanity, structuralSilence } = useWorldRuntime();
  if (!structuralSilence.ambientVisibility.showHomeLowSignalStrip) return null;

  return (
    <div className="max-w-xl rounded-xl border border-border-subtle/10 bg-background/20 px-4 py-4 sm:px-5 sm:py-4">
      <p className="text-[0.62rem] tracking-[0.06em] text-text-muted/48">Quiet traces in the room</p>
      <div className="mt-3 space-y-2.5 text-[0.68rem] leading-[1.62] text-text-muted/56">
        <p>{lowSignalHumanity.residualPresenceLine}</p>
        <p>{lowSignalHumanity.quietReturnLine}</p>
        <p>{lowSignalHumanity.usageSedimentLine}</p>
        <p>{lowSignalHumanity.structuralMemoryLine}</p>
        <p>{structuralSilence.sectionFallthroughLine}</p>
      </div>
    </div>
  );
}
