import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { ExplanationFatigue } from "@/data/structural-silence-engine/explanation-fatigue";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { dailyIndex } from "@/lib/living-day-key";

function fatigueTierWeight(v: ExplanationFatigue["guidance"]): number {
  return v === "minimal" ? 0.045 : v === "lighter" ? 0.024 : 0;
}

function explanationFatiguePressure(ef: ExplanationFatigue): number {
  return Math.min(
    0.14,
    fatigueTierWeight(ef.guidance) +
      fatigueTierWeight(ef.ritual) +
      fatigueTierWeight(ef.objects) +
      fatigueTierWeight(ef.mail),
  );
}

/**
 * Phase H（文明稳定化）— 叠在 `ecologyCalibratedStructuralThinning` 之上：
 * explanation fatigue + cross-runtime suppression → 更低 foreground 欲望、更少抢夺。
 */
export function resolveCivilizationStabilizedStructuralThinningPass(
  structuralSilence: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  ecologyCalibrated: StructuralThinningPass,
): StructuralThinningPass {
  const h = dailyIndex(`${structuralSilence.dayKey}:civ-stab-pass`, 100);
  const crs = worldRegulation.crossRuntimeSuppression;
  let stabPressure = explanationFatiguePressure(structuralSilence.explanationFatigue);
  if (crs.reduceHumanTraces) stabPressure += 0.036;
  if (crs.tightenGuidanceCollapse) stabPressure += 0.034;
  if (crs.thinDailyProse) stabPressure += 0.038;
  if (crs.reduceObjectForegroundCap) stabPressure += 0.028;
  if (crs.sparseRitualTraces) stabPressure += 0.024;
  stabPressure = Math.min(0.22, stabPressure);

  const civBoost = 0.011 + stabPressure * 0.44;
  const combinedProseBias = Math.min(0.99, ecologyCalibrated.combinedProseBias + civBoost);
  const stripCiv =
    combinedProseBias > 0.88 ? 2 : combinedProseBias > 0.78 ? 1 : combinedProseBias > 0.66 ? 1 : 0;

  return {
    combinedProseBias,
    dailyPreferUltraThin:
      ecologyCalibrated.dailyPreferUltraThin ||
      (combinedProseBias > 0.36 && h > 16) ||
      stabPressure > 0.1,
    dailyForceCloseEchoes:
      ecologyCalibrated.dailyForceCloseEchoes ||
      (combinedProseBias > 0.4 && h > 20) ||
      stabPressure > 0.095,
    dailyForceCloseSliceNarrative:
      ecologyCalibrated.dailyForceCloseSliceNarrative ||
      (combinedProseBias > 0.44 && h > 22) ||
      stabPressure > 0.11,
    maturityStripModulusBonus: Math.min(10, ecologyCalibrated.maturityStripModulusBonus + stripCiv),
    guidanceStackWeatherOnly:
      ecologyCalibrated.guidanceStackWeatherOnly ||
      (combinedProseBias > 0.44 && h > 26) ||
      stabPressure > 0.088 ||
      crs.tightenGuidanceCollapse,
    guidanceStackHardNoRoutes:
      ecologyCalibrated.guidanceStackHardNoRoutes ||
      (combinedProseBias > 0.54 && h > 32) ||
      stabPressure > 0.14,
    guidanceStackHardNoClosure:
      ecologyCalibrated.guidanceStackHardNoClosure ||
      (combinedProseBias > 0.5 && h > 30) ||
      stabPressure > 0.12,
    mailRetireDenseProcessBlock:
      ecologyCalibrated.mailRetireDenseProcessBlock ||
      (combinedProseBias > 0.4 && h > 28) ||
      stabPressure > 0.09,
  };
}
