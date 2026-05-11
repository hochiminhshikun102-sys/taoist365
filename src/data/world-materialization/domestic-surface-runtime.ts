import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Domestic surfaces accrue truth: laminate seam lift, drawer shy of shut, towel half-dried.",
  "The table remembers meals as faint rings and knife stops—not a moodboard.",
  "Countertops carry soap film honestly where hands actually rinsed.",
  "Shelf dust lines follow objects moved inches, not seasonal re-styling.",
] as const;

export function pickDomesticSurfaceLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:dom-surf:${age}`, LINES.length);
  return LINES[i] ?? LINES[0];
}
