export interface EmotionalFlowState {
  currentState: string;
  intensity: number;
  trend: "stabilizing" | "fluctuating" | "improving";
  latestCheckInAt?: string;
}
