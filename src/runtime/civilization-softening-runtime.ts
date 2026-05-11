import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationSofteningRuntime = {
  softeningState:
    | "edgeSoftening"
    | "atmosphericWarming"
    | "conceptualLightening"
    | "densitySoftened"
    | "approachableSilence";
  softeningLine: string;
  approachableLine: string;
  reduceConceptualHeaviness: boolean;
};

export function resolveCivilizationSofteningRuntime(dayKey: string): CivilizationSofteningRuntime {
  const h = dailyIndex(`${dayKey}:civilization-softening`, 100);
  const softeningState =
    h < 22
      ? "edgeSoftening"
      : h < 42
        ? "atmosphericWarming"
        : h < 62
          ? "conceptualLightening"
          : h < 82
            ? "densitySoftened"
            : "approachableSilence";

  return {
    softeningState,
    softeningLine:
      softeningState === "edgeSoftening"
        ? "Civilization edges soften before the room becomes impressive."
        : softeningState === "atmosphericWarming"
          ? "Atmospheric warming keeps depth from turning distant."
          : softeningState === "conceptualLightening"
            ? "Conceptual heaviness lightens until the room feels approachable."
            : softeningState === "densitySoftened"
              ? "Civilization density softens instead of getting taller."
              : "Approachable silence lets the project feel human-scale.",
    approachableLine: "Depth should not intimidate the person who only wants to stay a moment.",
    reduceConceptualHeaviness: h > 30,
  };
}
