import type { RuntimeFatigueBalance } from "./runtime-fatigue-balancer";

export type CrossRuntimeSuppression = {
  reduceHumanTraces: boolean;
  tightenGuidanceCollapse: boolean;
  reduceObjectForegroundCap: boolean;
  thinDailyProse: boolean;
  sparseRitualTraces: boolean;
};

export function resolveCrossRuntimeSuppression(f: RuntimeFatigueBalance): CrossRuntimeSuppression {
  return {
    reduceHumanTraces: f.materializationLoad > 0.55 && f.ageLoad > 0.45,
    tightenGuidanceCollapse: f.lowSignalLoad > 0.48,
    reduceObjectForegroundCap: f.ageLoad > 0.62,
    thinDailyProse: f.inertiaLoad > 0.52,
    sparseRitualTraces: f.materializationLoad > 0.48 && f.inertiaLoad > 0.45,
  };
}
