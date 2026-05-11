import { dailyIndex } from "@/lib/living-day-key";

export type LongDurationPresenceRuntime = {
  durationState: "steady" | "ultraLongOpen" | "visualRecovery" | "airBalancing";
  longDurationLine: string;
  recoveryLine: string;
  reduceStimulation: boolean;
};

export function resolveLongDurationPresenceRuntime(dayKey: string): LongDurationPresenceRuntime {
  const h = dailyIndex(`${dayKey}:long-duration-presence`, 100);
  const durationState = h < 30 ? "steady" : h < 58 ? "ultraLongOpen" : h < 80 ? "visualRecovery" : "airBalancing";

  return {
    durationState,
    longDurationLine:
      durationState === "steady"
        ? "The page is allowed to remain steady for a long time."
        : durationState === "ultraLongOpen"
          ? "Ultra-long-open calmness lowers stimulation instead of adding liveness."
          : durationState === "visualRecovery"
            ? "Visual recovery returns the room to plain air."
            : "Long-duration air balancing keeps the page from becoming tiring.",
    recoveryLine: "The room can stay open all day because it keeps reducing itself.",
    reduceStimulation: h > 42,
  };
}
