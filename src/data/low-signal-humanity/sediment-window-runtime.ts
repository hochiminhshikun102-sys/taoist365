import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type SedimentWindow = {
  holdDays: number;
  recurrenceBias: number;
  note: string;
};

export function sedimentWindow(age: WorldAgeStateId, dayKey: string): SedimentWindow {
  const base =
    age === "worn-in-cycle" || age === "old-browser-period"
      ? 21
      : age === "long-static-period" || age === "slow-drift-month"
        ? 14
        : 10;
  const offset = dailyIndex(dayKey + ":sed-win:" + age, 3);
  return {
    holdDays: base + offset,
    recurrenceBias: Math.min(0.88, 0.35 + base / 40),
    note: "Low rotation window for residue/object echoes.",
  };
}
