import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { ambientSilenceReinforcementLine } from "./ambient-silence-reinforcement";
import { quietEquilibriumAntiExpansionLine } from "./anti-expansion-runtime";
import { presenceMinimizationLine } from "./presence-minimization";
import { proseSelfThinningLine } from "./prose-self-thinning";
import { quietDefaultGovernorLine } from "./quiet-default-governor";
import { quietEquilibriumRuntimeLine } from "./quiet-equilibrium-runtime";
import { runtimePressureCollapseLine } from "./runtime-pressure-collapse";
import { structuralRestraintLine } from "./structural-restraint";
import { worldSelfRetirementLine } from "./world-self-retirement";

export type WorldQuietEquilibriumBundle = {
  dayKey: string;
  /** 0–1 feeds structural thinning pass */
  equilibriumPressure: number;
  quietEquilibriumRuntimeLine: string;
  runtimePressureCollapseLine: string;
  proseSelfThinningLine: string;
  ambientSilenceReinforcementLine: string;
  quietEquilibriumAntiExpansionLine: string;
  presenceMinimizationLine: string;
  worldSelfRetirementLine: string;
  structuralRestraintLine: string;
  quietDefaultGovernorLine: string;
};

export function resolveWorldQuietEquilibriumBundle(
  aging: WorldAgingBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): WorldQuietEquilibriumBundle {
  const m = worldAgeStateMap[aging.ageStateId];
  const f =
    runtimeRetirement.worldFatigue.fatigueLevel === "almostAbsent"
      ? 0.2
      : runtimeRetirement.worldFatigue.fatigueLevel === "resting"
        ? 0.12
        : 0;
  const equilibriumPressure = Math.min(0.96, m.stillnessWeight * 0.46 + m.explanationFatigue * 0.38 + f);
  return {
    dayKey: aging.dayKey,
    equilibriumPressure,
    quietEquilibriumRuntimeLine: quietEquilibriumRuntimeLine(),
    runtimePressureCollapseLine: runtimePressureCollapseLine(),
    proseSelfThinningLine: proseSelfThinningLine(),
    ambientSilenceReinforcementLine: ambientSilenceReinforcementLine(),
    quietEquilibriumAntiExpansionLine: quietEquilibriumAntiExpansionLine(),
    presenceMinimizationLine: presenceMinimizationLine(),
    worldSelfRetirementLine: worldSelfRetirementLine(),
    structuralRestraintLine: structuralRestraintLine(),
    quietDefaultGovernorLine: quietDefaultGovernorLine(),
  };
}
