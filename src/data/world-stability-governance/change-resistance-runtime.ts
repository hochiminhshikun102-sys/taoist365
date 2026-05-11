import { dailyIndex } from "@/lib/living-day-key";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";

export function resolveChangeResistance(dayKey: string, structural: StructuralSilenceBundle): number {
  const h = dailyIndex(`${dayKey}:ch-res`, 100);
  const pe = structural.pageEnergy;
  const quiet = pe === "still" || pe === "heavy" || pe === "empty" || pe === "residual" ? 0.14 : 0;
  return Math.min(0.93, 0.3 + h / 280 + quiet);
}
