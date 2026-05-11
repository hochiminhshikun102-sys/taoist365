import { stepTimingTokens } from "@/design-system/tokens/step-timing";

export type DailyGuidanceStage =
  | "morning-arrival"
  | "morning-soft-reset"
  | "single-guidance"
  | "small-step-action"
  | "one-pause-prompt"
  | "quiet-close";

export interface DailyGuidanceStep {
  stage: DailyGuidanceStage;
  pacing: "slow" | "steady";
  sectionShift: string;
  outputDensity: "minimal" | "light";
  timingMs?: number;
}

export const dailyGuidanceExperienceFlow: DailyGuidanceStep[] = [
  {
    stage: "morning-arrival",
    pacing: "slow",
    sectionShift: "from scattered morning state to calm check-in",
    outputDensity: "minimal",
    timingMs: stepTimingTokens.settleDelayMs,
  },
  {
    stage: "morning-soft-reset",
    pacing: "slow",
    sectionShift: "from tension to a softer internal rhythm",
    outputDensity: "minimal",
    timingMs: stepTimingTokens.stepBreathingTimingMs.exhale,
  },
  {
    stage: "single-guidance",
    pacing: "steady",
    sectionShift: "from ambiguity to one gentle direction",
    outputDensity: "light",
  },
  {
    stage: "small-step-action",
    pacing: "steady",
    sectionShift: "from insight to one grounded action",
    outputDensity: "minimal",
  },
  {
    stage: "one-pause-prompt",
    pacing: "slow",
    sectionShift: "from reaction to short pause",
    outputDensity: "minimal",
    timingMs: stepTimingTokens.betweenStepPauseMs,
  },
  {
    stage: "quiet-close",
    pacing: "slow",
    sectionShift: "from guidance session to calm continuation of day",
    outputDensity: "minimal",
    timingMs: stepTimingTokens.continuationSpacingMs,
  },
];

export const dailyGuidancePrototypeRules = {
  singleGuidanceOnly: true,
  singleRitualActionOnly: true,
  singlePausePromptOnly: true,
  avoidLongOutput: true,
  avoidFeedFeeling: true,
  avoidMotivationalAppTone: true,
} as const;
