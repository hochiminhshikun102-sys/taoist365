import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

export type SurfaceMemoryContext = "home" | "objects" | "desk" | "mail";

const POOLS: Record<SurfaceMemoryContext, readonly string[]> = {
  home: [
    "Cup ring strata on the side table—same mug, different weeks, same coasters missing.",
    "Linen compression along the chair back where shoulders actually sat.",
    "Tray friction where spoons paused—metal gone satin, not styled.",
  ],
  objects: [
    "Shelf memory: a faint rectangle where a piece sat long enough to ghost the finish.",
    "Paper pressure marks on the card that shipped with the piece—thumb stopped there twice.",
    "Folded edge memory on the care sheet—opened along the same crease until it softened.",
  ],
  desk: [
    "Keyboard oil follows the home row without commentary—geometry of use, not grime cosplay.",
    "Mouse pad wear is an oval, not a brand story.",
    "Notebook spine fatigue: the cover lifts before the pages do.",
  ],
  mail: [
    "Envelope corner softening where it waited in the tray beside the opener.",
    "Paper ghost on the reply sheet—previous pencil left a lift you can feel with a nail.",
    "Stamp edge rubbed dull from being handled on the way to the box—ordinary parcel grammar.",
  ],
};

export function pickSurfaceMemory(context: SurfaceMemoryContext, age: WorldAgeStateId, dayKey: string): string {
  const pool = POOLS[context];
  const i = dailyIndex(`${dayKey}:surf:${context}:${age}`, pool.length);
  return pool[i] ?? pool[0];
}
