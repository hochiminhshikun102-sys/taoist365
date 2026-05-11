"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

export function ResidualSuppressionLine() {
  const { worldDensity } = useWorldRuntime();
  const line = worldDensity.residueSuppressionLine;
  if (!line) return null;
  return <p className="text-[0.62rem] leading-[1.58] text-text-muted/40">{line}</p>;
}
