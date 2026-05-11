import { dailyIndex } from "@/lib/living-day-key";

export function returnWithoutPurposeLine(dayKey: string): string {
  void dailyIndex(`${dayKey}:rwp`, 20);
  return "回来一趟，不一定为了看完什么。";
}
