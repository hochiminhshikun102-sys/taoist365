import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "./world-age-state";

const forgettingLines: readonly string[] = [
  "One object appears less often now and mostly stays implied.",
  "A familiar echo rotates slower, then slips to background.",
  "A ritual page has gone quieter without being removed.",
  "Some residue no longer needs to appear daily to remain true.",
  "One recurring line now returns only occasionally.",
];

export function pickSlowForgetting(age: WorldAgeStateId, dayKey: string): string | null {
  const gateBase = age === "worn-in-cycle" || age === "long-static-period" ? 70 : 50;
  const gate = dailyIndex(dayKey + ":forget-gate:" + age, 100);
  if (gate > gateBase) return null;
  return forgettingLines[dailyIndex(dayKey + ":forget-line:" + age, forgettingLines.length)]!;
}
