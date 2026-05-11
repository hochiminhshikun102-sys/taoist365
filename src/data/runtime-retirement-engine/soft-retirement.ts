import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function softRetirementLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "vocal" || stage === "softening") {
    return "Guidance residue and ritual teaching tone can still surface—lightly, when regulation allows.";
  }
  return "Guidance residue, ritual teaching tone, anti-overdesign and anti-performance lines step toward background—heard less often, not deleted.";
}
