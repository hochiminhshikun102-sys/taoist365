import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export const objectLanguageThinningByAge: Record<WorldAgeStateId, "full" | "short" | "minimal"> = {
  "newly-settled": "full",
  "quietly-lived-in": "short",
  "heavy-air-season": "short",
  "slow-drift-month": "minimal",
  "long-static-period": "minimal",
  "late-year-room": "minimal",
  "old-browser-period": "minimal",
  "worn-in-cycle": "minimal",
};
