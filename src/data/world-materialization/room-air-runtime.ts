import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";
import { dailyIndex } from "@/lib/living-day-key";

export type RoomAirContext = "home" | "guidance" | "mail" | "objects" | "ritual" | "desk";

const BASE = [
  "Dry heater week: skin and paper agree the air is thin.",
  "Humid afternoon: the room holds breath closer to the floor.",
  "Stale late-night air—dishes are done, windows stayed shut.",
  "Rain-heavy room: the sill cools first; the hall keeps kitchen warmth a little longer.",
  "Kitchen warmth drift meets hallway cool halfway—no fanfare, just a temperature seam.",
  "Open-window thinness after rain: paper lifts, carpet smell drops.",
] as const;

const CONTEXT_SUFFIX: Record<RoomAirContext, readonly string[]> = {
  home: ["That air sits behind the whole domain today—not a weather widget, just room grammar."],
  guidance: ["Pause inherits the same air as the rest of the house; nothing ventilated for performance."],
  mail: ["Mail reads like correspondence left in that same air—not romantic, just settled."],
  objects: ["Objects are described as if they cooled in this air before you touched them."],
  ritual: ["Ritual pages keep the same humidity logic as home—no temple fog machine."],
  desk: ["Desk air is the same corner as the rest of the flat—browser heat, cup steam, window crack optional."],
};

export function pickRoomAirLine(
  context: RoomAirContext,
  age: WorldAgeStateId,
  worldStateId: WorldStateId,
  dayKey: string,
): string {
  const i = dailyIndex(`${dayKey}:air:${context}:${worldStateId}`, BASE.length);
  const base = BASE[i] ?? BASE[0];
  const j = dailyIndex(`${dayKey}:air-suf:${context}`, CONTEXT_SUFFIX[context].length);
  const suf = CONTEXT_SUFFIX[context][j] ?? CONTEXT_SUFFIX[context][0];
  return `${base} ${suf}`;
}
