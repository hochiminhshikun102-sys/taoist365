import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const ritualSilenceByRoute = {
  "draw-a-lot": [
    "Draw-a-lot sits in long quiet between visits.",
    "Its residue lingers longer than its prompts.",
  ],
  "daily-guidance": [
    "Daily guidance now speaks lighter and leaves sooner.",
    "Some daily lines recur with less explanation.",
  ],
  "home-harmony": [
    "Home harmony has slowed into fewer, older phrases.",
    "Its room language now lingers more than it rotates.",
  ],
} as const;

export function pickRitualSilence(
  ritual: keyof typeof ritualSilenceByRoute,
  age: WorldAgeStateId,
  dayKey: string,
): string {
  const pool = ritualSilenceByRoute[ritual];
  return pool[dailyIndex(dayKey + ":rit-sil:" + ritual + ":" + age, pool.length)]!;
}
