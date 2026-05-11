import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationBoundaryRuntime = {
  boundaryPressure: number;
  boundaryLine: string;
  boundaryIntelligenceLine: string;
  suppressFeatureTemptation: boolean;
  suppressEngagementGravity: boolean;
  suppressCommerceGravity: boolean;
  suppressUxOverOptimization: boolean;
  suppressInterfaceOverExplanation: boolean;
  suppressEmotionalManipulation: boolean;
  suppressRetentionEngineering: boolean;
  suppressAddictiveLoops: boolean;
  suppressHyperPersonalization: boolean;
};

export function resolveCivilizationBoundaryRuntime(dayKey: string): CivilizationBoundaryRuntime {
  const h = dailyIndex(`${dayKey}:civilization-boundary`, 100);
  const boundaryPressure = Math.min(0.96, 0.42 + h / 190);

  return {
    boundaryPressure,
    boundaryLine:
      boundaryPressure > 0.76
        ? "Civilization boundary is high: no growth pressure enters the room."
        : "The system protects quiet existence before product behavior.",
    boundaryIntelligenceLine: "The civilization knows what should not grow: loops, pressure, over-explanation, and hyper-personalization.",
    suppressFeatureTemptation: boundaryPressure > 0.58,
    suppressEngagementGravity: boundaryPressure > 0.66,
    suppressCommerceGravity: boundaryPressure > 0.72,
    suppressUxOverOptimization: boundaryPressure > 0.6,
    suppressInterfaceOverExplanation: boundaryPressure > 0.62,
    suppressEmotionalManipulation: boundaryPressure > 0.64,
    suppressRetentionEngineering: boundaryPressure > 0.66,
    suppressAddictiveLoops: boundaryPressure > 0.7,
    suppressHyperPersonalization: boundaryPressure > 0.74,
  };
}
