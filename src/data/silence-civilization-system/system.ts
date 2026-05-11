import { absenceCivilizationEngineLine } from "./absence-civilization-engine";
import { ambientQuietGovernorLine } from "./ambient-quiet-governor";
import { ambientRetreatGovernorLine } from "./ambient-retreat-governor";
import { civilizationSilenceRuntimeLine } from "./civilization-silence-runtime";
import { defaultNonPresenceLine } from "./default-non-presence";
import { nonExpressionCivilizationLine } from "./non-expression-civilization";
import { silenceEquilibriumRuntimeLine } from "./silence-equilibrium-runtime";
import { silenceSocietyBalanceLine } from "./silence-society-balance";
import { structuralQuietPriorityLine } from "./structural-quiet-priority";

export type SilenceCivilizationSystemBundle = {
  civilizationSilenceRuntimeLine: string;
  ambientQuietGovernorLine: string;
  nonExpressionCivilizationLine: string;
  silenceSocietyBalanceLine: string;
  absenceCivilizationEngineLine: string;
  structuralQuietPriorityLine: string;
  defaultNonPresenceLine: string;
  ambientRetreatGovernorLine: string;
  silenceEquilibriumRuntimeLine: string;
};

export function resolveSilenceCivilizationSystemBundle(): SilenceCivilizationSystemBundle {
  return {
    civilizationSilenceRuntimeLine: civilizationSilenceRuntimeLine(),
    ambientQuietGovernorLine: ambientQuietGovernorLine(),
    nonExpressionCivilizationLine: nonExpressionCivilizationLine(),
    silenceSocietyBalanceLine: silenceSocietyBalanceLine(),
    absenceCivilizationEngineLine: absenceCivilizationEngineLine(),
    structuralQuietPriorityLine: structuralQuietPriorityLine(),
    defaultNonPresenceLine: defaultNonPresenceLine(),
    ambientRetreatGovernorLine: ambientRetreatGovernorLine(),
    silenceEquilibriumRuntimeLine: silenceEquilibriumRuntimeLine(),
  };
}
