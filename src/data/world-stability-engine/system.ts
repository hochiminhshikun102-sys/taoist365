import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { WorldStabilityBundle } from "@/data/world-stability-governance/system";
import { resolveAmbientPermanenceRuntime } from "./ambient-permanence-runtime";
import { resolveLongFormFreeze } from "./long-form-freeze";
import { resolveLowRefreshPermanence } from "./low-refresh-permanence";
import { resolvePermanentLayoutMemory } from "./permanent-layout-memory";
import { resolveSlowChangeGovernor } from "./slow-change-governor";
import { resolveStabilityLockRuntime } from "./stability-lock-runtime";
import { resolveUnchangedStructureRuntime } from "./unchanged-structure-runtime";
import { resolveWorldStaticPressure } from "./world-static-pressure";

export type WorldStabilityEngineBundle = {
  dayKey: string;
  stabilityLock: ReturnType<typeof resolveStabilityLockRuntime>;
  longFormFreeze: ReturnType<typeof resolveLongFormFreeze>;
  ambientPermanence: ReturnType<typeof resolveAmbientPermanenceRuntime>;
  lowRefreshPermanence: ReturnType<typeof resolveLowRefreshPermanence>;
  slowChangeGovernor: ReturnType<typeof resolveSlowChangeGovernor>;
  worldStaticPressure: ReturnType<typeof resolveWorldStaticPressure>;
  unchangedStructure: ReturnType<typeof resolveUnchangedStructureRuntime>;
  permanentLayoutMemory: ReturnType<typeof resolvePermanentLayoutMemory>;
  /** Combined scalar for downstream retirement / friction */
  engineStabilityScalar: number;
};

export function resolveWorldStabilityEngineBundle(
  structuralSilence: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  worldStability: WorldStabilityBundle,
): WorldStabilityEngineBundle {
  void worldRegulation;
  const dayKey = structuralSilence.dayKey;
  const stabilityLock = resolveStabilityLockRuntime(dayKey);
  const worldStaticPressure = resolveWorldStaticPressure(dayKey);
  const engineStabilityScalar = Math.min(
    1,
    stabilityLock.stabilityLockStrength * 0.45 + worldStaticPressure.staticPressure * 0.35 + worldStability.changeResistance * 0.2,
  );
  return {
    dayKey,
    stabilityLock,
    longFormFreeze: resolveLongFormFreeze(),
    ambientPermanence: resolveAmbientPermanenceRuntime(),
    lowRefreshPermanence: resolveLowRefreshPermanence(),
    slowChangeGovernor: resolveSlowChangeGovernor(),
    worldStaticPressure,
    unchangedStructure: resolveUnchangedStructureRuntime(),
    permanentLayoutMemory: resolvePermanentLayoutMemory(),
    engineStabilityScalar,
  };
}
