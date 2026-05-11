import type { FatigueLevel } from "@/data/runtime-retirement-system/world-fatigue-runtime";
import { dailyIndex } from "@/lib/living-day-key";

/** Policy ladder: how loud explanatory runtimes are allowed to be. */
export type RuntimeRetirementEngineStage = "vocal" | "softening" | "backgrounded" | "rareReturn" | "permanenceQuiet";

export function resolveRuntimeRetirementEngineStage(
  dayKey: string,
  pressure: number,
  fatigue: FatigueLevel,
): RuntimeRetirementEngineStage {
  const h = dailyIndex(`${dayKey}:rre-stage`, 100);
  if (fatigue === "almostAbsent" || pressure > 0.86) return "permanenceQuiet";
  if (fatigue === "resting" || pressure > 0.72) return "rareReturn";
  if (fatigue === "tired" || pressure > 0.55) return "backgrounded";
  if (fatigue === "thinning" || pressure > 0.38 || h > 78) return "softening";
  return "vocal";
}
