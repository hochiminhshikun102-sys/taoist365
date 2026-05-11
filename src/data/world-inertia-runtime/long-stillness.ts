import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const stillnessLines: Record<WorldAgeStateId, readonly string[]> = {
  "newly-settled": ["Same tabs as yesterday."],
  "quietly-lived-in": ["URLs unchanged."],
  "heavy-air-season": ["Blocks stay put."],
  "slow-drift-month": ["Order stable."],
  "long-static-period": ["No section shuffle."],
  "late-year-room": ["Skeleton fixed."],
  "old-browser-period": ["Long-lived layout."],
  "worn-in-cycle": ["Infrastructure-quiet."],
};

export function pickLongStillness(age: WorldAgeStateId, dayKey: string): string {
  const pool = stillnessLines[age];
  return pool[dailyIndex(dayKey + ":still:" + age, pool.length)]!;
}
