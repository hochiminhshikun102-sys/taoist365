import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

type ObjectId =
  | "taoist365-desk-mug-sand"
  | "taoist365-linen-napkin-raw"
  | "taoist365-oak-tray-narrow"
  | "taoist365-stone-smoke-dish"
  | "taoist365-layflat-notebook"
  | "taoist365-cotton-letter-sheets"
  | "taoist365-night-teacup"
  | "taoist365-maple-paperweight";

const ALL: readonly ObjectId[] = [
  "taoist365-desk-mug-sand",
  "taoist365-linen-napkin-raw",
  "taoist365-oak-tray-narrow",
  "taoist365-stone-smoke-dish",
  "taoist365-layflat-notebook",
  "taoist365-cotton-letter-sheets",
  "taoist365-night-teacup",
  "taoist365-maple-paperweight",
];

export type ObjectFadeRuntime = {
  foregroundObjects: readonly string[];
  backgroundObjects: readonly string[];
  residualObjects: readonly string[];
};

export function objectFadeRuntime(age: WorldAgeStateId, dayKey: string): ObjectFadeRuntime {
  const strict = age === "worn-in-cycle" || age === "old-browser-period" || age === "long-static-period";
  const fgCount = strict ? 4 : 6;
  const rotated = [...ALL.slice(dailyIndex(dayKey + ":obj-fade:" + age, ALL.length)), ...ALL.slice(0, dailyIndex(dayKey + ":obj-fade:" + age, ALL.length))];
  const foregroundObjects = rotated.slice(0, fgCount);
  const backgroundObjects = rotated.slice(fgCount);
  const residualObjects = rotated.slice(Math.max(0, fgCount - 2), Math.max(0, fgCount + 1));
  return { foregroundObjects, backgroundObjects, residualObjects };
}
