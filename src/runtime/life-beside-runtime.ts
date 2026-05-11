import { dailyIndex } from "@/lib/living-day-key";

export type LifeBesideRuntime = {
  besideState:
    | "parallelLifeContinuity"
    | "browserSideExistence"
    | "nonCentralRelationship"
    | "ordinaryLifeCoexistence"
    | "temporalAdjacency";
  besideLine: string;
  nonCentralLine: string;
  suppressLifeCentering: boolean;
};

export function resolveLifeBesideRuntime(dayKey: string): LifeBesideRuntime {
  const h = dailyIndex(`${dayKey}:life-beside`, 100);
  const besideState =
    h < 20
      ? "parallelLifeContinuity"
      : h < 40
        ? "browserSideExistence"
        : h < 60
          ? "nonCentralRelationship"
          : h < 80
            ? "ordinaryLifeCoexistence"
            : "temporalAdjacency";

  return {
    besideState,
    besideLine:
      besideState === "parallelLifeContinuity"
        ? "Life continues in parallel beside the room."
        : besideState === "browserSideExistence"
          ? "Browser-side existence is enough."
          : besideState === "nonCentralRelationship"
            ? "The relationship stays non-central and therefore breathable."
            : besideState === "ordinaryLifeCoexistence"
              ? "The room coexists with ordinary life without replacing it."
              : "Temporal adjacency lets the page stay near without moving closer.",
    nonCentralLine: "This place belongs beside life, not at the center of it.",
    suppressLifeCentering: true,
  };
}
