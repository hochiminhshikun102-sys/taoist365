import { dailyIndex } from "@/lib/living-day-key";

export type ReliefRuntime = {
  reliefState:
    | "pressureThinning"
    | "emotionalDecompression"
    | "quietNervousSystemRelief"
    | "nonDramaticSoftening"
    | "mentalSpaciousness";
  reliefLine: string;
  decompressionLine: string;
  suppressTherapyTone: boolean;
};

export function resolveReliefRuntime(dayKey: string): ReliefRuntime {
  const h = dailyIndex(`${dayKey}:relief`, 100);
  const reliefState =
    h < 20
      ? "pressureThinning"
      : h < 40
        ? "emotionalDecompression"
        : h < 60
          ? "quietNervousSystemRelief"
          : h < 80
            ? "nonDramaticSoftening"
            : "mentalSpaciousness";

  return {
    reliefState,
    reliefLine:
      reliefState === "pressureThinning"
        ? "Pressure thins a little at the edge of the room."
        : reliefState === "emotionalDecompression"
          ? "Decompression can be quiet and ordinary."
          : reliefState === "quietNervousSystemRelief"
            ? "The page should give the nervous system a little space without naming it."
            : reliefState === "nonDramaticSoftening"
              ? "Emotional softening stays non-dramatic."
              : "A bit of mental spaciousness is enough.",
    decompressionLine: "Open it, breathe once, continue.",
    suppressTherapyTone: true,
  };
}
