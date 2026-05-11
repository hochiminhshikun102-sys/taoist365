import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

/** 0 = spare, 1 = normal, 2 = allow one extra texture mention that day (still not décor porn). */
export type TextureDensityBudget = 0 | 1 | 2;

export function textureDensityBudget(age: WorldAgeStateId): TextureDensityBudget {
  const s = worldAgeStateMap[age].stillnessWeight;
  if (s < 0.38) return 2;
  if (s < 0.62) return 1;
  return 0;
}

const AUDIT_ROTATIONS = [
  "Texture mentions stay scarce on purpose—no Pinterest room worship.",
  "Surfaces are named only when they carry weight; no slow-living fetish stack.",
  "If a line starts to sound styled, it gets cut back to plain wear.",
  "Cozy is allowed as fatigue, not as a visual brief.",
] as const;

export function textureFatigueAuditLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:texture-audit`, AUDIT_ROTATIONS.length);
  return AUDIT_ROTATIONS[i] ?? AUDIT_ROTATIONS[0];
}
