import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES: Record<WorldAgeStateId, readonly string[]> = {
  "newly-settled": ["Paper still wants to stay flat—edges resist a curl.", "Envelopes keep their factory stiffness a little longer."],
  "quietly-lived-in": ["Paper softens at the fold first, then along the margin where you thumb it.", "Sheets pick up a slight tooth where the clip sat too long."],
  "heavy-air-season": ["Humid weeks leave paper limp at the corners; ink feathers if you press.", "Stacks compress—edges go matte instead of bright."],
  "slow-drift-month": ["Paper yellows unevenly where sun actually hits, not as a filter.", "Old receipts thin until the fibers show honest wear."],
  "long-static-period": ["Margins carry a grey lift from repeated checking, not from tea theatrics.", "Notebook paper cups toward the spine from being opened the same width every time."],
  "late-year-room": ["Paper near the lamp has gone quieter in contrast—less fight with the bulb.", "Envelopes show a soft bend where they waited in the tray."],
  "old-browser-period": ["Paper behaves like something left open on a desk for seasons.", "Edges round; corners stop announcing themselves."],
  "worn-in-cycle": ["Paper reads like a tool, not a prop—thin where truth is, thick where hands rested.", "Sheets keep the memory of pressure more than pattern."],
};

export function pickPaperAgingLine(age: WorldAgeStateId, dayKey: string): string {
  const pool = LINES[age];
  const i = dailyIndex(`${dayKey}:paper-aging`, pool.length);
  return pool[i] ?? pool[0];
}
