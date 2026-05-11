import { dailyIndex } from "@/lib/living-day-key";

export type UnclaimedMeaningRuntime = {
  meaningState:
    | "freeFloatingMeaning"
    | "nonSystemizedResonance"
    | "userOwnedInterpretation"
    | "nonAuthoritativeSpace"
    | "openSymbolicAtmosphere";
  meaningLine: string;
  interpretationLine: string;
  suppressMeaningOwnership: boolean;
};

export function resolveUnclaimedMeaningRuntime(dayKey: string): UnclaimedMeaningRuntime {
  const h = dailyIndex(`${dayKey}:unclaimed-meaning`, 100);
  const meaningState =
    h < 20
      ? "freeFloatingMeaning"
      : h < 40
        ? "nonSystemizedResonance"
        : h < 60
          ? "userOwnedInterpretation"
          : h < 80
            ? "nonAuthoritativeSpace"
            : "openSymbolicAtmosphere";

  return {
    meaningState,
    meaningLine:
      meaningState === "freeFloatingMeaning"
        ? "Meaning may float free without being named."
        : meaningState === "nonSystemizedResonance"
          ? "Resonance stays unsystemized."
          : meaningState === "userOwnedInterpretation"
            ? "Interpretation belongs to the person who notices it."
            : meaningState === "nonAuthoritativeSpace"
              ? "Emotional space stays non-authoritative."
              : "Symbolic atmosphere remains open and unclaimed.",
    interpretationLine: "The site should not define what the user felt.",
    suppressMeaningOwnership: true,
  };
}
