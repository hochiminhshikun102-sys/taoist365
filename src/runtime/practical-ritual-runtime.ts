import { dailyIndex } from "@/lib/living-day-key";

export type PracticalRitualRuntime = {
  ritualState:
    | "smallDailyGesture"
    | "ordinaryBrowserRitual"
    | "reflectiveAction"
    | "calmRepeatedMoment"
    | "nonSpiritualRoutine";
  ritualLine: string;
  routineLine: string;
  suppressSpiritualRoutine: boolean;
};

export function resolvePracticalRitualRuntime(dayKey: string): PracticalRitualRuntime {
  const h = dailyIndex(`${dayKey}:practical-ritual`, 100);
  const ritualState =
    h < 20
      ? "smallDailyGesture"
      : h < 40
        ? "ordinaryBrowserRitual"
        : h < 60
          ? "reflectiveAction"
          : h < 80
            ? "calmRepeatedMoment"
            : "nonSpiritualRoutine";

  return {
    ritualState,
    ritualLine:
      ritualState === "smallDailyGesture"
        ? "A small daily gesture can stay completely ordinary."
        : ritualState === "ordinaryBrowserRitual"
          ? "The browser ritual is only a quiet habit, not a practice."
          : ritualState === "reflectiveAction"
            ? "Reflection stays low-pressure and unfinished."
            : ritualState === "calmRepeatedMoment"
              ? "Repeated moments should make life calmer, not more serious."
              : "Routine remains non-spiritual and easy to leave.",
    routineLine: "A quiet routine should fit inside the day.",
    suppressSpiritualRoutine: true,
  };
}
