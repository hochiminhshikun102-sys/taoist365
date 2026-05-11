import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

/** Plain night facts—no lonely-core, no sad-night staging. */
const LATE_LINES: readonly string[] = [
  "Browser still open at 1:12—tab bar older than tonight’s pour.",
  "Kitchen light only half on—switch stopped halfway honest.",
  "Kettle reheated twice—same mug, cooler patience.",
  "One tab surviving several evenings—hostname unchanged, urgency thinned.",
  "Room quieter than earlier this week—fewer doors borrowing sound.",
  "Phone face-down—LED bleeds under the edge, ordinary.",
  "Ice maker fires while nobody is hungry yet.",
  "Radiator tick outlasts one more paragraph.",
];

export function pickLateNightContinuity(
  dayKey: string,
  worldId: WorldStateId,
  localHour: number,
): string | null {
  const nightish = localHour >= 22 || localHour < 6 || worldId === "late-night-desk-season";
  if (!nightish) return null;
  const pool = LATE_LINES;
  return pool[dailyIndex(dayKey + ":late" + localHour, pool.length)]!;
}
