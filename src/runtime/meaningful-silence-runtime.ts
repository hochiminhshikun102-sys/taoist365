import { dailyIndex } from "@/lib/living-day-key";

export type MeaningfulSilenceRuntime = {
  silenceState:
    | "inhabitedStillness"
    | "emotionallyHeld"
    | "emotionalContinuity"
    | "quietResonance"
    | "lowPressureDepth";
  meaningfulSilenceLine: string;
  warmthLine: string;
  avoidEmptyColdness: boolean;
};

export function resolveMeaningfulSilenceRuntime(dayKey: string): MeaningfulSilenceRuntime {
  const h = dailyIndex(`${dayKey}:meaningful-silence`, 100);
  const silenceState =
    h < 22
      ? "inhabitedStillness"
      : h < 42
        ? "emotionallyHeld"
        : h < 62
          ? "emotionalContinuity"
          : h < 82
            ? "quietResonance"
            : "lowPressureDepth";

  return {
    silenceState,
    meaningfulSilenceLine:
      silenceState === "inhabitedStillness"
        ? "Stillness feels inhabited enough to mean something."
        : silenceState === "emotionallyHeld"
          ? "Silence is emotionally held but does not explain itself."
          : silenceState === "emotionalContinuity"
            ? "Silent emotional continuity stays low-pressure."
            : silenceState === "quietResonance"
              ? "Quiet resonance gives silence a small temperature."
              : "Low-pressure emotional depth remains light.",
    warmthLine: "Silence can have temperature without becoming instruction.",
    avoidEmptyColdness: h > 16,
  };
}
