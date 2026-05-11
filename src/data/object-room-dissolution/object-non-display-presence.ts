import { dailyIndex } from "@/lib/living-day-key";

export function objectNonDisplayPresenceDay(dayKey: string): boolean {
  return dailyIndex(`${dayKey}:obj-nondisp2`, 100) > 79;
}
