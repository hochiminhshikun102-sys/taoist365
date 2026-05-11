import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { resolveWorldGovernanceEngineBundle, type WorldGovernanceEngineBundle } from "@/data/world-governance-engine/system";
import { resolveRuntimeEcologyEngineBundle, type RuntimeEcologyEngineBundle } from "@/data/runtime-ecology-engine/system";
import {
  resolveSilenceGovernanceSystemBundle,
  type SilenceGovernanceSystemBundle,
} from "@/data/silence-governance-system/system";
import {
  resolvePostInteractionGovernanceBundle,
  type PostInteractionGovernanceBundle,
} from "@/data/post-interaction-governance/system";
import { resolveObjectGovernanceEngineBundle, type ObjectGovernanceEngineBundle } from "@/data/object-governance-engine/system";
import {
  resolveInternetDefaultnessGovernanceBundle,
  type InternetDefaultnessGovernanceBundle,
} from "@/data/internet-defaultness-governance/system";
import { resolveWorldSelfRestraintBundle, type WorldSelfRestraintBundle } from "@/data/world-self-restraint/system";
import { resolveGovernanceStructuralThinningPass } from "./extreme-governance-thinning-pass";

/** 长期不变形 / 世界治理 — `governedStructuralThinning` 叠在 ambient 之上；UI 最终经 ecology → civilization → **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`**。 */
export type WorldGovernanceLayerBundle = {
  worldGovernanceEngine: WorldGovernanceEngineBundle;
  runtimeEcology: RuntimeEcologyEngineBundle;
  silenceGovernance: SilenceGovernanceSystemBundle;
  postInteractionGovernance: PostInteractionGovernanceBundle;
  objectGovernance: ObjectGovernanceEngineBundle;
  internetDefaultnessGovernance: InternetDefaultnessGovernanceBundle;
  worldSelfRestraint: WorldSelfRestraintBundle;
  governedStructuralThinning: StructuralThinningPass;
};

export function resolveWorldGovernanceLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  runtimeRetirement: RuntimeRetirementBundle,
  ambientStructuralThinning: StructuralThinningPass,
): WorldGovernanceLayerBundle {
  return {
    worldGovernanceEngine: resolveWorldGovernanceEngineBundle(),
    runtimeEcology: resolveRuntimeEcologyEngineBundle(),
    silenceGovernance: resolveSilenceGovernanceSystemBundle(),
    postInteractionGovernance: resolvePostInteractionGovernanceBundle(),
    objectGovernance: resolveObjectGovernanceEngineBundle(),
    internetDefaultnessGovernance: resolveInternetDefaultnessGovernanceBundle(),
    worldSelfRestraint: resolveWorldSelfRestraintBundle(),
    governedStructuralThinning: resolveGovernanceStructuralThinningPass(
      structuralSilence,
      runtimeRetirement.worldFatigue.fatigueLevel,
      ambientStructuralThinning,
    ),
  };
}
