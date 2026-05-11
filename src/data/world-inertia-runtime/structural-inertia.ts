import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type StructuralInertia = {
  asideOrderLocked: boolean;
  sectionRotationEnabled: boolean;
  skeletonNote: string;
};

export const structuralInertiaByAge: Record<WorldAgeStateId, StructuralInertia> = {
  "newly-settled": { asideOrderLocked: false, sectionRotationEnabled: true, skeletonNote: "Sections may reorder." },
  "quietly-lived-in": { asideOrderLocked: true, sectionRotationEnabled: true, skeletonNote: "Aside order mostly fixed." },
  "heavy-air-season": { asideOrderLocked: true, sectionRotationEnabled: false, skeletonNote: "Stable sequence." },
  "slow-drift-month": { asideOrderLocked: true, sectionRotationEnabled: false, skeletonNote: "Section order set." },
  "long-static-period": { asideOrderLocked: true, sectionRotationEnabled: false, skeletonNote: "Long-stable skeleton." },
  "late-year-room": { asideOrderLocked: true, sectionRotationEnabled: false, skeletonNote: "Layout unchanged." },
  "old-browser-period": { asideOrderLocked: true, sectionRotationEnabled: false, skeletonNote: "Same block positions." },
  "worn-in-cycle": { asideOrderLocked: true, sectionRotationEnabled: false, skeletonNote: "Fully settled layout." },
};
