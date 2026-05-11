import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { dailyIndex } from "@/lib/living-day-key";

/**
 * Phase H（极端）— 叠在 `worldDefaultExistence.structuralThinning` 之上：
 * 更常 ultra-thin / weather-only / no-route / no-closure；仍静态、无用户记忆。
 */
export function resolveAmbientStructuralThinningPass(
  structuralSilence: StructuralSilenceBundle,
  base: StructuralThinningPass,
  equilibriumPressure: number,
): StructuralThinningPass {
  const h = dailyIndex(`${structuralSilence.dayKey}:ambient-extreme-thin`, 100);
  const envBoost = 0.035 + equilibriumPressure * 0.055;
  const combinedProseBias = Math.min(0.99, base.combinedProseBias + envBoost);
  const stripExtra =
    combinedProseBias > 0.82 ? 2 : combinedProseBias > 0.72 ? 1 : combinedProseBias > 0.64 ? 1 : 0;

  return {
    combinedProseBias,
    dailyPreferUltraThin:
      base.dailyPreferUltraThin || (combinedProseBias > 0.5 && h > 32) || (combinedProseBias > 0.58 && h > 28),
    dailyForceCloseEchoes: base.dailyForceCloseEchoes || (combinedProseBias > 0.52 && h > 34),
    dailyForceCloseSliceNarrative: base.dailyForceCloseSliceNarrative || (combinedProseBias > 0.56 && h > 36),
    maturityStripModulusBonus: Math.min(4, base.maturityStripModulusBonus + stripExtra),
    guidanceStackWeatherOnly: base.guidanceStackWeatherOnly || (combinedProseBias > 0.58 && h > 40),
    guidanceStackHardNoRoutes: base.guidanceStackHardNoRoutes || (combinedProseBias > 0.68 && h > 46),
    guidanceStackHardNoClosure: base.guidanceStackHardNoClosure || (combinedProseBias > 0.64 && h > 44),
    mailRetireDenseProcessBlock: base.mailRetireDenseProcessBlock || (combinedProseBias > 0.52 && h > 42),
  };
}
