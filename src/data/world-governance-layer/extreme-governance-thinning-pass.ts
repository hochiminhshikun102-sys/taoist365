import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { FatigueLevel } from "@/data/runtime-retirement-system/world-fatigue-runtime";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import type { BackgroundPageDensity } from "@/data/structural-silence-engine/background-page-density";
import { dailyIndex } from "@/lib/living-day-key";

function fatigueScalar(level: FatigueLevel): number {
  switch (level) {
    case "almostAbsent":
      return 0.17;
    case "resting":
      return 0.12;
    case "tired":
      return 0.085;
    case "thinning":
      return 0.048;
    default:
      return 0;
  }
}

function pageEnergyScalar(pe: BackgroundPageDensity): number {
  if (pe === "empty" || pe === "residual") return 0.052;
  if (pe === "still" || pe === "heavy") return 0.036;
  if (pe === "thin" || pe === "faded") return 0.02;
  return 0.012;
}

function structuralAbsencePressure(structuralSilence: StructuralSilenceBundle): number {
  const sa = structuralSilence.structuralAbsence;
  let p = 0;
  if (sa.hideDailyResidualBlock) p += 0.048;
  if (sa.hideMailExplanatoryBlock) p += 0.028;
  if (sa.hideHomeAside) p += 0.022;
  if (sa.hideRitualTrace) p += 0.015;
  return Math.min(0.14, p);
}

/**
 * Phase H（治理极端）— 叠在 `ambientStructuralThinning` 之上：
 * ecology（疲劳 + pageEnergy + structural absence）推高 prose bias，压低频道带宽。
 */
export function resolveGovernanceStructuralThinningPass(
  structuralSilence: StructuralSilenceBundle,
  fatigueLevel: FatigueLevel,
  ambient: StructuralThinningPass,
): StructuralThinningPass {
  const h = dailyIndex(`${structuralSilence.dayKey}:gov-extreme-thin`, 100);
  const ecologyPressure = Math.min(
    1,
    fatigueScalar(fatigueLevel) + pageEnergyScalar(structuralSilence.pageEnergy) + structuralAbsencePressure(structuralSilence),
  );
  const govBoost = 0.024 + ecologyPressure * 0.048;
  const combinedProseBias = Math.min(0.99, ambient.combinedProseBias + govBoost);
  const stripGov =
    combinedProseBias > 0.84 ? 2 : combinedProseBias > 0.74 ? 1 : combinedProseBias > 0.62 ? 1 : 0;

  return {
    combinedProseBias,
    dailyPreferUltraThin:
      ambient.dailyPreferUltraThin ||
      (combinedProseBias > 0.46 && h > 26) ||
      (combinedProseBias > 0.54 && h > 22) ||
      ecologyPressure > 0.62,
    dailyForceCloseEchoes:
      ambient.dailyForceCloseEchoes || (combinedProseBias > 0.48 && h > 28) || ecologyPressure > 0.58,
    dailyForceCloseSliceNarrative:
      ambient.dailyForceCloseSliceNarrative || (combinedProseBias > 0.52 && h > 30) || ecologyPressure > 0.65,
    maturityStripModulusBonus: Math.min(6, ambient.maturityStripModulusBonus + stripGov),
    guidanceStackWeatherOnly:
      ambient.guidanceStackWeatherOnly || (combinedProseBias > 0.52 && h > 34) || ecologyPressure > 0.48,
    guidanceStackHardNoRoutes:
      ambient.guidanceStackHardNoRoutes || (combinedProseBias > 0.62 && h > 40) || ecologyPressure > 0.72,
    guidanceStackHardNoClosure:
      ambient.guidanceStackHardNoClosure || (combinedProseBias > 0.58 && h > 38) || ecologyPressure > 0.68,
    mailRetireDenseProcessBlock:
      ambient.mailRetireDenseProcessBlock || (combinedProseBias > 0.48 && h > 36) || ecologyPressure > 0.52,
  };
}
