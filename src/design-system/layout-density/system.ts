export type LayoutDensityTier = "ultra-light" | "light" | "steady" | "settled";

export interface LayoutDensityProfile {
  sectionDensity: "minimal" | "low" | "moderate";
  spacingRatio: number;
  visualPressure: "very-low" | "low" | "medium";
  interactionPressure: "very-low" | "low" | "moderate";
}

export const layoutDensitySystem: Record<LayoutDensityTier, LayoutDensityProfile> = {
  "ultra-light": {
    sectionDensity: "minimal",
    spacingRatio: 1.75,
    visualPressure: "very-low",
    interactionPressure: "very-low",
  },
  light: {
    sectionDensity: "low",
    spacingRatio: 1.45,
    visualPressure: "low",
    interactionPressure: "low",
  },
  steady: {
    sectionDensity: "low",
    spacingRatio: 1.6,
    visualPressure: "low",
    interactionPressure: "very-low",
  },
  settled: {
    sectionDensity: "moderate",
    spacingRatio: 1.85,
    visualPressure: "medium",
    interactionPressure: "low",
  },
};
