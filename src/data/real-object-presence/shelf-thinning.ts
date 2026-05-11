import { dailyIndex } from "@/lib/living-day-key";

export function shelfThinningLine(dayKey: string): string {
  void dailyIndex(`${dayKey}:shelf-thin`, 30);
  return "架子视觉变薄：前景少写几句，不等于没货可讲。";
}
