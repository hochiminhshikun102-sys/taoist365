import type { RuntimeFatigueBalance } from "./runtime-fatigue-balancer";
import { dailyIndex } from "@/lib/living-day-key";

export type NarrativeOverflow = {
  prosePressure: number;
  metaphorDensity: number;
  roomNarrationDensity: number;
  emotionLeakRisk: number;
  aestheticPressure: number;
  overflowAuditLine: string | null;
};

export function resolveNarrativeOverflow(f: RuntimeFatigueBalance, dayKey: string): NarrativeOverflow {
  const h = dailyIndex(`${dayKey}:narr-over`, 100);
  const prosePressure = Math.min(1, 0.35 + f.materializationLoad * 0.3 + f.lowSignalLoad * 0.25);
  const metaphorDensity = Math.min(1, 0.28 + h / 200);
  const roomNarrationDensity = Math.min(1, 0.32 + f.inertiaLoad * 0.35);
  const emotionLeakRisk = Math.min(1, 0.25 + f.lowSignalLoad * 0.4);
  const aestheticPressure = Math.min(1, 0.22 + f.materializationLoad * 0.35);
  const hot = prosePressure + metaphorDensity + roomNarrationDensity > 1.85;
  return {
    prosePressure,
    metaphorDensity,
    roomNarrationDensity,
    emotionLeakRisk,
    aestheticPressure,
    overflowAuditLine: hot
      ? "Overflow guard: fewer blocks and fewer metaphors today—plain room wins."
      : null,
  };
}
