import type {
  CapabilityEngine,
  EmotionalGuidanceInput,
  EngineOutput,
} from "@/types/engines";

export interface RitualPlanPayload {
  ritualId: string;
  title: string;
  steps: string[];
  estimatedMinutes: number;
}

export const ritualEngine: CapabilityEngine<RitualPlanPayload> = {
  name: "ritual-engine",
  async run(input: EmotionalGuidanceInput): Promise<EngineOutput<RitualPlanPayload>> {
    const title =
      input.mode === "ritual_journey" ? "Ritual Re-Alignment Pause" : "Three-Breath Reset";

    return {
      engine: "ritual-engine",
      version: "0.1.0",
      payload: {
        ritualId: "grounding-breath-3",
        title,
        steps: [
          "Place one hand on your chest and one on your abdomen.",
          "Inhale slowly for four counts and exhale for six counts.",
          "Name one intention for the next hour.",
        ],
        estimatedMinutes: 3,
      },
    };
  },
};
