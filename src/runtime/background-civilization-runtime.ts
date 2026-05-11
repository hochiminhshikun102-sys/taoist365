import { dailyIndex } from "@/lib/living-day-key";

export type BackgroundCivilizationRuntime = {
  backgroundState:
    | "ambientCoexistence"
    | "backgroundContinuity"
    | "nonCentralAtmosphere"
    | "peripheralCalmness"
    | "browserBackgroundPersistence";
  backgroundLine: string;
  footerLine: string;
  suppressCenterStageFeeling: boolean;
};

export function resolveBackgroundCivilizationRuntime(dayKey: string): BackgroundCivilizationRuntime {
  const h = dailyIndex(`${dayKey}:background-civilization`, 100);
  const backgroundState =
    h < 20
      ? "ambientCoexistence"
      : h < 40
        ? "backgroundContinuity"
        : h < 60
          ? "nonCentralAtmosphere"
          : h < 80
            ? "peripheralCalmness"
            : "browserBackgroundPersistence";

  return {
    backgroundState,
    backgroundLine:
      backgroundState === "ambientCoexistence"
        ? "Ambient coexistence is enough for the civilization."
        : backgroundState === "backgroundContinuity"
          ? "Continuity can stay in the background."
          : backgroundState === "nonCentralAtmosphere"
            ? "Atmosphere remains non-central."
            : backgroundState === "peripheralCalmness"
              ? "Peripheral calmness keeps the site from taking over."
              : "Browser-background persistence is quieter than presence.",
    footerLine: "It can stay open in the background while the day keeps going.",
    suppressCenterStageFeeling: true,
  };
}
