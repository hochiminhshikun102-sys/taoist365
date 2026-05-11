import { ambientDefaultGovernorLine } from "./ambient-default-governor";
import { ambientThinningEngineLine } from "./ambient-thinning-engine";
import { environmentalPressureRuntimeLine } from "./environmental-pressure-runtime";
import { environmentalRestraintLine } from "./environmental-restraint";
import { presenceEnvironmentThinningLine } from "./presence-environment-thinning";
import { quietEnvironmentBalanceLine } from "./quiet-environment-balance";
import { runtimeEnvironmentCollapseLine } from "./runtime-environment-collapse";
import { worldBackgroundingLine } from "./world-backgrounding";
import { worldEnvironmentGovernorLine } from "./world-environment-governor";

export type WorldEnvironmentalEquilibriumBundle = {
  environmentalPressureRuntimeLine: string;
  ambientThinningEngineLine: string;
  worldEnvironmentGovernorLine: string;
  quietEnvironmentBalanceLine: string;
  runtimeEnvironmentCollapseLine: string;
  presenceEnvironmentThinningLine: string;
  worldBackgroundingLine: string;
  environmentalRestraintLine: string;
  ambientDefaultGovernorLine: string;
};

export function resolveWorldEnvironmentalEquilibriumBundle(): WorldEnvironmentalEquilibriumBundle {
  return {
    environmentalPressureRuntimeLine: environmentalPressureRuntimeLine(),
    ambientThinningEngineLine: ambientThinningEngineLine(),
    worldEnvironmentGovernorLine: worldEnvironmentGovernorLine(),
    quietEnvironmentBalanceLine: quietEnvironmentBalanceLine(),
    runtimeEnvironmentCollapseLine: runtimeEnvironmentCollapseLine(),
    presenceEnvironmentThinningLine: presenceEnvironmentThinningLine(),
    worldBackgroundingLine: worldBackgroundingLine(),
    environmentalRestraintLine: environmentalRestraintLine(),
    ambientDefaultGovernorLine: ambientDefaultGovernorLine(),
  };
}
