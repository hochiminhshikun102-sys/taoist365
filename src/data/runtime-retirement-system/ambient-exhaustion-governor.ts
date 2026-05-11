import type { FatigueLevel } from "./world-fatigue-runtime";

export type AmbientExhaustionGovernor = {
  exhaustionGovernorLine: string;
};

export function resolveAmbientExhaustionGovernor(fatigueLevel: FatigueLevel): AmbientExhaustionGovernor {
  const heavy = fatigueLevel === "tired" || fatigueLevel === "resting" || fatigueLevel === "almostAbsent";
  return {
    exhaustionGovernorLine: heavy ? "氛围层收束：少一层也没关系。" : "氛围层保持薄配置。",
  };
}
