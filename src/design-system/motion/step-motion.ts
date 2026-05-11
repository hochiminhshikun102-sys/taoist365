export const stepMotion = {
  revealCadence: {
    firstRevealMs: 380,
    staggerMs: 140,
    settleMs: 420,
  },
  transitionTiming: {
    quietFast: 180,
    quietBase: 280,
    quietSlow: 420,
  },
  stepPacing: {
    inhaleMs: 2200,
    exhaleMs: 2600,
    loopFrequency: "low",
  },
  interactionSoftness: {
    easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
    scaleFrom: 0.985,
    scaleTo: 1,
    fadeFrom: 0,
    fadeTo: 1,
  },
  hoverRestraint: {
    liftPx: 1,
    glowOpacity: 0.06,
    durationMs: 220,
  },
} as const;

export const stepMotionAvoid = [
  "bounce",
  "flashy_animation",
  "gaming_motion",
  "dopamine_ui",
  "aggressive_transition",
] as const;
