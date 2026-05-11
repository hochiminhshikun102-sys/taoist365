export interface RitualProgressState {
  ritualId: string;
  currentStepIndex: number;
  completedSteps: number[];
  completedAt?: string;
}
