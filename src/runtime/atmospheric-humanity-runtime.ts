import { dailyIndex } from "@/lib/living-day-key";

export type AtmosphericHumanityRuntime = {
  humanityMaturity:
    | "matureWarmth"
    | "nonNeedyHumanity"
    | "quietEmotionalStability"
    | "lowPressureTenderness"
    | "restrainedSoftness";
  atmosphericHumanityLine: string;
  emotionalCalmLine: string;
  avoidFeedbackSeeking: boolean;
};

export function resolveAtmosphericHumanityRuntime(dayKey: string): AtmosphericHumanityRuntime {
  const h = dailyIndex(`${dayKey}:atmospheric-humanity`, 100);
  const humanityMaturity =
    h < 22
      ? "matureWarmth"
      : h < 42
        ? "nonNeedyHumanity"
        : h < 62
          ? "quietEmotionalStability"
          : h < 82
            ? "lowPressureTenderness"
            : "restrainedSoftness";

  return {
    humanityMaturity,
    atmosphericHumanityLine:
      humanityMaturity === "matureWarmth"
        ? "Mature warmth stays present without asking to be felt."
        : humanityMaturity === "nonNeedyHumanity"
          ? "Humanity becomes non-needy and therefore easier to trust."
          : humanityMaturity === "quietEmotionalStability"
            ? "Quiet emotional stability keeps tenderness from becoming a product."
            : humanityMaturity === "lowPressureTenderness"
              ? "Low-pressure tenderness lets the room remain light."
              : "Restrained softness gives Reverent Inquiry long-term human calm.",
    emotionalCalmLine: "The civilization does not ask the user for emotional feedback.",
    avoidFeedbackSeeking: h > 16,
  };
}
