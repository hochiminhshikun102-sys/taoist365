import { dailyIndex } from "@/lib/living-day-key";

export function nonUrgentReopenReminder(dayKey: string): string {
  void dailyIndex(`${dayKey}:nur`, 20);
  return "不必收尾。不必刷新理由。";
}
