import { dailyIndex } from "@/lib/living-day-key";

export type GentleRitualRuntime = {
  ritualState:
    | "nonReligiousGesture"
    | "repeatedQuiet"
    | "continuityHabit"
    | "browserRitual"
    | "ordinarySacredness";
  gentleRitualLine: string;
  boundaryLine: string;
  suppressReligiousAuthority: boolean;
};

export function resolveGentleRitualRuntime(dayKey: string): GentleRitualRuntime {
  const h = dailyIndex(`${dayKey}:gentle-ritual`, 100);
  const ritualState =
    h < 22
      ? "nonReligiousGesture"
      : h < 42
        ? "repeatedQuiet"
        : h < 62
          ? "continuityHabit"
          : h < 82
            ? "browserRitual"
            : "ordinarySacredness";

  return {
    ritualState,
    gentleRitualLine:
      ritualState === "nonReligiousGesture"
        ? "A small gesture can repeat without becoming religious."
        : ritualState === "repeatedQuiet"
          ? "Quiet repeated gestures become soft without becoming rules."
          : ritualState === "continuityHabit"
            ? "Low-pressure continuity habits give the browser room shape."
            : ritualState === "browserRitual"
              ? "Opening the room can be a browser ritual, not a doctrine."
              : "Ordinary sacredness stays ordinary first.",
    boundaryLine: "Ritual here is human repetition, not spiritual authority.",
    suppressReligiousAuthority: h > 10,
  };
}
