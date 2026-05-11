import type { LayoutDensityTier } from "@/design-system/layout-density";

export interface DrawLotSkeletonZone {
  zone: string;
  spacingPriority: "high" | "very-high";
  revealDistance: "short" | "medium" | "long";
  layoutDensity: LayoutDensityTier;
  pacing: "slow" | "steady";
  silenceRatio: number;
  sectionShiftGoal: string;
}

export const drawLotStructuralSkeleton: DrawLotSkeletonZone[] = [
  {
    zone: "arrival-spacing",
    spacingPriority: "very-high",
    revealDistance: "long",
    layoutDensity: "ultra-light",
    pacing: "slow",
    silenceRatio: 0.55,
    sectionShiftGoal: "from restless arrival to calm readiness",
  },
  {
    zone: "settle-spacing",
    spacingPriority: "very-high",
    revealDistance: "medium",
    layoutDensity: "steady",
    pacing: "slow",
    silenceRatio: 0.62,
    sectionShiftGoal: "from action impulse to intentional presence",
  },
  {
    zone: "reveal-distance",
    spacingPriority: "high",
    revealDistance: "long",
    layoutDensity: "light",
    pacing: "slow",
    silenceRatio: 0.46,
    sectionShiftGoal: "from anticipation to grounded receiving",
  },
  {
    zone: "pause-quiet-area",
    spacingPriority: "very-high",
    revealDistance: "medium",
    layoutDensity: "steady",
    pacing: "slow",
    silenceRatio: 0.72,
    sectionShiftGoal: "from guidance intake to inner integration",
  },
  {
    zone: "continuation-separation",
    spacingPriority: "high",
    revealDistance: "medium",
    layoutDensity: "ultra-light",
    pacing: "steady",
    silenceRatio: 0.5,
    sectionShiftGoal: "from closure to optional next step",
  },
];
