import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationMetabolismRuntime = {
  metabolismState:
    | "atmosphericDigestion"
    | "residueMetabolizing"
    | "continuityCalming"
    | "runtimeSelfBalancing"
    | "climateRedistribution";
  metabolismLine: string;
  digestionLine: string;
  reduceOverPresence: boolean;
};

export function resolveCivilizationMetabolismRuntime(dayKey: string): CivilizationMetabolismRuntime {
  const h = dailyIndex(`${dayKey}:civilization-metabolism`, 100);
  const metabolismState =
    h < 20
      ? "atmosphericDigestion"
      : h < 42
        ? "residueMetabolizing"
        : h < 62
          ? "continuityCalming"
          : h < 82
            ? "runtimeSelfBalancing"
            : "climateRedistribution";

  return {
    metabolismState,
    metabolismLine:
      metabolismState === "atmosphericDigestion"
        ? "The civilization digests atmosphere before adding another trace."
        : metabolismState === "residueMetabolizing"
          ? "Residue metabolizes into lighter browser air."
          : metabolismState === "continuityCalming"
            ? "Continuity calms itself when the room has carried enough."
            : metabolismState === "runtimeSelfBalancing"
              ? "Runtime self-balancing keeps the civilization from accumulating weight."
              : "Climate redistributes through the rooms until no surface feels crowded.",
    digestionLine: "Silence absorbs over-presence before it becomes structure.",
    reduceOverPresence: h > 46,
  };
}
