import { dailyIndex } from "@/lib/living-day-key";

export type ObligationFreeReturnRuntime = {
  returnState: "noPressureReturn" | "absenceAccepted" | "quietReEntry" | "nonPossessiveContinuity" | "freeTemporalMovement";
  returnLine: string;
  absenceLine: string;
  suppressWelcomeBackTone: boolean;
};

export function resolveObligationFreeReturnRuntime(dayKey: string): ObligationFreeReturnRuntime {
  const h = dailyIndex(`${dayKey}:obligation-free-return`, 100);
  const returnState =
    h < 20
      ? "noPressureReturn"
      : h < 40
        ? "absenceAccepted"
        : h < 60
          ? "quietReEntry"
          : h < 80
            ? "nonPossessiveContinuity"
            : "freeTemporalMovement";

  return {
    returnState,
    returnLine:
      returnState === "noPressureReturn"
        ? "Return has no pressure here."
        : returnState === "absenceAccepted"
          ? "Absence is accepted as part of the room's time."
          : returnState === "quietReEntry"
            ? "Re-entry is quiet, without announcement."
            : returnState === "nonPossessiveContinuity"
              ? "Continuity stays open and does not claim the visitor."
              : "Time can move freely away from the room and back again.",
    absenceLine: "You can be gone a long while; the air does not keep score.",
    suppressWelcomeBackTone: true,
  };
}
