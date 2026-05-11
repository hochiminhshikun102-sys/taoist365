import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

const UNFINISHED: readonly string[] = [
  "Linen half-folded on the chair—drawer still shy of shut.",
  "Cup never made it back to the cabinet—rim honest beside the sink.",
  "Notebook stopped on the same page three evenings running.",
  "Hallway box earned another week—tape curl democracy.",
  "Grocery receipt stayed in the tray—sorting deferred without verdict.",
  "Mail two days unopened—knife marks on envelopes older than intention.",
  "Chair not pushed back—angle survived dinner and the next morning.",
  "Dish towel damp-draped—laundry timing slipped again.",
];

export function pickUnfinishedDomesticity(dayKey: string, worldId: WorldStateId): string {
  const biased = worldId === "slow-laundry-week" || worldId === "late-night-desk-season" ? dayKey + ":u1" : dayKey + ":u0";
  return UNFINISHED[dailyIndex(biased, UNFINISHED.length)]!;
}
