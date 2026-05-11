import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

export type AmbientFreeze = {
  freezeActive: boolean;
  freezeWindowLabel: string | null;
  freezeLine: string | null;
};

/** 21–60 天概念冻结：用 dayKey 哈希模拟“这句已停很久”。 */
export function resolveAmbientFreeze(age: WorldAgeStateId, dayKey: string): AmbientFreeze {
  const h = dailyIndex(`${dayKey}:amb-freeze:${age}`, 100);
  const freezeActive = h > 68;
  if (!freezeActive) {
    return { freezeActive: false, freezeWindowLabel: null, freezeLine: null };
  }
  const span = 21 + (dailyIndex(`${dayKey}:freeze-span`, 40) % 40);
  return {
    freezeActive: true,
    freezeWindowLabel: `${span}+ days`,
    freezeLine:
      "A line froze in place long enough to feel like furniture—not stuck, just stable.",
  };
}
