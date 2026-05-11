import { dailyIndex } from "@/lib/living-day-key";

export type DissolvedAtmosphereRuntime = {
  dissolveState:
    | "dissolvingIntoLife"
    | "nonSeparateBrowserFeeling"
    | "ordinaryCoexistence"
    | "environmentalBlending"
    | "realityIntegration";
  dissolveLine: string;
  integrationLine: string;
  suppressSpecialSpaceFeeling: boolean;
};

export function resolveDissolvedAtmosphereRuntime(dayKey: string): DissolvedAtmosphereRuntime {
  const h = dailyIndex(`${dayKey}:dissolved-atmosphere`, 100);
  const dissolveState =
    h < 20
      ? "dissolvingIntoLife"
      : h < 40
        ? "nonSeparateBrowserFeeling"
        : h < 60
          ? "ordinaryCoexistence"
          : h < 80
            ? "environmentalBlending"
            : "realityIntegration";

  return {
    dissolveState,
    dissolveLine:
      dissolveState === "dissolvingIntoLife"
        ? "Atmosphere dissolves back into life."
        : dissolveState === "nonSeparateBrowserFeeling"
          ? "The browser should not feel like a separate world."
          : dissolveState === "ordinaryCoexistence"
            ? "Ordinary coexistence is more mature than specialness."
            : dissolveState === "environmentalBlending"
              ? "The room blends into its environment."
              : "Reality integration keeps the page from becoming a destination.",
    integrationLine: "Let the atmosphere disappear into the ordinary day.",
    suppressSpecialSpaceFeeling: true,
  };
}
