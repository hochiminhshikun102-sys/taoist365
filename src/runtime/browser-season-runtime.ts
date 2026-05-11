export type BrowserSeasonRuntime = {
  season: "winter" | "spring" | "summer" | "autumn";
  seasonAirLine: string;
  residueBehaviorLine: string;
  quietSeasonalBias: number;
};

export function resolveBrowserSeasonRuntime(now: Date = new Date()): BrowserSeasonRuntime {
  const month = now.getMonth() + 1;
  const season =
    month === 12 || month <= 2 ? "winter" : month <= 5 ? "spring" : month <= 8 ? "summer" : "autumn";

  return {
    season,
    seasonAirLine:
      season === "winter"
        ? "Winter makes the browser room more still."
        : season === "spring"
          ? "Spring reopens the air slightly without changing the surface."
          : season === "summer"
            ? "Summer softens the air around long-open objects."
            : "Autumn lets residue settle lower into the room.",
    residueBehaviorLine:
      season === "autumn"
        ? "Residue sinks more easily in autumn."
        : season === "spring"
          ? "Old silence loosens a little in spring."
          : "Season stays in the air, not in a theme.",
    quietSeasonalBias: season === "winter" ? 0.08 : season === "autumn" ? 0.06 : season === "summer" ? 0.03 : 0.01,
  };
}
