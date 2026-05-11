import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const lines = [
  "One section falls through today without replacement.",
  "A familiar block remains absent and nothing fills the gap.",
  "The page keeps breathing with one less visible segment.",
];

export function pickSectionFallthrough(age: WorldAgeStateId, dayKey: string): string {
  return lines[dailyIndex(dayKey + ":fallthrough:" + age, lines.length)]!;
}
