import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type SilenceDensity = {
  guidanceRoundsCap: 1 | 2 | 3;
  routeChance: number;
  residueRotationSlowdown: number;
  explanatoryDensity: "normal" | "lighter" | "minimal";
};

export const silenceDensityByAge: Record<WorldAgeStateId, SilenceDensity> = {
  "newly-settled": { guidanceRoundsCap: 3, routeChance: 0.95, residueRotationSlowdown: 1, explanatoryDensity: "normal" },
  "quietly-lived-in": { guidanceRoundsCap: 2, routeChance: 0.82, residueRotationSlowdown: 1.4, explanatoryDensity: "lighter" },
  "heavy-air-season": { guidanceRoundsCap: 2, routeChance: 0.74, residueRotationSlowdown: 1.8, explanatoryDensity: "lighter" },
  "slow-drift-month": { guidanceRoundsCap: 2, routeChance: 0.62, residueRotationSlowdown: 2.1, explanatoryDensity: "minimal" },
  "long-static-period": { guidanceRoundsCap: 1, routeChance: 0.5, residueRotationSlowdown: 2.8, explanatoryDensity: "minimal" },
  "late-year-room": { guidanceRoundsCap: 1, routeChance: 0.48, residueRotationSlowdown: 3, explanatoryDensity: "minimal" },
  "old-browser-period": { guidanceRoundsCap: 1, routeChance: 0.45, residueRotationSlowdown: 3.4, explanatoryDensity: "minimal" },
  "worn-in-cycle": { guidanceRoundsCap: 1, routeChance: 0.42, residueRotationSlowdown: 3.8, explanatoryDensity: "minimal" },
};
