import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function runtimeAgingBehaviorLine(stage: RuntimeRetirementEngineStage): string {
  return `World age maps to stage “${stage}”: older days bias toward default presence instead of fresh explanation.`;
}
