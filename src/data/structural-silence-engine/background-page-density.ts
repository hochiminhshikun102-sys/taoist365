import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type BackgroundPageDensity = "low" | "quiet" | "heavy" | "thin" | "faded" | "still" | "warm" | "empty" | "residual";

export const pageDensityByAge: Record<WorldAgeStateId, BackgroundPageDensity> = {
  "newly-settled": "quiet",
  "quietly-lived-in": "thin",
  "heavy-air-season": "heavy",
  "slow-drift-month": "faded",
  "long-static-period": "still",
  "late-year-room": "residual",
  "old-browser-period": "empty",
  "worn-in-cycle": "still",
};
