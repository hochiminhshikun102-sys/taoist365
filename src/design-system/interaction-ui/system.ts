export const interactionUISystem = {
  calmSpacing: {
    sectionGap: "clamp(3rem, 8vw, 7rem)",
    blockGap: "clamp(1.25rem, 3vw, 2.25rem)",
    microGap: "0.75rem",
  },
  breathingLayout: {
    maxContentWidth: "1200px",
    readingWidth: "72ch",
    sideWhitespaceRatio: "minmax(1rem, 1fr)",
  },
  softHierarchy: {
    titleWeight: 600,
    bodyWeight: 400,
    accentUsage: "restrained",
    visualPrioritySteps: ["surface", "guidance", "action"],
  },
  toneContrast: {
    baseline: "low",
    emphasis: "gentle",
    avoidHighAlertVisuals: true,
  },
  stepRevealTiming: {
    preludeMs: 600,
    revealMs: 900,
    settleMs: 1200,
  },
  warmMinimalInteraction: {
    ctaCountPerViewport: 1,
    interactionNoise: "low",
    hoverIntensity: "subtle",
  },
  visualSilenceAreas: {
    requiredPerMajorSection: true,
    minimumSilenceRatio: 0.32,
  },
} as const;

export const interactionUIAntiPatterns = [
  "dense_layout",
  "dashboard_feeling",
  "app_overload",
  "productivity_ui",
  "gamification_feel",
] as const;
