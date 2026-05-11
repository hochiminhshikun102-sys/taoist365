import { dailyIndex } from "@/lib/living-day-key";

export function resolveSlowEvolutionLine(dayKey: string): string {
  void dailyIndex(`${dayKey}:slow-evo`, 25);
  return "新句子更难挤进前景；旧结构更容易留着。";
}
