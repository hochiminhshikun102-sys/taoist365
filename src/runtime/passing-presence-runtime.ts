import { dailyIndex } from "@/lib/living-day-key";

export type PassingPresenceRuntime = {
  presenceState:
    | "temporaryStillness"
    | "passingContinuity"
    | "nonPermanentAtmosphere"
    | "quietCoexistence"
    | "temporalCrossing";
  passingLine: string;
  crossingLine: string;
  reducePermanentMood: boolean;
};

export function resolvePassingPresenceRuntime(dayKey: string): PassingPresenceRuntime {
  const h = dailyIndex(`${dayKey}:passing-presence`, 100);
  const presenceState =
    h < 20
      ? "temporaryStillness"
      : h < 40
        ? "passingContinuity"
        : h < 60
          ? "nonPermanentAtmosphere"
          : h < 80
            ? "quietCoexistence"
            : "temporalCrossing";

  return {
    presenceState,
    passingLine:
      presenceState === "temporaryStillness"
        ? "Stillness can be temporary and still matter."
        : presenceState === "passingContinuity"
          ? "Continuity passes through instead of settling too tightly."
          : presenceState === "nonPermanentAtmosphere"
            ? "Atmosphere does not need to become permanent to be real."
            : presenceState === "quietCoexistence"
              ? "Quiet coexistence allows arrival and departure."
              : "The room is a gentle temporal crossing.",
    crossingLine: "Reverent Inquiry is a pause along the way, not the end of the road.",
    reducePermanentMood: h > 32,
  };
}
