import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type PassiveLayout = { fixedOrder: boolean; note: string };

export const passiveLayoutByAge: Record<WorldAgeStateId, PassiveLayout> = {
  "newly-settled": { fixedOrder: false, note: "Layout still shifts softly." },
  "quietly-lived-in": { fixedOrder: true, note: "One stable order has emerged." },
  "heavy-air-season": { fixedOrder: true, note: "Layout has slowed and settles faster." },
  "slow-drift-month": { fixedOrder: true, note: "Order now remains stable across longer windows." },
  "long-static-period": { fixedOrder: true, note: "The page skeleton has become long-standing." },
  "late-year-room": { fixedOrder: true, note: "Structure now defaults to familiar sequence." },
  "old-browser-period": { fixedOrder: true, note: "Layout feels browser-memory stable." },
  "worn-in-cycle": { fixedOrder: true, note: "Structural stillness now dominates." },
};
