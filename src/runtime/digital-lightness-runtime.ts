import { dailyIndex } from "@/lib/living-day-key";

export type DigitalLightnessRuntime = {
  lightnessState:
    | "antiDigitalHeaviness"
    | "antiConceptualDensity"
    | "antiOverdesign"
    | "softDigitalPresence"
    | "browserSimplicity";
  lightnessLine: string;
  simplicityLine: string;
  reduceDigitalWeight: boolean;
};

export function resolveDigitalLightnessRuntime(dayKey: string): DigitalLightnessRuntime {
  const h = dailyIndex(`${dayKey}:digital-lightness`, 100);
  const lightnessState =
    h < 20
      ? "antiDigitalHeaviness"
      : h < 40
        ? "antiConceptualDensity"
        : h < 60
          ? "antiOverdesign"
          : h < 80
            ? "softDigitalPresence"
            : "browserSimplicity";

  return {
    lightnessState,
    lightnessLine:
      lightnessState === "antiDigitalHeaviness"
        ? "Digital heaviness is thinned before it gathers."
        : lightnessState === "antiConceptualDensity"
          ? "Conceptual density is kept out of the user's way."
          : lightnessState === "antiOverdesign"
            ? "Overdesigned serenity is reduced back to plain browser air."
            : lightnessState === "softDigitalPresence"
              ? "Digital presence stays soft and secondary."
              : "Browser simplicity is allowed to carry the whole room.",
    simplicityLine: "The site should feel lighter than the idea behind it.",
    reduceDigitalWeight: h > 18,
  };
}
