import type { WorldInertiaBundle } from "@/data/world-inertia-runtime/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { LowSignalHumanityBundle } from "@/data/low-signal-humanity/system";
import type { WorldMaterializationBundle } from "@/data/world-materialization/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

export type RuntimeFatigueBalance = {
  /** 0–1，越高越应让其他 runtime 退后 */
  materializationLoad: number;
  lowSignalLoad: number;
  inertiaLoad: number;
  ageLoad: number;
};

export function resolveRuntimeFatigueBalance(
  aging: WorldAgingBundle,
  inertia: WorldInertiaBundle,
  lowSignalHumanity: LowSignalHumanityBundle,
  materialization: WorldMaterializationBundle,
  dayKey: string,
): RuntimeFatigueBalance {
  const w = worldAgeStateMap[aging.ageStateId].stillnessWeight;
  const mat =
    dailyIndex(`${dayKey}:fat-mat`, 10) / 10 +
    (materialization.weathering.residueThickness.length > 90 ? 0.12 : 0);
  const lsig = lowSignalHumanity.signalFalloff.persuasionLevel === "none" ? 0.55 : 0.32;
  const inert = inertia.silenceDensity.explanatoryDensity === "minimal" ? 0.6 : 0.35;
  return {
    materializationLoad: Math.min(0.95, mat * 0.4 + w * 0.35),
    lowSignalLoad: Math.min(0.95, lsig + w * 0.2),
    inertiaLoad: Math.min(0.95, inert),
    ageLoad: Math.min(0.95, w * 0.9),
  };
}
