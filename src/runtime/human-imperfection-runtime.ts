import { dailyIndex } from "@/lib/living-day-key";

export type HumanImperfectionRuntime = {
  imperfectionState:
    | "tinyAsymmetry"
    | "imperfectContinuity"
    | "delayedSettling"
    | "gentleUnfinishedness"
    | "roomIrregularity";
  imperfectionLine: string;
  scaleLine: string;
  reduceIndustrialPerfectness: boolean;
};

export function resolveHumanImperfectionRuntime(dayKey: string): HumanImperfectionRuntime {
  const h = dailyIndex(`${dayKey}:human-imperfection`, 100);
  const imperfectionState =
    h < 22
      ? "tinyAsymmetry"
      : h < 42
        ? "imperfectContinuity"
        : h < 62
          ? "delayedSettling"
          : h < 82
            ? "gentleUnfinishedness"
            : "roomIrregularity";

  return {
    imperfectionState,
    imperfectionLine:
      imperfectionState === "tinyAsymmetry"
        ? "A tiny asymmetry keeps the room from feeling manufactured."
        : imperfectionState === "imperfectContinuity"
          ? "Continuity is allowed to be slightly imperfect and still kind."
          : imperfectionState === "delayedSettling"
            ? "Something settles a little late, like a person forgot and then remembered."
            : imperfectionState === "gentleUnfinishedness"
              ? "Gentle unfinishedness gives the room human scale."
              : "Room irregularity softens the edge of system certainty.",
    scaleLine: "Human-scale inconsistency is allowed to remain quiet.",
    reduceIndustrialPerfectness: h > 28,
  };
}
