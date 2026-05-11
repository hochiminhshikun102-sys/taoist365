import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import type { PermanenceThinningPass } from "@/data/world-post-product-continuity-layer/permanence-thinning-pass";
import { resolveGuidancePostInteractionBundle, type GuidancePostInteractionBundle } from "@/data/guidance-post-interaction/system";
import { resolveInternetDefaultnessEngineBundle, type InternetDefaultnessEngineBundle } from "@/data/internet-defaultness-engine/system";
import { resolveMailPermanentThreadBundle, type MailPermanentThreadBundle } from "@/data/mail-permanent-thread/system";
import { resolveObjectRoomDissolutionBundle, type ObjectRoomDissolutionBundle } from "@/data/object-room-dissolution/system";
import {
  resolvePassiveInternetCoexistenceBundle,
  type PassiveInternetCoexistenceBundle,
} from "@/data/passive-internet-coexistence/system";
import { resolveWorldDefaultExistenceBundle, type WorldDefaultExistenceBundle } from "@/data/world-default-existence/system";
import { resolveWorldQuietEquilibriumBundle, type WorldQuietEquilibriumBundle } from "@/data/world-quiet-equilibrium/system";
import { resolveStructuralThinningPass, type StructuralThinningPass } from "./structural-thinning-pass";

/** 默认存在 / 后交互互联网 — 单一 `useWorldRuntime` 字段，含重度结构变薄 */
export type WorldDefaultExistenceLayerBundle = {
  defaultExistence: WorldDefaultExistenceBundle;
  passiveCoexistence: PassiveInternetCoexistenceBundle;
  objectRoomDissolution: ObjectRoomDissolutionBundle;
  guidancePostInteraction: GuidancePostInteractionBundle;
  mailPermanentThread: MailPermanentThreadBundle;
  quietEquilibrium: WorldQuietEquilibriumBundle;
  internetDefaultnessEngine: InternetDefaultnessEngineBundle;
  structuralThinning: StructuralThinningPass;
};

export function resolveWorldDefaultExistenceLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  worldRegulation: WorldRegulationBundle,
  runtimeRetirement: RuntimeRetirementBundle,
  permanencePass: PermanenceThinningPass,
): WorldDefaultExistenceLayerBundle {
  void structuralSilence;
  const quietEquilibrium = resolveWorldQuietEquilibriumBundle(aging, runtimeRetirement);
  const objectRoomDissolution = resolveObjectRoomDissolutionBundle(aging);
  const structuralThinning = resolveStructuralThinningPass(
    aging,
    worldRegulation,
    runtimeRetirement,
    permanencePass,
    quietEquilibrium.equilibriumPressure,
    objectRoomDissolution.roomDissolutionBias,
  );
  return {
    defaultExistence: resolveWorldDefaultExistenceBundle(),
    passiveCoexistence: resolvePassiveInternetCoexistenceBundle(),
    objectRoomDissolution,
    guidancePostInteraction: resolveGuidancePostInteractionBundle(),
    mailPermanentThread: resolveMailPermanentThreadBundle(),
    quietEquilibrium,
    internetDefaultnessEngine: resolveInternetDefaultnessEngineBundle(aging),
    structuralThinning,
  };
}
