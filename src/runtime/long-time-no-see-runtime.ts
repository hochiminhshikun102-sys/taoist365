import { dailyIndex } from "@/lib/living-day-key";

export type LongTimeNoSeeRuntime = {
  warmthState:
    | "familiarStillness"
    | "unchangedRoomAtmosphere"
    | "quietContinuityWarmth"
    | "temporalRecognition"
    | "gentleRefamiliarization";
  stillHereLine: string;
  returnWarmthLine: string;
  avoidWelcomePerformance: boolean;
};

export function resolveLongTimeNoSeeRuntime(dayKey: string): LongTimeNoSeeRuntime {
  const h = dailyIndex(`${dayKey}:long-time-no-see`, 100);
  const warmthState =
    h < 20
      ? "familiarStillness"
      : h < 40
        ? "unchangedRoomAtmosphere"
        : h < 60
          ? "quietContinuityWarmth"
          : h < 80
            ? "temporalRecognition"
            : "gentleRefamiliarization";

  return {
    warmthState,
    stillHereLine:
      warmthState === "familiarStillness"
        ? "The stillness is familiar without saying welcome back."
        : warmthState === "unchangedRoomAtmosphere"
          ? "The room has changed slowly enough to still feel like itself."
          : warmthState === "quietContinuityWarmth"
            ? "A quiet continuity warmth remains where the wind last was."
            : warmthState === "temporalRecognition"
              ? "Time is recognized softly, not counted."
              : "The room lets familiarity return at its own pace.",
    returnWarmthLine: "You may be away for months and still find the wind here.",
    avoidWelcomePerformance: true,
  };
}
