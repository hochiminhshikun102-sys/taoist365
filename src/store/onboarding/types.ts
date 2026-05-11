export interface OnboardingState {
  completed: boolean;
  focusAreas: string[];
  preferredTone: "soft" | "balanced";
  preferredCadence: "daily" | "few_times_week";
}
