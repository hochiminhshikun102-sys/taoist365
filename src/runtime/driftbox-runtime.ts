import { getLivingDayKey } from "@/lib/living-day-key";
import { resolveDriftboxContinuity, type DriftboxContinuityRuntime } from "@/runtime/driftbox-continuity";
import { resolveDriftboxLowEventRuntime, type DriftboxLowEventRuntime } from "@/runtime/driftbox-low-event-runtime";
import { resolveDriftboxObjectState, type DriftboxObjectRuntimeState } from "@/runtime/driftbox-object-state";
import { resolveDriftboxSparseRuntime, type DriftboxSparseRuntime } from "@/runtime/driftbox-sparse-runtime";
import { resolveDriftboxSedimentRuntime, type DriftboxSedimentRuntime } from "@/runtime/driftbox-sediment-runtime";
import { resolveObjectContinuityRuntime, type ObjectContinuityRuntime } from "@/runtime/object-continuity-runtime";
import { resolveQuietWaitingRuntime, type QuietWaitingRuntime } from "@/runtime/quiet-waiting-runtime";

export type DriftboxRuntime = {
  layer: "windkeep-continuity";
  identityLine: string;
  boundaryLine: string;
  objectState: DriftboxObjectRuntimeState;
  objectContinuity: ObjectContinuityRuntime;
  sediment: DriftboxSedimentRuntime;
  quietWaiting: QuietWaitingRuntime;
  sparse: DriftboxSparseRuntime;
  lowEvent: DriftboxLowEventRuntime;
  continuity: DriftboxContinuityRuntime;
  longTermObjectLine: string;
  everydayPassageLine: string;
  invisibleMaterialLine: string;
};

export function resolveDriftboxRuntimeForDayKey(dayKey: string): DriftboxRuntime {
  const objectState = resolveDriftboxObjectState(dayKey);
  const objectContinuity = resolveObjectContinuityRuntime(dayKey);
  const sediment = resolveDriftboxSedimentRuntime(dayKey, objectContinuity);
  const quietWaiting = resolveQuietWaitingRuntime(dayKey);
  const sparse = resolveDriftboxSparseRuntime(dayKey);
  const lowEvent = resolveDriftboxLowEventRuntime(dayKey);

  return {
    layer: "windkeep-continuity",
    identityLine: "Driftbox is a time-object drift layer inside Windkeep.",
    boundaryLine: "Quiet continuation stays slow, sparse, and mail-adjacent.",
    objectState,
    objectContinuity,
    sediment,
    quietWaiting,
    sparse,
    lowEvent,
    continuity: resolveDriftboxContinuity(dayKey, objectState, sediment),
    longTermObjectLine: `${objectContinuity.realLifeTraceLine} ${objectContinuity.practicalContinuityLine}`,
    everydayPassageLine: `${objectContinuity.everydayPassageLine} ${objectContinuity.usefulMaterialLine}`,
    invisibleMaterialLine: `${objectContinuity.quietMaterialCultureLine} ${objectContinuity.unnoticedContinuityLine}`,
  };
}

export function resolveDriftboxRuntime(now: Date = new Date()): DriftboxRuntime {
  return resolveDriftboxRuntimeForDayKey(getLivingDayKey(now));
}

export const driftboxRuntime = resolveDriftboxRuntime();
