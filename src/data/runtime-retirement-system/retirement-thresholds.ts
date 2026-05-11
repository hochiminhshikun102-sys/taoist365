import { dailyIndex } from "@/lib/living-day-key";

/** Day-key thresholds — no user signal */
export function retirementPressure(dayKey: string): number {
  return dailyIndex(`${dayKey}:retire-press`, 100) / 100;
}
