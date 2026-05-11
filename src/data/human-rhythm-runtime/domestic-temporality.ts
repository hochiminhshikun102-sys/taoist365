import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

/** Ordinary housing time—not romantic domesticity. */
const DOMESTIC: readonly string[] = [
  "Weekends slower—mail lands Saturday without moral.",
  "Darker earlier—five pm borrows winter manners.",
  "Radiator week—valve tick before pride admits cold.",
  "AC hum season—compressor argues with open window.",
  "Laundry timing slipped—basket height honest.",
  "Grocery cycle uneven—receipt pile thicker mid-month.",
  "Evening kitchen reuse—same counter, second pass.",
  "Trash day remembered late—bags by door without performance.",
];

export function pickDomesticTemporality(dayKey: string, worldId: WorldStateId): string {
  const key = worldId === "radiator-week" ? dayKey + ":domR" : dayKey + ":dom";
  return DOMESTIC[dailyIndex(key, DOMESTIC.length)]!;
}
