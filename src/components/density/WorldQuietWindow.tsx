"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

/** Shows default quiet when several sections are absent by design. */
export function WorldQuietWindow() {
  const { worldDensity } = useWorldRuntime();
  const m = worldDensity.sectionMatrix;
  const absentCount = Object.values(m).filter(Boolean).length;
  if (absentCount < 3) return null;

  return (
    <p className="text-[0.62rem] leading-[1.58] text-text-muted/38">
      A few sections are quiet today by design. The page is still here.
    </p>
  );
}
