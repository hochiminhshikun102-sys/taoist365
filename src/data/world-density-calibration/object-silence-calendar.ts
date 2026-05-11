import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

export type ObjectSilenceWindow = {
  /** 今天该 catalog id 是否允许出现在 foreground（与 structural objectFade 叠加由消费端处理） */
  allowForegroundToday: boolean;
  /** 静默周期长度（展示用，天） */
  silenceCycleDays: number;
};

/** 物争取注意力的周期：按 id + dayKey 决定“沉默窗”（约两成日不出 foreground）。 */
export function objectSilenceWindow(catalogId: string, age: WorldAgeStateId, dayKey: string): ObjectSilenceWindow {
  void age;
  const cycle = 14;
  const roll = dailyIndex(`${dayKey}:obj-sil:${catalogId}`, cycle);
  const allowForegroundToday = roll >= 3;
  return { allowForegroundToday, silenceCycleDays: cycle };
}
