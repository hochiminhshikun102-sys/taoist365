import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type RitualAbsence = {
  drawTraceSparse: boolean;
  dailyGuidancePartial: boolean;
  homeHarmonyShelfThin: boolean;
};

export function ritualAbsence(age: WorldAgeStateId, dayKey: string): RitualAbsence {
  const s = dailyIndex(dayKey + ":rit-abs:" + age, 100);
  return {
    drawTraceSparse: s > 46,
    dailyGuidancePartial: s > 56,
    homeHarmonyShelfThin: s > 52,
  };
}
