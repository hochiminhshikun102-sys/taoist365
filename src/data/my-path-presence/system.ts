export const myPathPresence = {
  sharedTraces: [
    "A line ended mid-page without a save.",
    "A pause from earlier is still in the room somewhere.",
    "Something softened a little without needing a name.",
  ],
  byRitual: {
    homepage: [
      "The room still has that slightly slower pace from before.",
      "A corner is still clear if the door drifts open again.",
    ],
    drawALot: [
      "An earlier draw still reads plain if the eye passes over it.",
      "Nothing from then needs resolving today.",
    ],
    dailyGuidance: [
      "A line from earlier is still lying around in the stack.",
      "Later today can stay unplanned.",
    ],
    homeHarmony: [
      "A calmer corner from before is still there.",
      "One thing stayed where the last hand set it.",
    ],
  },
  objectEchoes: [
    "A cup left with warmth.",
    "A paper edge not fully turned.",
    "A wood line still in soft light.",
  ],
} as const;

export type MyPathRitualKey = keyof typeof myPathPresence.byRitual;
