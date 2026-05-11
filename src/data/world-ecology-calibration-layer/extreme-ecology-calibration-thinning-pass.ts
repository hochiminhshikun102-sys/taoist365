import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { dailyIndex } from "@/lib/living-day-key";

/**
 * Phase H（生态校准极端）— 叠在 `governedStructuralThinning` 之上：
 * guidance fragmentation + breathing + foreground pressure + permanence prose bias → 更稳定的互相制衡。
 */
export function resolveEcologyCalibratedStructuralThinningPass(
  structuralSilence: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  permanenceProseCollapseBias: number,
  governed: StructuralThinningPass,
): StructuralThinningPass {
  const h = dailyIndex(`${structuralSilence.dayKey}:eco-cal-pass`, 100);
  const gf = structuralSilence.guidanceFragmentation;
  let channelPressure = gf.fragmentProbability * 0.072;
  if (gf.weatherOnlyMode) channelPressure += 0.038;
  if (gf.routeCollapse) channelPressure += 0.028;
  if (gf.singleLineMode) channelPressure += 0.022;
  if (gf.minimalEnding) channelPressure += 0.018;

  const bm = worldRegulation.breathing.breathingMode;
  if (bm === "residualOnly" || bm === "almostStill") channelPressure += 0.068;
  else if (bm === "faded" || bm === "thinner") channelPressure += 0.038;

  channelPressure += Math.min(0.055, worldRegulation.foregroundPressure * 0.038);
  channelPressure += permanenceProseCollapseBias * 0.042;
  channelPressure = Math.min(0.28, channelPressure);

  const calBoost = 0.014 + channelPressure * 0.48;
  const combinedProseBias = Math.min(0.99, governed.combinedProseBias + calBoost);
  const stripCal =
    combinedProseBias > 0.86 ? 2 : combinedProseBias > 0.76 ? 1 : combinedProseBias > 0.64 ? 1 : 0;

  return {
    combinedProseBias,
    dailyPreferUltraThin:
      governed.dailyPreferUltraThin ||
      (combinedProseBias > 0.42 && h > 22) ||
      (combinedProseBias > 0.5 && h > 18) ||
      channelPressure > 0.55,
    dailyForceCloseEchoes:
      governed.dailyForceCloseEchoes || (combinedProseBias > 0.44 && h > 24) || channelPressure > 0.52,
    dailyForceCloseSliceNarrative:
      governed.dailyForceCloseSliceNarrative ||
      (combinedProseBias > 0.48 && h > 26) ||
      channelPressure > 0.58,
    maturityStripModulusBonus: Math.min(8, governed.maturityStripModulusBonus + stripCal),
    guidanceStackWeatherOnly:
      governed.guidanceStackWeatherOnly ||
      (combinedProseBias > 0.48 && h > 30) ||
      channelPressure > 0.42 ||
      gf.weatherOnlyMode,
    guidanceStackHardNoRoutes:
      governed.guidanceStackHardNoRoutes ||
      (combinedProseBias > 0.58 && h > 36) ||
      channelPressure > 0.68 ||
      gf.routeCollapse,
    guidanceStackHardNoClosure:
      governed.guidanceStackHardNoClosure ||
      (combinedProseBias > 0.54 && h > 34) ||
      channelPressure > 0.64 ||
      gf.minimalEnding,
    mailRetireDenseProcessBlock:
      governed.mailRetireDenseProcessBlock ||
      (combinedProseBias > 0.44 && h > 32) ||
      channelPressure > 0.48,
  };
}
