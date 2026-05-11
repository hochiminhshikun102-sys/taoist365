import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function ritualRetirementEngineLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "permanenceQuiet" || stage === "rareReturn") {
    return "Ritual routes stay, but teaching tone and stepwise narration drift toward quiet—visit without a lesson plan.";
  }
  return "Ritual pages keep ordinary headings; no new instructive stack in this phase.";
}
