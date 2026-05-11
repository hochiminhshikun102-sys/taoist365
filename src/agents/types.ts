import type {
  EmotionalGuidanceContext,
  GuidanceMode,
} from "@/types/emotional-guidance";

export type AgentRole =
  | "emotional-guide-agent"
  | "ritual-journey-agent"
  | "session-agent"
  | "follow-up-agent"
  | "recommendation-agent";

export interface AgentRoutingDecision {
  mode: GuidanceMode;
  primaryAgent: AgentRole;
  supportAgents: AgentRole[];
}

export interface AgentMemoryPacket {
  sessionId: string;
  context: EmotionalGuidanceContext;
  memoryWindowSummary: string;
  safetyFlags: string[];
}

export interface WorkflowStep {
  id: string;
  agent: AgentRole;
  purpose:
    | "stabilize"
    | "clarify"
    | "guide"
    | "ritualize"
    | "pause"
    | "follow_up";
}

export interface EmotionalWorkflow {
  name: "daily-guidance-flow" | "ritual-realignment-flow" | "soft-follow-up-flow";
  steps: WorkflowStep[];
  completionSignal: "calmer_state" | "clearer_focus" | "gentle_next_step";
}
