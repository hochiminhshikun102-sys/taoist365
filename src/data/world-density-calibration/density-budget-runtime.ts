import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type DensityBudget = {
  proseMax: number;
  residueMax: number;
  explanationMax: number;
  runtimeSurfaceMax: number;
  layoutDensityScore: number;
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/** 今天页面允许“放出”多少叙述与残留——数字越大越克制（预算越小）。 */
export function resolveDensityBudget(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
): DensityBudget {
  const w = worldAgeStateMap[age].stillnessWeight;
  const pe = structural.pageEnergy;
  const heavyEnergy =
    pe === "heavy" || pe === "still" || pe === "empty" || pe === "residual" || pe === "faded" || pe === "thin";
  const fat = structural.explanationFatigue;
  const globalTired = fat.guidance === "minimal" && fat.mail === "minimal";

  let proseBase = 5 - Math.floor(w * 4);
  if (heavyEnergy) proseBase -= 1;
  if (globalTired) proseBase -= 1;

  const seed = dailyIndex(`${dayKey}:density-budget`, 7);
  const residueBase = clamp(4 - Math.floor(w * 5) - (heavyEnergy ? 1 : 0) - (seed > 4 ? 1 : 0), 1, 4);
  const pdThin = structural.pageDensity === "empty" || structural.pageDensity === "still" || structural.pageDensity === "residual";
  const explanationBase = clamp(3 - (globalTired ? 2 : fat.mail === "minimal" ? 1 : 0) - (pdThin ? 1 : 0), 0, 3);
  const surfaceBase = clamp(5 - Math.floor(w * 3) - (pdThin ? 1 : 0), 2, 6);
  const layoutScore = clamp(Math.round(w * 10) + (heavyEnergy ? 2 : 0), 2, 12);

  return {
    proseMax: clamp(proseBase, 1, 6),
    residueMax: residueBase,
    explanationMax: explanationBase,
    runtimeSurfaceMax: surfaceBase,
    layoutDensityScore: layoutScore,
  };
}
