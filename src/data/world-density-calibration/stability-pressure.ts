import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

/** 0–1，越高越倾向稳定、少变动。 */
export function stabilityPressure(age: WorldAgeStateId, dayKey: string): number {
  const w = worldAgeStateMap[age].stillnessWeight;
  const j = dailyIndex(`${dayKey}:stab-press`, 20) / 100;
  return Math.min(0.95, w * 0.85 + j * 0.15);
}
