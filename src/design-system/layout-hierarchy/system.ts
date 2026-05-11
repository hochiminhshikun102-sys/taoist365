export const calmHierarchy = {
  gentleFocalPoints: {
    maxPrimaryFocusPerViewport: 1,
    secondaryFocusIntensity: "low",
  },
  softAttentionGuidance: {
    flowPattern: "top-to-breathing-space-to-action",
    avoidAttentionSpikes: true,
  },
  nonAggressiveCTAHierarchy: {
    pressure: "low",
    repetition: "limited",
    visualWeight: "restrained",
  },
  quietSectionTransitions: {
    transitionGap: "clamp(2rem, 6vw, 4.5rem)",
    tonalShift: "subtle",
  },
  emotionalPacingHierarchy: {
    sequence: ["arrival", "orientation", "pause", "optional continuation"],
  },
} as const;

export const calmHierarchyAvoid = [
  "conversion_first_hierarchy",
  "growth_hacking_emphasis",
  "dashboard_emphasis_logic",
] as const;
