export type EmotionalState =
  | "grounded"
  | "anxious"
  | "overwhelmed"
  | "uncertain"
  | "hopeful"
  | "drained"
  | "steady";

export type GuidanceMode =
  | "daily_guidance"
  | "ritual_journey"
  | "session_support"
  | "follow_up_support";

export interface EmotionalSignal {
  state: EmotionalState;
  intensity: number;
  note?: string;
  capturedAt: string;
}

/** Visitor posture for guidance context — environmental, not relational. */
export interface RoomAdjacentProfile {
  userId: string;
  preferredTone: "soft" | "balanced";
  ritualPace: "light" | "steady" | "deep";
  focusAreas: string[];
}

export interface JourneyMemory {
  lastGuidanceSummary?: string;
  lastRitualAction?: string;
  recentSessionSnippets: string[];
  emotionalSignals: EmotionalSignal[];
}

export interface EmotionalGuidanceContext {
  locale: string;
  timezone: string;
  sessionId: string;
  region?:
    | "global"
    | "us"
    | "eu"
    | "middle-east"
    | "southeast-asia"
    | "latin-america"
    | "australia";
  abBucket?: "A" | "B";
  sessionMinutes?: number;
  roomAdjacentProfile?: RoomAdjacentProfile;
  currentSignal?: EmotionalSignal;
  journeyMemory?: JourneyMemory;
  requestedMode: GuidanceMode;
}
