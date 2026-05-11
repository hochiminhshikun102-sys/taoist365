export const sessionCopyLayer = {
  quietSessionLineDensity: {
    promptDensity: "low",
    tone: "calm-observational",
  },
  unfinishedSoftness: {
    closureStyle: "open-ended",
    avoidFinalAnswers: true,
  },
  breathingRoom: {
    pauseMarkers: true,
    interpretiveSpace: "high",
  },
  nonForcedInterpretation: {
    userConclusionPressure: "none",
    guidedMeaningOnly: false,
  },
  calmAftertone: {
    endingTemperature: "warm-quiet",
    continuationUrgency: "none",
  },
} as const;
