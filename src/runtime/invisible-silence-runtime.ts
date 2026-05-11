import { dailyIndex } from "@/lib/living-day-key";

export type InvisibleSilenceRuntime = {
  silenceState:
    | "unnoticedStillness"
    | "ordinaryQuietContinuity"
    | "nonDesignedCalmness"
    | "lowDramaRest"
    | "naturalPersistence";
  silenceLine: string;
  restLine: string;
  suppressDesignedSilence: boolean;
};

export function resolveInvisibleSilenceRuntime(dayKey: string): InvisibleSilenceRuntime {
  const h = dailyIndex(`${dayKey}:invisible-silence`, 100);
  const silenceState =
    h < 20
      ? "unnoticedStillness"
      : h < 40
        ? "ordinaryQuietContinuity"
        : h < 60
          ? "nonDesignedCalmness"
          : h < 80
            ? "lowDramaRest"
            : "naturalPersistence";

  return {
    silenceState,
    silenceLine:
      silenceState === "unnoticedStillness"
        ? "Stillness is allowed to go unnoticed."
        : silenceState === "ordinaryQuietContinuity"
          ? "Quiet continuity stays ordinary."
          : silenceState === "nonDesignedCalmness"
            ? "Calmness should not feel designed."
            : silenceState === "lowDramaRest"
              ? "Atmospheric rest stays low drama."
              : "Natural silence persists without presenting itself.",
    restLine: "Do not make silence visible just to prove it exists.",
    suppressDesignedSilence: true,
  };
}
