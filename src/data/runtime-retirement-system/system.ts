import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldInertiaBundle } from "@/data/world-inertia-runtime/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { WorldStabilityBundle } from "@/data/world-stability-governance/system";
import type { WorldStabilityEngineBundle } from "@/data/world-stability-engine/system";
import type { BrowserRealityBundle } from "@/data/browser-reality-engine/system";
import { resolveAgingOutRuntime } from "./aging-out-runtime";
import { resolveAmbientExhaustionGovernor } from "./ambient-exhaustion-governor";
import { resolveForegroundRetirement } from "./foreground-retirement";
import { resolveObjectRetirementRuntime } from "./object-retirement-runtime";
import { resolvePassiveRuntimeAging } from "./passive-runtime-aging";
import { retirementPressure } from "./retirement-thresholds";
import { resolveResidualRetirement } from "./residual-retirement";
import { resolveRetiredRuntimeMemory } from "./retired-runtime-memory";
import { resolveRuntimeBackgroundPermanence } from "./runtime-background-permanence";
import { resolveRuntimeLifecycleRuntime, type RuntimeLifecycleRuntime } from "./runtime-lifecycle-runtime";
import { resolveRuntimeRetirementRegistry, type ChannelRetirement } from "./runtime-retirement-registry";
import { resolveRuntimeSilenceRetirement } from "./runtime-silence-retirement";
import { resolveWorldFatigueRuntime, type FatigueLevel, type WorldFatigueRuntime } from "./world-fatigue-runtime";
import { resolveWorldRestRuntime, type WorldRestRuntime } from "./world-rest-runtime";
import { dailyIndex } from "@/lib/living-day-key";

export type GuidanceRetirementSurface = {
  /** Weather + home only */
  ultraMinimalRoom: boolean;
  /** Hide entry feeling label */
  hideEntryLabel: boolean;
  /** Force zero noticing regardless of other caps */
  forceZeroNoticing: boolean;
};

export type RuntimeRetirementBundle = {
  dayKey: string;
  pressure: number;
  channelRetirement: ChannelRetirement;
  lifecycle: RuntimeLifecycleRuntime;
  foregroundRetirement: ReturnType<typeof resolveForegroundRetirement>;
  passiveRuntimeAging: ReturnType<typeof resolvePassiveRuntimeAging>;
  runtimeSilenceRetirement: ReturnType<typeof resolveRuntimeSilenceRetirement>;
  residualRetirement: ReturnType<typeof resolveResidualRetirement>;
  agingOut: ReturnType<typeof resolveAgingOutRuntime>;
  backgroundPermanence: ReturnType<typeof resolveRuntimeBackgroundPermanence>;
  retiredMemory: ReturnType<typeof resolveRetiredRuntimeMemory>;
  worldFatigue: WorldFatigueRuntime;
  worldRest: WorldRestRuntime;
  exhaustionGovernor: ReturnType<typeof resolveAmbientExhaustionGovernor>;
  objectRetirement: ReturnType<typeof resolveObjectRetirementRuntime>;
  guidanceRetirement: GuidanceRetirementSurface;
};

function resolveGuidanceRetirementSurface(
  dayKey: string,
  fatigueLevel: FatigueLevel,
  channel: ChannelRetirement["guidanceResidue"],
): GuidanceRetirementSurface {
  const h = dailyIndex(`${dayKey}:g-ret-surf`, 100);
  const ultra =
    fatigueLevel === "almostAbsent" ||
    (fatigueLevel === "resting" && h > 70) ||
    channel === "retired" ||
    channel === "backgroundPermanent";
  const ultraMinimalRoom = ultra || (fatigueLevel === "tired" && h > 85);
  const channelHeavy = channel === "retired" || channel === "backgroundPermanent" || channel === "residualOnly";
  return {
    ultraMinimalRoom,
    hideEntryLabel: ultraMinimalRoom && h > 55,
    forceZeroNoticing: ultraMinimalRoom || (channelHeavy && h > 82),
  };
}

export function resolveRuntimeRetirementBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  inertia: WorldInertiaBundle,
  worldRegulation: WorldRegulationBundle,
  worldStability: WorldStabilityBundle,
  worldStabilityEngine: WorldStabilityEngineBundle,
  browserReality: BrowserRealityBundle,
): RuntimeRetirementBundle {
  void aging;
  void inertia;
  void worldStability;
  const dayKey = structuralSilence.dayKey;
  const pressure = Math.min(1, retirementPressure(dayKey) * (0.86 + 0.14 * worldStabilityEngine.engineStabilityScalar));
  const channelRetirement = resolveRuntimeRetirementRegistry(dayKey, pressure);
  const lifecycle = resolveRuntimeLifecycleRuntime(channelRetirement);
  const worldFatigue = resolveWorldFatigueRuntime(dayKey, structuralSilence);
  const worldRest = resolveWorldRestRuntime(dayKey, worldFatigue.fatigueLevel);
  const objectRetirement = resolveObjectRetirementRuntime(
    browserReality.objectInternetSediment.sedimentForegroundIds,
    dayKey,
    worldFatigue.fatigueLevel,
  );
  const guidanceRetirement = resolveGuidanceRetirementSurface(
    dayKey,
    worldFatigue.fatigueLevel,
    channelRetirement.guidanceResidue,
  );

  return {
    dayKey,
    pressure,
    channelRetirement,
    lifecycle,
    foregroundRetirement: resolveForegroundRetirement(),
    passiveRuntimeAging: resolvePassiveRuntimeAging(),
    runtimeSilenceRetirement: resolveRuntimeSilenceRetirement(),
    residualRetirement: resolveResidualRetirement(),
    agingOut: resolveAgingOutRuntime(),
    backgroundPermanence: resolveRuntimeBackgroundPermanence(),
    retiredMemory: resolveRetiredRuntimeMemory(),
    worldFatigue,
    worldRest,
    exhaustionGovernor: resolveAmbientExhaustionGovernor(worldFatigue.fatigueLevel),
    objectRetirement,
    guidanceRetirement,
  };
}
