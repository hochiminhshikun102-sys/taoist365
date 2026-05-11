import { civilizationEquilibriumRuntimeLine } from "./civilization-equilibrium-runtime";
import { aiRuntimeFatigueLine } from "./ai-runtime-fatigue";
import { ambientCivilizationRestraintLine } from "./ambient-civilization-restraint";
import { runtimeExpansionCollapseLine } from "./runtime-expansion-collapse";
import { worldNoiseEquilibriumLine } from "./world-noise-equilibrium";
import { defaultPresenceStabilityLine } from "./default-presence-stability";
import { runtimeCivilizationAgingLine } from "./runtime-civilization-aging";
import { quietCivilizationPressureLine } from "./quiet-civilization-pressure";
import { longLivedAiEnvironmentLine } from "./long-lived-ai-environment";

export type AiCivilizationStabilityBundle = {
  civilizationEquilibriumRuntimeLine: string;
  aiRuntimeFatigueLine: string;
  ambientCivilizationRestraintLine: string;
  runtimeExpansionCollapseLine: string;
  worldNoiseEquilibriumLine: string;
  defaultPresenceStabilityLine: string;
  runtimeCivilizationAgingLine: string;
  quietCivilizationPressureLine: string;
  longLivedAiEnvironmentLine: string;
};

export function resolveAiCivilizationStabilityBundle(): AiCivilizationStabilityBundle {
  return {
    civilizationEquilibriumRuntimeLine: civilizationEquilibriumRuntimeLine(),
    aiRuntimeFatigueLine: aiRuntimeFatigueLine(),
    ambientCivilizationRestraintLine: ambientCivilizationRestraintLine(),
    runtimeExpansionCollapseLine: runtimeExpansionCollapseLine(),
    worldNoiseEquilibriumLine: worldNoiseEquilibriumLine(),
    defaultPresenceStabilityLine: defaultPresenceStabilityLine(),
    runtimeCivilizationAgingLine: runtimeCivilizationAgingLine(),
    quietCivilizationPressureLine: quietCivilizationPressureLine(),
    longLivedAiEnvironmentLine: longLivedAiEnvironmentLine(),
  };
}
