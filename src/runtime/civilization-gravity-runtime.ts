import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationGravityRuntime = {
  resistance: number;
  resistanceLine: string;
  suppressOptimizationGravity: boolean;
  suppressScalePressure: boolean;
  suppressMonetizationDominance: boolean;
};

export function resolveCivilizationGravityRuntime(dayKey: string): CivilizationGravityRuntime {
  const h = dailyIndex(`${dayKey}:civilization-gravity`, 100);
  const resistance = Math.min(0.98, 0.5 + h / 180);

  return {
    resistance,
    resistanceLine:
      resistance > 0.78
        ? "Civilization gravity resistance is high; Dohara refuses to start optimizing itself."
        : "The room resists scale pressure by staying smaller than its systems.",
    suppressOptimizationGravity: resistance > 0.58,
    suppressScalePressure: resistance > 0.64,
    suppressMonetizationDominance: resistance > 0.72,
  };
}
