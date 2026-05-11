import { dailyIndex } from "@/lib/living-day-key";

export type OpenAirRuntime = {
  airState:
    | "movingAir"
    | "unfinishedOpenness"
    | "breathableContinuity"
    | "nonEnclosedAtmosphere"
    | "externalConnection";
  openAirLine: string;
  homepageLine: string;
  suppressEmotionalEnclosure: boolean;
};

export function resolveOpenAirRuntime(dayKey: string): OpenAirRuntime {
  const h = dailyIndex(`${dayKey}:open-air`, 100);
  const airState =
    h < 20
      ? "movingAir"
      : h < 40
        ? "unfinishedOpenness"
        : h < 60
          ? "breathableContinuity"
          : h < 80
            ? "nonEnclosedAtmosphere"
            : "externalConnection";

  return {
    airState,
    openAirLine:
      airState === "movingAir"
        ? "Air keeps moving through the room."
        : airState === "unfinishedOpenness"
          ? "The space stays unfinished enough for the outside to remain near."
          : airState === "breathableContinuity"
            ? "Continuity stays breathable and open at the edges."
            : airState === "nonEnclosedAtmosphere"
              ? "Atmosphere is not allowed to seal itself around the visitor."
              : "The room keeps a gentle connection to the world beyond the browser.",
    homepageLine: "Stay for a while if it helps; the air still opens outward.",
    suppressEmotionalEnclosure: h > 10,
  };
}
