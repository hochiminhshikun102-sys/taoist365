import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap, type WorldAgeStateId } from "@/data/world-aging-runtime/world-age-state";
import { ambientRepetitionAgingLine } from "./ambient-repetition-aging";
import { changeResistanceLine } from "./change-resistance";
import { longLivedPresenceLine } from "./long-lived-presence";
import { passiveStructureLine } from "./passive-structure";
import { quietForegroundingLine } from "./quiet-foregrounding";
import { stableLayoutMemoryLine } from "./stable-layout-memory";
import { stillnessDeepeningLine } from "./stillness-deepening";
import { worldEnergyFalloffLine } from "./world-energy-falloff";

export type WorldStillnessReinforcementBundle = {
  dayKey: string;
  /** 0–1 aggregate stillness reinforcement for UI */
  reinforcementScalar: number;
  stillnessDeepeningLine: string;
  changeResistanceLine: string;
  quietForegroundingLine: string;
  passiveStructureLine: string;
  ambientRepetitionAgingLine: string;
  stableLayoutMemoryLine: string;
  worldEnergyFalloffLine: string;
  longLivedPresenceLine: string;
};

export function resolveWorldStillnessReinforcementBundle(aging: WorldAgingBundle): WorldStillnessReinforcementBundle {
  const w: WorldAgeStateId = aging.ageStateId;
  const m = worldAgeStateMap[w];
  const reinforcementScalar = Math.min(
    0.94,
    m.stillnessWeight * 0.42 + m.silenceWeight * 0.28 + m.explanationFatigue * 0.32,
  );
  return {
    dayKey: aging.dayKey,
    reinforcementScalar,
    stillnessDeepeningLine: stillnessDeepeningLine(w),
    changeResistanceLine: changeResistanceLine(),
    quietForegroundingLine: quietForegroundingLine(),
    passiveStructureLine: passiveStructureLine(),
    ambientRepetitionAgingLine: ambientRepetitionAgingLine(),
    stableLayoutMemoryLine: stableLayoutMemoryLine(),
    worldEnergyFalloffLine: worldEnergyFalloffLine(w),
    longLivedPresenceLine: longLivedPresenceLine(),
  };
}
