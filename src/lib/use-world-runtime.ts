"use client";

import { useLayoutEffect, useState } from "react";
import {
  resolveLivingPresenceBundle,
  type LivingPresenceBundle,
} from "@/data/living-presence-runtime/system";
import {
  resolveHumanRhythmBundle,
  type HumanRhythmBundle,
} from "@/data/human-rhythm-runtime/system";
import {
  resolveWorldAgingBundle,
  type WorldAgingBundle,
} from "@/data/world-aging-runtime/system";
import {
  resolveWorldInertiaBundle,
  type WorldInertiaBundle,
} from "@/data/world-inertia-runtime/system";
import {
  resolveLowSignalHumanityBundle,
  type LowSignalHumanityBundle,
} from "@/data/low-signal-humanity/system";
import {
  resolveStructuralSilenceBundle,
  type StructuralSilenceBundle,
} from "@/data/structural-silence-engine/system";
import {
  resolveWorldMaterializationBundle,
  type WorldMaterializationBundle,
} from "@/data/world-materialization/system";
import {
  resolveWorldDensityCalibrationBundle,
  type WorldDensityCalibrationBundle,
} from "@/data/world-density-calibration/system";
import {
  resolveWorldRegulationBundle,
  type WorldRegulationBundle,
} from "@/data/world-regulation-engine/system";
import {
  resolveBrowserRealityBundle,
  type BrowserRealityBundle,
} from "@/data/browser-reality-engine/system";
import {
  resolveWorldStabilityGovernanceBundle,
  type WorldStabilityBundle,
} from "@/data/world-stability-governance/system";
import {
  resolveWorldStabilityEngineBundle,
  type WorldStabilityEngineBundle,
} from "@/data/world-stability-engine/system";
import {
  resolveRuntimeRetirementBundle,
  type RuntimeRetirementBundle,
} from "@/data/runtime-retirement-system/system";
import {
  resolveLowRefreshInternetBundle,
  type LowRefreshInternetBundle,
} from "@/data/low-refresh-internet/system";
import {
  resolveInternetSedimentMaturityBundle,
  type InternetSedimentMaturityBundle,
} from "@/data/internet-sediment-maturity/system";
import {
  resolveAntiSystemSelfAwarenessBundle,
  type AntiSystemSelfAwarenessBundle,
} from "@/data/anti-system-self-awareness/system";
import {
  resolveRealInternetDefaultnessBundle,
  type RealInternetDefaultnessBundle,
} from "@/data/real-internet-defaultness/system";
import {
  resolveWorldMaturityLayerBundle,
  type WorldMaturityLayerBundle,
} from "@/data/world-maturity-layer/system";
import {
  resolveWorldQuietPermanenceLayerBundle,
  type WorldQuietPermanenceLayerBundle,
} from "@/data/world-quiet-permanence-layer/system";
import {
  resolveWorldPostProductContinuityBundle,
  type WorldPostProductContinuityBundle,
} from "@/data/world-post-product-continuity-layer/system";
import {
  resolveWorldDefaultExistenceLayerBundle,
  type WorldDefaultExistenceLayerBundle,
} from "@/data/world-default-existence-layer/system";
import {
  resolveWorldAmbientInternetLayerBundle,
  type WorldAmbientInternetLayerBundle,
} from "@/data/world-ambient-internet-layer/system";
import {
  resolveWorldGovernanceLayerBundle,
  type WorldGovernanceLayerBundle,
} from "@/data/world-governance-layer/system";
import {
  resolveWorldEcologyCalibrationLayerBundle,
  type WorldEcologyCalibrationLayerBundle,
} from "@/data/world-ecology-calibration-layer/system";
import {
  resolveWorldCivilizationStabilizationLayerBundle,
  type WorldCivilizationStabilizationLayerBundle,
} from "@/data/world-civilization-stabilization-layer/system";
import {
  resolveWorldAiNativeInfrastructureLayerBundle,
  type WorldAiNativeInfrastructureLayerBundle,
} from "@/data/world-ai-native-infrastructure-layer/system";

const ROTATE_MS = 60_000;

export type WorldRuntime = {
  presence: LivingPresenceBundle;
  rhythm: HumanRhythmBundle;
  aging: WorldAgingBundle;
  inertia: WorldInertiaBundle;
  lowSignalHumanity: LowSignalHumanityBundle;
  structuralSilence: StructuralSilenceBundle;
  materialization: WorldMaterializationBundle;
  worldDensity: WorldDensityCalibrationBundle;
  worldRegulation: WorldRegulationBundle;
  worldStability: WorldStabilityBundle;
  worldStabilityEngine: WorldStabilityEngineBundle;
  browserReality: BrowserRealityBundle;
  runtimeRetirement: RuntimeRetirementBundle;
  lowRefreshInternet: LowRefreshInternetBundle;
  internetSedimentMaturity: InternetSedimentMaturityBundle;
  antiSystemSelfAwareness: AntiSystemSelfAwarenessBundle;
  realInternetDefaultness: RealInternetDefaultnessBundle;
  /** Freeze + real object + mail + aging + stillness + world entry — single maturity surface */
  worldMaturity: WorldMaturityLayerBundle;
  /** Retirement policy + quiet URL + object permanence + guidance dissolution + mail thread aging + stillness — one field */
  worldQuietPermanence: WorldQuietPermanenceLayerBundle;
  /** Continuity + non-event web + background objects + quiet collapse + mail sediment + stillness stabilization + browser expansion + thinning pass */
  worldPostProductContinuity: WorldPostProductContinuityBundle;
  /** 默认存在 + 被动共存 + 房间溶解 + 后交互 guidance/mail + 安静均衡 + 默认网址引擎 + 重度结构变薄 */
  worldDefaultExistence: WorldDefaultExistenceLayerBundle;
  /** 环境型互联网 + … + `ambientStructuralThinning`（ambient 层） */
  worldAmbientInternet: WorldAmbientInternetLayerBundle;
  /** 长期不变形治理 + … + **`governedStructuralThinning`**（治理层；供生态校准叠化） */
  worldGovernance: WorldGovernanceLayerBundle;
  /** 生态校准 / 长期稳定 + `ecologyCalibratedStructuralThinning`（供文明稳定化叠化） */
  worldEcologyCalibration: WorldEcologyCalibrationLayerBundle;
  /** 文明稳定化 / runtime society + `civilizationStabilizedStructuralThinning`（供 AI 基础设施层叠化） */
  worldCivilizationStabilization: WorldCivilizationStabilizationLayerBundle;
  /** AI-native 文明基础设施 + `invisibleInfrastructureStructuralThinning`（UI 最终变薄） */
  worldAiNativeInfrastructure: WorldAiNativeInfrastructureLayerBundle;
};

function buildRuntime(now: Date): WorldRuntime {
  const presence = resolveLivingPresenceBundle(now);
  const rhythm = resolveHumanRhythmBundle(now);
  const aging = resolveWorldAgingBundle(now);
  const inertia = resolveWorldInertiaBundle(now);
  const lowSignalHumanity = resolveLowSignalHumanityBundle(now);
  const structuralSilence = resolveStructuralSilenceBundle(now);
  const materialization = resolveWorldMaterializationBundle(now);
  const worldDensity = resolveWorldDensityCalibrationBundle(structuralSilence, inertia, aging);
  const worldRegulation = resolveWorldRegulationBundle(
    presence,
    rhythm,
    aging,
    inertia,
    lowSignalHumanity,
    structuralSilence,
    materialization,
    worldDensity,
  );
  const worldStability = resolveWorldStabilityGovernanceBundle(structuralSilence, aging, worldRegulation);
  const worldStabilityEngine = resolveWorldStabilityEngineBundle(structuralSilence, worldRegulation, worldStability);
  const browserReality = resolveBrowserRealityBundle(
    structuralSilence,
    worldRegulation,
    aging,
    inertia,
    worldStability,
  );
  const runtimeRetirement = resolveRuntimeRetirementBundle(
    structuralSilence,
    aging,
    inertia,
    worldRegulation,
    worldStability,
    worldStabilityEngine,
    browserReality,
  );
  const lowRefreshInternet = resolveLowRefreshInternetBundle(
    structuralSilence,
    runtimeRetirement.worldFatigue.fatigueLevel,
  );
  const internetSedimentMaturity = resolveInternetSedimentMaturityBundle(structuralSilence.dayKey);
  const antiSystemSelfAwareness = resolveAntiSystemSelfAwarenessBundle(structuralSilence.dayKey);
  const realInternetDefaultness = resolveRealInternetDefaultnessBundle(structuralSilence);
  const worldMaturity = resolveWorldMaturityLayerBundle(structuralSilence, aging, worldRegulation, runtimeRetirement);
  const worldQuietPermanence = resolveWorldQuietPermanenceLayerBundle(structuralSilence, aging, runtimeRetirement);
  const worldPostProductContinuity = resolveWorldPostProductContinuityBundle(structuralSilence, aging, runtimeRetirement);
  const worldDefaultExistence = resolveWorldDefaultExistenceLayerBundle(
    structuralSilence,
    aging,
    worldRegulation,
    runtimeRetirement,
    worldPostProductContinuity.permanencePass,
  );
  const worldAmbientInternet = resolveWorldAmbientInternetLayerBundle(
    structuralSilence,
    worldDefaultExistence.structuralThinning,
    worldDefaultExistence.quietEquilibrium.equilibriumPressure,
  );
  const worldGovernance = resolveWorldGovernanceLayerBundle(
    structuralSilence,
    runtimeRetirement,
    worldAmbientInternet.ambientStructuralThinning,
  );
  const worldEcologyCalibration = resolveWorldEcologyCalibrationLayerBundle(
    structuralSilence,
    worldRegulation,
    worldPostProductContinuity.permanencePass.proseCollapseBias,
    worldGovernance.governedStructuralThinning,
  );
  const worldCivilizationStabilization = resolveWorldCivilizationStabilizationLayerBundle(
    structuralSilence,
    worldRegulation,
    worldEcologyCalibration.ecologyCalibratedStructuralThinning,
  );
  const worldAiNativeInfrastructure = resolveWorldAiNativeInfrastructureLayerBundle(
    structuralSilence,
    worldCivilizationStabilization.civilizationStabilizedStructuralThinning,
  );

  return {
    presence,
    rhythm,
    aging,
    inertia,
    lowSignalHumanity,
    structuralSilence,
    materialization,
    worldDensity,
    worldRegulation,
    worldStability,
    worldStabilityEngine,
    browserReality,
    runtimeRetirement,
    lowRefreshInternet,
    internetSedimentMaturity,
    antiSystemSelfAwareness,
    realInternetDefaultness,
    worldMaturity,
    worldQuietPermanence,
    worldPostProductContinuity,
    worldDefaultExistence,
    worldAmbientInternet,
    worldGovernance,
    worldEcologyCalibration,
    worldCivilizationStabilization,
    worldAiNativeInfrastructure,
  };
}

export function useWorldRuntime(): WorldRuntime {
  const [state, setState] = useState<WorldRuntime>(() => buildRuntime(new Date()));

  useLayoutEffect(() => {
    const tick = () => setState(buildRuntime(new Date()));
    tick();
    const id = setInterval(tick, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return state;
}
