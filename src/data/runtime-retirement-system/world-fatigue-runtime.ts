import { dailyIndex } from "@/lib/living-day-key";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";

export type FatigueLevel = "active" | "thinning" | "tired" | "resting" | "almostAbsent";

export type WorldFatigueRuntime = {
  fatigueLevel: FatigueLevel;
  fatigueLine: string;
};

export function resolveWorldFatigueRuntime(
  dayKey: string,
  structural: StructuralSilenceBundle,
): WorldFatigueRuntime {
  const h = dailyIndex(`${dayKey}:w-fat`, 100);
  const pe = structural.pageEnergy;
  let score = h / 100;
  if (pe === "empty" || pe === "residual") score += 0.22;
  if (pe === "still" || pe === "heavy") score += 0.14;
  let fatigueLevel: FatigueLevel = "active";
  if (score > 0.42) fatigueLevel = "thinning";
  if (score > 0.58) fatigueLevel = "tired";
  if (score > 0.74) fatigueLevel = "resting";
  if (score > 0.88) fatigueLevel = "almostAbsent";
  return {
    fatigueLevel,
    fatigueLine: "世界也会低能耗：不是坏了，是在休息。",
  };
}
