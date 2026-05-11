import { ambientAbsencePriorityLine } from "./ambient-absence-priority";
import { defaultQuietPressureLine } from "./default-quiet-pressure";
import { nonExpressionRuntimeLine } from "./non-expression-runtime";
import { presenceRetreatGovernorLine } from "./presence-retreat-governor";
import { quietSurfaceEquilibriumLine } from "./quiet-surface-equilibrium";
import { residueThinningSystemLine } from "./residue-thinning-system";
import { silenceBudgetEngineLine } from "./silence-budget-engine";
import { silencePriorityRuntimeLine } from "./silence-priority-runtime";
import { structuralRetreatRuntimeLine } from "./structural-retreat-runtime";

export type SilencePrioritySystemBundle = {
  silencePriorityRuntimeLine: string;
  presenceRetreatGovernorLine: string;
  nonExpressionRuntimeLine: string;
  quietSurfaceEquilibriumLine: string;
  ambientAbsencePriorityLine: string;
  residueThinningSystemLine: string;
  structuralRetreatRuntimeLine: string;
  silenceBudgetEngineLine: string;
  defaultQuietPressureLine: string;
};

export function resolveSilencePrioritySystemBundle(): SilencePrioritySystemBundle {
  return {
    silencePriorityRuntimeLine: silencePriorityRuntimeLine(),
    presenceRetreatGovernorLine: presenceRetreatGovernorLine(),
    nonExpressionRuntimeLine: nonExpressionRuntimeLine(),
    quietSurfaceEquilibriumLine: quietSurfaceEquilibriumLine(),
    ambientAbsencePriorityLine: ambientAbsencePriorityLine(),
    residueThinningSystemLine: residueThinningSystemLine(),
    structuralRetreatRuntimeLine: structuralRetreatRuntimeLine(),
    silenceBudgetEngineLine: silenceBudgetEngineLine(),
    defaultQuietPressureLine: defaultQuietPressureLine(),
  };
}
