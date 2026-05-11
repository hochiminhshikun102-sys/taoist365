import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type StructuralAbsence = {
  hideHomeAside: boolean;
  hideDailyResidualBlock: boolean;
  hideMailExplanatoryBlock: boolean;
  hideRitualTrace: boolean;
};

export function structuralAbsence(age: WorldAgeStateId, dayKey: string): StructuralAbsence {
  const seed = dailyIndex(dayKey + ":struct-absence:" + age, 100);
  const heavier = age === "worn-in-cycle" || age === "old-browser-period" || age === "long-static-period";
  const t = heavier ? 62 : 42;
  return {
    hideHomeAside: seed > t,
    hideDailyResidualBlock: seed > t + 8,
    hideMailExplanatoryBlock: seed > t + 12,
    hideRitualTrace: seed > t + 5,
  };
}
