import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "./same-day-world-state";

/** Ambient time — room continues without narrating your progress. */
export const ambientPresenceByWorld: Record<WorldStateId, readonly string[]> = {
  "colder-evening": [
    "The building exhales slower after sunset.",
    "Fridge cycle lands heavier in a quiet kitchen.",
    "Phone brightness feels rude against the wall tone.",
  ],
  "humid-apartment": [
    "Air conditioner argues politely with the window.",
    "Towel rack rust remembers last summer.",
    "Floor grout darkens honest near the tub.",
  ],
  "radiator-week": [
    "Heat arrives at floor level first—socks matter.",
    "Paint near steam remembers peeling patience.",
    "Cat chooses the vent again without loyalty theater.",
  ],
  "open-window-weather": [
    "Outside soundstage swaps when trucks thin out.",
    "Curtain hem rehearses the same inch daily.",
    "Screen mesh counts gnats without commentary.",
  ],
  "late-night-desk-season": [
    "Cursor blink outlasts one song.",
    "Chair vinyl sticks longer to the back of a thigh.",
    "Phone face-down—LED bleeds under the edge.",
  ],
  "slow-laundry-week": [
    "Basket height unchanged; shame stays ordinary.",
    "Dryer lint thicker—fibers anonymous.",
    "Hanger squeak repeats weekly without upgrade.",
  ],
  "grey-afternoon": [
    "Coffee ring hides in flat light.",
    "Plant leaves dust-visible without judgment.",
    "Doorbell rarely earns its voltage.",
  ],
  "dry-wooden-room": [
    "Static asks hair honest questions.",
    "Door sticks on the dry week side.",
    "Paper grocery bag corners soften upright.",
  ],
  "rain-entryway-week": [
    "Shoe pile asymmetry returns—wet left bias.",
    "Umbrella leaves a darker ellipse.",
    "Elevator smells like everyone’s jacket.",
  ],
  "quiet-hallway-week": [
    "Mail slot flaps once—nobody performs arrival.",
    "Lightbulb buzz earns its fraction.",
    "Stairs creak for someone else two floors up.",
  ],
  "kettle-slower-week": [
    "Steam writes shorter sentences on glass.",
    "Mug ring dries uneven—moon phases of tannin.",
    "Coaster sticks slightly when lifted.",
  ],
  "lamp-earlier-week": [
    "Shade dust visible sooner in cone.",
    "Switch plate warmer from thumb repetition.",
    "Book page corners lift before you finish reading.",
  ],
};

export function pickAmbientPresenceLine(worldId: WorldStateId, dayKey: string): string {
  const lines = ambientPresenceByWorld[worldId];
  const idx = dailyIndex(dayKey + ":amb", lines.length);
  return lines[idx]!;
}
