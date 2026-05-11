import { governanceEnforcementRuntimeLine } from "./governance-enforcement-runtime";
import { runtimeBoundaryEnforcementLine } from "./runtime-boundary-enforcement";
import { antiDriftGovernorLine } from "./anti-drift-governor";
import { antiProductizationEnforcementLine } from "./anti-productization-enforcement";
import { quietRoomEnforcementLine } from "./quiet-room-enforcement";
import { runtimeRestraintEnforcementLine } from "./runtime-restraint-enforcement";
import { governancePriorityRuntimeLine } from "./governance-priority-runtime";
import { worldIntegrityGovernorLine } from "./world-integrity-governor";
import { runtimeCivilizationEnforcementLine } from "./runtime-civilization-enforcement";

export type AiGovernanceInfrastructureBundle = {
  governanceEnforcementRuntimeLine: string;
  runtimeBoundaryEnforcementLine: string;
  antiDriftGovernorLine: string;
  antiProductizationEnforcementLine: string;
  quietRoomEnforcementLine: string;
  runtimeRestraintEnforcementLine: string;
  governancePriorityRuntimeLine: string;
  worldIntegrityGovernorLine: string;
  runtimeCivilizationEnforcementLine: string;
};

export function resolveAiGovernanceInfrastructureBundle(): AiGovernanceInfrastructureBundle {
  return {
    governanceEnforcementRuntimeLine: governanceEnforcementRuntimeLine(),
    runtimeBoundaryEnforcementLine: runtimeBoundaryEnforcementLine(),
    antiDriftGovernorLine: antiDriftGovernorLine(),
    antiProductizationEnforcementLine: antiProductizationEnforcementLine(),
    quietRoomEnforcementLine: quietRoomEnforcementLine(),
    runtimeRestraintEnforcementLine: runtimeRestraintEnforcementLine(),
    governancePriorityRuntimeLine: governancePriorityRuntimeLine(),
    worldIntegrityGovernorLine: worldIntegrityGovernorLine(),
    runtimeCivilizationEnforcementLine: runtimeCivilizationEnforcementLine(),
  };
}
