import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import type { WorldStillnessStabilizationBundle } from "@/data/world-stillness-stabilization/system";
import { dailyIndex } from "@/lib/living-day-key";

/**
 * Phase H — UI thinning without new components: booleans + scalar for existing strips/blocks.
 * Absence at high bias is **maturity**, not broken loading.
 */
export type PermanenceThinningPass = {
  /** 0–1 higher → fewer paragraphs site-wide */
  proseCollapseBias: number;
  dailyHumanRhythmSuppressed: boolean;
  dailyWorldAgeCollapsed: boolean;
  dailyInertiaCollapsed: boolean;
  dailyLowSignalCollapsed: boolean;
  dailyEchoBlocksExtraClosed: boolean;
  dailyShareableCollapsed: boolean;
  /** WorldMaturityStrip shows when `dailyIndex % maturityStripModulus === 0` */
  maturityStripModulus: number;
};

export function resolvePermanenceThinningPass(
  aging: WorldAgingBundle,
  runtimeRetirement: RuntimeRetirementBundle,
  stabilization: WorldStillnessStabilizationBundle,
): PermanenceThinningPass {
  const m = worldAgeStateMap[aging.ageStateId];
  const h = dailyIndex(`${aging.dayKey}:perm-pass`, 100);
  const fatigueBoost =
    runtimeRetirement.worldFatigue.fatigueLevel === "almostAbsent"
      ? 0.14
      : runtimeRetirement.worldFatigue.fatigueLevel === "resting"
        ? 0.08
        : 0;
  const proseCollapseBias = Math.min(
    0.97,
    m.stillnessWeight * 0.44 + m.explanationFatigue * 0.4 + stabilization.stabilizationBias * 0.26 + fatigueBoost,
  );
  const deep = proseCollapseBias > 0.58;
  return {
    proseCollapseBias,
    dailyHumanRhythmSuppressed: deep && h > 52,
    dailyWorldAgeCollapsed: deep && h > 48,
    dailyInertiaCollapsed: proseCollapseBias > 0.68 && h > 55,
    dailyLowSignalCollapsed: proseCollapseBias > 0.72 && h > 50,
    dailyEchoBlocksExtraClosed: proseCollapseBias > 0.63 && h > 58,
    dailyShareableCollapsed: proseCollapseBias > 0.75 && h > 60,
    maturityStripModulus: proseCollapseBias > 0.66 ? 5 : 3,
  };
}
