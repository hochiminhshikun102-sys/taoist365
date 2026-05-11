import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type SoftCollapse = {
  homeSoftCollapse: boolean;
  guidanceSoftCollapse: boolean;
  dailySoftCollapse: boolean;
};

export function resolveSoftCollapse(dayKey: string, structural: StructuralSilenceBundle): SoftCollapse {
  const h = dailyIndex(`${dayKey}:soft-col`, 100);
  const tired = structural.explanationFatigue.guidance === "minimal";
  return {
    homeSoftCollapse: h > 72 || tired,
    guidanceSoftCollapse: tired && h > 58,
    dailySoftCollapse: structural.structuralAbsence.hideDailyResidualBlock || h > 76,
  };
}
