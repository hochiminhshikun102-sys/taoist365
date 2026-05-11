import { dailyIndex } from "@/lib/living-day-key";

export type BrowserAgingRuntime = {
  browserMemoryThickLine: string;
  urlHabitLine: string;
};

export function resolveBrowserAgingRuntime(dayKey: string): BrowserAgingRuntime {
  void dailyIndex(`${dayKey}:b-age`, 40);
  return {
    browserMemoryThickLine: "浏览器自己的历史叠厚了——本站不替你记。",
    urlHabitLine: "hostname 在肌肉记忆里，比哪段文案准。",
  };
}
