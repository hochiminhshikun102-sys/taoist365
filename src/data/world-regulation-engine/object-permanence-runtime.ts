import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";
import { objectSilenceWindow } from "@/data/world-density-calibration/system";
import type { CrossRuntimeSuppression } from "./cross-runtime-suppression";
import { foregroundPressure } from "./foreground-pressure-runtime";
import type { RuntimeFatigueBalance } from "./runtime-fatigue-balancer";

export type ObjectPermanenceRuntime = {
  objectForegroundCap: number;
  regulatedForegroundIds: readonly string[];
  objectPermanenceLine: string;
  objectNoLongerAnnouncedLine: string;
  objectInfrastructureLine: string;
};

function capFor(f: RuntimeFatigueBalance, cross: CrossRuntimeSuppression, dayKey: string): number {
  let cap = 4;
  if (cross.reduceObjectForegroundCap) cap -= 1;
  const fp = foregroundPressure(f, dayKey);
  if (fp > 0.55) cap -= 1;
  if (fp > 0.75) cap -= 1;
  return Math.max(2, Math.min(4, cap));
}

export function resolveObjectPermanenceRuntime(
  structural: StructuralSilenceBundle,
  aging: { ageStateId: WorldAgeStateId },
  dayKey: string,
  f: RuntimeFatigueBalance,
  cross: CrossRuntimeSuppression,
): ObjectPermanenceRuntime {
  const objectForegroundCap = capFor(f, cross, dayKey);
  const fg = structural.objectFade.foregroundObjects;
  const order = taoist365ObjectsCatalog.map((p) => p.id);
  const eligible = order.filter(
    (id) => fg.includes(id) && objectSilenceWindow(id, aging.ageStateId, dayKey).allowForegroundToday,
  );
  const regulatedForegroundIds = eligible.slice(0, objectForegroundCap);

  return {
    objectForegroundCap,
    regulatedForegroundIds,
    objectPermanenceLine: "Objects settle as infrastructure—foreground is scarce on purpose.",
    objectNoLongerAnnouncedLine: "Pieces stop re-introducing themselves; the shelf already knows them.",
    objectInfrastructureLine: "Catalog stays honest, but not every piece asks for the lamp every day.",
  };
}
