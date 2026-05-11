import { dailyIndex } from "@/lib/living-day-key";

export type OrdinaryTimeRuntime = {
  timeState:
    | "weekdayCalmness"
    | "slowMorning"
    | "lateNightBrowserGlow"
    | "afternoonSilence"
    | "ordinaryPacing";
  timeLine: string;
  rhythmLine: string;
  suppressEternalArtSpace: boolean;
};

export function resolveOrdinaryTimeRuntime(dayKey: string): OrdinaryTimeRuntime {
  const h = dailyIndex(`${dayKey}:ordinary-time`, 100);
  const timeState =
    h < 20
      ? "weekdayCalmness"
      : h < 40
        ? "slowMorning"
        : h < 60
          ? "lateNightBrowserGlow"
          : h < 80
            ? "afternoonSilence"
            : "ordinaryPacing";

  return {
    timeState,
    timeLine:
      timeState === "weekdayCalmness"
        ? "Weekday calm is enough."
        : timeState === "slowMorning"
          ? "Morning can move slowly without becoming symbolic."
          : timeState === "lateNightBrowserGlow"
            ? "Late-night browser glow stays practical and small."
            : timeState === "afternoonSilence"
              ? "Afternoon silence sits beside errands and unfinished tabs."
              : "Time moves at an ordinary pace here.",
    rhythmLine: "The rhythm belongs to a normal day, not an eternal room.",
    suppressEternalArtSpace: true,
  };
}
