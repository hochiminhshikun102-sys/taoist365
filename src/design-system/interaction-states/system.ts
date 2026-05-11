export const calmInteractionStates = {
  hoverCalmness: {
    liftPx: 1,
    durationMs: 220,
    emphasis: "subtle",
  },
  focusSoftness: {
    ringOpacity: 0.28,
    ringSpreadPx: 2,
    durationMs: 180,
  },
  pressRestraint: {
    scaleTo: 0.992,
    durationMs: 120,
    springiness: "none",
  },
  revealGentleness: {
    staggerMs: 140,
    fadeMs: 320,
    yOffsetPx: 4,
  },
  idleStillness: {
    preferred: true,
    ambientMotion: "minimal",
  },
} as const;

export const interactionStateAntiPatterns = [
  "reactive_ui_overfeedback",
  "dopamine_feedback_loops",
  "game_like_microinteractions",
] as const;
