export const stepTimingTokens = {
  settleDelayMs: 1600,
  revealCadenceMs: {
    preReveal: 700,
    firstLayer: 900,
    secondLayer: 1200,
    finalLayer: 1500,
  },
  betweenStepPauseMs: 2800,
  continuationSpacingMs: 1800,
  stepBreathingTimingMs: {
    inhale: 2200,
    exhale: 2600,
    stillness: 800,
  },
} as const;

export type StepTimingTokens = typeof stepTimingTokens;
