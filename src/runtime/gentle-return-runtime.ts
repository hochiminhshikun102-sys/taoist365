import { dailyIndex } from "@/lib/living-day-key";

export type GentleReturnRuntime = {
  returnState:
    | "familiarCalmness"
    | "browserReturnWarmth"
    | "continuityRecognition"
    | "longTimeNoSeeStillness"
    | "stableRoomComfort";
  returnLine: string;
  stillHereLine: string;
  softenReturnSurface: boolean;
};

export function resolveGentleReturnRuntime(dayKey: string): GentleReturnRuntime {
  const h = dailyIndex(`${dayKey}:gentle-return`, 100);
  const returnState =
    h < 22
      ? "familiarCalmness"
      : h < 42
        ? "browserReturnWarmth"
        : h < 62
          ? "continuityRecognition"
          : h < 82
            ? "longTimeNoSeeStillness"
            : "stableRoomComfort";

  return {
    returnState,
    returnLine:
      returnState === "familiarCalmness"
        ? "Returning feels like the room did not need to prepare itself."
        : returnState === "browserReturnWarmth"
          ? "Browser return warmth says only that the room is still here."
          : returnState === "continuityRecognition"
            ? "Continuity is recognized softly, without a welcome-back performance."
            : returnState === "longTimeNoSeeStillness"
              ? "Long-time-no-see stillness keeps the room familiar."
              : "Stable room comfort matters more than novelty.",
    stillHereLine: "It is still here, and that is enough.",
    softenReturnSurface: h > 20,
  };
}
