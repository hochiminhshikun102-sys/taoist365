export type GuidanceIntent =
  | "daily"
  | "relationship"
  | "career"
  | "home_harmony"
  | "ritual";

export interface UserContext {
  timezone: string;
  locale: string;
  lifeStage?: string;
  currentMood?: string;
  intention?: string;
  homeContext?: string;
}

export interface GuidanceResult {
  insight: string;
  todayFocus: string;
  ritualAction: string;
  pausePrompt: string;
  cautionNote: string;
}
