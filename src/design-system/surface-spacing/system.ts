import { rhythmTokens } from "@/design-system/tokens/rhythm";

/** Spacing + absorbed rhythm — single import for surfaces (see `runtime-absorption/`). */
export const surfaceSpacing = {
  viewportBreathingRatio: {
    calm: 0.92,
    standard: 0.78,
    compact: 0.64,
  },
  sectionSilenceRatio: {
    high: 0.42,
    medium: 0.3,
    low: 0.2,
  },
  interactionGapRhythm: {
    calmMs: 600,
    steadyMs: 360,
    quickMs: 220,
  },
  sessionPauseSpacing: {
    short: "clamp(1.25rem, 3vw, 2rem)",
    medium: "clamp(2rem, 5vw, 3.5rem)",
    long: "clamp(3rem, 7vw, 5rem)",
  },
  /** Consumed by layouts/CSS (`runtime-room-shell` utilities) — rhythm absorbed quietly. */
  roomRhythm: rhythmTokens,
} as const;
