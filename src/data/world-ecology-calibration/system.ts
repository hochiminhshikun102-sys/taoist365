import { ambientRuntimeEquilibriumLine } from "./ambient-runtime-equilibrium";
import { crossRuntimeThinningLine } from "./cross-runtime-thinning";
import { ecologyCalibrationRuntimeLine } from "./ecology-calibration-runtime";
import { runtimeCoexistencePressureLine } from "./runtime-coexistence-pressure";
import { runtimeDensityBalancerLine } from "./runtime-density-balancer";
import { runtimeFatigueGovernorLine } from "./runtime-fatigue-governor";
import { runtimeNoiseCollapseLine } from "./runtime-noise-collapse";
import { runtimeQuietGovernorLine } from "./runtime-quiet-governor";
import { runtimeRetreatPriorityLine } from "./runtime-retreat-priority";
import { runtimeSurfaceBudgetLine } from "./runtime-surface-budget";

export type WorldEcologyCalibrationBundle = {
  ecologyCalibrationRuntimeLine: string;
  runtimeDensityBalancerLine: string;
  runtimeCoexistencePressureLine: string;
  runtimeFatigueGovernorLine: string;
  runtimeRetreatPriorityLine: string;
  crossRuntimeThinningLine: string;
  ambientRuntimeEquilibriumLine: string;
  runtimeSurfaceBudgetLine: string;
  runtimeNoiseCollapseLine: string;
  runtimeQuietGovernorLine: string;
};

export function resolveWorldEcologyCalibrationBundle(): WorldEcologyCalibrationBundle {
  return {
    ecologyCalibrationRuntimeLine: ecologyCalibrationRuntimeLine(),
    runtimeDensityBalancerLine: runtimeDensityBalancerLine(),
    runtimeCoexistencePressureLine: runtimeCoexistencePressureLine(),
    runtimeFatigueGovernorLine: runtimeFatigueGovernorLine(),
    runtimeRetreatPriorityLine: runtimeRetreatPriorityLine(),
    crossRuntimeThinningLine: crossRuntimeThinningLine(),
    ambientRuntimeEquilibriumLine: ambientRuntimeEquilibriumLine(),
    runtimeSurfaceBudgetLine: runtimeSurfaceBudgetLine(),
    runtimeNoiseCollapseLine: runtimeNoiseCollapseLine(),
    runtimeQuietGovernorLine: runtimeQuietGovernorLine(),
  };
}
