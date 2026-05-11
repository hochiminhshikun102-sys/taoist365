import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const longPresenceMemoryLines: readonly string[] = [
  "The same object coordinate keeps reappearing in quiet ways.",
  "A familiar room phrase has returned again.",
  "One residue sentence persists across multiple visits.",
  "Guidance wording loops back without exact repetition.",
];

export function pickLongPresenceMemory(age: WorldAgeStateId, dayKey: string): string {
  return longPresenceMemoryLines[dailyIndex(dayKey + ":long-mem:" + age, longPresenceMemoryLines.length)]!;
}
