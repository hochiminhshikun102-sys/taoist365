import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import type { PermanenceThinningPass } from "@/data/world-post-product-continuity-layer/permanence-thinning-pass";
import { dailyIndex } from "@/lib/living-day-key";

/**
 * Phase H（重度）— 叠在 `permanencePass` 之上：更激进的默认安静，仍全静态、无用户记忆。
 */
export type StructuralThinningPass = {
  /** 综合偏置；UI 优先用此值做「多安静」判断 */
  combinedProseBias: number;
  dailyPreferUltraThin: boolean;
  dailyForceCloseEchoes: boolean;
  dailyForceCloseSliceNarrative: boolean;
  /** 叠在 `maturityStripModulus` 上：总模数 = 基础 + bonus */
  maturityStripModulusBonus: number;
  guidanceStackWeatherOnly: boolean;
  guidanceStackHardNoRoutes: boolean;
  guidanceStackHardNoClosure: boolean;
  mailRetireDenseProcessBlock: boolean;
  runtimeOvergrowthPressure?: number;
  suppressResidueAccumulation?: boolean;
  suppressAtmosphericHeaviness?: boolean;
  suppressFeatureTemptation?: boolean;
  civilizationDensityReleaseLine?: string;
};

export function resolveStructuralThinningPass(
  aging: WorldAgingBundle,
  worldRegulation: WorldRegulationBundle,
  runtimeRetirement: RuntimeRetirementBundle,
  base: PermanenceThinningPass,
  equilibriumPressure: number,
  objectRoomBias: number,
): StructuralThinningPass {
  void worldRegulation;
  const m = worldAgeStateMap[aging.ageStateId];
  const h = dailyIndex(`${aging.dayKey}:struct-thin`, 100);
  const combinedProseBias = Math.min(
    0.99,
    base.proseCollapseBias + equilibriumPressure * 0.12 + objectRoomBias * 0.09 + m.silenceWeight * 0.05,
  );
  const fatigue = runtimeRetirement.worldFatigue.fatigueLevel;
  const tired = fatigue === "tired" || fatigue === "resting" || fatigue === "almostAbsent";

  return {
    combinedProseBias,
    dailyPreferUltraThin: (combinedProseBias > 0.62 && h > 40) || (tired && h > 35),
    dailyForceCloseEchoes: combinedProseBias > 0.66 && h > 44,
    dailyForceCloseSliceNarrative: combinedProseBias > 0.72 && h > 48,
    maturityStripModulusBonus: combinedProseBias > 0.8 ? 2 : combinedProseBias > 0.7 ? 1 : 0,
    guidanceStackWeatherOnly: combinedProseBias > 0.7 && h > 46,
    guidanceStackHardNoRoutes: combinedProseBias > 0.82 && h > 52,
    guidanceStackHardNoClosure: combinedProseBias > 0.78 && h > 50,
    mailRetireDenseProcessBlock: combinedProseBias > 0.63 && h > 48,
  };
}
