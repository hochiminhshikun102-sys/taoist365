export const readingContextLanguage = {
  subtleUseTraces: {
    halfOpenedBook: {
      visibility: "subtle",
      placement: "edge-of-focus",
      toneNote: "quiet continuity",
    },
    unfinishedPaper: {
      visibility: "subtle",
      placement: "breathing zone",
      toneNote: "ordinary use",
    },
    usedButOrderedSpace: {
      visibility: "medium-low",
      placement: "ambient",
      toneNote: "ordinary room without noise",
    },
  },
  absenceWithResidue: {
    principle: "person-left-but-room-remains",
    socialSignal: "none",
    intimacyLevel: "restrained",
  },
  quietStayFeeling: {
    stillness: "low",
    layoutPressure: "low",
  },
} as const;

export const readingContextAvoid = [
  "character_illustration",
  "real_human_lifestyle_photos",
  "social_content_framing",
  "parasocial_persona_surface",
] as const;
