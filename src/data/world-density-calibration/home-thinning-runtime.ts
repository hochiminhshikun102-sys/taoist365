import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type HomeThinning = {
  openingStabilityLine: string | null;
  thinDailyEcho: boolean;
};

export function resolveHomeThinning(dayKey: string, structural: StructuralSilenceBundle): HomeThinning {
  const h = dailyIndex(`${dayKey}:home-thin`, 100);
  const thinDailyEcho = structural.structuralAbsence.hideDailyResidualBlock || h > 74;
  return {
    openingStabilityLine:
      h > 58
        ? "Home is allowed to look the same for years—no daily reintroduction, no launch energy."
        : null,
    thinDailyEcho,
  };
}
