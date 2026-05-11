import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const ambientRepeats: readonly string[] = [
  "Copy repeats on rotation.",
  "Phrases recycle weekly.",
  "Same footer line.",
  "Static boilerplate.",
];

export function pickAmbientRepetition(age: WorldAgeStateId, dayKey: string): string {
  const offset = age === "worn-in-cycle" || age === "old-browser-period" ? ":slow" : ":base";
  return ambientRepeats[dailyIndex(dayKey + ":ambrep:" + offset, ambientRepeats.length)]!;
}
