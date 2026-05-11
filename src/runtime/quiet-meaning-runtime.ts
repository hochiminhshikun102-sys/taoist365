import { dailyIndex } from "@/lib/living-day-key";

export type QuietMeaningRuntime = {
  meaningState:
    | "unresolvedTrace"
    | "almostSymbolic"
    | "quietResonance"
    | "existentialWarmth"
    | "softContinuity";
  meaningLine: string;
  unsaidLine: string;
  allowMeaningTrace: boolean;
};

export function resolveQuietMeaningRuntime(dayKey: string): QuietMeaningRuntime {
  const h = dailyIndex(`${dayKey}:quiet-meaning`, 100);
  const meaningState =
    h < 22
      ? "unresolvedTrace"
      : h < 42
        ? "almostSymbolic"
        : h < 62
          ? "quietResonance"
          : h < 82
            ? "existentialWarmth"
            : "softContinuity";

  return {
    meaningState,
    meaningLine:
      meaningState === "unresolvedTrace"
        ? "A little meaning remains unresolved and therefore unclaimed."
        : meaningState === "almostSymbolic"
          ? "Something becomes almost symbolic, then stays ordinary."
          : meaningState === "quietResonance"
            ? "Quiet emotional resonance appears without being explained."
            : meaningState === "existentialWarmth"
              ? "Subtle existence warmth passes through the room."
              : "Soft continuity lets significance remain barely verbal.",
    unsaidLine: "Taoist365 allows meaning to appear without telling anyone what it means.",
    allowMeaningTrace: h > 18 && h < 92,
  };
}
