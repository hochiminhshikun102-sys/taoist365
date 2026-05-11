import { dailyIndex } from "@/lib/living-day-key";

export type RealLifeRuntime = {
  lifeState:
    | "ordinaryDayAdjacency"
    | "browserSideExistence"
    | "realWorldContinuity"
    | "lifeNearAtmosphere"
    | "dailyWorldCoexistence";
  realLifeLine: string;
  homepageLine: string;
  suppressEscapistAtmosphere: boolean;
};

export function resolveRealLifeRuntime(dayKey: string): RealLifeRuntime {
  const h = dailyIndex(`${dayKey}:real-life`, 100);
  const lifeState =
    h < 20
      ? "ordinaryDayAdjacency"
      : h < 40
        ? "browserSideExistence"
        : h < 60
          ? "realWorldContinuity"
          : h < 80
            ? "lifeNearAtmosphere"
            : "dailyWorldCoexistence";

  return {
    lifeState,
    realLifeLine:
      lifeState === "ordinaryDayAdjacency"
        ? "The room stays adjacent to an ordinary day."
        : lifeState === "browserSideExistence"
          ? "Browser-side existence remains close to real life."
          : lifeState === "realWorldContinuity"
            ? "Real-world continuity keeps the page from becoming another world."
            : lifeState === "lifeNearAtmosphere"
              ? "The atmosphere stays near life rather than away from it."
              : "Daily-world coexistence is quieter than escape.",
    homepageLine: "A small browser window beside real life, not another life to enter.",
    suppressEscapistAtmosphere: true,
  };
}
