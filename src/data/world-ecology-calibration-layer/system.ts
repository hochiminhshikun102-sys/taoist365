import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";
import type { StructuralThinningPass } from "@/data/world-default-existence-layer/structural-thinning-pass";
import { resolveWorldEcologyCalibrationBundle, type WorldEcologyCalibrationBundle } from "@/data/world-ecology-calibration/system";
import {
  resolveLongLivedInternetStabilityBundle,
  type LongLivedInternetStabilityBundle,
} from "@/data/long-lived-internet-stability/system";
import { resolveSilencePrioritySystemBundle, type SilencePrioritySystemBundle } from "@/data/silence-priority-system/system";
import {
  resolveGuidanceEcologyGovernanceBundle,
  type GuidanceEcologyGovernanceBundle,
} from "@/data/guidance-ecology-governance/system";
import { resolveObjectEcologyGovernanceBundle, type ObjectEcologyGovernanceBundle } from "@/data/object-ecology-governance/system";
import {
  resolveMailLowThreadGovernanceBundle,
  type MailLowThreadGovernanceBundle,
} from "@/data/mail-low-thread-governance/system";
import {
  resolveInternetDefaultnessStabilityBundle,
  type InternetDefaultnessStabilityBundle,
} from "@/data/internet-defaultness-stability/system";
import { resolveEcologyCalibratedStructuralThinningPass } from "./extreme-ecology-calibration-thinning-pass";

/** 生态校准 / 长期稳定 — `ecologyCalibratedStructuralThinning` → 文明层 → **`worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning`**（UI 最终）。 */
export type WorldEcologyCalibrationLayerBundle = {
  worldEcologyCalibration: WorldEcologyCalibrationBundle;
  longLivedInternetStability: LongLivedInternetStabilityBundle;
  silencePriority: SilencePrioritySystemBundle;
  guidanceEcologyGovernance: GuidanceEcologyGovernanceBundle;
  objectEcologyGovernance: ObjectEcologyGovernanceBundle;
  mailLowThreadGovernance: MailLowThreadGovernanceBundle;
  internetDefaultnessStability: InternetDefaultnessStabilityBundle;
  ecologyCalibratedStructuralThinning: StructuralThinningPass;
};

export function resolveWorldEcologyCalibrationLayerBundle(
  structuralSilence: StructuralSilenceBundle,
  worldRegulation: WorldRegulationBundle,
  permanenceProseCollapseBias: number,
  governedStructuralThinning: StructuralThinningPass,
): WorldEcologyCalibrationLayerBundle {
  return {
    worldEcologyCalibration: resolveWorldEcologyCalibrationBundle(),
    longLivedInternetStability: resolveLongLivedInternetStabilityBundle(),
    silencePriority: resolveSilencePrioritySystemBundle(),
    guidanceEcologyGovernance: resolveGuidanceEcologyGovernanceBundle(),
    objectEcologyGovernance: resolveObjectEcologyGovernanceBundle(),
    mailLowThreadGovernance: resolveMailLowThreadGovernanceBundle(),
    internetDefaultnessStability: resolveInternetDefaultnessStabilityBundle(),
    ecologyCalibratedStructuralThinning: resolveEcologyCalibratedStructuralThinningPass(
      structuralSilence,
      worldRegulation,
      permanenceProseCollapseBias,
      governedStructuralThinning,
    ),
  };
}
