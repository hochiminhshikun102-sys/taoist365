import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

export type CopySoftening = "normal" | "softer" | "quiet";

const PROSE = [
  "Fewer highlights in the wording—emphasis backs off to the margin.",
  "Contrast language thins; what stays is background weight and ordinary verbs.",
  "Sections ask for less motion; sentences carry shelf speed, not pitch speed.",
  "Emotional motion goes thin—still warm, but not insistent.",
] as const;

export type VisualAgingRuntime = {
  /** Copy / section posture—no CSS filters. */
  copySoftening: CopySoftening;
  visualAgeProse: string;
};

export function resolveVisualAgingRuntime(age: WorldAgeStateId, dayKey: string): VisualAgingRuntime {
  const w = worldAgeStateMap[age].stillnessWeight;
  const copySoftening: CopySoftening = w < 0.42 ? "normal" : w < 0.68 ? "softer" : "quiet";
  const i = dailyIndex(`${dayKey}:vis-age:${age}`, PROSE.length);
  return {
    copySoftening,
    visualAgeProse: PROSE[i] ?? PROSE[0],
  };
}
