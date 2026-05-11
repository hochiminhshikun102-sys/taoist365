import { dailyIndex } from "@/lib/living-day-key";

export type WindkeepDeepTimeRuntime = {
  deepTimeState: "settledCalm" | "handledSoftness" | "roomAdapted" | "seasonalSediment";
  settledObjectLine: string;
  ownershipTraceLine: string;
  seasonalSedimentLine: string;
  reduceSurfaceCopy: boolean;
};

export function resolveWindkeepDeepTimeRuntime(dayKey: string): WindkeepDeepTimeRuntime {
  const h = dailyIndex(`${dayKey}:windkeep-deep-time`, 100);
  const deepTimeState =
    h < 25 ? "settledCalm" : h < 52 ? "handledSoftness" : h < 78 ? "roomAdapted" : "seasonalSediment";

  return {
    deepTimeState,
    settledObjectLine:
      deepTimeState === "settledCalm"
        ? "The object has settled enough to stop feeling newly placed."
        : deepTimeState === "handledSoftness"
          ? "Repeated handling makes the material quieter, not more collectible."
          : deepTimeState === "roomAdapted"
            ? "The object has adapted to the room around it."
            : "Seasonal continuity sits in the surface without becoming lore.",
    ownershipTraceLine:
      deepTimeState === "seasonalSediment"
        ? "Ownership traces remain silent: kept, moved, rested, kept again."
        : "Ownership is visible only as care softened into the object.",
    seasonalSedimentLine: "Seasonal time is held as calm material presence, not metadata.",
    reduceSurfaceCopy: h > 66,
  };
}
