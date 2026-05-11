import type {
  CapabilityEngine,
  EmotionalGuidanceInput,
  RecommendationPayload,
} from "@/types/engines";

export const recommendationEngine: CapabilityEngine<RecommendationPayload> = {
  name: "recommendation-engine",
  async run(input: EmotionalGuidanceInput) {
    return {
      engine: "recommendation-engine",
      version: "0.1.0",
      payload: {
        nextActionId:
          input.mode === "ritual_journey" ? "ritual-follow-up-check" : "daily-pause-card",
        reasonCodes: ["emotional_continuity", "gentle_progression"],
        confidence: 0.71,
        gentleCopy: "A small follow-up step can keep your inner rhythm more stable.",
      },
    };
  },
};
