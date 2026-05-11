import { dailyIndex } from "@/lib/living-day-key";

export type AmbientGuidanceRuntime = {
  guidanceState:
    | "lowPressureOrientation"
    | "atmosphereLevelSupport"
    | "nonVerbalGuidance"
    | "subtleResonance"
    | "environmentalGrounding";
  guidanceLine: string;
  groundingLine: string;
  suppressResponseFeeling: boolean;
};

export function resolveAmbientGuidanceRuntime(dayKey: string): AmbientGuidanceRuntime {
  const h = dailyIndex(`${dayKey}:ambient-guidance`, 100);
  const guidanceState =
    h < 20
      ? "lowPressureOrientation"
      : h < 40
        ? "atmosphereLevelSupport"
        : h < 60
          ? "nonVerbalGuidance"
          : h < 80
            ? "subtleResonance"
            : "environmentalGrounding";

  return {
    guidanceState,
    guidanceLine:
      guidanceState === "lowPressureOrientation"
        ? "Orientation can stay low pressure."
        : guidanceState === "atmosphereLevelSupport"
          ? "Support belongs at atmosphere level."
          : guidanceState === "nonVerbalGuidance"
            ? "Guidance can be non-verbal and still useful."
            : guidanceState === "subtleResonance"
              ? "Situational resonance should remain subtle."
              : "Grounding can come from the environment, not a reply.",
    groundingLine: "Guidance should feel less like an answer and more like room air.",
    suppressResponseFeeling: true,
  };
}
