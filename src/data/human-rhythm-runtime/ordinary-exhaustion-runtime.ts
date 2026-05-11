import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

/** Ordinary fatigue—no burnout poetry, no recovery sales. */
const EXHAUSTION: readonly string[] = [
  "Things staying where they landed—reset energy thinner this week.",
  "Less energy for squaring rooms—corners honest about drift.",
  "Some objects no longer returned—shortcut became geography.",
  "Quiet shortcuts permanent—drawer half-open earns tenure.",
  "Dish rack forgiving emptier—sink democracy.",
  "Mail pile taller—opening deferred without CRM.",
  "Shoes near door multiplied—geometry honest.",
  "Light switches dirtier from thumb repetition—no wellness angle.",
];

export function pickOrdinaryExhaustion(dayKey: string, worldId: WorldStateId): string {
  const heavy =
    worldId === "slow-laundry-week" ||
    worldId === "late-night-desk-season" ||
    worldId === "grey-afternoon";
  const key = heavy ? dayKey + ":exh1" : dayKey + ":exh0";
  return EXHAUSTION[dailyIndex(key, EXHAUSTION.length)]!;
}
