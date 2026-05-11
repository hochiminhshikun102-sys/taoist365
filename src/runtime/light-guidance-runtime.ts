import { dailyIndex } from "@/lib/living-day-key";

export type LightGuidanceRuntime = {
  guidanceState:
    | "nonMysticalGuidance"
    | "ordinaryReflection"
    | "situationalResonance"
    | "lowPressurePerspective"
    | "practicalInterpretation";
  guidanceLine: string;
  perspectiveLine: string;
  suppressFateTone: boolean;
};

export function resolveLightGuidanceRuntime(dayKey: string): LightGuidanceRuntime {
  const h = dailyIndex(`${dayKey}:light-guidance`, 100);
  const guidanceState =
    h < 20
      ? "nonMysticalGuidance"
      : h < 40
        ? "ordinaryReflection"
        : h < 60
          ? "situationalResonance"
          : h < 80
            ? "lowPressurePerspective"
            : "practicalInterpretation";

  return {
    guidanceState,
    guidanceLine:
      guidanceState === "nonMysticalGuidance"
        ? "Guidance stays non-mystical and close to the day."
        : guidanceState === "ordinaryReflection"
          ? "Reflection can be ordinary and still useful."
          : guidanceState === "situationalResonance"
            ? "A small resonance with the situation is enough."
            : guidanceState === "lowPressurePerspective"
              ? "Perspective stays low-pressure and optional."
              : "Interpretation remains practical rather than fateful.",
    perspectiveLine: "A little perspective, no command over life.",
    suppressFateTone: true,
  };
}
