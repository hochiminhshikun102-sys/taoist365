import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

const LIGHT: readonly string[] = [
  "Overhead off earlier—lamp cone carries the room.",
  "Screen bloom reaches mug before ceiling agrees.",
  "Hallway bulb weaker—filament democracy.",
  "Under-cabinet LED wins dish duty—shadow shorter.",
  "Reading lamp dust visible in cone—nobody staged the grain.",
  "Bathroom fan outlasts the shower—humidity honest.",
  "Street light through blinds—stripes slower tonight.",
];

export function pickLightUsageCycle(dayKey: string, worldId: WorldStateId): string {
  const key = worldId === "lamp-earlier-week" || worldId === "late-night-desk-season" ? dayKey + ":L1" : dayKey + ":L0";
  return LIGHT[dailyIndex(key, LIGHT.length)]!;
}
