import { dailyIndex } from "@/lib/living-day-key";

export type SmallHelpRuntime = {
  helpState: "tinyGesture" | "practicalWarmth" | "ordinaryAssistance" | "lifeCompatibleCalm" | "lowFrictionSupport";
  helpLine: string;
  supportLine: string;
  suppressToolProductTone: boolean;
};

export function resolveSmallHelpRuntime(dayKey: string): SmallHelpRuntime {
  const h = dailyIndex(`${dayKey}:small-help`, 100);
  const helpState =
    h < 20
      ? "tinyGesture"
      : h < 40
        ? "practicalWarmth"
        : h < 60
          ? "ordinaryAssistance"
          : h < 80
            ? "lifeCompatibleCalm"
            : "lowFrictionSupport";

  return {
    helpState,
    helpLine:
      helpState === "tinyGesture"
        ? "A tiny useful gesture is enough."
        : helpState === "practicalWarmth"
          ? "Warmth becomes useful when it stays practical."
          : helpState === "ordinaryAssistance"
            ? "Ordinary assistance should feel lighter than a tool."
            : helpState === "lifeCompatibleCalm"
              ? "Calmness remains compatible with normal life."
              : "Support stays low-friction and unannounced.",
    supportLine: "A little help, not a system for managing life.",
    suppressToolProductTone: true,
  };
}
