import type { LayoutDensityTier } from "@/design-system/layout-density";

export interface StructuralShell {
  shell: string;
  viewportHeightBehavior: "full" | "tall" | "adaptive";
  spacingRhythm: "airy" | "balanced" | "continuity";
  layoutDensity: LayoutDensityTier;
  revealPacing: "slow" | "steady";
  scrollBreathing: "high" | "medium";
  ctaPressureLevel: "none" | "low" | "medium";
  sectionShiftGoal: string;
}

export const homepageStructuralSkeleton: StructuralShell[] = [
  {
    shell: "EmotionalEntryShell",
    viewportHeightBehavior: "full",
    spacingRhythm: "continuity",
    layoutDensity: "ultra-light",
    revealPacing: "slow",
    scrollBreathing: "high",
    ctaPressureLevel: "none",
    sectionShiftGoal: "entry to plain reading",
  },
  {
    shell: "CalmOpeningShell",
    viewportHeightBehavior: "tall",
    spacingRhythm: "airy",
    layoutDensity: "light",
    revealPacing: "slow",
    scrollBreathing: "high",
    ctaPressureLevel: "low",
    sectionShiftGoal: "arrival to orientation",
  },
  {
    shell: "RitualDiscoveryShell",
    viewportHeightBehavior: "adaptive",
    spacingRhythm: "balanced",
    layoutDensity: "light",
    revealPacing: "steady",
    scrollBreathing: "medium",
    ctaPressureLevel: "low",
    sectionShiftGoal: "links to flow URLs",
  },
  {
    shell: "ProductAtmosphereShell",
    viewportHeightBehavior: "adaptive",
    spacingRhythm: "continuity",
    layoutDensity: "steady",
    revealPacing: "slow",
    scrollBreathing: "high",
    ctaPressureLevel: "low",
    sectionShiftGoal: "utility to catalog context",
  },
  {
    shell: "HomeHarmonyShell",
    viewportHeightBehavior: "tall",
    spacingRhythm: "continuity",
    layoutDensity: "steady",
    revealPacing: "slow",
    scrollBreathing: "high",
    ctaPressureLevel: "none",
    sectionShiftGoal: "busy layout to calmer spacing",
  },
  {
    shell: "DailyRhythmShell",
    viewportHeightBehavior: "adaptive",
    spacingRhythm: "airy",
    layoutDensity: "light",
    revealPacing: "steady",
    scrollBreathing: "medium",
    ctaPressureLevel: "low",
    sectionShiftGoal: "idea to daily URL cadence",
  },
  {
    shell: "SoftOnboardingShell",
    viewportHeightBehavior: "adaptive",
    spacingRhythm: "balanced",
    layoutDensity: "light",
    revealPacing: "steady",
    scrollBreathing: "medium",
    ctaPressureLevel: "low",
    sectionShiftGoal: "exploration to same-domain continuity",
  },
  {
    shell: "GentleContinuationShell",
    viewportHeightBehavior: "adaptive",
    spacingRhythm: "continuity",
    layoutDensity: "ultra-light",
    revealPacing: "slow",
    scrollBreathing: "high",
    ctaPressureLevel: "none",
    sectionShiftGoal: "end of section to optional links",
  },
];
