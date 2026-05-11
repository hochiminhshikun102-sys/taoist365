import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import {
  resolveAiRuntimeOrchestrationBundle,
  type AiRuntimeOrchestrationBundle,
} from "@/data/ai-runtime-orchestration/system";
import {
  resolveAiGovernanceInfrastructureBundle,
  type AiGovernanceInfrastructureBundle,
} from "@/data/ai-governance-infrastructure/system";
import {
  resolveCivilizationContinuityInfrastructureBundle,
  type CivilizationContinuityInfrastructureBundle,
} from "@/data/civilization-continuity-infrastructure/system";
import {
  resolveAiRuntimeSocietyGovernanceBundle,
  type AiRuntimeSocietyGovernanceBundle,
} from "@/data/ai-runtime-society-governance/system";
import {
  resolveLowAwarenessInternetBundle,
  type LowAwarenessInternetBundle,
} from "@/data/low-awareness-internet/system";
import {
  resolveAiNativeCommerceBundle,
  type AiNativeCommerceBundle,
} from "@/data/ai-native-commerce/system";
import {
  resolveAiCivilizationStabilityBundle,
  type AiCivilizationStabilityBundle,
} from "@/data/ai-civilization-stability/system";
import { resolveInvisibleInfrastructureStructuralThinningPass } from "./extreme-invisible-infrastructure-thinning-pass";

/** AI-native 文明基础设施 — UI 读 `invisibleInfrastructureStructuralThinning`（最终变薄）。 */
export type WorldAiNativeInfrastructureLayerBundle = {
  aiRuntimeOrchestration: AiRuntimeOrchestrationBundle;
  aiGovernanceInfrastructure: AiGovernanceInfrastructureBundle;
  civilizationContinuityInfrastructure: CivilizationContinuityInfrastructureBundle;
  aiRuntimeSocietyGovernance: AiRuntimeSocietyGovernanceBundle;
  lowAwarenessInternet: LowAwarenessInternetBundle;
  aiNativeCommerce: AiNativeCommerceBundle;
  aiCivilizationStability: AiCivilizationStabilityBundle;
  invisibleInfrastructureStructuralThinning: StructuralThinningPass;
};

export function resolveWorldAiNativeInfrastructureLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  civilizationStabilizedStructuralThinning: StructuralThinningPass,
): WorldAiNativeInfrastructureLayerBundle {
  return {
    aiRuntimeOrchestration: resolveAiRuntimeOrchestrationBundle(),
    aiGovernanceInfrastructure: resolveAiGovernanceInfrastructureBundle(),
    civilizationContinuityInfrastructure: resolveCivilizationContinuityInfrastructureBundle(),
    aiRuntimeSocietyGovernance: resolveAiRuntimeSocietyGovernanceBundle(),
    lowAwarenessInternet: resolveLowAwarenessInternetBundle(),
    aiNativeCommerce: resolveAiNativeCommerceBundle(),
    aiCivilizationStability: resolveAiCivilizationStabilityBundle(),
    invisibleInfrastructureStructuralThinning: resolveInvisibleInfrastructureStructuralThinningPass(
      structuralSilence,
      civilizationStabilizedStructuralThinning,
    ),
  };
}
