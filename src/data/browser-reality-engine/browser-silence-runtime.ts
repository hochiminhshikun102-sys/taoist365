import { dailyIndex } from "@/lib/living-day-key";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";

export type BrowserSilenceRuntime = {
  browserQuietness: number;
  nonInteractiveComfort: number;
  passiveOpenState: boolean;
  longPauseLegality: number;
};

export function resolveBrowserSilenceRuntime(
  dayKey: string,
  structural: StructuralSilenceBundle,
): BrowserSilenceRuntime {
  const h = dailyIndex(`${dayKey}:bsil`, 100);
  const pe = structural.pageEnergy;
  const passiveBias =
    pe === "still" || pe === "heavy" || pe === "empty" || pe === "residual" || pe === "thin" || pe === "faded" ? 0.18 : 0;
  return {
    browserQuietness: Math.min(0.94, 0.42 + h / 220 + passiveBias),
    nonInteractiveComfort: Math.min(0.9, 0.38 + h / 240),
    passiveOpenState: passiveBias > 0 || h > 74,
    longPauseLegality: Math.min(0.95, 0.45 + h / 200 + passiveBias),
  };
}
