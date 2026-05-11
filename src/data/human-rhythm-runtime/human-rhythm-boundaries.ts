/**
 * Human rhythm runtime — lived-in domestic time, not personas, not tracking.
 */

export const humanRhythmBoundaries = {
  whatThisIs:
    "Editor-authored fragments keyed to calendar day and shared world state—ordinary unfinished life, not user profiling.",

  forbidden: [
    "Self-care culture, healing journeys, nervous-system wellness copy.",
    "Cozy productivity, slow-living influencer cadence, curated apartment sadness staging.",
    "Burnout aesthetics, loneliness performance, sad-night theater.",
    "Characters, NPCs, lore, relationship arcs, named cohabitants.",
    "Parasocial intimacy, therapy voice, coaching toward improvement.",
    "Behavior tracking, attention metrics, streaks, ‘we noticed you’ memory.",
    "Real-time presence, activity feeds, push, live updates.",
  ],

  allowedResemblance: [
    "Unfinished domestic edges—cups not cleared, drawers half jobs.",
    "Anonymous household drift—another mug angle, shoes rotated, towel moved.",
    "Late hours as plain clock facts, not emotional staging.",
    "Objects survived—scuff democracy, not styled patina marketing.",
  ],
} as const;
