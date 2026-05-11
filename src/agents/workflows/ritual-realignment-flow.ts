import type { EmotionalWorkflow } from "@/agents/types";

export const ritualRealignmentFlow: EmotionalWorkflow = {
  name: "ritual-realignment-flow",
  steps: [
    { id: "stabilize-1", agent: "emotional-guide-agent", purpose: "stabilize" },
    { id: "ritualize-1", agent: "ritual-journey-agent", purpose: "ritualize" },
    { id: "pause-1", agent: "session-agent", purpose: "pause" },
    { id: "follow-up-1", agent: "follow-up-agent", purpose: "follow_up" },
  ],
  completionSignal: "calmer_state",
};
