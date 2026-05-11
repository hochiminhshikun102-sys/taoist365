export type MotionZoneBehavior =
  | "reveal-allowed"
  | "must-stay-still"
  | "low-motion-only"
  | "reveal-after-scroll-enter";

export interface MotionZoneRule {
  zone: string;
  behavior: MotionZoneBehavior;
  intent: string;
}

export const structuralMotionZones: MotionZoneRule[] = [
  {
    zone: "emotional-entry",
    behavior: "must-stay-still",
    intent: "preserve stillness and reduce opening pressure",
  },
  {
    zone: "guidance-reveal",
    behavior: "reveal-after-scroll-enter",
    intent: "respect user pacing before revealing content",
  },
  {
    zone: "between-step-pause",
    behavior: "must-stay-still",
    intent: "optional still interval between interaction steps",
  },
  {
    zone: "continuation-invite",
    behavior: "low-motion-only",
    intent: "keep optional continuation soft and non-compulsive",
  },
];
