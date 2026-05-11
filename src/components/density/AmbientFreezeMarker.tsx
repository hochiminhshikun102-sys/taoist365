"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

export function AmbientFreezeMarker() {
  const { worldDensity } = useWorldRuntime();
  const f = worldDensity.ambientFreeze;
  if (!f.freezeActive || !f.freezeLine) return null;

  return (
    <p className="text-[0.6rem] leading-[1.55] text-text-muted/36">
      <span className="text-text-muted/30">Freeze · {f.freezeWindowLabel} · </span>
      {f.freezeLine}
    </p>
  );
}
