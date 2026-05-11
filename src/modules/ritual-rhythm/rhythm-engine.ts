import type { PolicyRuleSet } from "@/policies/shared/types";

export interface RitualRhythmState {
  dailyCadenceHours: number;
  followUpSpacingHours: number;
  recommendationGapHours: number;
  sessionBoundaryMinutes: number;
  betweenStepPauseMinutes: number;
}

export function buildRitualRhythm(policy: PolicyRuleSet): RitualRhythmState {
  const paced = policy.recommendationPacing === "slow";
  const spaced = policy.sessionPacing === "spaced";

  return {
    dailyCadenceHours: paced ? 24 : 18,
    followUpSpacingHours: spaced ? 20 : 12,
    recommendationGapHours: paced ? 16 : 10,
    sessionBoundaryMinutes: spaced ? 18 : 24,
    betweenStepPauseMinutes: paced ? 6 : 4,
  };
}
