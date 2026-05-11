import { antiExpansionGovernorLine } from "./anti-expansion-governor";
import { ambientRestraintSystemLine } from "./ambient-restraint-system";
import { presenceFatigueRuntimeLine } from "./presence-fatigue-runtime";
import { proseCollapseEngineLine } from "./prose-collapse-engine";
import { runtimeThinningPressureLine } from "./runtime-thinning-pressure";
import { selfRestraintRuntimeLine } from "./self-restraint-runtime";
import { selfRetirementRuntimeLine } from "./self-retirement-runtime";
import { worldQuietEquilibriumGovernanceLine } from "./world-quiet-equilibrium";
import { worldRestraintBalanceLine } from "./world-restraint-balance";

export type WorldSelfRestraintBundle = {
  selfRestraintRuntimeLine: string;
  antiExpansionGovernorLine: string;
  worldRestraintBalanceLine: string;
  presenceFatigueRuntimeLine: string;
  proseCollapseEngineLine: string;
  runtimeThinningPressureLine: string;
  ambientRestraintSystemLine: string;
  worldQuietEquilibriumGovernanceLine: string;
  selfRetirementRuntimeLine: string;
};

export function resolveWorldSelfRestraintBundle(): WorldSelfRestraintBundle {
  return {
    selfRestraintRuntimeLine: selfRestraintRuntimeLine(),
    antiExpansionGovernorLine: antiExpansionGovernorLine(),
    worldRestraintBalanceLine: worldRestraintBalanceLine(),
    presenceFatigueRuntimeLine: presenceFatigueRuntimeLine(),
    proseCollapseEngineLine: proseCollapseEngineLine(),
    runtimeThinningPressureLine: runtimeThinningPressureLine(),
    ambientRestraintSystemLine: ambientRestraintSystemLine(),
    worldQuietEquilibriumGovernanceLine: worldQuietEquilibriumGovernanceLine(),
    selfRetirementRuntimeLine: selfRetirementRuntimeLine(),
  };
}
