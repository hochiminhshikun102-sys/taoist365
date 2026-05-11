import { stepTimingTokens } from "@/design-system/tokens/step-timing";

export type HomeHarmonyStage =
  | "entry-arrival"
  | "space-breathing"
  | "material-layout"
  | "calm-guidance-entry"
  | "grounding-pause"
  | "soft-next-step";

export interface HomeHarmonyStep {
  stage: HomeHarmonyStage;
  pacing: "slow" | "steady";
  sectionShift: string;
  layoutTone: "soft" | "warm";
  timingMs?: number;
}

export const homeHarmonyExperienceFlow: HomeHarmonyStep[] = [
  {
    stage: "entry-arrival",
    pacing: "slow",
    sectionShift: "from busy mode to home calm awareness",
    layoutTone: "soft",
    timingMs: stepTimingTokens.settleDelayMs,
  },
  {
    stage: "space-breathing",
    pacing: "slow",
    sectionShift: "from visual clutter to spatial breathing",
    layoutTone: "soft",
    timingMs: stepTimingTokens.stepBreathingTimingMs.inhale,
  },
  {
    stage: "material-layout",
    pacing: "slow",
    sectionShift: "from abstract guidance to tangible lifestyle feeling",
    layoutTone: "warm",
    timingMs: stepTimingTokens.revealCadenceMs.firstLayer,
  },
  {
    stage: "calm-guidance-entry",
    pacing: "steady",
    sectionShift: "from space observation to gentle home guidance",
    layoutTone: "soft",
  },
  {
    stage: "grounding-pause",
    pacing: "slow",
    sectionShift: "from advice consumption to personal grounding",
    layoutTone: "soft",
    timingMs: stepTimingTokens.betweenStepPauseMs,
  },
  {
    stage: "soft-next-step",
    pacing: "steady",
    sectionShift: "from pause step to optional home rhythm continuation",
    layoutTone: "warm",
    timingMs: stepTimingTokens.continuationSpacingMs,
  },
];

export const homeHarmonyPrototypeRules = {
  notFengShuiToolFeeling: true,
  emphasizeHomeCalmExperience: true,
  supportUS_EU_AU_LifestyleFit: true,
  avoidDenseInstructionStack: true,
} as const;
