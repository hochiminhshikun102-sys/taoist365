import { dailyIndex } from "@/lib/living-day-key";

/** After sleep—room state, not sleep hygiene product. */
const SLEEP_RESIDUE: readonly string[] = [
  "Blanket edge still folded down—body left without resetting the scene.",
  "Lamp not turned fully off—cone remembers a weaker decision.",
  "Mug survived the nightstand—ring dried uneven by morning.",
  "Page still open from last evening—scroll debt ordinary.",
  "Morning colder before movement—floor votes before coffee.",
  "Curtain half-drawn—light entered shy.",
  "Phone charger cable still warm from thumb unplug.",
  "Chair holds yesterday’s shirt—laundry democracy delayed.",
];

export function pickSleepResidue(dayKey: string, localHour: number): string | null {
  if (localHour < 5 || localHour > 11) return null;
  return SLEEP_RESIDUE[dailyIndex(dayKey + ":sleep", SLEEP_RESIDUE.length)]!;
}
