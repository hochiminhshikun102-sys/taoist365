import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type OldUrlRuntime = {
  oldUrlFeeling: string;
  urlAgeLine: string;
  familiarStructureLine: string;
  unchangedCornerLine: string;
};

export function resolveOldUrlRuntime(dayKey: string, ageStateId: WorldAgeStateId): OldUrlRuntime {
  const h = dailyIndex(`${dayKey}:old-url`, 100);
  void h;
  const settled =
    ageStateId === "old-browser-period" ||
    ageStateId === "late-year-room" ||
    ageStateId === "long-static-period" ||
    ageStateId === "worn-in-cycle";
  const ageWeight = settled ? "结构老得慢。" : "结构先稳住。";
  return {
    oldUrlFeeling: "像用了很多年的网址：不追新，也不装旧。",
    urlAgeLine: `${ageWeight} 表达可以少，路径少改。`,
    familiarStructureLine: "导航和分区还在老地方。",
    unchangedCornerLine: "角落那几句不跟着改版节奏换。",
  };
}
