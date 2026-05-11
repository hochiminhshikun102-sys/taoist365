import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Hallway bulb fatigue: the warm end of the house reads dimmer than the kitchen side light.",
  "Window edge fading—brightness falls off before it reaches the desk’s far corner.",
  "Low monitor light pools on the keys; the wall behind stays darker than you remember.",
  "Uneven room brightness: one shelf catches a spill from the window, the rest stays in cloth shadow.",
  "Kitchen side light wins the counter; the table keeps a shorter day.",
] as const;

export function pickLightFalloffLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:light-fall:${age}`, LINES.length);
  return LINES[i] ?? LINES[0];
}
