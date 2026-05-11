import { dailyIndex } from "@/lib/living-day-key";

export type NonPossessiveMeaningRuntime = {
  possessionState:
    | "nonDependentContinuity"
    | "freeReturn"
    | "noGuiltAbsence"
    | "nonClaimingWarmth"
    | "openEmotionalSpace";
  nonPossessiveLine: string;
  absenceLine: string;
  suppressSpiritualOwnership: boolean;
};

export function resolveNonPossessiveMeaningRuntime(dayKey: string): NonPossessiveMeaningRuntime {
  const h = dailyIndex(`${dayKey}:non-possessive-meaning`, 100);
  const possessionState =
    h < 22
      ? "nonDependentContinuity"
      : h < 42
        ? "freeReturn"
        : h < 62
          ? "noGuiltAbsence"
          : h < 82
            ? "nonClaimingWarmth"
            : "openEmotionalSpace";

  return {
    possessionState,
    nonPossessiveLine:
      possessionState === "nonDependentContinuity"
        ? "Emotional continuity remains non-dependent."
        : possessionState === "freeReturn"
          ? "The room keeps a free-return atmosphere."
          : possessionState === "noGuiltAbsence"
            ? "Absence carries no guilt and no demand to come back."
            : possessionState === "nonClaimingWarmth"
              ? "Warmth does not claim the user's spirit."
              : "Open emotional space lets the user leave and return freely.",
    absenceLine: "The user can leave; the civilization still exists quietly.",
    suppressSpiritualOwnership: h > 8,
  };
}
