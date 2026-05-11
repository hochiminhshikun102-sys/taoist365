import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";

export function resolveRuntimeRetirementPressure(dayKey: string, aging: WorldAgingBundle): number {
  const h = dailyIndex(`${dayKey}:rt-ret`, 100);
  const ageBias =
    aging.ageStateId === "old-browser-period" || aging.ageStateId === "worn-in-cycle" ? 0.18 : 0.06;
  return Math.min(0.92, 0.28 + h / 260 + ageBias);
}
