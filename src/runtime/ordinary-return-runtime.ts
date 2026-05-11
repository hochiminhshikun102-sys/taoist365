import { dailyIndex } from "@/lib/living-day-key";

export type OrdinaryReturnRuntime = {
  ritualState: "quietGesture" | "browserRitual" | "roomRevisiting" | "continuityHabit" | "lateLook";
  gestureLine: string;
  revisitingLine: string;
  suppressDailyActiveSignal: boolean;
};

export function resolveOrdinaryReturnRuntime(dayKey: string): OrdinaryReturnRuntime {
  const h = dailyIndex(`${dayKey}:ordinary-return`, 100);
  const ritualState =
    h < 20 ? "quietGesture" : h < 40 ? "browserRitual" : h < 60 ? "roomRevisiting" : h < 80 ? "continuityHabit" : "lateLook";

  return {
    ritualState,
    gestureLine:
      ritualState === "quietGesture"
        ? "A small return gesture is enough."
        : ritualState === "browserRitual"
          ? "The browser ritual stays ordinary and low-pressure."
          : ritualState === "roomRevisiting"
            ? "Room revisiting happens softly, without a route trying to own it."
            : ritualState === "continuityHabit"
              ? "Continuity can become a habit without becoming a loop."
              : "A late look at the room remains unmeasured.",
    revisitingLine: "Come back by habit if it happens; nothing here requires it.",
    suppressDailyActiveSignal: true,
  };
}
