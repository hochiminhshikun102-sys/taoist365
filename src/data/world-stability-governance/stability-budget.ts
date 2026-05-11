import { dailyIndex } from "@/lib/living-day-key";
import type { WorldRegulationBundle } from "@/data/world-regulation-engine/system";

export function resolveStabilityBudget(dayKey: string, worldRegulation: WorldRegulationBundle): number {
  const h = dailyIndex(`${dayKey}:stab-bud`, 100);
  const f = worldRegulation.fatigue;
  const load = (f.materializationLoad + f.inertiaLoad + f.lowSignalLoad) / 3;
  return Math.min(0.95, 0.35 + h / 300 + load * 0.25);
}
