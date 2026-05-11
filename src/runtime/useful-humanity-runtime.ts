import { dailyIndex } from "@/lib/living-day-key";

export type UsefulHumanityRuntime = {
  usefulnessState:
    | "humanScaleUsefulness"
    | "emotionalPracticality"
    | "nonPerformativeSupport"
    | "dailyAssistance"
    | "lowDramaCare";
  usefulnessLine: string;
  careLine: string;
  suppressHighConceptValue: boolean;
};

export function resolveUsefulHumanityRuntime(dayKey: string): UsefulHumanityRuntime {
  const h = dailyIndex(`${dayKey}:useful-humanity`, 100);
  const usefulnessState =
    h < 20
      ? "humanScaleUsefulness"
      : h < 40
        ? "emotionalPracticality"
        : h < 60
          ? "nonPerformativeSupport"
          : h < 80
            ? "dailyAssistance"
            : "lowDramaCare";

  return {
    usefulnessState,
    usefulnessLine:
      usefulnessState === "humanScaleUsefulness"
        ? "Human-scale usefulness matters more than atmosphere."
        : usefulnessState === "emotionalPracticality"
          ? "Emotional practicality keeps warmth grounded."
          : usefulnessState === "nonPerformativeSupport"
            ? "Support does not need to perform kindness."
            : usefulnessState === "dailyAssistance"
              ? "Daily assistance can be as small as making the room less loud."
              : "Low-drama care belongs near ordinary life.",
    careLine: "A little useful care is better than a grand idea.",
    suppressHighConceptValue: true,
  };
}
