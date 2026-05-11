import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { silenceDensityByAge } from "./silence-density";

const oneLineNoticing = [
  "The room is still here; that can be enough tonight.",
  "One quiet sentence may be the whole visit.",
  "No need to complete this thread.",
  "The page can remain open without further action.",
];

export function guidanceMinimalBehavior(age: WorldAgeStateId, dayKey: string): {
  maxLines: 1 | 2 | 3;
  showRoutes: boolean;
  minimalNoticing: string;
} {
  const density = silenceDensityByAge[age];
  const routeGate = dailyIndex(dayKey + ":route:" + age, 100) / 100;
  return {
    maxLines: density.guidanceRoundsCap,
    showRoutes: routeGate <= density.routeChance,
    minimalNoticing: oneLineNoticing[dailyIndex(dayKey + ":one:" + age, oneLineNoticing.length)]!,
  };
}
