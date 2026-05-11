export const rhythmTokens = {
  verticalBreathing: {
    airy: "clamp(3.5rem, 9vw, 8rem)",
    standard: "clamp(2.5rem, 6vw, 5.5rem)",
    compact: "clamp(1.5rem, 4vw, 3rem)",
  },
  sectionPacing: {
    introToOpening: 1.2,
    openingToGuidance: 1,
    guidanceToFlow: 1.35,
    flowToCommerce: 1.5,
  },
  pauseSpacing: {
    standardPause: "clamp(1.5rem, 4vw, 3rem)",
    sessionPause: "clamp(2rem, 5vw, 4rem)",
  },
  slowScrollRhythm: {
    narrativeStepViewport: 0.85,
    cadenceHint: "slow",
  },
  layoutDensityLevels: {
    light: 0.35,
    focused: 0.52,
    settled: 0.68,
  },
} as const;
