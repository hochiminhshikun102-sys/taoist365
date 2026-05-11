export interface SessionState {
  sessionId: string;
  startedAt: string;
  activeMode:
    | "daily_guidance"
    | "ritual_journey"
    | "session_support"
    | "follow_up_support";
  emotionalSafetyAcknowledged: boolean;
}
