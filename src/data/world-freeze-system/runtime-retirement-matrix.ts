import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import type { ForegroundFreezeTier } from "./freeze-hierarchy";

/** How retirement fatigue maps freeze emphasis — no new runtime family */
export function freezeEmphasisFromRetirement(
  r: RuntimeRetirementBundle,
): "hold" | "soften" | "deepBackground" {
  switch (r.worldFatigue.fatigueLevel) {
    case "almostAbsent":
    case "resting":
      return "deepBackground";
    case "tired":
    case "thinning":
      return "soften";
    default:
      return "hold";
  }
}

export type RetirementMatrixRow = { channel: string; tier: ForegroundFreezeTier };

export function buildRuntimeRetirementMatrix(
  stabilityMap: Record<string, ForegroundFreezeTier>,
): readonly RetirementMatrixRow[] {
  return Object.entries(stabilityMap).map(([channel, tier]) => ({ channel, tier }));
}
