import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { antiExpansionLine } from "./anti-expansion-runtime";
import { resolveChangePressure } from "./change-pressure-runtime";
import { quietWorldProtectionLine } from "./quiet-world-protection";
import { runtimeCoolingLine } from "./runtime-cooling";
import { slowPresenceBalancerLine } from "./slow-presence-balancer";
import { stabilityPreservationLine } from "./stability-preservation";
import { stillnessProtectionLine } from "./stillness-protection";
import { worldOvergrowthAuditLine } from "./world-overgrowth-audit";

export type WorldStillnessGovernorBundle = {
  dayKey: string;
  changePressure: number;
  /** 0–1 higher = prefer thinner stacks */
  proseDensityGovernor: number;
  stillnessProtectionLine: string;
  runtimeCoolingLine: string;
  slowPresenceBalancerLine: string;
  antiExpansionLine: string;
  stabilityPreservationLine: string;
  quietWorldProtectionLine: string;
  worldOvergrowthAuditLine: string;
};

export function resolveWorldStillnessGovernorBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  worldRegulation: WorldRegulationBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): WorldStillnessGovernorBundle {
  const dayKey = structuralSilence.dayKey;
  const changePressure = resolveChangePressure(dayKey, aging);
  const fatigue = runtimeRetirement.worldFatigue.fatigueLevel;
  const hot =
    worldRegulation.narrativeOverflow.overflowAuditLine !== null ||
    worldRegulation.crossRuntimeSuppression.thinDailyProse;
  let proseDensityGovernor = 0.35 + changePressure * 0.35;
  if (fatigue === "tired" || fatigue === "resting" || fatigue === "almostAbsent") proseDensityGovernor += 0.18;
  if (hot) proseDensityGovernor += 0.12;
  proseDensityGovernor = Math.min(0.95, proseDensityGovernor);
  return {
    dayKey,
    changePressure,
    proseDensityGovernor,
    stillnessProtectionLine: stillnessProtectionLine(),
    runtimeCoolingLine: runtimeCoolingLine(),
    slowPresenceBalancerLine: slowPresenceBalancerLine(),
    antiExpansionLine: antiExpansionLine(),
    stabilityPreservationLine: stabilityPreservationLine(),
    quietWorldProtectionLine: quietWorldProtectionLine(),
    worldOvergrowthAuditLine: worldOvergrowthAuditLine(),
  };
}
