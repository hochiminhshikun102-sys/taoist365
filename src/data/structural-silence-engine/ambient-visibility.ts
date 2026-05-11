import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type AmbientVisibility = {
  showGuidanceRoutes: boolean;
  showObjectCoordinates: boolean;
  showMailShelfParagraph: boolean;
  showHomeLowSignalStrip: boolean;
};

export function ambientVisibility(age: WorldAgeStateId, dayKey: string): AmbientVisibility {
  const s = dailyIndex(dayKey + ":ambient-vis:" + age, 100);
  const strict = age === "worn-in-cycle" || age === "old-browser-period";
  return {
    showGuidanceRoutes: s < (strict ? 46 : 68),
    showObjectCoordinates: s < (strict ? 52 : 74),
    showMailShelfParagraph: s < (strict ? 58 : 82),
    showHomeLowSignalStrip: s < (strict ? 70 : 90),
  };
}
