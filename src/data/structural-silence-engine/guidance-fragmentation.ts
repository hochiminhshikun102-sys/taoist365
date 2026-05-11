import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type GuidanceFragmentation = {
  fragmentProbability: number;
  routeCollapse: boolean;
  minimalEnding: boolean;
  singleLineMode: boolean;
  weatherOnlyMode: boolean;
};

export function guidanceFragmentation(age: WorldAgeStateId, dayKey: string): GuidanceFragmentation {
  const seed = dailyIndex(dayKey + ":guide-frag:" + age, 100);
  const hard = age === "worn-in-cycle" || age === "old-browser-period" || age === "long-static-period";
  return {
    fragmentProbability: hard ? 0.78 : 0.52,
    routeCollapse: seed > (hard ? 40 : 62),
    minimalEnding: seed > (hard ? 34 : 56),
    singleLineMode: seed > (hard ? 28 : 50),
    weatherOnlyMode: seed > (hard ? 18 : 44),
  };
}
