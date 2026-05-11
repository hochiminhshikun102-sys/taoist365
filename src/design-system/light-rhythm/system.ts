export const lightRhythm = {
  warmAmbientGlow: {
    intensity: 0.14,
    spread: "wide",
    hue: "warm-linen",
  },
  quietShadowDepth: {
    depthScale: "low",
    layeredShadowCount: 2,
    contrast: "soft",
  },
  lowPressureLayering: {
    maxSurfaceLayers: 3,
    avoidStackedDepthDrama: true,
  },
  softLightTransitions: {
    transitionMs: 520,
    curve: "ease-out",
  },
  breathingDarknessRatio: {
    darkToLight: 0.18,
    preserveCalmReadability: true,
  },
} as const;

export const lightRhythmAvoid = [
  "glow_spectacle",
  "dramatic_contrast",
  "harsh_spotlighting",
  "mystical_aura_effects",
] as const;
