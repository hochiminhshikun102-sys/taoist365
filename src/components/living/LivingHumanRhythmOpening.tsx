"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

/** Single structural note — no layered atmosphere prose. */
export function LivingHumanRhythmOpening() {
  const { inertia, structuralSilence } = useWorldRuntime();
  if (structuralSilence.structuralAbsence.hideHomeAside) return null;

  return (
    <div className="max-w-xl rounded-xl border border-border-subtle/12 bg-background/22 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-[0.62rem] tracking-[0.06em] text-text-muted/50">Layout</p>
      <p className="mt-3 text-[0.68rem] leading-[1.62] text-text-muted/58">{inertia.layoutStabilityLine}</p>
    </div>
  );
}
