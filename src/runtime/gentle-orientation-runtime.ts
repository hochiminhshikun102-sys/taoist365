import { dailyIndex } from "@/lib/living-day-key";

export type GentleOrientationRuntime = {
  orientationState:
    | "softGuidancePresence"
    | "quietOrientationHint"
    | "nonAuthoritativeDirection"
    | "emotionalGrounding"
    | "situationalClarity";
  orientationLine: string;
  hintLine: string;
  suppressAnswerTone: boolean;
};

export function resolveGentleOrientationRuntime(dayKey: string): GentleOrientationRuntime {
  const h = dailyIndex(`${dayKey}:gentle-orientation`, 100);
  const orientationState =
    h < 20
      ? "softGuidancePresence"
      : h < 40
        ? "quietOrientationHint"
        : h < 60
          ? "nonAuthoritativeDirection"
          : h < 80
            ? "emotionalGrounding"
            : "situationalClarity";

  return {
    orientationState,
    orientationLine:
      orientationState === "softGuidancePresence"
        ? "Guidance is only a soft presence, not an answer."
        : orientationState === "quietOrientationHint"
          ? "A quiet hint can be enough to face the next small thing."
          : orientationState === "nonAuthoritativeDirection"
            ? "Direction remains non-authoritative and human-sized."
            : orientationState === "emotionalGrounding"
              ? "Grounding is practical when it returns attention to the day."
              : "Small situational clarity is allowed to stay modest.",
    hintLine: "A little direction, no destiny tone.",
    suppressAnswerTone: true,
  };
}
