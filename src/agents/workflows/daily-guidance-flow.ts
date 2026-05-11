import type { EmotionalWorkflow } from "@/agents/types";

export const dailyGuidanceFlow: EmotionalWorkflow = {
  name: "daily-guidance-flow",
  steps: [
    { id: "stabilize-1", agent: "emotional-guide-agent", purpose: "stabilize" },
    { id: "clarify-1", agent: "session-agent", purpose: "clarify" },
    { id: "guide-1", agent: "emotional-guide-agent", purpose: "guide" },
    { id: "ritualize-1", agent: "ritual-journey-agent", purpose: "ritualize" },
    { id: "follow-up-1", agent: "follow-up-agent", purpose: "follow_up" },
  ],
  completionSignal: "gentle_next_step",
};
