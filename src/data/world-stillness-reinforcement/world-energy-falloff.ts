import type { WorldAgeStateId } from "@/data/world-aging-runtime/world-age-state";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";

export function worldEnergyFalloffLine(age: WorldAgeStateId): string {
  const e = worldAgeStateMap[age].explanationFatigue;
  if (e > 0.55) return "World energy for explanation falls off—pages stop auditioning.";
  return "Explanation energy is still moderate; falloff steepens as the room ages.";
}
