import { dailyIndex } from "@/lib/living-day-key";

export type NonDependentCivilizationRuntime = {
  dependencyState:
    | "antiEmotionalLocking"
    | "antiDigitalDependency"
    | "freeMovementContinuity"
    | "nonCapturingAtmosphere"
    | "openHumanRelationship";
  dependencyLine: string;
  freedomLine: string;
  suppressDependencyClimate: boolean;
};

export function resolveNonDependentCivilizationRuntime(dayKey: string): NonDependentCivilizationRuntime {
  const h = dailyIndex(`${dayKey}:non-dependent-civilization`, 100);
  const dependencyState =
    h < 20
      ? "antiEmotionalLocking"
      : h < 40
        ? "antiDigitalDependency"
        : h < 60
          ? "freeMovementContinuity"
          : h < 80
            ? "nonCapturingAtmosphere"
            : "openHumanRelationship";

  return {
    dependencyState,
    dependencyLine:
      dependencyState === "antiEmotionalLocking"
        ? "The civilization refuses emotional locking."
        : dependencyState === "antiDigitalDependency"
          ? "Digital dependency stays outside the boundary."
          : dependencyState === "freeMovementContinuity"
            ? "Continuity should support free movement."
            : dependencyState === "nonCapturingAtmosphere"
              ? "Atmosphere must never capture the person inside it."
              : "The human relationship stays open and non-possessive.",
    freedomLine: "You can leave easily; the room remains kind from a distance.",
    suppressDependencyClimate: true,
  };
}
