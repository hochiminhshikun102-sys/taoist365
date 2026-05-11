import { dailyIndex } from "@/lib/living-day-key";

export type GracefulTimeRuntime = {
  timeState: "softPassing" | "gracefulFading" | "calmAging" | "quietContinuation" | "peacefulIncompletion";
  gracefulTimeLine: string;
  nonUrgentLine: string;
  reduceTimeAnxiety: boolean;
};

export function resolveGracefulTimeRuntime(dayKey: string): GracefulTimeRuntime {
  const h = dailyIndex(`${dayKey}:graceful-time`, 100);
  const timeState =
    h < 22
      ? "softPassing"
      : h < 42
        ? "gracefulFading"
        : h < 62
          ? "calmAging"
          : h < 82
            ? "quietContinuation"
            : "peacefulIncompletion";

  return {
    timeState,
    gracefulTimeLine:
      timeState === "softPassing"
        ? "Time passes softly without turning into pressure."
        : timeState === "gracefulFading"
          ? "Fading becomes graceful when nothing demands to stay bright."
          : timeState === "calmAging"
            ? "Calm aging lets objects remain gentle with time."
            : timeState === "quietContinuation"
              ? "Quiet continuation makes temporality less urgent."
              : "Peaceful incompletion lets the day remain unfinished.",
    nonUrgentLine: "Time can pass without becoming an emergency.",
    reduceTimeAnxiety: h > 18,
  };
}
