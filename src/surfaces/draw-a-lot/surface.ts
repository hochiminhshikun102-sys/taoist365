import { stepTimingTokens } from "@/design-system/tokens/step-timing";

export interface DrawLotSurfaceStep {
  id: string;
  role:
    | "arrival-surface"
    | "settle-surface"
    | "breathing-interaction"
    | "reveal-surface"
    | "pause-zone"
    | "continuation-surface";
  interactionGapMs: number;
  revealLayer?: number;
  ctaPressure: "none" | "low";
  sectionShift: string;
}

export const drawLotInteractiveSurface: DrawLotSurfaceStep[] = [
  {
    id: "arrival",
    role: "arrival-surface",
    interactionGapMs: stepTimingTokens.settleDelayMs,
    ctaPressure: "none",
    sectionShift: "from immediate action habit to quiet room pacing",
  },
  {
    id: "settle",
    role: "settle-surface",
    interactionGapMs: stepTimingTokens.stepBreathingTimingMs.inhale,
    ctaPressure: "none",
    sectionShift: "from intent seeking to intentional settling",
  },
  {
    id: "breathing",
    role: "breathing-interaction",
    interactionGapMs: stepTimingTokens.stepBreathingTimingMs.exhale,
    ctaPressure: "low",
    sectionShift: "from impulse tapping to paced step interaction",
  },
  {
    id: "reveal",
    role: "reveal-surface",
    interactionGapMs: stepTimingTokens.revealCadenceMs.secondLayer,
    revealLayer: 3,
    ctaPressure: "none",
    sectionShift: "from anticipation to gradual receiving",
  },
  {
    id: "between-step",
    role: "pause-zone",
    interactionGapMs: stepTimingTokens.betweenStepPauseMs,
    ctaPressure: "none",
    sectionShift: "from interpretation to inner pause",
  },
  {
    id: "continuation",
    role: "continuation-surface",
    interactionGapMs: stepTimingTokens.continuationSpacingMs,
    ctaPressure: "low",
    sectionShift: "from closure to optional next step",
  },
];
