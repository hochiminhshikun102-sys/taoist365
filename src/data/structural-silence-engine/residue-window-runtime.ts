import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type ResidueWindow = {
  windowDays: number;
  recurrenceBias: number;
};

export function residueWindow(age: WorldAgeStateId, dayKey: string): ResidueWindow {
  const base =
    age === "worn-in-cycle" || age === "old-browser-period"
      ? 45
      : age === "long-static-period" || age === "slow-drift-month"
        ? 33
        : 21;
  const offset = dailyIndex(dayKey + ":res-window:" + age, 4);
  return {
    windowDays: base + offset,
    recurrenceBias: Math.min(0.9, 0.42 + base / 60),
  };
}
