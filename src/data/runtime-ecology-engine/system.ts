import { runtimeCoexistenceRulesLine } from "./runtime-coexistence-rules";
import { runtimeCollapseEngineLine } from "./runtime-collapse-engine";
import { runtimeEcologyRuntimeLine } from "./runtime-ecology-runtime";
import { runtimeMutualFatigueLine } from "./runtime-mutual-fatigue";
import { runtimeOverlapGovernorLine } from "./runtime-overlap-governor";
import { runtimePressureBalancerLine } from "./runtime-pressure-balancer";
import { runtimeQuietPriorityLine } from "./runtime-quiet-priority";
import { runtimeRetreatLogicLine } from "./runtime-retreat-logic";
import { runtimeSilenceHierarchyLine } from "./runtime-silence-hierarchy";
import { runtimeSurfaceLimiterLine } from "./runtime-surface-limiter";

export type RuntimeEcologyEngineBundle = {
  runtimeEcologyRuntimeLine: string;
  runtimePressureBalancerLine: string;
  runtimeMutualFatigueLine: string;
  runtimeSurfaceLimiterLine: string;
  runtimeOverlapGovernorLine: string;
  runtimeQuietPriorityLine: string;
  runtimeCollapseEngineLine: string;
  runtimeCoexistenceRulesLine: string;
  runtimeRetreatLogicLine: string;
  runtimeSilenceHierarchyLine: string;
};

export function resolveRuntimeEcologyEngineBundle(): RuntimeEcologyEngineBundle {
  return {
    runtimeEcologyRuntimeLine: runtimeEcologyRuntimeLine(),
    runtimePressureBalancerLine: runtimePressureBalancerLine(),
    runtimeMutualFatigueLine: runtimeMutualFatigueLine(),
    runtimeSurfaceLimiterLine: runtimeSurfaceLimiterLine(),
    runtimeOverlapGovernorLine: runtimeOverlapGovernorLine(),
    runtimeQuietPriorityLine: runtimeQuietPriorityLine(),
    runtimeCollapseEngineLine: runtimeCollapseEngineLine(),
    runtimeCoexistenceRulesLine: runtimeCoexistenceRulesLine(),
    runtimeRetreatLogicLine: runtimeRetreatLogicLine(),
    runtimeSilenceHierarchyLine: runtimeSilenceHierarchyLine(),
  };
}
