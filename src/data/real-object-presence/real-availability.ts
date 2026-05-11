import { dailyIndex } from "@/lib/living-day-key";

/** “最近没再看到” — not stock / urgency */
export function realAvailabilityLine(catalogId: string, dayKey: string): string | null {
  const h = dailyIndex(`${dayKey}:avail:${catalogId}`, 100);
  if (h < 88) return null;
  return "这阵子页面上没再强调它——像房间里暂时没收到的杯子，不是断货话术。";
}
