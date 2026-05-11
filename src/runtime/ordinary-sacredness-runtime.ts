import { dailyIndex } from "@/lib/living-day-key";

export type OrdinarySacrednessRuntime = {
  sacrednessState:
    | "quietPreciousness"
    | "ordinaryReverence"
    | "humanDignity"
    | "smallSacredAir"
    | "nonReligiousReverence";
  ordinarySacrednessLine: string;
  nonDivineLine: string;
  preventSpiritualInflation: boolean;
};

export function resolveOrdinarySacrednessRuntime(dayKey: string): OrdinarySacrednessRuntime {
  const h = dailyIndex(`${dayKey}:ordinary-sacredness`, 100);
  const sacrednessState =
    h < 22
      ? "quietPreciousness"
      : h < 42
        ? "ordinaryReverence"
        : h < 62
          ? "humanDignity"
          : h < 82
            ? "smallSacredAir"
            : "nonReligiousReverence";

  return {
    sacrednessState,
    ordinarySacrednessLine:
      sacrednessState === "quietPreciousness"
        ? "Ordinary things become quietly precious without being lifted above life."
        : sacrednessState === "ordinaryReverence"
          ? "Wind, light, tea air, and empty chairs receive ordinary reverence."
          : sacrednessState === "humanDignity"
            ? "Calm human dignity remains in the room without a sermon."
            : sacrednessState === "smallSacredAir"
              ? "Small sacred atmosphere stays non-religious and low."
              : "Non-religious reverence keeps ordinary life valuable.",
    nonDivineLine: "Nothing is deified; ordinary life is simply allowed to matter.",
    preventSpiritualInflation: h > 12,
  };
}
