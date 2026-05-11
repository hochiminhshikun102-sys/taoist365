import type { LayoutDensityTier } from "@/design-system/layout-density";

export interface HomeHarmonySkeletonZone {
  zone: string;
  layoutDensity: LayoutDensityTier;
  spatialRhythm: "slow" | "slower";
  visualStillness: "high" | "very-high";
  transitionSpacing: "wide" | "very-wide";
  sectionShiftGoal: string;
}

export const homeHarmonyStructuralSkeleton: HomeHarmonySkeletonZone[] = [
  {
    zone: "material-breathing",
    layoutDensity: "steady",
    spatialRhythm: "slower",
    visualStillness: "very-high",
    transitionSpacing: "very-wide",
    sectionShiftGoal: "from functional view to material calm awareness",
  },
  {
    zone: "visual-stillness-core",
    layoutDensity: "ultra-light",
    spatialRhythm: "slower",
    visualStillness: "very-high",
    transitionSpacing: "very-wide",
    sectionShiftGoal: "from mental tension to spatial stillness",
  },
  {
    zone: "calm-section-rhythm",
    layoutDensity: "light",
    spatialRhythm: "slow",
    visualStillness: "high",
    transitionSpacing: "wide",
    sectionShiftGoal: "from observation to soft home guidance",
  },
  {
    zone: "spacious-transition",
    layoutDensity: "steady",
    spatialRhythm: "slower",
    visualStillness: "high",
    transitionSpacing: "very-wide",
    sectionShiftGoal: "from guidance to grounded lifestyle continuation",
  },
];
