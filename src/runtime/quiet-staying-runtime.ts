import { dailyIndex } from "@/lib/living-day-key";

export type QuietStayingRuntime = {
  stayingState:
    | "silentPersistence"
    | "calmContinuityClimate"
    | "nonPerformativeLongevity"
    | "quietDigitalPermanence"
    | "longDurationAtmosphere";
  stayingLine: string;
  permanenceLine: string;
  reducePerformanceTone: boolean;
};

export function resolveQuietStayingRuntime(dayKey: string): QuietStayingRuntime {
  const h = dailyIndex(`${dayKey}:quiet-staying`, 100);
  const stayingState =
    h < 20
      ? "silentPersistence"
      : h < 40
        ? "calmContinuityClimate"
        : h < 60
          ? "nonPerformativeLongevity"
          : h < 80
            ? "quietDigitalPermanence"
            : "longDurationAtmosphere";

  return {
    stayingState,
    stayingLine:
      stayingState === "silentPersistence"
        ? "Silent persistence becomes part of the room."
        : stayingState === "calmContinuityClimate"
          ? "Continuity is a climate, not a feature."
          : stayingState === "nonPerformativeLongevity"
            ? "Longevity stays non-performative."
            : stayingState === "quietDigitalPermanence"
              ? "Quiet digital permanence keeps the place from rushing."
              : "Long-duration atmosphere lets the room remain itself.",
    permanenceLine: "It has been here quietly, and it can keep being here quietly.",
    reducePerformanceTone: h > 30,
  };
}
