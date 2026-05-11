import { dailyIndex } from "@/lib/living-day-key";

/** Deterministic “no prose” days for object surfaces — UI may hide blocks */
export function objectNonDisplayDay(dayKey: string): boolean {
  return dailyIndex(`${dayKey}:obj-nondisp`, 100) > 82;
}
