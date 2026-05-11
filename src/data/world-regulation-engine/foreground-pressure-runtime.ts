import type { RuntimeFatigueBalance } from "./runtime-fatigue-balancer";
import { dailyIndex } from "@/lib/living-day-key";

/** 0–1，越高越要把 foreground 让给少数通道。 */
export function foregroundPressure(f: RuntimeFatigueBalance, dayKey: string): number {
  const base = (f.materializationLoad + f.lowSignalLoad + f.ageLoad) / 3;
  const j = dailyIndex(`${dayKey}:fg-press`, 20) / 100;
  return Math.min(0.95, base * 0.85 + j * 0.15);
}
