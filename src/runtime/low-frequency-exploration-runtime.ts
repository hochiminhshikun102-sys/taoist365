import { dailyIndex } from "@/lib/living-day-key";

export type LowFrequencyExplorationRuntime = {
  explorationState:
    | "accidentalDiscovery"
    | "quietWandering"
    | "softExploration"
    | "sparseNavigation"
    | "nonOptimizedDiscovery";
  explorationLine: string;
  wanderingLine: string;
  suppressRecommendationBehavior: boolean;
};

export function resolveLowFrequencyExplorationRuntime(dayKey: string): LowFrequencyExplorationRuntime {
  const h = dailyIndex(`${dayKey}:low-frequency-exploration`, 100);
  const explorationState =
    h < 22
      ? "accidentalDiscovery"
      : h < 42
        ? "quietWandering"
        : h < 62
          ? "softExploration"
          : h < 82
            ? "sparseNavigation"
            : "nonOptimizedDiscovery";

  return {
    explorationState,
    explorationLine:
      explorationState === "accidentalDiscovery"
        ? "Rooms are discovered by accident, not surfaced by recommendation."
        : explorationState === "quietWandering"
          ? "Quiet wandering continuity lets a person move without a task."
          : explorationState === "softExploration"
            ? "Exploration stays soft enough to feel like walking."
            : explorationState === "sparseNavigation"
              ? "Navigation remains sparse and atmospheric."
              : "Discovery refuses optimization and remains non-directed.",
    wanderingLine: "Dohara is for wandering, not using.",
    suppressRecommendationBehavior: h > 12,
  };
}
