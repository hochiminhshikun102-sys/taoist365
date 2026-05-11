import { dailyIndex } from "@/lib/living-day-key";

export type LightnessProtectionRuntime = {
  lightnessState:
    | "antiDensityAccumulation"
    | "antiConceptualOverweight"
    | "antiAtmosphericThickening"
    | "antiOverPoeticClimate"
    | "longTermLightness";
  lightnessLine: string;
  thinningLine: string;
  forceOpenAirThinning: boolean;
};

export function resolveLightnessProtectionRuntime(dayKey: string): LightnessProtectionRuntime {
  const h = dailyIndex(`${dayKey}:lightness-protection`, 100);
  const lightnessState =
    h < 20
      ? "antiDensityAccumulation"
      : h < 40
        ? "antiConceptualOverweight"
        : h < 60
          ? "antiAtmosphericThickening"
          : h < 80
            ? "antiOverPoeticClimate"
            : "longTermLightness";

  return {
    lightnessState,
    lightnessLine:
      lightnessState === "antiDensityAccumulation"
        ? "Density accumulation is thinned before it becomes a climate."
        : lightnessState === "antiConceptualOverweight"
          ? "Conceptual weight is kept below the air."
          : lightnessState === "antiAtmosphericThickening"
            ? "Atmosphere is protected from thickening."
            : lightnessState === "antiOverPoeticClimate"
              ? "Over-poetic climate is opened back into plain air."
              : "Long-term lightness stabilizes the civilization.",
    thinningLine: "The older the civilization gets, the lighter it should feel.",
    forceOpenAirThinning: h > 24,
  };
}
