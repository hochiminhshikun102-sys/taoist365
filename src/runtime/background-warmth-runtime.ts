import { dailyIndex } from "@/lib/living-day-key";

export type BackgroundWarmthRuntime = {
  warmthState:
    | "nonCentralWarmth"
    | "environmentalComfort"
    | "lowIntensityHumanity"
    | "peripheralSafety"
    | "ordinarySoftness";
  warmthLine: string;
  comfortLine: string;
  reduceWarmthForeground: boolean;
};

export function resolveBackgroundWarmthRuntime(dayKey: string): BackgroundWarmthRuntime {
  const h = dailyIndex(`${dayKey}:background-warmth`, 100);
  const warmthState =
    h < 20
      ? "nonCentralWarmth"
      : h < 40
        ? "environmentalComfort"
        : h < 60
          ? "lowIntensityHumanity"
          : h < 80
            ? "peripheralSafety"
            : "ordinarySoftness";

  return {
    warmthState,
    warmthLine:
      warmthState === "nonCentralWarmth"
        ? "Warmth stays non-central."
        : warmthState === "environmentalComfort"
          ? "Comfort can be environmental rather than expressed."
          : warmthState === "lowIntensityHumanity"
            ? "Humanity lowers its intensity."
            : warmthState === "peripheralSafety"
              ? "Emotional safety remains peripheral and unclaimed."
              : "Ordinary softness can stay in the air.",
    comfortLine: "Warmth belongs in the background, not the headline.",
    reduceWarmthForeground: true,
  };
}
