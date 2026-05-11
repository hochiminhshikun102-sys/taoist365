import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "./world-age-state";

const recurrenceLines: readonly string[] = [
  "This line feels familiar in a way that is hard to place.",
  "A sentence from weeks ago returns quietly.",
  "One residue phrase has reappeared after a long gap.",
  "A room-weather line loops back without exact repetition.",
  "The same corner sentence has come around again.",
];

export function pickSlowMemoryRecurrence(age: WorldAgeStateId, dayKey: string): string | null {
  const cycle = dailyIndex(dayKey + ":rec-cycle:" + age, 28);
  if (cycle > 9) return null;
  return recurrenceLines[dailyIndex(dayKey + ":rec-line:" + cycle, recurrenceLines.length)]!;
}
