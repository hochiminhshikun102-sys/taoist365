import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";
import { dailyIndex } from "@/lib/living-day-key";
import type { FatigueLevel } from "./world-fatigue-runtime";

export type ObjectRetirementRuntime = {
  retiredObjects: readonly string[];
  permanentBackgroundObjects: readonly string[];
  rareForegroundObjects: readonly string[];
  residualOnlyObjects: readonly string[];
  objectRetirementCap: number;
  objectRetirementLine: string;
};

export function resolveObjectRetirementRuntime(
  sedimentForegroundIds: readonly string[],
  dayKey: string,
  fatigueLevel: FatigueLevel,
): ObjectRetirementRuntime {
  const allIds = taoist365ObjectsCatalog.map((p) => p.id);
  let cap = 3;
  if (fatigueLevel === "almostAbsent") cap = 1;
  else if (fatigueLevel === "resting" || fatigueLevel === "tired") cap = 2;
  const h = dailyIndex(`${dayKey}:obj-ret`, 100);
  if (h > 90) cap = Math.max(1, cap - 1);
  cap = Math.min(3, Math.max(1, cap));

  const ordered = sedimentForegroundIds.length ? [...sedimentForegroundIds] : [...allIds];
  const rareForegroundObjects = ordered.slice(0, Math.min(cap, ordered.length)) as string[];
  const permanentBackgroundObjects = allIds.filter((id) => !rareForegroundObjects.includes(id));
  const retiredObjects = permanentBackgroundObjects.filter((_, i) => dailyIndex(`${dayKey}:ret-obj:${i}`, 10) > 6);
  const residualOnlyObjects = permanentBackgroundObjects.filter((id) => !retiredObjects.includes(id));

  return {
    retiredObjects,
    permanentBackgroundObjects,
    rareForegroundObjects,
    residualOnlyObjects,
    objectRetirementCap: cap,
    objectRetirementLine: "前景物件像旧网址上的固定摆件——不是完整目录轮播。",
  };
}
