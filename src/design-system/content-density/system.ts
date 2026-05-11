export type ContentDensityTier = "light" | "focused" | "warm-soft-selling" | "settled";

export interface ContentDensityProfile {
  informationDensity: "low" | "moderate";
  pacingDensity: "slow" | "steady";
  visualPressure: "low" | "medium";
  guidanceIntensity: "gentle" | "balanced";
}

export const contentDensityMap: Record<ContentDensityTier, ContentDensityProfile> = {
  light: {
    informationDensity: "low",
    pacingDensity: "slow",
    visualPressure: "low",
    guidanceIntensity: "gentle",
  },
  focused: {
    informationDensity: "moderate",
    pacingDensity: "steady",
    visualPressure: "low",
    guidanceIntensity: "balanced",
  },
  "warm-soft-selling": {
    informationDensity: "moderate",
    pacingDensity: "slow",
    visualPressure: "low",
    guidanceIntensity: "gentle",
  },
  settled: {
    informationDensity: "moderate",
    pacingDensity: "slow",
    visualPressure: "medium",
    guidanceIntensity: "balanced",
  },
};
