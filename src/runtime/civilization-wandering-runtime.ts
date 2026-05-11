import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationWanderingRuntime = {
  wanderingState: "purposelessNavigation" | "browserDrifting" | "roomLingering" | "lowPressureWandering" | "nonGoalExploration";
  wanderingLine: string;
  lingeringLine: string;
  allowPurposelessStay: boolean;
};

export function resolveCivilizationWanderingRuntime(dayKey: string): CivilizationWanderingRuntime {
  const h = dailyIndex(`${dayKey}:civilization-wandering`, 100);
  const wanderingState =
    h < 22
      ? "purposelessNavigation"
      : h < 42
        ? "browserDrifting"
        : h < 62
          ? "roomLingering"
          : h < 82
            ? "lowPressureWandering"
            : "nonGoalExploration";

  return {
    wanderingState,
    wanderingLine:
      wanderingState === "purposelessNavigation"
        ? "Purposeless navigation is allowed to remain legitimate."
        : wanderingState === "browserDrifting"
          ? "Browser drifting moves through rooms without a destination."
          : wanderingState === "roomLingering"
            ? "Room lingering matters even when nothing happens."
            : wanderingState === "lowPressureWandering"
              ? "Low-pressure wandering keeps the civilization walkable."
              : "Non-goal exploration is part of the room ecology.",
    lingeringLine: "A person can stay without needing a reason.",
    allowPurposelessStay: h > 8,
  };
}
