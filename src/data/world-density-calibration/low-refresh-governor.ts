import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

/** 1 = 正常，>1 表示残留轮换更慢（概念上，与 Daily 文案池协同由消费端解释）。 */
export function lowRefreshMultiplier(age: WorldAgeStateId, dayKey: string): number {
  const w = worldAgeStateMap[age].stillnessWeight;
  const base = 1 + Math.floor(w * 2);
  const j = dailyIndex(`${dayKey}:low-refresh`, 3);
  return base + (j === 0 ? 0 : 1);
}

export function lowRefreshGovernorLine(age: WorldAgeStateId, dayKey: string): string {
  const m = lowRefreshMultiplier(age, dayKey);
  if (m <= 2) return "Rotation stays slow—same phrases are allowed to stay put.";
  return "Low refresh week: fewer novel lines; familiarity is the default, not a bug.";
}
