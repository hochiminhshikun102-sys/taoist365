import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

const FLOW: readonly string[] = [
  "Water runs twice before teeth—ordinary sequencing.",
  "Microwave beep ignored once—cooldown democracy.",
  "Fan direction unchanged for weeks—air path lazy.",
  "Spice jar order wrong—cooking continues anyway.",
  "Towel hierarchy informal—guest logic absent.",
  "Light over stove wins over overhead—habit not design.",
  "Keys land louder Fridays—no story attached.",
];

export function pickAmbientHouseholdFlow(dayKey: string, worldId: WorldStateId): string {
  return FLOW[dailyIndex(dayKey + ":flow" + worldId, FLOW.length)]!;
}
