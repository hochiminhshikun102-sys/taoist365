import { getLivingDayKey } from "@/lib/living-day-key";
import { resolveObjectAgingRuntime, type ObjectAgingRuntime } from "@/runtime/object-aging-runtime";
import { resolveObjectSettlementRuntime, type ObjectSettlementRuntime } from "@/runtime/object-settlement-runtime";
import { resolveWindkeepDeepTimeRuntime, type WindkeepDeepTimeRuntime } from "@/runtime/windkeep-deep-time-runtime";

export const windkeepHomeSurface = {
  kicker: "Windkeep",
  title: "A shelf for ordinary things.",
  body:
    "Windkeep keeps object passage plain: where a thing sits, how it was used, and whether mail should carry it on.",
  driftboxRelation: "Driftbox sits inside Windkeep for quiet receiving and continuation after use.",
  storageLine: "Objects remain as shelf presence before they move again.",
} as const;

export type WindkeepRuntime = {
  layer: "browser-room-storage";
  homeSurface: typeof windkeepHomeSurface;
  objectAging: ObjectAgingRuntime;
  objectSettlement: ObjectSettlementRuntime;
  deepTime: WindkeepDeepTimeRuntime;
  infrastructureLine: string;
  longTermObjectLine: string;
  everydayPassageLine: string;
  invisibleMaterialLine: string;
};

export function resolveWindkeepRuntimeForDayKey(dayKey: string): WindkeepRuntime {
  const objectAging = resolveObjectAgingRuntime(dayKey);
  const objectSettlement = resolveObjectSettlementRuntime(dayKey);
  const deepTime = resolveWindkeepDeepTimeRuntime(dayKey);

  return {
    layer: "browser-room-storage",
    homeSurface: windkeepHomeSurface,
    objectAging,
    objectSettlement,
    deepTime,
    infrastructureLine: `${windkeepHomeSurface.storageLine} ${objectSettlement.settlementLine} ${deepTime.settledObjectLine}`,
    longTermObjectLine: `${objectAging.windkeepAgingLine} ${objectSettlement.nonDisplayLine} ${deepTime.settledObjectLine}`,
    everydayPassageLine: "Windkeep keeps objects close to use, care, and the small relief of things that work.",
    invisibleMaterialLine: "Windkeep becomes quieter when objects look less like culture and more like things people keep using.",
  };
}

export function resolveWindkeepRuntime(now: Date = new Date()): WindkeepRuntime {
  return resolveWindkeepRuntimeForDayKey(getLivingDayKey(now));
}
