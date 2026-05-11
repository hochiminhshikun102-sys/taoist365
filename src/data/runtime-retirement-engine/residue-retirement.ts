import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function residueRetirementLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "permanenceQuiet") {
    return "Residual copy thins: what remains is structural, not additive.";
  }
  return "Residual channels keep a small deterministic footprint—no new residue families in this phase.";
}
