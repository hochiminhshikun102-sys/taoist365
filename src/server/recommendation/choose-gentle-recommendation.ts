import type { RecommendationPayload } from "@/types/engines";

export interface GentleRecommendationInput {
  emotionalState: string;
  ritualMomentum: "low" | "medium" | "high";
}

export function chooseGentleRecommendation(
  input: GentleRecommendationInput,
): RecommendationPayload {
  if (input.ritualMomentum === "low") {
    return {
      nextActionId: "tiny-breathing-ritual",
      reasonCodes: [
        "low_momentum_support",
        "emotional_grounding",
        "healthy_distance_preserved",
      ],
      confidence: 0.72,
      gentleCopy:
        "Try a two-minute grounding ritual before making bigger decisions. You can pause and skip suggestions at any time.",
    };
  }

  return {
    nextActionId: "daily-pause-card",
    reasonCodes: [
      "stable_momentum",
      "session_continuity",
      "non_dependency_recommendation",
    ],
    confidence: 0.66,
    gentleCopy:
      "A short pause card can keep today’s rhythm steady. Optional—skip anytime.",
  };
}
