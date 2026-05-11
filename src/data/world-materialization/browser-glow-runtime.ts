import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Long-open tab glow: the browser chrome carries a faint warmth next to the cooler wall.",
  "The URL bar reflects on the mug rim—small, honest screen residue.",
  "Scrollbars and margins hold a little backlight dust—not RGB theater, just late tabs.",
  "After midnight the screen becomes the main lamp; paper beside it goes one step quieter.",
] as const;

export function pickBrowserGlowLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:browser-glow:${age}`, LINES.length);
  return LINES[i] ?? LINES[0];
}
