export const ritualRecognitionLanguage = {
  revealRhythmIdentity: {
    style: "layered-calm-reveal",
    cadence: "slow",
  },
  betweenStepPauseSignature: {
    required: true,
    minimumPauseMs: 2200,
  },
  calmContinuationBehavior: {
    continuationType: "optional",
    pressure: "low",
    boundaryReminder: true,
  },
  gentleInvitationTone: {
    voice: "invite-not-command",
    urgencyWords: "disallowed",
  },
  quietInteractionCadence: {
    interactionGap: "breathing",
    feedbackIntensity: "subtle",
  },
} as const;
