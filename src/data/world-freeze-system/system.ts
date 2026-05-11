import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { ambientBackgroundLayersLine } from "./ambient-background-layers";
import { buildRuntimeRetirementMatrix, freezeEmphasisFromRetirement } from "./runtime-retirement-matrix";
import { foregroundPermanenceLine } from "./foreground-permanence";
import { longLivedBlocksLine } from "./long-lived-blocks";
import { permanentAbsencePolicyLine } from "./permanent-absence";
import { rareResurfacingLine } from "./rare-resurfacing-runtime";
import { slowReturnLine } from "./slow-return-runtime";
import { structuralFamiliarityLine } from "./structural-familiarity";
import { buildWorldStabilityMap, type WorldStabilityMap } from "./world-stability-map";
import { worldFreezeBoundariesLine } from "./world-freeze-boundaries";

export type WorldFreezeBundle = {
  dayKey: string;
  stabilityMap: WorldStabilityMap;
  retirementMatrix: ReturnType<typeof buildRuntimeRetirementMatrix>;
  freezeEmphasis: ReturnType<typeof freezeEmphasisFromRetirement>;
  foregroundPermanenceLine: string;
  longLivedBlocksLine: string;
  ambientBackgroundLayersLine: string;
  rareResurfacingLine: string;
  structuralFamiliarityLine: string;
  permanentAbsencePolicyLine: string;
  slowReturnLine: string;
  worldFreezeBoundariesLine: string;
};

export function resolveWorldFreezeBundle(
  structuralSilence: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): WorldFreezeBundle {
  void worldRegulation;
  const dayKey = structuralSilence.dayKey;
  const stabilityMap = buildWorldStabilityMap(dayKey);
  const freezeEmphasis = freezeEmphasisFromRetirement(runtimeRetirement);
  return {
    dayKey,
    stabilityMap,
    retirementMatrix: buildRuntimeRetirementMatrix(stabilityMap),
    freezeEmphasis,
    foregroundPermanenceLine: foregroundPermanenceLine(),
    longLivedBlocksLine: longLivedBlocksLine(),
    ambientBackgroundLayersLine: ambientBackgroundLayersLine(),
    rareResurfacingLine: rareResurfacingLine(dayKey),
    structuralFamiliarityLine: structuralFamiliarityLine(),
    permanentAbsencePolicyLine: permanentAbsencePolicyLine(),
    slowReturnLine: slowReturnLine(),
    worldFreezeBoundariesLine: worldFreezeBoundariesLine(),
  };
}
