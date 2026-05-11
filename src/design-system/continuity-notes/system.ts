export const continuityNotesLayer = {
  sessionAftertone: {
    target: "calm-residue",
    intensity: "gentle",
    durationHint: "lingers-without-pressure",
  },
  sessionResidue: {
    postSessionFeeling: "unfinished-but-settled",
    cognitiveLoad: "light",
  },
  calmRecallMoments: {
    triggerStyle: "soft-contextual",
    frequency: "low",
  },
  spatialFamiliarity: {
    familiarityCurve: "slow-build",
    repetitionMode: "subtle-consistency",
  },
  slowAnchoring: {
    anchorType: "rhythm-and-silence",
    avoidStimulusAnchors: true,
  },
} as const;
