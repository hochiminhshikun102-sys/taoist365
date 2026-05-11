import { dailyIndex } from "@/lib/living-day-key";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";

/** Higher = harder for foreground prose / objects to claim space */
export function resolveForegroundFriction(dayKey: string, worldRegulation: WorldRegulationBundle): number {
  const h = dailyIndex(`${dayKey}:fg-fric`, 100);
  const cross = worldRegulation.crossRuntimeSuppression;
  let f = 0.22 + h / 320;
  if (cross.thinDailyProse) f += 0.08;
  if (cross.reduceHumanTraces) f += 0.06;
  if (cross.tightenGuidanceCollapse) f += 0.07;
  if (worldRegulation.narrativeOverflow.overflowAuditLine) f += 0.1;
  return Math.min(0.94, f);
}
