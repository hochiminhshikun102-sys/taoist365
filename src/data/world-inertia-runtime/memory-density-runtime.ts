import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type MemoryDensity = {
  recurrenceChance: number;
  repeatWindowDays: number;
  note: string;
};

export const memoryDensityByAge: Record<WorldAgeStateId, MemoryDensity> = {
  "newly-settled": { recurrenceChance: 0.2, repeatWindowDays: 5, note: "Most lines still rotate quickly." },
  "quietly-lived-in": { recurrenceChance: 0.34, repeatWindowDays: 8, note: "Some lines begin to return." },
  "heavy-air-season": { recurrenceChance: 0.4, repeatWindowDays: 10, note: "Recurrence becomes easier to notice." },
  "slow-drift-month": { recurrenceChance: 0.52, repeatWindowDays: 14, note: "Background lines recur over longer spans." },
  "long-static-period": { recurrenceChance: 0.65, repeatWindowDays: 18, note: "Repetition is part of the room memory." },
  "late-year-room": { recurrenceChance: 0.68, repeatWindowDays: 20, note: "Old wording recurs without announcement." },
  "old-browser-period": { recurrenceChance: 0.72, repeatWindowDays: 24, note: "Long-presence echoes recur often." },
  "worn-in-cycle": { recurrenceChance: 0.78, repeatWindowDays: 28, note: "Recurrence now feels infrastructural." },
};

export function recurrenceGate(dayKey: string, age: WorldAgeStateId): boolean {
  const m = memoryDensityByAge[age];
  const gate = dailyIndex(dayKey + ":mem-gate:" + age, 100) / 100;
  return gate <= m.recurrenceChance;
}
