import { dailyIndex } from "@/lib/living-day-key";
import type { FatigueLevel } from "./world-fatigue-runtime";

export type WorldRestRuntime = {
  restDay: boolean;
  restLine: string;
};

export function resolveWorldRestRuntime(dayKey: string, fatigueLevel: FatigueLevel): WorldRestRuntime {
  const h = dailyIndex(`${dayKey}:w-rest`, 100);
  const restDay = fatigueLevel === "resting" || fatigueLevel === "almostAbsent" || h > 86;
  return {
    restDay,
    restLine: restDay ? "今日大量 runtime 默认缺席——省电模式。" : "照常营业感很弱的一天。",
  };
}
