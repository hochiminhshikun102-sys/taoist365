import { ambientGuidanceStateLine } from "./ambient-guidance-state";
import { antiSessionGravityLine } from "./anti-session-gravity";
import { guidanceCollapseEquilibriumLine } from "./guidance-collapse-equilibrium";
import { guidanceFatiguePressureLine } from "./guidance-fatigue-pressure";
import { guidanceRetreatEngineLine } from "./guidance-retreat-engine";
import { nonDialogueGovernanceLine } from "./non-dialogue-governance";
import { nonResolutionStabilityLine } from "./non-resolution-stability";
import { passiveGuidanceGovernorLine } from "./passive-guidance-governor";
import { weatherPriorityRuntimeLine } from "./weather-priority-runtime";

export type GuidanceEcologyGovernanceBundle = {
  guidanceRetreatEngineLine: string;
  weatherPriorityRuntimeLine: string;
  nonDialogueGovernanceLine: string;
  guidanceCollapseEquilibriumLine: string;
  guidanceFatiguePressureLine: string;
  passiveGuidanceGovernorLine: string;
  antiSessionGravityLine: string;
  ambientGuidanceStateLine: string;
  nonResolutionStabilityLine: string;
};

export function resolveGuidanceEcologyGovernanceBundle(): GuidanceEcologyGovernanceBundle {
  return {
    guidanceRetreatEngineLine: guidanceRetreatEngineLine(),
    weatherPriorityRuntimeLine: weatherPriorityRuntimeLine(),
    nonDialogueGovernanceLine: nonDialogueGovernanceLine(),
    guidanceCollapseEquilibriumLine: guidanceCollapseEquilibriumLine(),
    guidanceFatiguePressureLine: guidanceFatiguePressureLine(),
    passiveGuidanceGovernorLine: passiveGuidanceGovernorLine(),
    antiSessionGravityLine: antiSessionGravityLine(),
    ambientGuidanceStateLine: ambientGuidanceStateLine(),
    nonResolutionStabilityLine: nonResolutionStabilityLine(),
  };
}
