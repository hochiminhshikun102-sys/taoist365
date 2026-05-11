import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationFadingRuntime = {
  fadingState: "airReopened" | "traceSoftened" | "silenceRecovered" | "almostForgotten";
  residueFadingLine: string;
  continuityReleaseLine: string;
  reduceResidueDensity: boolean;
  reduceAtmosphericWeight: boolean;
};

export function resolveCivilizationFadingRuntime(dayKey: string): CivilizationFadingRuntime {
  const h = dailyIndex(`${dayKey}:civilization-fading`, 100);
  const fadingState =
    h < 24 ? "airReopened" : h < 52 ? "traceSoftened" : h < 78 ? "silenceRecovered" : "almostForgotten";

  return {
    fadingState,
    residueFadingLine:
      fadingState === "airReopened"
        ? "Air moves through the room again; some traces stop asking to be read."
        : fadingState === "traceSoftened"
          ? "Residue softens at the edge instead of being cleared."
          : fadingState === "silenceRecovered"
            ? "Silence recovers around the older marks."
            : "A few traces are almost forgotten, still present as room weight.",
    continuityReleaseLine:
      fadingState === "almostForgotten"
        ? "Continuity releases itself into the background."
        : "The room becomes lighter without erasing what passed through.",
    reduceResidueDensity: h > 44,
    reduceAtmosphericWeight: h > 62,
  };
}
