import type { WorldAgeStateId } from "@/data/world-aging-runtime/world-age-state";

export function roomDependenceRuntimeLine(age: WorldAgeStateId): string {
  const late = age === "late-year-room" || age === "old-browser-period" || age === "worn-in-cycle";
  if (late) {
    return "The room depends on objects quietly; copy stops proving their worth.";
  }
  return "Dependence grows slowly—objects earn their silence as the world ages.";
}
