import { dailyIndex } from "@/lib/living-day-key";

export type OrdinaryHumanRuntime = {
  humanityState:
    | "humanScalePlacement"
    | "nonPerformativeTrace"
    | "slightIrregularity"
    | "ordinaryExistence"
    | "livedUnevenness";
  ordinaryHumanLine: string;
  placementLine: string;
  reduceLifestyleSignal: boolean;
  allowIrregularity: boolean;
};

export function resolveOrdinaryHumanRuntime(dayKey: string): OrdinaryHumanRuntime {
  const h = dailyIndex(`${dayKey}:ordinary-human`, 100);
  const humanityState =
    h < 20
      ? "humanScalePlacement"
      : h < 40
        ? "nonPerformativeTrace"
        : h < 60
          ? "slightIrregularity"
          : h < 80
            ? "ordinaryExistence"
            : "livedUnevenness";

  return {
    humanityState,
    ordinaryHumanLine:
      humanityState === "humanScalePlacement"
        ? "The placement stays human-sized, closer to a desk than to a showroom."
        : humanityState === "nonPerformativeTrace"
          ? "A non-performative trace is enough; the room does not need to prove warmth."
          : humanityState === "slightIrregularity"
            ? "A slight irregularity keeps the air from becoming too designed."
            : humanityState === "ordinaryExistence"
              ? "Ordinary existence is allowed to be quiet and a little uneven."
              : "Lived unevenness softens the civilization back into a room.",
    placementLine: "Things are placed as if someone uses them, not as if they were arranged for a photograph.",
    reduceLifestyleSignal: h > 24,
    allowIrregularity: h > 12 && h < 94,
  };
}
