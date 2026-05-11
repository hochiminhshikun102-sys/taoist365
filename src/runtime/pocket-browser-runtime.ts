import { dailyIndex } from "@/lib/living-day-key";

export type PocketBrowserRuntime = {
  pocketState: "thumbStillness" | "pocketSilence" | "bedEdgePresence" | "midnightSmallRoom";
  touchRhythmLine: string;
  pocketContinuityLine: string;
  reduceMobileDensity: boolean;
};

export function resolvePocketBrowserRuntime(dayKey: string, now: Date = new Date()): PocketBrowserRuntime {
  const h = dailyIndex(`${dayKey}:pocket-browser`, 100);
  const hour = now.getHours();
  const pocketState =
    hour >= 23 || hour < 5
      ? "midnightSmallRoom"
      : h < 34
        ? "thumbStillness"
        : h < 68
          ? "pocketSilence"
          : "bedEdgePresence";

  return {
    pocketState,
    touchRhythmLine:
      pocketState === "thumbStillness"
        ? "Thumb distance stays calm; nothing floats forward."
        : pocketState === "pocketSilence"
          ? "The pocket version keeps more silence between objects."
          : pocketState === "bedEdgePresence"
            ? "The page can sit near the edge of a bed without becoming an app."
            : "Midnight makes the browser room smaller and quieter.",
    pocketContinuityLine: "Pocket persistence stays low-pressure: one hand, slow scroll, no launcher feeling.",
    reduceMobileDensity: pocketState === "midnightSmallRoom" || h > 70,
  };
}
