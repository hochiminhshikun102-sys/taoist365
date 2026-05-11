import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const byRitual = {
  "draw-a-lot": ["Draw ritual remains present as a long-running quiet fixture."],
  "daily-guidance": ["Daily guidance has shifted to lighter, less frequent framing."],
  "home-harmony": ["Home harmony now appears with slower, quieter language."],
} as const;

export function pickRitualBackgroundAging(
  ritual: keyof typeof byRitual,
  age: WorldAgeStateId,
  dayKey: string,
): string {
  const pool = byRitual[ritual];
  return pool[dailyIndex(dayKey + ":rit-bg:" + ritual + ":" + age, pool.length)]!;
}
