import { civilizationContinuityRuntimeLine } from "./civilization-continuity-runtime";
import { longLivedWorldContinuityLine } from "./long-lived-world-continuity";
import { ambientContinuityPressureLine } from "./ambient-continuity-pressure";
import { worldIdentityStabilityLine } from "./world-identity-stability";
import { runtimeContinuityBalanceLine } from "./runtime-continuity-balance";
import { quietWorldMemoryLine } from "./quiet-world-memory";
import { longLivedEnvironmentRuntimeLine } from "./long-lived-environment-runtime";
import { civilizationAgingContinuityLine } from "./civilization-aging-continuity";
import { defaultWorldEquilibriumLine } from "./default-world-equilibrium";

export type CivilizationContinuityInfrastructureBundle = {
  civilizationContinuityRuntimeLine: string;
  longLivedWorldContinuityLine: string;
  ambientContinuityPressureLine: string;
  worldIdentityStabilityLine: string;
  runtimeContinuityBalanceLine: string;
  quietWorldMemoryLine: string;
  longLivedEnvironmentRuntimeLine: string;
  civilizationAgingContinuityLine: string;
  defaultWorldEquilibriumLine: string;
};

export function resolveCivilizationContinuityInfrastructureBundle(): CivilizationContinuityInfrastructureBundle {
  return {
    civilizationContinuityRuntimeLine: civilizationContinuityRuntimeLine(),
    longLivedWorldContinuityLine: longLivedWorldContinuityLine(),
    ambientContinuityPressureLine: ambientContinuityPressureLine(),
    worldIdentityStabilityLine: worldIdentityStabilityLine(),
    runtimeContinuityBalanceLine: runtimeContinuityBalanceLine(),
    quietWorldMemoryLine: quietWorldMemoryLine(),
    longLivedEnvironmentRuntimeLine: longLivedEnvironmentRuntimeLine(),
    civilizationAgingContinuityLine: civilizationAgingContinuityLine(),
    defaultWorldEquilibriumLine: defaultWorldEquilibriumLine(),
  };
}
