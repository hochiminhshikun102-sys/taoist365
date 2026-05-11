import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type StructuralSilenceBoundary = {
  overExpressionScore: number;
  structuralFatigue: number;
  explanationPressure: number;
  ambientOverload: number;
  note: string;
};

export function structuralSilenceBoundary(age: WorldAgeStateId): StructuralSilenceBoundary {
  const strict = age === "worn-in-cycle" || age === "old-browser-period" || age === "long-static-period";
  return strict
    ? {
        overExpressionScore: 0.22,
        structuralFatigue: 0.82,
        explanationPressure: 0.18,
        ambientOverload: 0.2,
        note: "Reduce active blocks and explanations; let absence remain explicit.",
      }
    : {
        overExpressionScore: 0.4,
        structuralFatigue: 0.58,
        explanationPressure: 0.36,
        ambientOverload: 0.34,
        note: "Keep density moderate and avoid filling every gap.",
      };
}
