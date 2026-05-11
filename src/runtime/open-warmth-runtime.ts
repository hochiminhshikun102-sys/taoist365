import { dailyIndex } from "@/lib/living-day-key";

export type OpenWarmthRuntime = {
  warmthState: "breathableWarmth" | "nonClingingHumanity" | "softDistance" | "respectfulOpenness" | "lowPressureSpace";
  warmthLine: string;
  distanceLine: string;
  preventEmotionalWrapping: boolean;
};

export function resolveOpenWarmthRuntime(dayKey: string): OpenWarmthRuntime {
  const h = dailyIndex(`${dayKey}:open-warmth`, 100);
  const warmthState =
    h < 20
      ? "breathableWarmth"
      : h < 40
        ? "nonClingingHumanity"
        : h < 60
          ? "softDistance"
          : h < 80
            ? "respectfulOpenness"
            : "lowPressureSpace";

  return {
    warmthState,
    warmthLine:
      warmthState === "breathableWarmth"
        ? "Warmth remains breathable."
        : warmthState === "nonClingingHumanity"
          ? "Humanity stays present without clinging."
          : warmthState === "softDistance"
            ? "Soft distance keeps the room respectful."
            : warmthState === "respectfulOpenness"
              ? "Openness is part of the warmth."
              : "Emotional space stays low-pressure and unwrapped.",
    distanceLine: "The room can be warm without holding on.",
    preventEmotionalWrapping: true,
  };
}
