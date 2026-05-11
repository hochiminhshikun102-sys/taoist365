import { dailyIndex } from "@/lib/living-day-key";

export function resolveAmbientGovernorLine(dayKey: string): string {
  void dailyIndex(`${dayKey}:gov`, 20);
  return "世界偏好少改动：缺一块不算故障，算稳定策略。";
}
