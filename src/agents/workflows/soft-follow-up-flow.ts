import type { EmotionalWorkflow } from "@/agents/types";

export const softFollowUpFlow: EmotionalWorkflow = {
  name: "soft-follow-up-flow",
  steps: [
    { id: "clarify-1", agent: "session-agent", purpose: "clarify" },
    { id: "guide-1", agent: "emotional-guide-agent", purpose: "guide" },
    { id: "follow-up-1", agent: "follow-up-agent", purpose: "follow_up" },
  ],
  completionSignal: "clearer_focus",
};
