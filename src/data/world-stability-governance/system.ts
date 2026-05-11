import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import { resolveAmbientGovernorLine } from "./ambient-governor";
import { resolveChangeResistance } from "./change-resistance-runtime";
import { resolveForegroundFriction } from "./foreground-friction";
import { resolveRuntimeRetirementPressure } from "./runtime-aging-retirement";
import { resolveSlowEvolutionLine } from "./slow-evolution-runtime";
import { resolveStabilityBudget } from "./stability-budget";

export type WorldStabilityBundle = {
  dayKey: string;
  stabilityBudget: number;
  runtimeRetirementPressure: number;
  foregroundFriction: number;
  ambientGovernorLine: string;
  changeResistance: number;
  slowEvolutionLine: string;
};

export function resolveWorldStabilityGovernanceBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  worldRegulation: WorldRegulationBundle,
): WorldStabilityBundle {
  const dayKey = structuralSilence.dayKey;
  return {
    dayKey,
    stabilityBudget: resolveStabilityBudget(dayKey, worldRegulation),
    runtimeRetirementPressure: resolveRuntimeRetirementPressure(dayKey, aging),
    foregroundFriction: resolveForegroundFriction(dayKey, worldRegulation),
    ambientGovernorLine: resolveAmbientGovernorLine(dayKey),
    changeResistance: resolveChangeResistance(dayKey, structuralSilence),
    slowEvolutionLine: resolveSlowEvolutionLine(dayKey),
  };
}
