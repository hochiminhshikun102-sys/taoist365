import type { LayoutDensityTier } from "@/design-system/layout-density";

export interface DailyGuidanceSkeletonZone {
  zone: string;
  layoutDensity: LayoutDensityTier;
  spacingRhythm: "airy" | "centered" | "quiet";
  pacing: "slow" | "steady";
  outputPressure: "minimal" | "light";
  sectionShiftGoal: string;
}

export const dailyGuidanceStructuralSkeleton: DailyGuidanceSkeletonZone[] = [
  {
    zone: "morning-spacing",
    layoutDensity: "ultra-light",
    spacingRhythm: "centered",
    pacing: "slow",
    outputPressure: "minimal",
    sectionShiftGoal: "from morning noise to calm centering",
  },
  {
    zone: "one-guidance-focus",
    layoutDensity: "light",
    spacingRhythm: "airy",
    pacing: "steady",
    outputPressure: "light",
    sectionShiftGoal: "from scattered thought to one gentle focus",
  },
  {
    zone: "one-action-spacing",
    layoutDensity: "steady",
    spacingRhythm: "quiet",
    pacing: "steady",
    outputPressure: "minimal",
    sectionShiftGoal: "from insight to one grounded action",
  },
  {
    zone: "quiet-close",
    layoutDensity: "ultra-light",
    spacingRhythm: "quiet",
    pacing: "slow",
    outputPressure: "minimal",
    sectionShiftGoal: "from check-in to calm continuation",
  },
];
