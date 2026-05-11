import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type ExplanationFatigue = {
  guidance: "normal" | "lighter" | "minimal";
  ritual: "normal" | "lighter" | "minimal";
  objects: "normal" | "lighter" | "minimal";
  mail: "normal" | "lighter" | "minimal";
};

export const explanationFatigueByAge: Record<WorldAgeStateId, ExplanationFatigue> = {
  "newly-settled": { guidance: "normal", ritual: "normal", objects: "normal", mail: "normal" },
  "quietly-lived-in": { guidance: "lighter", ritual: "lighter", objects: "lighter", mail: "lighter" },
  "heavy-air-season": { guidance: "lighter", ritual: "lighter", objects: "lighter", mail: "lighter" },
  "slow-drift-month": { guidance: "minimal", ritual: "minimal", objects: "minimal", mail: "minimal" },
  "long-static-period": { guidance: "minimal", ritual: "minimal", objects: "minimal", mail: "minimal" },
  "late-year-room": { guidance: "minimal", ritual: "minimal", objects: "minimal", mail: "minimal" },
  "old-browser-period": { guidance: "minimal", ritual: "minimal", objects: "minimal", mail: "minimal" },
  "worn-in-cycle": { guidance: "minimal", ritual: "minimal", objects: "minimal", mail: "minimal" },
};
