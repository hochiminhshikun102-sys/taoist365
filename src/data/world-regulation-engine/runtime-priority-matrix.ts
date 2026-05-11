import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

/** 数字越大越优先“占用”当天叙述带宽（仅用于调度，不展示）。 */
export type RuntimePriorityMatrix = {
  presence: number;
  rhythm: number;
  aging: number;
  inertia: number;
  lowSignalHumanity: number;
  structuralSilence: number;
  materialization: number;
  worldDensity: number;
};

export function resolveRuntimePriorityMatrix(age: WorldAgeStateId, dayKey: string): RuntimePriorityMatrix {
  const j = dailyIndex(`${dayKey}:prio:${age}`, 11);
  return {
    presence: 8 + (j % 3),
    rhythm: 6 + ((j + 2) % 4),
    aging: 5 + ((j + 1) % 3),
    inertia: 7 + ((j + 3) % 3),
    lowSignalHumanity: 4 + ((j + 4) % 4),
    structuralSilence: 9,
    materialization: 5 + ((j + 5) % 3),
    worldDensity: 8 + ((j + 6) % 2),
  };
}
