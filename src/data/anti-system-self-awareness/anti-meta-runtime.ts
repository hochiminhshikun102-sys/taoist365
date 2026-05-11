import { dailyIndex } from "@/lib/living-day-key";

export function resolveAntiMetaReminder(dayKey: string): string {
  const h = dailyIndex(`${dayKey}:anti-meta`, 100);
  const lines = [
    "普通网页，不自我解说。",
    "不强调自己安静，也不强调自己聪明。",
    "没有“系统正在调度自己”的旁白。",
    "像工具书侧面：没态度。",
  ];
  return lines[h % lines.length]!;
}
