export const guidanceToneFramework = {
  uncertaintyTolerance: {
    mode: "explicit",
    preferredPhrases: ["may", "might", "can be", "tends to"],
  },
  nonFatalisticLanguage: {
    destinyClaims: "disallowed",
    fixedOutcomeWords: "disallowed",
  },
  suggestionFraming: {
    style: "gentle-suggestion",
    commandStyle: "forbidden",
  },
  emotionalSpaciousness: {
    interpretationDensity: "low-to-medium",
    allowUserMeaningSpace: true,
  },
  groundedInterpretation: {
    tone: "practical-neutral",
    avoidAbsolutes: true,
  },
} as const;

export const guidanceToneAvoid = [
  "destiny_claims",
  "absolute_certainty",
  "fear_hooks",
  "dependency_framing",
  "emotional_manipulation",
] as const;
