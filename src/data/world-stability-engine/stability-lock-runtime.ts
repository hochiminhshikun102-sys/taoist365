import { dailyIndex } from "@/lib/living-day-key";

export type StabilityLockRuntime = {
  stabilityLockStrength: number;
  stabilityLockLine: string;
};

export function resolveStabilityLockRuntime(dayKey: string): StabilityLockRuntime {
  const h = dailyIndex(`${dayKey}:stab-lock`, 100);
  return {
    stabilityLockStrength: Math.min(0.94, 0.4 + h / 220),
    stabilityLockLine: "结构锁紧：首页分区像老网址一样难挪。",
  };
}
