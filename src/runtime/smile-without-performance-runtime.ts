import { dailyIndex } from "@/lib/living-day-key";

export type SmileWithoutPerformanceRuntime = {
  smileMode:
    | "nonPerformativeDelight"
    | "quietRoomHumor"
    | "humanityFragment"
    | "tinyLightness"
    | "antiOptimizationSmile";
  smileWithoutPerformanceLine: string;
  antiEntertainmentLine: string;
  preventEntertainmentGravity: boolean;
};

export function resolveSmileWithoutPerformanceRuntime(dayKey: string): SmileWithoutPerformanceRuntime {
  const h = dailyIndex(`${dayKey}:smile-without-performance`, 100);
  const smileMode =
    h < 22
      ? "nonPerformativeDelight"
      : h < 42
        ? "quietRoomHumor"
        : h < 62
          ? "humanityFragment"
          : h < 82
            ? "tinyLightness"
            : "antiOptimizationSmile";

  return {
    smileMode,
    smileWithoutPerformanceLine:
      smileMode === "nonPerformativeDelight"
        ? "Delight stays non-performative, almost too small to name."
        : smileMode === "quietRoomHumor"
          ? "Quiet room humor appears as placement, timing, and leftover human scale."
          : smileMode === "humanityFragment"
            ? "A soft humanity fragment gives the room a little lift."
            : smileMode === "tinyLightness"
              ? "Tiny emotional lightness breathes through the page and then leaves."
              : "The smile refuses content optimization.",
    antiEntertainmentLine: "No jokes, no feed, no cute industry; only a small human lightness.",
    preventEntertainmentGravity: h > 24,
  };
}
