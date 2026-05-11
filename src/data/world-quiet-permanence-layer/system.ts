import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import {
  resolveGuidanceDissolutionBundle,
  type GuidanceDissolutionBundle,
} from "@/data/guidance-dissolution/system";
import { resolveMailThreadAgingBundle, type MailThreadAgingBundle } from "@/data/mail-thread-aging/system";
import { resolveObjectPermanenceEngineBundle, type ObjectPermanenceEngineBundle } from "@/data/object-permanence-engine/system";
import {
  resolveQuietInternetPermanenceBundle,
  type QuietInternetPermanenceBundle,
} from "@/data/quiet-internet-permanence/system";
import {
  resolveRuntimeRetirementEngineBundle,
  type RuntimeRetirementEngineBundle,
} from "@/data/runtime-retirement-engine/system";
import {
  resolveWorldStillnessReinforcementBundle,
  type WorldStillnessReinforcementBundle,
} from "@/data/world-stillness-reinforcement/system";

/**
 * One composed surface for “mature URL” retirement + quiet permanence.
 * Does **not** replace `runtime-retirement-system`; it names policy and adds dissolution/permanence copy.
 */
export type WorldQuietPermanenceLayerBundle = {
  retirementEngine: RuntimeRetirementEngineBundle;
  quietInternet: QuietInternetPermanenceBundle;
  objectPermanence: ObjectPermanenceEngineBundle;
  guidanceDissolution: GuidanceDissolutionBundle;
  mailThreadAging: MailThreadAgingBundle;
  stillnessReinforcement: WorldStillnessReinforcementBundle;
};

export function resolveWorldQuietPermanenceLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): WorldQuietPermanenceLayerBundle {
  return {
    retirementEngine: resolveRuntimeRetirementEngineBundle(runtimeRetirement),
    quietInternet: resolveQuietInternetPermanenceBundle(),
    objectPermanence: resolveObjectPermanenceEngineBundle(aging),
    guidanceDissolution: resolveGuidanceDissolutionBundle(structuralSilence, aging, runtimeRetirement),
    mailThreadAging: resolveMailThreadAgingBundle(),
    stillnessReinforcement: resolveWorldStillnessReinforcementBundle(aging),
  };
}
