import { surfaceSpacing } from "@/design-system/surface-spacing";

export interface DailyGuidanceSurfaceZone {
  id: string;
  role: "centered-calm" | "one-focus-guidance" | "pause-spacing" | "quiet-completion";
  spacingPreset: "long" | "medium";
  informationLoad: "minimal" | "light";
  sectionShift: string;
}

export const dailyGuidanceSurface: DailyGuidanceSurfaceZone[] = [
  {
    id: "center",
    role: "centered-calm",
    spacingPreset: "long",
    informationLoad: "minimal",
    sectionShift: "from noise to centered morning calm",
  },
  {
    id: "guidance",
    role: "one-focus-guidance",
    spacingPreset: "medium",
    informationLoad: "light",
    sectionShift: "from scattered thoughts to one gentle direction",
  },
  {
    id: "spacing",
    role: "pause-spacing",
    spacingPreset: "long",
    informationLoad: "minimal",
    sectionShift: "from reading to plain reset",
  },
  {
    id: "close",
    role: "quiet-completion",
    spacingPreset: "medium",
    informationLoad: "minimal",
    sectionShift: "from session to calm daily continuation",
  },
];

export const dailyGuidancePauseGap = surfaceSpacing.sessionPauseSpacing.medium;
