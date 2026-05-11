import { dailyIndex } from "@/lib/living-day-key";
import type { BreathingMode } from "@/data/world-regulation-engine/world-breathing-runtime";

export type BackgroundBrowserRuntime = {
  backgroundPresenceStrength: number;
  backgroundResidencyLine: string;
  tabDriftLine: string;
};

export function resolveBackgroundBrowserRuntime(dayKey: string, breathingMode: BreathingMode): BackgroundBrowserRuntime {
  const h = dailyIndex(`${dayKey}:bg-browser`, 100);
  let backgroundPresenceStrength = 0.35 + h / 250;
  if (breathingMode === "residualOnly" || breathingMode === "almostStill") {
    backgroundPresenceStrength = Math.min(0.92, backgroundPresenceStrength + 0.22);
  }
  return {
    backgroundPresenceStrength,
    backgroundResidencyLine: "页面像只是还开着，不是在等互动。",
    tabDriftLine: "从前景退到背景里，地址没变。",
  };
}
