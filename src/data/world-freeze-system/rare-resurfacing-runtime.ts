import { dailyIndex } from "@/lib/living-day-key";

export function rareResurfacingLine(dayKey: string): string {
  void dailyIndex(`${dayKey}:rare-surf`, 20);
  return "反过度、反表演、反元叙事偶尔浮一下——像年检贴纸，不是例行吆喝。";
}
