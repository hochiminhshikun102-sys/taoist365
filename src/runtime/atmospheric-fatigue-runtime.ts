import { dailyIndex } from "@/lib/living-day-key";

export type AtmosphericFatigueRuntime = {
  fatigueState: "airReopening" | "visualThinning" | "lowDensityRestoration" | "freshnessRecovery" | "quietSimplification";
  fatigueLine: string;
  restorationLine: string;
  preventPoeticOverload: boolean;
};

export function resolveAtmosphericFatigueRuntime(dayKey: string): AtmosphericFatigueRuntime {
  const h = dailyIndex(`${dayKey}:atmospheric-fatigue`, 100);
  const fatigueState =
    h < 22
      ? "airReopening"
      : h < 44
        ? "visualThinning"
        : h < 64
          ? "lowDensityRestoration"
          : h < 84
            ? "freshnessRecovery"
            : "quietSimplification";

  return {
    fatigueState,
    fatigueLine:
      fatigueState === "airReopening"
        ? "Air reopens before atmosphere becomes overdesigned."
        : fatigueState === "visualThinning"
          ? "Visual reset happens through thinning, not a new treatment."
          : fatigueState === "lowDensityRestoration"
            ? "Low-density restoration keeps silence from becoming heavy."
            : fatigueState === "freshnessRecovery"
              ? "Browser freshness returns by reducing residue addiction."
              : "Quiet simplification prevents emotional density from accumulating.",
    restorationLine: "Atmospheric fatigue is prevented by letting the room become plainer.",
    preventPoeticOverload: h > 34,
  };
}
