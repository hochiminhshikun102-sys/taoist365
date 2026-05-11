import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const backgroundPresenceLines: readonly string[] = [
  "Same hostname.",
  "Bookmark still works.",
  "No sync banner.",
  "Browser chrome only.",
];

export function pickBackgroundPresence(age: WorldAgeStateId, dayKey: string): string {
  return backgroundPresenceLines[dailyIndex(dayKey + ":bg-pres:" + age, backgroundPresenceLines.length)]!;
}
