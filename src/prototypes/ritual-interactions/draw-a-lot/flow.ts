import { stepTimingTokens } from "@/design-system/tokens/step-timing";

export type DrawLotStage =
  | "arrival"
  | "settle-moment"
  | "lot-selection-step"
  | "shake-reveal-rhythm"
  | "moon-block-confirmation"
  | "guidance-reveal"
  | "between-step-pause"
  | "optional-continuation";

export interface DrawLotExperienceStep {
  stage: DrawLotStage;
  pacing: "slow" | "steady";
  sectionShift: string;
  silence: "low" | "medium" | "high";
  timingMs?: number;
  guidanceLanguage: string;
}

export const drawLotExperienceFlow: DrawLotExperienceStep[] = [
  {
    stage: "arrival",
    pacing: "slow",
    sectionShift: "from noise to stillness",
    silence: "high",
    timingMs: stepTimingTokens.settleDelayMs,
    guidanceLanguage: "Arrive first. There is nothing to rush.",
  },
  {
    stage: "settle-moment",
    pacing: "slow",
    sectionShift: "from urgency to steadier breath",
    silence: "high",
    timingMs: stepTimingTokens.stepBreathingTimingMs.inhale,
    guidanceLanguage: "Take one quiet breath before choosing.",
  },
  {
    stage: "lot-selection-step",
    pacing: "steady",
    sectionShift: "from uncertainty to intentional choice",
    silence: "medium",
    guidanceLanguage: "Choose gently, with one clear intention.",
  },
  {
    stage: "shake-reveal-rhythm",
    pacing: "slow",
    sectionShift: "from action to anticipation",
    silence: "medium",
    timingMs: stepTimingTokens.revealCadenceMs.preReveal,
    guidanceLanguage: "Let the answer arrive in its own rhythm.",
  },
  {
    stage: "moon-block-confirmation",
    pacing: "slow",
    sectionShift: "from anticipation to confirmation",
    silence: "medium",
    timingMs: stepTimingTokens.revealCadenceMs.firstLayer,
    guidanceLanguage: "A quiet confirmation, not a hard verdict.",
  },
  {
    stage: "guidance-reveal",
    pacing: "slow",
    sectionShift: "from seeking to calm receiving",
    silence: "medium",
    timingMs: stepTimingTokens.revealCadenceMs.secondLayer,
    guidanceLanguage: "Receive one layer at a time.",
  },
  {
    stage: "between-step-pause",
    pacing: "slow",
    sectionShift: "from receiving to inner processing",
    silence: "high",
    timingMs: stepTimingTokens.betweenStepPauseMs,
    guidanceLanguage: "Pause here. Let this settle before anything next.",
  },
  {
    stage: "optional-continuation",
    pacing: "steady",
    sectionShift: "from completion to optional continuity",
    silence: "medium",
    timingMs: stepTimingTokens.continuationSpacingMs,
    guidanceLanguage: "Continue only if it still feels supportive.",
  },
];

export const drawLotPrototypeRules = {
  avoidImmediateCTA: true,
  avoidGameLikeShake: true,
  avoidInstantFullReveal: true,
  continuationMustBeOptional: true,
  continuationMustBeBoundaryAware: true,
} as const;
