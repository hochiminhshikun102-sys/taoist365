import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const returnLines = [
  "This page was likely opened again without announcement.",
  "The same browser path probably held this block for a while.",
  "Room traces seem to have survived another quiet week.",
  "A familiar page likely stayed in history and reopened later.",
];

export function pickQuietHumanReturn(age: WorldAgeStateId, dayKey: string): string {
  return returnLines[dailyIndex(dayKey + ":quiet-return:" + age, returnLines.length)]!;
}
