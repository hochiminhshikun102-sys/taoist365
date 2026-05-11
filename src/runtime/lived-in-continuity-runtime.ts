import { dailyIndex } from "@/lib/living-day-key";

export type LivedInContinuityRuntime = {
  continuityState:
    | "longStayedRoom"
    | "returningQuietly"
    | "objectLeftInPlace"
    | "browserLeftOpen"
    | "settledHumanTrace";
  continuityLine: string;
  roomTraceLine: string;
  reduceShowroomFeeling: boolean;
  preferObjectResting: boolean;
};

export function resolveLivedInContinuityRuntime(dayKey: string): LivedInContinuityRuntime {
  const h = dailyIndex(`${dayKey}:lived-in-continuity`, 100);
  const continuityState =
    h < 20
      ? "longStayedRoom"
      : h < 40
        ? "returningQuietly"
        : h < 60
          ? "objectLeftInPlace"
          : h < 80
            ? "browserLeftOpen"
            : "settledHumanTrace";

  return {
    continuityState,
    continuityLine:
      continuityState === "longStayedRoom"
        ? "A quiet page left open between desk light, weather, and a few ordinary objects."
        : continuityState === "returningQuietly"
          ? "Someone seems to have gone away for a while, then returned without making a scene."
          : continuityState === "objectLeftInPlace"
            ? "A few things stay where they were, calm enough to be lived around."
            : continuityState === "browserLeftOpen"
              ? "The browser feels left open, not watched, not performed."
              : "A small human trace remains in the room without becoming the center.",
    roomTraceLine: "The room keeps its place like something people actually return to.",
    reduceShowroomFeeling: h > 18,
    preferObjectResting: h < 72,
  };
}
