import { dailyIndex } from "@/lib/living-day-key";

export type PartialAbsenceRuntime = {
  absenceState:
    | "quietAbsence"
    | "nonPermanentAttention"
    | "withoutAudience"
    | "civilizationAutonomy"
    | "nonPerformativePersistence";
  absenceLine: string;
  autonomyLine: string;
  suppressAlwaysWaitingTone: boolean;
};

export function resolvePartialAbsenceRuntime(dayKey: string): PartialAbsenceRuntime {
  const h = dailyIndex(`${dayKey}:partial-absence`, 100);
  const absenceState =
    h < 20
      ? "quietAbsence"
      : h < 40
        ? "nonPermanentAttention"
        : h < 60
          ? "withoutAudience"
          : h < 80
            ? "civilizationAutonomy"
            : "nonPerformativePersistence";

  return {
    absenceState,
    absenceLine:
      absenceState === "quietAbsence"
        ? "Some parts of the room are quietly absent."
        : absenceState === "nonPermanentAttention"
          ? "The page does not ask for permanent attention."
          : absenceState === "withoutAudience"
            ? "The room can exist without an audience."
            : absenceState === "civilizationAutonomy"
              ? "Civilization autonomy keeps the space from being made only for you."
              : "Persistence stays non-performative when nobody is looking.",
    autonomyLine: "It is not waiting for you; it is simply here.",
    suppressAlwaysWaitingTone: true,
  };
}
