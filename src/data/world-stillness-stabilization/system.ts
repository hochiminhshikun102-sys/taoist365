import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { ambientDensityCollapseLine } from "./ambient-density-collapse";
import { antiOveractivityRuntimeLine } from "./anti-overactivity-runtime";
import { presenceFatigueRuntimeLine } from "./presence-fatigue-runtime";
import { residueThinningLine } from "./residue-thinning";
import { silenceReinforcementLine } from "./silence-reinforcement";
import { stillnessPressureBalancerLine } from "./stillness-pressure-balancer";
import { runtimeNoiseRetirementLine } from "./runtime-noise-retirement";
import { worldBreathingGovernorLine } from "./world-breathing-governor";
import { worldQuietEquilibriumLine } from "./world-quiet-equilibrium";

export type WorldStillnessStabilizationBundle = {
  dayKey: string;
  /** 0–1 self-stabilization bias for thinning pass */
  stabilizationBias: number;
  stillnessPressureBalancerLine: string;
  runtimeNoiseRetirementLine: string;
  ambientDensityCollapseLine: string;
  worldBreathingGovernorLine: string;
  silenceReinforcementLine: string;
  presenceFatigueRuntimeLine: string;
  residueThinningLine: string;
  antiOveractivityRuntimeLine: string;
  worldQuietEquilibriumLine: string;
};

export function resolveWorldStillnessStabilizationBundle(
  aging: WorldAgingBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): WorldStillnessStabilizationBundle {
  const m = worldAgeStateMap[aging.ageStateId];
  const f = runtimeRetirement.worldFatigue.fatigueLevel === "almostAbsent" ? 0.22 : 0;
  const stabilizationBias = Math.min(0.95, m.stillnessWeight * 0.48 + m.silenceWeight * 0.32 + f);
  return {
    dayKey: aging.dayKey,
    stabilizationBias,
    stillnessPressureBalancerLine: stillnessPressureBalancerLine(),
    runtimeNoiseRetirementLine: runtimeNoiseRetirementLine(),
    ambientDensityCollapseLine: ambientDensityCollapseLine(),
    worldBreathingGovernorLine: worldBreathingGovernorLine(),
    silenceReinforcementLine: silenceReinforcementLine(),
    presenceFatigueRuntimeLine: presenceFatigueRuntimeLine(),
    residueThinningLine: residueThinningLine(),
    antiOveractivityRuntimeLine: antiOveractivityRuntimeLine(),
    worldQuietEquilibriumLine: worldQuietEquilibriumLine(),
  };
}
