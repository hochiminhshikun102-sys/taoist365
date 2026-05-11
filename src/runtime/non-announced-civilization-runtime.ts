import { dailyIndex } from "@/lib/living-day-key";

export type NonAnnouncedCivilizationRuntime = {
  state:
    | "antiConceptualDisplay"
    | "antiCivilizationPerformance"
    | "antiAtmosphericShowcase"
    | "naturalizedBrowserExistence"
    | "ordinaryLongTermPresence";
  boundaryLine: string;
  homepageLine: string;
  suppressCivilizationPerformance: boolean;
};

export function resolveNonAnnouncedCivilizationRuntime(dayKey: string): NonAnnouncedCivilizationRuntime {
  const h = dailyIndex(`${dayKey}:non-announced-civilization`, 100);
  const state =
    h < 20
      ? "antiConceptualDisplay"
      : h < 40
        ? "antiCivilizationPerformance"
        : h < 60
          ? "antiAtmosphericShowcase"
          : h < 80
            ? "naturalizedBrowserExistence"
            : "ordinaryLongTermPresence";

  return {
    state,
    boundaryLine:
      state === "antiConceptualDisplay"
        ? "Do not display the concept."
        : state === "antiCivilizationPerformance"
          ? "Civilization must not perform civilization."
          : state === "antiAtmosphericShowcase"
            ? "Atmosphere is not a showcase."
            : state === "naturalizedBrowserExistence"
              ? "Browser existence should feel naturalized."
              : "Long-term presence becomes ordinary when it stops announcing itself.",
    homepageLine: "This is only a page that has learned to stay quiet.",
    suppressCivilizationPerformance: true,
  };
}
