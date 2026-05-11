import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";

export function resolveChangePressure(dayKey: string, aging: WorldAgingBundle): number {
  const h = dailyIndex(`${dayKey}:chg-press`, 100);
  const ageBias = aging.ageStateId === "old-browser-period" ? 0.12 : 0.04;
  return Math.min(1, 0.28 + h / 250 + ageBias);
}
