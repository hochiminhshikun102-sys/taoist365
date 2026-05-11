import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldInertiaBundle } from "@/data/world-inertia-runtime/system";
import type { LowSignalHumanityBundle } from "@/data/low-signal-humanity/system";
import type { LivingPresenceBundle } from "@/data/living-presence-runtime/system";
import type { HumanRhythmBundle } from "@/data/human-rhythm-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldMaterializationBundle } from "@/data/world-materialization/system";
import type { WorldDensityCalibrationBundle } from "@/data/world-density-calibration/system";
import type { AmbientRestWindows } from "./ambient-rest-windows";
import type { AttentionWithdrawal } from "./attention-withdrawal-runtime";
import type { CrossRuntimeSuppression } from "./cross-runtime-suppression";
import type { NarrativeOverflow } from "./narrative-overflow-runtime";
import type { ObjectPermanenceRuntime } from "./object-permanence-runtime";
import type { PageUnderstatement } from "./page-understatement-runtime";
import type { ResidualBalance } from "./residual-balance-runtime";
import type { RuntimeFatigueBalance } from "./runtime-fatigue-balancer";
import type { RuntimePriorityMatrix } from "./runtime-priority-matrix";
import type { SoftCollapse } from "./soft-collapse-runtime";
import type { WorldBreathing } from "./world-breathing-runtime";
import { antiPerformanceReminder } from "./anti-performance-runtime";
import { resolveAmbientRestWindows } from "./ambient-rest-windows";
import { resolveAttentionWithdrawal } from "./attention-withdrawal-runtime";
import { resolveCrossRuntimeSuppression } from "./cross-runtime-suppression";
import { foregroundPressure } from "./foreground-pressure-runtime";
import { resolveNarrativeOverflow } from "./narrative-overflow-runtime";
import { resolveObjectPermanenceRuntime } from "./object-permanence-runtime";
import { resolvePageUnderstatement } from "./page-understatement-runtime";
import { resolveResidualBalance } from "./residual-balance-runtime";
import { resolveRuntimeFatigueBalance } from "./runtime-fatigue-balancer";
import { resolveRuntimePriorityMatrix } from "./runtime-priority-matrix";
import { resolveSoftCollapse } from "./soft-collapse-runtime";
import { worldRestraintLine } from "./world-restraint-runtime";
import { resolveWorldBreathing } from "./world-breathing-runtime";

export type { RuntimePriorityMatrix } from "./runtime-priority-matrix";
export type { RuntimeFatigueBalance } from "./runtime-fatigue-balancer";
export type { CrossRuntimeSuppression } from "./cross-runtime-suppression";
export type { WorldBreathing, BreathingMode } from "./world-breathing-runtime";
export type { AmbientRestWindows, RestWindowDays } from "./ambient-rest-windows";
export type { PageUnderstatement } from "./page-understatement-runtime";
export type { NarrativeOverflow } from "./narrative-overflow-runtime";
export type { ResidualBalance } from "./residual-balance-runtime";
export type { AttentionWithdrawal } from "./attention-withdrawal-runtime";
export type { ObjectPermanenceRuntime } from "./object-permanence-runtime";
export type { SoftCollapse } from "./soft-collapse-runtime";

export type WorldRegulationBundle = {
  dayKey: string;
  ageStateId: WorldAgingBundle["ageStateId"];
  priority: RuntimePriorityMatrix;
  fatigue: RuntimeFatigueBalance;
  crossRuntimeSuppression: CrossRuntimeSuppression;
  breathing: WorldBreathing;
  restWindows: AmbientRestWindows;
  softCollapse: SoftCollapse;
  understatement: PageUnderstatement;
  foregroundPressure: number;
  narrativeOverflow: NarrativeOverflow;
  residualBalance: ResidualBalance;
  attentionWithdrawal: AttentionWithdrawal;
  worldRestraintLine: string;
  antiPerformanceReminder: string;
  objectPermanence: ObjectPermanenceRuntime;
};

export function resolveWorldRegulationBundle(
  presence: LivingPresenceBundle,
  rhythm: HumanRhythmBundle,
  aging: WorldAgingBundle,
  inertia: WorldInertiaBundle,
  lowSignalHumanity: LowSignalHumanityBundle,
  structuralSilence: StructuralSilenceBundle,
  materialization: WorldMaterializationBundle,
  worldDensity: WorldDensityCalibrationBundle,
): WorldRegulationBundle {
  const dayKey = structuralSilence.dayKey;
  const ageStateId = aging.ageStateId;
  void presence;
  void rhythm;
  void worldDensity;

  const priority = resolveRuntimePriorityMatrix(ageStateId, dayKey);
  const fatigue = resolveRuntimeFatigueBalance(aging, inertia, lowSignalHumanity, materialization, dayKey);
  const crossRuntimeSuppression = resolveCrossRuntimeSuppression(fatigue);
  const breathing = resolveWorldBreathing(ageStateId, dayKey, structuralSilence);
  const restWindows = resolveAmbientRestWindows(ageStateId, dayKey);
  const softCollapse = resolveSoftCollapse(dayKey, structuralSilence);
  const understatement = resolvePageUnderstatement(ageStateId, dayKey, crossRuntimeSuppression);
  const fgPress = foregroundPressure(fatigue, dayKey);
  const narrativeOverflow = resolveNarrativeOverflow(fatigue, dayKey);
  const residualBalance = resolveResidualBalance(fatigue, dayKey);
  const attentionWithdrawal = resolveAttentionWithdrawal(ageStateId, dayKey);
  const objectPermanence = resolveObjectPermanenceRuntime(structuralSilence, aging, dayKey, fatigue, crossRuntimeSuppression);

  return {
    dayKey,
    ageStateId,
    priority,
    fatigue,
    crossRuntimeSuppression,
    breathing,
    restWindows,
    softCollapse,
    understatement,
    foregroundPressure: fgPress,
    narrativeOverflow,
    residualBalance,
    attentionWithdrawal,
    worldRestraintLine: worldRestraintLine(ageStateId, dayKey),
    antiPerformanceReminder: antiPerformanceReminder(dayKey),
    objectPermanence,
  };
}
