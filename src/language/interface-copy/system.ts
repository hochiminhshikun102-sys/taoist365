export const coreVoiceSystem = {
  voiceTraits: [
    "calm",
    "observant",
    "warm minimal",
    "emotionally intelligent",
    "steady",
    "spacious",
    "quietly grounded",
  ],
  sentencePacingRules: {
    maxClausesPerSentence: 2,
    preferredSentenceLength: "short-to-medium",
    rhythm: "slow-readable",
    punctuationPressure: "low",
  },
  emotionalPressureLimits: {
    urgencyWords: "disallowed",
    emotionalIntensityCap: "medium-low",
    persuasionForce: "low",
  },
  wordingSoftnessSystem: {
    preferredVerbs: ["consider", "notice", "pause", "explore", "return"],
    avoidCommandVerbs: true,
    certaintySofteners: ["may", "might", "can", "tends to"],
  },
  invitationDistanceRules: {
    closenessLevel: "respectful-distance",
    autonomyReminder: "required",
  },
  calmVocabularyPatterns: {
    preferredLexicon: ["quiet", "steady", "gentle", "grounded", "plain"],
    avoidHypeWords: true,
  },
} as const;

export const coreVoiceAvoid = [
  "guru_tone",
  "therapist_tone",
  "productivity_tone",
  "over_friendliness",
  "hype_language",
  "certainty_language",
  "dependency_language",
] as const;
