import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Material density stays low—one honest surface mention beats three styled ones.",
  "The page leaves room for air between objects; clutter is not the same as lived-in.",
  "Fewer highlights today; the room lets background weight carry the sentence.",
  "Density tips toward shelf and paper, not toward décor inventory.",
] as const;

export function pickAmbientMaterialDensityLine(age: WorldAgeStateId, dayKey: string): string {
  const w = worldAgeStateMap[age].stillnessWeight;
  const poolBias = w > 0.55 ? 2 : 0;
  const i = dailyIndex(`${dayKey}:amb-md:${age}`, LINES.length);
  const line = LINES[(i + poolBias) % LINES.length] ?? LINES[0];
  return line;
}
