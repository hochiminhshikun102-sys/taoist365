import { ambientCivilizationEquilibriumLine } from "./ambient-civilization-equilibrium";
import { ambientDefaultnessStabilityLine } from "./ambient-defaultness-stability";
import { civilizationFatigueGovernorLine } from "./civilization-fatigue-governor";
import { civilizationStabilityRuntimeLine } from "./civilization-stability-runtime";
import { longLivedCivilizationBalanceLine } from "./long-lived-civilization-balance";
import { nonExpansionBalanceLine } from "./non-expansion-balance";
import { quietCivilizationGovernorLine } from "./quiet-civilization-governor";
import { runtimeStabilityPressureLine } from "./runtime-stability-pressure";
import { worldNoiseResistanceLine } from "./world-noise-resistance";

export type CivilizationStabilityEngineBundle = {
  civilizationStabilityRuntimeLine: string;
  longLivedCivilizationBalanceLine: string;
  ambientCivilizationEquilibriumLine: string;
  worldNoiseResistanceLine: string;
  runtimeStabilityPressureLine: string;
  civilizationFatigueGovernorLine: string;
  nonExpansionBalanceLine: string;
  ambientDefaultnessStabilityLine: string;
  quietCivilizationGovernorLine: string;
};

export function resolveCivilizationStabilityEngineBundle(): CivilizationStabilityEngineBundle {
  return {
    civilizationStabilityRuntimeLine: civilizationStabilityRuntimeLine(),
    longLivedCivilizationBalanceLine: longLivedCivilizationBalanceLine(),
    ambientCivilizationEquilibriumLine: ambientCivilizationEquilibriumLine(),
    worldNoiseResistanceLine: worldNoiseResistanceLine(),
    runtimeStabilityPressureLine: runtimeStabilityPressureLine(),
    civilizationFatigueGovernorLine: civilizationFatigueGovernorLine(),
    nonExpansionBalanceLine: nonExpansionBalanceLine(),
    ambientDefaultnessStabilityLine: ambientDefaultnessStabilityLine(),
    quietCivilizationGovernorLine: quietCivilizationGovernorLine(),
  };
}
