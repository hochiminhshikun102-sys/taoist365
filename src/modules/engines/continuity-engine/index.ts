import type {
  CapabilityEngine,
  EmotionalGuidanceInput,
  EngineOutput,
} from "@/types/engines";

export interface ContinuityPayload {
  followUpMessage: string;
  delayHours: number;
  channel: "in_app" | "email";
}

export const continuityEngine: CapabilityEngine<ContinuityPayload> = {
  name: "continuity-engine",
  async run(input: EmotionalGuidanceInput): Promise<EngineOutput<ContinuityPayload>> {
    const emotionalIntensity = input.context.currentSignal?.intensity ?? 0.5;

    return {
      engine: "continuity-engine",
      version: "0.1.0",
      payload: {
        followUpMessage:
          "The same quiet room remains when you choose to return—no schedule, no thread you owe.",
        delayHours: emotionalIntensity > 0.7 ? 6 : 24,
        channel: "in_app",
      },
    };
  },
};
