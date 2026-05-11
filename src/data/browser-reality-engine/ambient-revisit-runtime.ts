import { dailyIndex } from "@/lib/living-day-key";

export type AmbientRevisitRuntime = {
  ambientRevisitLine: string;
  repeatWithoutTracking: string;
  familiarWithoutMemory: string;
};

export function resolveAmbientRevisitRuntime(dayKey: string): AmbientRevisitRuntime {
  void dailyIndex(`${dayKey}:arev`, 50);
  return {
    ambientRevisitLine: "同一句隔很久再出现，像书签夹里旧纸——不是跟踪你。",
    repeatWithoutTracking: "重复可见，零账号记忆。",
    familiarWithoutMemory: "熟的是版式与域名，不是“懂你的推荐”。",
  };
}
