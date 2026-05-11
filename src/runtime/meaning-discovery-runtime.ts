import { dailyIndex } from "@/lib/living-day-key";

export type MeaningDiscoveryRuntime = {
  discoveryState:
    | "accidentalResonance"
    | "symbolicContinuity"
    | "personalInterpretation"
    | "emotionalRecognition"
    | "undirectedEmergence";
  meaningDiscoveryLine: string;
  userSpaceLine: string;
  avoidDirectedMeaning: boolean;
};

export function resolveMeaningDiscoveryRuntime(dayKey: string): MeaningDiscoveryRuntime {
  const h = dailyIndex(`${dayKey}:meaning-discovery`, 100);
  const discoveryState =
    h < 22
      ? "accidentalResonance"
      : h < 42
        ? "symbolicContinuity"
        : h < 62
          ? "personalInterpretation"
          : h < 82
            ? "emotionalRecognition"
            : "undirectedEmergence";

  return {
    discoveryState,
    meaningDiscoveryLine:
      discoveryState === "accidentalResonance"
        ? "Accidental emotional resonance appears and belongs to no one."
        : discoveryState === "symbolicContinuity"
          ? "Symbolic continuity stays quiet enough for the user to decide."
          : discoveryState === "personalInterpretation"
            ? "Soft personal interpretation is left open."
            : discoveryState === "emotionalRecognition"
              ? "Low-pressure emotional recognition arrives without direction."
              : "Meaning emerges undirected, then remains free.",
    userSpaceLine: "The user forms the relationship; the system does not assign it.",
    avoidDirectedMeaning: h > 18,
  };
}
