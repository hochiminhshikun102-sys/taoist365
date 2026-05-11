import type {
  CapabilityEngine,
  EmotionalGuidanceInput,
  EngineOutput,
} from "@/types/engines";

export interface EnvironmentalAdaptationPayload {
  atmosphereTone: "soft" | "balanced";
  ritualCadence: "light" | "steady" | "deep";
  followUpWindowHours: number;
}

export const environmentalAdaptationEngine: CapabilityEngine<EnvironmentalAdaptationPayload> = {
  name: "environmental-adaptation-engine",
  async run(
    input: EmotionalGuidanceInput,
  ): Promise<EngineOutput<EnvironmentalAdaptationPayload>> {
    const intensity = input.context.currentSignal?.intensity ?? 0.5;

    return {
      engine: "environmental-adaptation-engine",
      version: "0.1.0",
      payload: {
        atmosphereTone: intensity > 0.6 ? "soft" : "balanced",
        ritualCadence: intensity > 0.7 ? "light" : "steady",
        followUpWindowHours: intensity > 0.7 ? 6 : 18,
      },
    };
  },
};
