"use client";

import { anchorPhaseIndex, useAmbientAnchor } from "@/lib/ambient-anchor";

type LivingAtmosphereTone = "default" | "evening" | "morning" | "afternoon";

const toneClass: Record<LivingAtmosphereTone, string> = {
  default: "living-atmosphere-veil--default",
  evening: "living-atmosphere-veil--evening",
  morning: "living-atmosphere-veil--morning",
  afternoon: "living-atmosphere-veil--afternoon",
};

/** Non-interactive overlay layer: micro drift + paper grain. Not a feature surface. */
export function LivingAtmosphereVeil({ tone = "default" }: { tone?: LivingAtmosphereTone }) {
  const anchor = useAmbientAnchor();
  const phase = anchorPhaseIndex(anchor);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 living-atmosphere-veil ${toneClass[tone]}`}
      style={{ animationDelay: `${phase * 2.75}s` }}
    />
  );
}
