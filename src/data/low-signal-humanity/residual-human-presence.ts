import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const linesByAge: Record<WorldAgeStateId, readonly string[]> = {
  "newly-settled": ["One sentence stayed unfinished in a visible place."],
  "quietly-lived-in": ["Folded linen remained on the chair without being reset."],
  "heavy-air-season": ["One route stopped being introduced and simply stayed."],
  "slow-drift-month": ["An object no longer needed naming to be understood."],
  "long-static-period": ["A room line lingered until it felt structural."],
  "late-year-room": ["One quiet phrase outlived several room climates."],
  "old-browser-period": ["A small block stayed open in browser memory terms."],
  "worn-in-cycle": ["Residual human presence now reads as default background."],
};

export function pickResidualHumanPresence(age: WorldAgeStateId, dayKey: string): string {
  const pool = linesByAge[age];
  return pool[dailyIndex(dayKey + ":low-human:" + age, pool.length)]!;
}
