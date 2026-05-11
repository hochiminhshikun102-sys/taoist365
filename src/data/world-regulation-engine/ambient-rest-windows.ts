import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

export type RestWindowDays = 14 | 30 | 45 | 90;

export type AmbientRestWindows = {
  restWindowDays: RestWindowDays;
  restWindowLine: string;
  /** 同一句允许重复的“概念天数”（确定性文案，不做真实日期库） */
  phraseHoldHint: string;
};

export function resolveAmbientRestWindows(age: WorldAgeStateId, dayKey: string): AmbientRestWindows {
  const opts: RestWindowDays[] = [14, 30, 45, 90];
  const restWindowDays = opts[dailyIndex(`${dayKey}:rest-win:${age}`, opts.length)] ?? 30;
  return {
    restWindowDays,
    restWindowLine: `Low-refresh window: ${restWindowDays} days of allowed sameness—no “daily new” pressure.`,
    phraseHoldHint: "Some lines are allowed to return unchanged across that window.",
  };
}
