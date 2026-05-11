import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { resolveRuntimeSocietyEngineBundle, type RuntimeSocietyEngineBundle } from "@/data/runtime-society-engine/system";
import {
  resolveCivilizationStabilityEngineBundle,
  type CivilizationStabilityEngineBundle,
} from "@/data/civilization-stability-engine/system";
import {
  resolveSilenceCivilizationSystemBundle,
  type SilenceCivilizationSystemBundle,
} from "@/data/silence-civilization-system/system";
import {
  resolveGuidanceWeatherFinalizationBundle,
  type GuidanceWeatherFinalizationBundle,
} from "@/data/guidance-weather-finalization/system";
import {
  resolveObjectCivilizationGovernanceBundle,
  type ObjectCivilizationGovernanceBundle,
} from "@/data/object-civilization-governance/system";
import {
  resolveMailBackgroundCivilizationBundle,
  type MailBackgroundCivilizationBundle,
} from "@/data/mail-background-civilization/system";
import {
  resolveInternetEnvironmentCivilizationBundle,
  type InternetEnvironmentCivilizationBundle,
} from "@/data/internet-environment-civilization/system";
import { resolveCivilizationStabilizedStructuralThinningPass } from "./extreme-civilization-stabilization-thinning-pass";

/** Runtime society / 文明稳定化 — `civilizationStabilizedStructuralThinning` 供 `world-ai-native-infrastructure-layer` 叠化；UI 最终读 `invisibleInfrastructureStructuralThinning`。 */
export type WorldCivilizationStabilizationLayerBundle = {
  runtimeSociety: RuntimeSocietyEngineBundle;
  civilizationStability: CivilizationStabilityEngineBundle;
  silenceCivilization: SilenceCivilizationSystemBundle;
  guidanceWeatherFinalization: GuidanceWeatherFinalizationBundle;
  objectCivilizationGovernance: ObjectCivilizationGovernanceBundle;
  mailBackgroundCivilization: MailBackgroundCivilizationBundle;
  internetEnvironmentCivilization: InternetEnvironmentCivilizationBundle;
  civilizationStabilizedStructuralThinning: StructuralThinningPass;
};

export function resolveWorldCivilizationStabilizationLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  ecologyCalibratedStructuralThinning: StructuralThinningPass,
): WorldCivilizationStabilizationLayerBundle {
  return {
    runtimeSociety: resolveRuntimeSocietyEngineBundle(),
    civilizationStability: resolveCivilizationStabilityEngineBundle(),
    silenceCivilization: resolveSilenceCivilizationSystemBundle(),
    guidanceWeatherFinalization: resolveGuidanceWeatherFinalizationBundle(),
    objectCivilizationGovernance: resolveObjectCivilizationGovernanceBundle(),
    mailBackgroundCivilization: resolveMailBackgroundCivilizationBundle(),
    internetEnvironmentCivilization: resolveInternetEnvironmentCivilizationBundle(),
    civilizationStabilizedStructuralThinning: resolveCivilizationStabilizedStructuralThinningPass(
      structuralSilence,
      worldRegulation,
      ecologyCalibratedStructuralThinning,
    ),
  };
}
