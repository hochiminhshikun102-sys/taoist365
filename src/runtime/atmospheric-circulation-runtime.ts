import { dailyIndex } from "@/lib/living-day-key";

export type AtmosphericCirculationRuntime = {
  circulationState: "settling" | "migrating" | "reopening" | "redistributing";
  airMigrationLine: string;
  carryoverLine: string;
  unresolvedSilenceLine: string;
  reduceLocalDensity: boolean;
};

export function resolveAtmosphericCirculationRuntime(dayKey: string): AtmosphericCirculationRuntime {
  const h = dailyIndex(`${dayKey}:atmospheric-circulation`, 100);
  const circulationState = h < 26 ? "settling" : h < 52 ? "migrating" : h < 78 ? "reopening" : "redistributing";

  return {
    circulationState,
    airMigrationLine:
      circulationState === "settling"
        ? "Air settles between rooms before any surface speaks."
        : circulationState === "migrating"
          ? "A little atmosphere migrates from one quiet room to another."
          : circulationState === "reopening"
            ? "Browser air reopens where old residue had become heavy."
            : "The room redistributes silence before it adds another trace.",
    carryoverLine:
      circulationState === "migrating"
        ? "Yesterday's hallway air remains faintly inside Windkeep."
        : "Continuity circulates at low pressure through the civilization.",
    unresolvedSilenceLine: "Unresolved silence drifts without becoming an event.",
    reduceLocalDensity: h > 58,
  };
}
