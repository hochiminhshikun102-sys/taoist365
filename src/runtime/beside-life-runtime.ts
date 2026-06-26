import { dailyIndex } from "@/lib/living-day-key";

export type BesideLifeRuntime = {
  besideState:
    | "sidePresenceContinuity"
    | "lifeCoexistence"
    | "browserNearExistence"
    | "peripheralAtmosphere"
    | "ordinaryDigitalAdjacency";
  besideLine: string;
  peripheralLine: string;
  suppressImmersiveMainSpace: boolean;
};

export function resolveBesideLifeRuntime(dayKey: string): BesideLifeRuntime {
  const h = dailyIndex(`${dayKey}:beside-life`, 100);
  const besideState =
    h < 20
      ? "sidePresenceContinuity"
      : h < 40
        ? "lifeCoexistence"
        : h < 60
          ? "browserNearExistence"
          : h < 80
            ? "peripheralAtmosphere"
            : "ordinaryDigitalAdjacency";

  return {
    besideState,
    besideLine:
      besideState === "sidePresenceContinuity"
        ? "Side-presence continuity is enough."
        : besideState === "lifeCoexistence"
          ? "The room coexists with life without competing for it."
          : besideState === "browserNearExistence"
            ? "Browser-near existence remains modest."
            : besideState === "peripheralAtmosphere"
              ? "Peripheral atmosphere keeps the page from becoming the main space."
              : "Ordinary digital adjacency is the right amount of presence.",
    peripheralLine: "Dohara belongs at the side of life, not in front of it.",
    suppressImmersiveMainSpace: true,
  };
}
