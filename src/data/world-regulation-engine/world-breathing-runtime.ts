import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { dailyIndex } from "@/lib/living-day-key";

export type BreathingMode = "expanded" | "thinner" | "faded" | "almostStill" | "residualOnly";

export type WorldBreathing = {
  breathingMode: BreathingMode;
  worldBreathingLine: string;
  pageOpenness: number;
  responsePressure: number;
  ambientQuietness: number;
};

const LINES: Record<BreathingMode, string> = {
  expanded: "Breathing is wide today—sections may appear without crowding.",
  thinner: "Breathing thins: fewer blocks, more air between sentences.",
  faded: "Breathing fades: the site keeps shape while lowering its voice.",
  almostStill: "Almost still: one or two surfaces carry the day.",
  residualOnly: "Residual-only breath: only quiet traces and climate remain foreground.",
};

export function resolveWorldBreathing(
  age: WorldAgeStateId,
  dayKey: string,
  structural: StructuralSilenceBundle,
): WorldBreathing {
  const pe = structural.pageEnergy;
  let mode: BreathingMode = "expanded";
  if (pe === "quiet" || pe === "warm") mode = "thinner";
  if (pe === "thin" || pe === "faded") mode = "faded";
  if (pe === "still" || pe === "heavy") mode = "almostStill";
  if (pe === "empty" || pe === "residual") mode = "residualOnly";

  const h = dailyIndex(`${dayKey}:breathe:${age}`, 100);
  if (h > 88 && mode === "expanded") mode = "thinner";

  const openness = mode === "residualOnly" ? 0.15 : mode === "almostStill" ? 0.35 : mode === "faded" ? 0.5 : 0.72;
  const responsePressure = 1 - openness;
  const ambientQuietness = mode === "expanded" ? 0.35 : mode === "residualOnly" ? 0.92 : 0.55 + h / 400;

  return {
    breathingMode: mode,
    worldBreathingLine: LINES[mode],
    pageOpenness: openness,
    responsePressure,
    ambientQuietness,
  };
}
