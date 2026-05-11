import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

const SILENCE: readonly string[] = [
  "Quieter hallway lately—neighbor TV thinner through the wall.",
  "Less movement near kitchen—kettle argues alone.",
  "Earlier lamp sounds—switch finds finger before hunger.",
  "Room holding still longer—dust visible without drama.",
  "Slower evenings this week—same furniture, thinner urgency.",
  "Fridge cycle louder because the room stopped competing.",
  "Elevator arrives emptier—soundstage thinned.",
];

export function pickRoomSilenceDensity(dayKey: string, worldId: WorldStateId): string {
  const key =
    worldId === "quiet-hallway-week" || worldId === "grey-afternoon" ? dayKey + ":sil1" : dayKey + ":sil0";
  return SILENCE[dailyIndex(key, SILENCE.length)]!;
}
