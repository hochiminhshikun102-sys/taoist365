import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const TOUCH_MARKS = [
  "Thumb warmth on glaze where the hand always settles first.",
  "Pressure polish on wood where the wrist rests—geometry, not romance.",
  "Edge softening on the lip you never meant to favor.",
  "Tray dulling where spoons dragged without performance.",
  "Paper ghost under the clip—fibers compressed where someone checked the same line.",
] as const;

/** Per-object deterministic touch line—`pieceId` salts the pick without per-visitor profiling. */
export function pickObjectTouchSediment(pieceId: string, age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:touch:${pieceId}:${age}`, TOUCH_MARKS.length);
  return TOUCH_MARKS[i] ?? TOUCH_MARKS[0];
}
