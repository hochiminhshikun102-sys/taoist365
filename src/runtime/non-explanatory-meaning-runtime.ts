import { dailyIndex } from "@/lib/living-day-key";

export type NonExplanatoryMeaningRuntime = {
  explanationState:
    | "feltUnsaid"
    | "atmosphereBeforeLanguage"
    | "intuitiveContinuity"
    | "nonVerbalUnderstanding"
    | "silentSignificance";
  nonExplanatoryLine: string;
  boundaryLine: string;
  suppressMeaningExplanation: boolean;
};

export function resolveNonExplanatoryMeaningRuntime(dayKey: string): NonExplanatoryMeaningRuntime {
  const h = dailyIndex(`${dayKey}:non-explanatory-meaning`, 100);
  const explanationState =
    h < 22
      ? "feltUnsaid"
      : h < 42
        ? "atmosphereBeforeLanguage"
        : h < 62
          ? "intuitiveContinuity"
          : h < 82
            ? "nonVerbalUnderstanding"
            : "silentSignificance";

  return {
    explanationState,
    nonExplanatoryLine:
      explanationState === "feltUnsaid"
        ? "Meaning is felt but left unsaid."
        : explanationState === "atmosphereBeforeLanguage"
          ? "Atmosphere arrives before language has a reason to explain it."
          : explanationState === "intuitiveContinuity"
            ? "Continuity is understood intuitively and does not need a caption."
            : explanationState === "nonVerbalUnderstanding"
              ? "A non-verbal understanding rests between object, wind, and time."
              : "Silent significance stays quiet enough to remain free.",
    boundaryLine: "Deep things do not need the system to explain them.",
    suppressMeaningExplanation: h > 14,
  };
}
