import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Stale tab glow: the URL has been open long enough that the chrome feels warm beside the wall.",
  "The page is remembered by shape before wording—margin width, scroll stop, where the scrollbar rests.",
  "Repeated scroll familiarity: you land in the same vertical band without trying.",
  "Long-tab presence—not nostalgia, just a browser that stayed open through ordinary nights.",
] as const;

export function pickLongTabPresenceLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:long-tab:${age}`, LINES.length);
  return LINES[i] ?? LINES[0];
}
