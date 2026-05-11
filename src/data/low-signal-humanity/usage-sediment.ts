import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const usageSedimentLines = [
  "Wording shortened over time and stopped expanding again.",
  "Routes stabilized and now rarely reframe themselves.",
  "Some sections stopped rotating and became habitual.",
  "Repeated fragments have calcified into ambient memory.",
];

export function pickUsageSediment(age: WorldAgeStateId, dayKey: string): string {
  return usageSedimentLines[dailyIndex(dayKey + ":usage-sed:" + age, usageSedimentLines.length)]!;
}
