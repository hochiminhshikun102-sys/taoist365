import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { silenceDensityByAge } from "./silence-density";

export type AntiOverwritingAudit = {
  proseDensityBudget: "wide" | "medium" | "tight";
  maxExplanatoryBlocks: number;
  poetryPressure: "allowed" | "limited";
  awarenessTone: "low" | "very-low";
  note: string;
};

export function antiOverwriting(age: WorldAgeStateId): AntiOverwritingAudit {
  const s = silenceDensityByAge[age];
  if (s.explanatoryDensity === "minimal") {
    return {
      proseDensityBudget: "tight",
      maxExplanatoryBlocks: 2,
      poetryPressure: "limited",
      awarenessTone: "very-low",
      note: "Prefer fewer blocks and shorter lines; keep the world quieter than before.",
    };
  }
  if (s.explanatoryDensity === "lighter") {
    return {
      proseDensityBudget: "medium",
      maxExplanatoryBlocks: 3,
      poetryPressure: "limited",
      awarenessTone: "low",
      note: "Limit explanation growth; avoid adding new decorative prose.",
    };
  }
  return {
    proseDensityBudget: "wide",
    maxExplanatoryBlocks: 4,
    poetryPressure: "allowed",
    awarenessTone: "low",
    note: "Still avoid over-describing. World should stay plain.",
  };
}
