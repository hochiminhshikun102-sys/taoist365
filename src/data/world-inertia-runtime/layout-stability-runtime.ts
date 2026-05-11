import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { structuralInertiaByAge } from "./structural-inertia";

export function layoutStability(age: WorldAgeStateId): {
  fixed: boolean;
  line: string;
} {
  const s = structuralInertiaByAge[age];
  return {
    fixed: s.asideOrderLocked && !s.sectionRotationEnabled,
    line: s.skeletonNote,
  };
}
