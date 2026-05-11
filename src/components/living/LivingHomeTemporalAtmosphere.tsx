"use client";

import { LivingTemporalVeil } from "@/components/living/LivingTemporalVeil";
import { useWorldRuntime } from "@/lib/use-world-runtime";

const RHYTHM_HEAVY = new Set([
  "slow-laundry-week",
  "late-night-desk-season",
  "grey-afternoon",
  "quiet-hallway-week",
  "colder-evening",
]);

/** Client-only tint — climate veil + barely-there fatigue layer on heavier domestic weeks. */
export function LivingHomeTemporalAtmosphere() {
  const { presence, rhythm } = useWorldRuntime();
  const fatigue = RHYTHM_HEAVY.has(rhythm.worldId);

  return (
    <>
      <LivingTemporalVeil profile={presence.visualProfile} />
      {fatigue ? (
        <div
          className="pointer-events-none absolute inset-0 z-[0] opacity-[0.92]"
          aria-hidden
          style={{
            background:
              "linear-gradient(195deg, rgba(38,36,33,0.034) 0%, transparent 42%, rgba(52,48,44,0.022) 100%)",
          }}
        />
      ) : null}
    </>
  );
}
