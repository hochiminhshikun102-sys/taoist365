export const signatureAtmosphere = {
  spatialTemperatureSignature: {
    baseline: "warm-balanced",
    driftTolerance: "narrow",
    intent: "felt warmth without visual pressure",
  },
  breathingRhythmSignature: {
    sectionCadence: "slow-steady",
    pausePresence: "required",
    tempoIdentity: "quietly unhurried",
  },
  lightTendencySignature: {
    ambientDirection: "soft-warm",
    contrastStyle: "low-pressure",
    dramaticLighting: false,
  },
  whitespaceSignature: {
    minimumSilenceRatio: 0.34,
    viewportBreathingPriority: "high",
  },
  emotionalSilenceSignature: {
    afterRevealPause: "always",
    ctaInterruption: "minimal",
  },
  ritualPacingSignature: {
    revealPattern: "layered",
    continuationTone: "optional-and-gentle",
  },
} as const;

export const signatureAtmosphereAvoid = [
  "brand_visual_blast",
  "strong_logo_presence",
  "slogan_repetition",
  "over_branding",
] as const;
