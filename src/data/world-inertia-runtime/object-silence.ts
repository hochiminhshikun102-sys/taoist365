import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const objectSilenceLines = [
  "One object has gone unmentioned for a long stretch.",
  "A mug stayed beside the keyboard without being called out.",
  "A tray remained under papers and stopped asking for description.",
  "Notebook weight persisted while wording moved around it.",
];

export function pickObjectSilence(age: WorldAgeStateId, dayKey: string): string {
  return objectSilenceLines[dailyIndex(dayKey + ":obj-sil:" + age, objectSilenceLines.length)]!;
}
