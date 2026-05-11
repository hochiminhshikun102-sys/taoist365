import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { CrossRuntimeSuppression } from "./cross-runtime-suppression";
import { dailyIndex } from "@/lib/living-day-key";

export type PageUnderstatement = {
  homeUnderstatement: boolean;
  guidanceUnderstatement: boolean;
  mailUnderstatement: boolean;
  objectsUnderstatement: boolean;
  ritualUnderstatement: boolean;
  dailyUnderstatement: boolean;
};

export function resolvePageUnderstatement(
  age: WorldAgeStateId,
  dayKey: string,
  cross: CrossRuntimeSuppression,
): PageUnderstatement {
  const h = dailyIndex(`${dayKey}:under:${age}`, 100);
  return {
    homeUnderstatement: h > 64,
    guidanceUnderstatement: cross.tightenGuidanceCollapse || h > 68,
    mailUnderstatement: h > 70,
    objectsUnderstatement: cross.reduceObjectForegroundCap || h > 66,
    ritualUnderstatement: cross.sparseRitualTraces || h > 72,
    dailyUnderstatement: cross.thinDailyProse || h > 65,
  };
}
