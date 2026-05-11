export const spatialHumanWarmth = {
  emotionalGrounding: {
    baseline: "stable",
    pressure: "low",
  },
  quietFamiliarity: {
    socialTone: "none",
    comfortSignal: "subtle",
  },
  calmDistance: {
    closeness: "moderate-far",
    boundaryPreserved: true,
  },
  warmRestraint: {
    expression: "minimal",
    avoidCozyOverload: true,
  },
  breathableIntimacy: {
    intimacyLevel: "light",
    spatialAir: "high",
  },
} as const;

export const humanWarmthAvoid = [
  "parasocial_intimacy_tone",
  "dependency_cues",
  "over_familiar_closeness",
] as const;
