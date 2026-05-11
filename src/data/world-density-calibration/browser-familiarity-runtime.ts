import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Browser familiarity: favicon and title bar read like furniture, not a launch announcement.",
  "Back-forward muscle memory applies—this domain does not re-introduce itself loudly.",
  "Old-browser presence means uneven font rendering and honest defaults, not a retro skin.",
  "Tab residue: the same domain string, same width, same quiet load—continuity without a feed.",
] as const;

export function pickBrowserFamiliarityLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:browser-fam:${age}`, LINES.length);
  return LINES[i] ?? LINES[0];
}
