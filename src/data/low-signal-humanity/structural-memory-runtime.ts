import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export const structuralMemoryByAge: Record<WorldAgeStateId, string> = {
  "newly-settled": "Structure still lightly adaptive.",
  "quietly-lived-in": "Order has started to hold across visits.",
  "heavy-air-season": "Same block sequence appears more often.",
  "slow-drift-month": "Spacing and order now feel long-set.",
  "long-static-period": "The same room segment has become fixed.",
  "late-year-room": "Structure memory now outweighs novelty.",
  "old-browser-period": "Page skeleton feels long-held in browser life.",
  "worn-in-cycle": "Structural memory is now dominant and stable.",
};
