import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export const slowRotationByAge: Record<WorldAgeStateId, number> = {
  "newly-settled": 1,
  "quietly-lived-in": 1.4,
  "heavy-air-season": 1.8,
  "slow-drift-month": 2.3,
  "long-static-period": 2.8,
  "late-year-room": 3.2,
  "old-browser-period": 3.6,
  "worn-in-cycle": 4.2,
};
