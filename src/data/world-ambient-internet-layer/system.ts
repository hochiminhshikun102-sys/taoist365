import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { resolveAmbientInternetEnvironmentBundle, type AmbientInternetEnvironmentBundle } from "@/data/ambient-internet-environment/system";
import { resolveInterfaceDissolutionEngineBundle, type InterfaceDissolutionEngineBundle } from "@/data/interface-dissolution-engine/system";
import { resolveObjectEnvironmentAbsorptionBundle, type ObjectEnvironmentAbsorptionBundle } from "@/data/object-environment-absorption/system";
import { resolveGuidanceRoomWeatherBundle, type GuidanceRoomWeatherBundle } from "@/data/guidance-room-weather/system";
import { resolveMailBackgroundContinuityBundle, type MailBackgroundContinuityBundle } from "@/data/mail-background-continuity/system";
import {
  resolveWorldEnvironmentalEquilibriumBundle,
  type WorldEnvironmentalEquilibriumBundle,
} from "@/data/world-environmental-equilibrium/system";
import {
  resolveLongLivedInternetDefaultnessBundle,
  type LongLivedInternetDefaultnessBundle,
} from "@/data/long-lived-internet-defaultness/system";
import { resolveAmbientStructuralThinningPass } from "./extreme-structural-thinning-pass";

/** Post-interface / ambient internet — ambient → governance → ecology → civilization → **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`**（UI 最终）. */
export type WorldAmbientInternetLayerBundle = {
  ambientInternetEnvironment: AmbientInternetEnvironmentBundle;
  interfaceDissolution: InterfaceDissolutionEngineBundle;
  objectEnvironmentAbsorption: ObjectEnvironmentAbsorptionBundle;
  guidanceRoomWeather: GuidanceRoomWeatherBundle;
  mailBackgroundContinuity: MailBackgroundContinuityBundle;
  worldEnvironmentalEquilibrium: WorldEnvironmentalEquilibriumBundle;
  longLivedInternetDefaultness: LongLivedInternetDefaultnessBundle;
  /** Effective thinning for components — stacks extreme pass on `worldDefaultExistence.structuralThinning`. */
  ambientStructuralThinning: StructuralThinningPass;
};

export function resolveWorldAmbientInternetLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  baseStructuralThinning: StructuralThinningPass,
  equilibriumPressure: number,
): WorldAmbientInternetLayerBundle {
  return {
    ambientInternetEnvironment: resolveAmbientInternetEnvironmentBundle(),
    interfaceDissolution: resolveInterfaceDissolutionEngineBundle(),
    objectEnvironmentAbsorption: resolveObjectEnvironmentAbsorptionBundle(),
    guidanceRoomWeather: resolveGuidanceRoomWeatherBundle(),
    mailBackgroundContinuity: resolveMailBackgroundContinuityBundle(),
    worldEnvironmentalEquilibrium: resolveWorldEnvironmentalEquilibriumBundle(),
    longLivedInternetDefaultness: resolveLongLivedInternetDefaultnessBundle(),
    ambientStructuralThinning: resolveAmbientStructuralThinningPass(
      structuralSilence,
      baseStructuralThinning,
      equilibriumPressure,
    ),
  };
}
