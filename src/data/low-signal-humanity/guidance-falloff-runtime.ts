import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const oneLiners = [
  "Room settled; no further instruction needed.",
  "One line is enough for this pass.",
  "Noticing can stop here.",
  "Silence is a valid ending.",
];

export function guidanceFalloff(age: WorldAgeStateId, dayKey: string): {
  allowSecondRound: boolean;
  allowRoute: boolean;
  line: string;
} {
  const highFalloff = age === "worn-in-cycle" || age === "old-browser-period" || age === "long-static-period";
  const allowSecondRound = !highFalloff;
  const routeGate = dailyIndex(dayKey + ":guide-falloff-route:" + age, 100);
  return {
    allowSecondRound,
    allowRoute: routeGate < (highFalloff ? 40 : 72),
    line: oneLiners[dailyIndex(dayKey + ":guide-falloff-line:" + age, oneLiners.length)]!,
  };
}
