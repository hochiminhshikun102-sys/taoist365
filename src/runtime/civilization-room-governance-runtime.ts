import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationRoomGovernanceRuntime = {
  governanceState:
    | "roomSilenceGovernance"
    | "lowPressureExistence"
    | "antiFeatureRoom"
    | "atmosphericBalance"
    | "densityStabilization";
  governanceLine: string;
  protectionLine: string;
  suppressFeatureRoomBehavior: boolean;
  stabilizeRoomDensity: boolean;
};

export function resolveCivilizationRoomGovernanceRuntime(dayKey: string): CivilizationRoomGovernanceRuntime {
  const h = dailyIndex(`${dayKey}:civilization-room-governance`, 100);
  const governanceState =
    h < 22
      ? "roomSilenceGovernance"
      : h < 42
        ? "lowPressureExistence"
        : h < 62
          ? "antiFeatureRoom"
          : h < 82
            ? "atmosphericBalance"
            : "densityStabilization";

  return {
    governanceState,
    governanceLine:
      governanceState === "roomSilenceGovernance"
        ? "Room silence governance keeps every room spatial before it becomes useful."
        : governanceState === "lowPressureExistence"
          ? "Rooms are allowed to exist at low pressure without proving function."
          : governanceState === "antiFeatureRoom"
            ? "Anti-feature-room protection keeps the civilization from becoming a matrix."
            : governanceState === "atmosphericBalance"
              ? "Atmospheric room balance lets each room stay quiet beside the others."
              : "Room-density stabilization prevents the city from becoming crowded.",
    protectionLine: "Every room must feel like space before it feels like a tool.",
    suppressFeatureRoomBehavior: h > 20,
    stabilizeRoomDensity: h > 34,
  };
}
