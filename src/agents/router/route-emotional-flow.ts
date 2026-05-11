import type { AgentRoutingDecision } from "@/agents/types";
import type { EmotionalGuidanceInput } from "@/types/engines";

export function routeEmotionalFlow(
  input: EmotionalGuidanceInput,
): AgentRoutingDecision {
  if (input.mode === "ritual_journey") {
    return {
      mode: input.mode,
      primaryAgent: "ritual-journey-agent",
      supportAgents: ["session-agent", "recommendation-agent"],
    };
  }

  if (input.mode === "follow_up_support") {
    return {
      mode: input.mode,
      primaryAgent: "follow-up-agent",
      supportAgents: ["recommendation-agent", "emotional-guide-agent"],
    };
  }

  if (input.mode === "session_support") {
    return {
      mode: input.mode,
      primaryAgent: "session-agent",
      supportAgents: ["emotional-guide-agent"],
    };
  }

  return {
    mode: input.mode,
    primaryAgent: "emotional-guide-agent",
    supportAgents: ["ritual-journey-agent", "recommendation-agent"],
  };
}
