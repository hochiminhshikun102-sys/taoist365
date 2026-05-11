import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { resolveRealInternetAgingBundle, type RealInternetAgingBundle } from "@/data/real-internet-aging/system";
import { resolveRealObjectPresenceBundle, type RealObjectPresenceBundle } from "@/data/real-object-presence/system";
import { resolveRealWorldEntryBundle, type RealWorldEntryBundle } from "@/data/real-world-entry/system";
import { resolveTrueMailContinuityBundle, type TrueMailContinuityBundle } from "@/data/true-mail-continuity/system";
import { resolveWorldFreezeBundle, type WorldFreezeBundle } from "@/data/world-freeze-system/system";
import {
  resolveWorldStillnessGovernorBundle,
  type WorldStillnessGovernorBundle,
} from "@/data/world-stillness-governor/system";

/**
 * Single maturity surface: freeze, real objects, mail continuity, internet aging,
 * stillness governor, real-world entry — **one** `useWorldRuntime` field (no new runtime family explosion).
 */
export type WorldMaturityLayerBundle = {
  freeze: WorldFreezeBundle;
  realObjectPresence: RealObjectPresenceBundle;
  trueMail: TrueMailContinuityBundle;
  realInternetAging: RealInternetAgingBundle;
  stillnessGovernor: WorldStillnessGovernorBundle;
  realWorldEntry: RealWorldEntryBundle;
};

export function resolveWorldMaturityLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  worldRegulation: WorldRegulationBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): WorldMaturityLayerBundle {
  const freeze = resolveWorldFreezeBundle(structuralSilence, worldRegulation, runtimeRetirement);
  const realObjectPresence = resolveRealObjectPresenceBundle(structuralSilence.dayKey, aging);
  const trueMail = resolveTrueMailContinuityBundle(structuralSilence);
  const realInternetAging = resolveRealInternetAgingBundle(structuralSilence);
  const stillnessGovernor = resolveWorldStillnessGovernorBundle(
    structuralSilence,
    aging,
    worldRegulation,
    runtimeRetirement,
  );
  const realWorldEntry = resolveRealWorldEntryBundle(structuralSilence);
  return {
    freeze,
    realObjectPresence,
    trueMail,
    realInternetAging,
    stillnessGovernor,
    realWorldEntry,
  };
}
