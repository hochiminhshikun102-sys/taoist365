import type {
  EmotionalGuidanceContext,
  GuidanceMode,
} from "@/types/emotional-guidance";

export type EngineName =
  | "guidance-engine"
  | "ritual-engine"
  | "environmental-adaptation-engine"
  | "recommendation-engine"
  | "continuity-engine";

export interface EngineContext {
  userId?: string;
  locale: string;
  timezone: string;
  sessionId?: string;
}

export interface EngineOutput<TPayload> {
  engine: EngineName;
  version: string;
  payload: TPayload;
}

export interface EmotionalGuidanceInput {
  context: EmotionalGuidanceContext;
  mode: GuidanceMode;
  userPrompt?: string;
}

export interface EmotionalGuidancePayload {
  insight: string;
  tendency: string;
  ritualAction: string;
  pausePrompt: string;
  followUpSuggestion: string;
  emotionalSafetyNote: string;
}

export interface RecommendationPayload {
  nextActionId: string;
  reasonCodes: string[];
  confidence: number;
  gentleCopy: string;
}

export interface CapabilityEngine<TPayload> {
  name: EngineName;
  run: (input: EmotionalGuidanceInput) => Promise<EngineOutput<TPayload>>;
}
