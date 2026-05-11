import type {
  CapabilityEngine,
  EmotionalGuidanceInput,
  EmotionalGuidancePayload,
} from "@/types/engines";

export const guidanceEngine: CapabilityEngine<EmotionalGuidancePayload> = {
  name: "guidance-engine",
  async run(input: EmotionalGuidanceInput) {
    const modeHint =
      input.mode === "ritual_journey" ? "One ritual step on-site." : "Same domain; no memory.";

    return {
      engine: "guidance-engine",
      version: "0.1.0",
      payload: {
        insight: "Optional pacing—nothing locked in.",
        tendency: modeHint,
        ritualAction: "Pause before the next click if you want.",
        pausePrompt: "—",
        followUpSuggestion: "Close the tab anytime.",
        emotionalSafetyNote: "Not medical or legal advice.",
      },
    };
  },
};
