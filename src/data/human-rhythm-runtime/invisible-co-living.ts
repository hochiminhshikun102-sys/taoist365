import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

/**
 * Anonymous co-presence—no characters, no relationships.
 * Sparse gate so most days stay single-occupant ambiguous.
 */
const COLIVING: readonly string[] = [
  "Another cup angle on the drain board—geometry rotated without story.",
  "Hallway shoes changed—pairs honest, narrative absent.",
  "Folded towel moved again—height uneven, nobody named.",
  "Kitchen usage shifted—kettle time earlier, no cast list.",
  "Object returned elsewhere—tray edge nearer cord than yesterday.",
  "Second mug ring ghost—diameter unfamiliar, ordinary.",
  "Mail slit flapped twice—schedules overlapped without introduction.",
];

export function pickInvisibleCoLiving(dayKey: string, worldId: WorldStateId): string | null {
  const gate = dailyIndex(dayKey + ":colive", 100);
  if (gate > 34) return null;
  return COLIVING[dailyIndex(dayKey + ":col" + worldId, COLIVING.length)]!;
}
