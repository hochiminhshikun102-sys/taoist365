export const liveMotion = {
  revealSoftness: {
    durationMs: 320,
    staggerMs: 140,
    easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  },
  scrollRestraint: {
    sectionSnap: "none",
    suggestivePacing: "slow",
  },
  transitionSilence: {
    betweenStatesMs: 480,
  },
  stillnessPreservation: {
    stillZonesRequired: true,
    ambientMotion: "minimal",
  },
  hoverMinimality: {
    liftPx: 1,
    durationMs: 220,
  },
  brandMotionPresence: {
    usage: "subtle-loading-transition-pause-only",
    maxViewportOccurrences: 1,
    preferredOpacity: 0.6,
    allowOpeningSurfaceAutoplay: false,
  },
} as const;

export const liveMotionAntiPatterns = [
  "bounce",
  "flashy_animation",
  "reactive_motion_overload",
  "dopamine_motion",
  "opening_surface_logo_autoplay",
  "startup_style_animated_branding",
] as const;
