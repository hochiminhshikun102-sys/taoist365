import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const memoryLines = [
  "An unfinished phrase has returned again.",
  "The same object coordinate reappeared in a low-key way.",
  "A familiar room sentence came back quietly.",
  "A guidance fragment repeated without fanfare.",
];

export function pickHumanSignalMemory(age: WorldAgeStateId, dayKey: string): string {
  return memoryLines[dailyIndex(dayKey + ":human-signal-mem:" + age, memoryLines.length)]!;
}
