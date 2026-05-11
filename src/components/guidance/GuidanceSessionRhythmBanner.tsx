"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

/** Thin session marker — no rhythm/atmosphere stack. */
export function GuidanceSessionRhythmBanner() {
  const { inertia, browserReality, runtimeRetirement } = useWorldRuntime();
  if (browserReality.guidancePassiveSurface.passiveOpenGuidance || runtimeRetirement.guidanceRetirement.ultraMinimalRoom) {
    return null;
  }

  return (
    <div className="taoist-quiet-field mt-6 rounded-xl border border-border-subtle bg-surface px-5 py-3">
      <p className="text-[0.62rem] leading-[1.55] text-text-muted/52">{inertia.layoutStabilityLine}</p>
    </div>
  );
}
