import { dailyIndex } from "@/lib/living-day-key";

export type PracticalSilenceRuntime = {
  silenceState: "livedSilence" | "nonSacredCalm" | "practicalStillness" | "ordinaryQuietSupport" | "lowPressureAir";
  silenceLine: string;
  supportLine: string;
  suppressAbstractSilence: boolean;
};

export function resolvePracticalSilenceRuntime(dayKey: string): PracticalSilenceRuntime {
  const h = dailyIndex(`${dayKey}:practical-silence`, 100);
  const silenceState =
    h < 20
      ? "livedSilence"
      : h < 40
        ? "nonSacredCalm"
        : h < 60
          ? "practicalStillness"
          : h < 80
            ? "ordinaryQuietSupport"
            : "lowPressureAir";

  return {
    silenceState,
    silenceLine:
      silenceState === "livedSilence"
        ? "Silence is lived, not staged."
        : silenceState === "nonSacredCalm"
          ? "Calmness stays non-sacred and usable."
          : silenceState === "practicalStillness"
            ? "Stillness becomes practical when it helps the next hour."
            : silenceState === "ordinaryQuietSupport"
              ? "Ordinary quiet can support a day without explaining itself."
              : "Low-pressure air keeps silence from becoming a performance.",
    supportLine: "Quiet should be useful enough to return to life with.",
    suppressAbstractSilence: true,
  };
}
