import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { dailyIndex } from "@/lib/living-day-key";

/**
 * Phase H（不可见基础设施）— 叠在 `civilizationStabilizedStructuralThinning` 之上：
 * guidance fragmentation / minimal-ending / weather-only 倾向 → 更低 foreground、更强默认感（仍无新 UI）。
 */
export function resolveInvisibleInfrastructureStructuralThinningPass(
  structuralSilence: StructuralSilenceBundle,
  civilizationStabilized: StructuralThinningPass,
): StructuralThinningPass {
  const h = dailyIndex(`${structuralSilence.dayKey}:infra-inv-pass`, 100);
  const gf = structuralSilence.guidanceFragmentation;
  let infraPressure = 0;
  if (gf.weatherOnlyMode) infraPressure += 0.03;
  if (gf.routeCollapse) infraPressure += 0.026;
  if (gf.singleLineMode) infraPressure += 0.022;
  if (gf.minimalEnding) infraPressure += 0.018;
  infraPressure = Math.min(0.11, infraPressure);

  const runtimeOvergrowthPressure = Math.min(
    0.99,
    civilizationStabilized.combinedProseBias * 0.72 + infraPressure * 1.6 + (h > 70 ? 0.08 : 0),
  );
  const infraBoost = 0.007 + infraPressure * 0.33;
  const combinedProseBias = Math.min(0.99, civilizationStabilized.combinedProseBias + infraBoost + runtimeOvergrowthPressure * 0.018);
  const stripInf =
    combinedProseBias > 0.9 ? 2 : combinedProseBias > 0.82 ? 1 : combinedProseBias > 0.72 ? 1 : 0;

  return {
    combinedProseBias,
    dailyPreferUltraThin:
      civilizationStabilized.dailyPreferUltraThin ||
      (combinedProseBias > 0.38 && h > 14) ||
      infraPressure > 0.055,
    dailyForceCloseEchoes:
      civilizationStabilized.dailyForceCloseEchoes ||
      (combinedProseBias > 0.42 && h > 18) ||
      infraPressure > 0.065,
    dailyForceCloseSliceNarrative:
      civilizationStabilized.dailyForceCloseSliceNarrative ||
      (combinedProseBias > 0.46 && h > 20) ||
      infraPressure > 0.075,
    maturityStripModulusBonus: Math.min(10, civilizationStabilized.maturityStripModulusBonus + stripInf),
    guidanceStackWeatherOnly:
      civilizationStabilized.guidanceStackWeatherOnly ||
      (combinedProseBias > 0.42 && h > 22) ||
      infraPressure > 0.058,
    guidanceStackHardNoRoutes:
      civilizationStabilized.guidanceStackHardNoRoutes ||
      (combinedProseBias > 0.52 && h > 28) ||
      infraPressure > 0.11,
    guidanceStackHardNoClosure:
      civilizationStabilized.guidanceStackHardNoClosure ||
      (combinedProseBias > 0.48 && h > 26) ||
      infraPressure > 0.095,
    mailRetireDenseProcessBlock:
      civilizationStabilized.mailRetireDenseProcessBlock ||
      (combinedProseBias > 0.38 && h > 24) ||
      infraPressure > 0.068,
    runtimeOvergrowthPressure,
    suppressResidueAccumulation: runtimeOvergrowthPressure > 0.52 || combinedProseBias > 0.66,
    suppressAtmosphericHeaviness: runtimeOvergrowthPressure > 0.58 || combinedProseBias > 0.72,
    suppressFeatureTemptation: runtimeOvergrowthPressure > 0.48 || combinedProseBias > 0.6,
    civilizationDensityReleaseLine:
      runtimeOvergrowthPressure > 0.7
        ? "Runtime density releases into browser air before it becomes feature weight."
        : "Civilization stays lighter than its accumulated traces.",
  };
}
