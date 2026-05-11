import { dailyIndex } from "@/lib/living-day-key";

export type TabSurvivalRuntime = {
  tabSurvivalLine: string;
};

export function resolveTabSurvivalRuntime(dayKey: string): TabSurvivalRuntime {
  void dailyIndex(`${dayKey}:surv`, 25);
  return {
    tabSurvivalLine: "没被关掉的 tab 自己续命——与活跃度无关。",
  };
}
