import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function backgroundRetirementLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "permanenceQuiet" || stage === "rareReturn" || stage === "backgrounded") {
    return "Long prose prefers the background—foreground stays thin by design.";
  }
  return "Heavy prose channels are allowed to show sometimes; caps elsewhere still govern overlap.";
}
