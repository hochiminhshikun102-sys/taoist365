import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function permanentRetirementLine(stage: RuntimeRetirementEngineStage): string {
  if (stage !== "permanenceQuiet" && stage !== "rareReturn") {
    return "Some explanations stay available today—still flat, still human-sized.";
  }
  return "Anti-meta, runtime talk, and system self-narration stay retired: the site does not rehearse how it works.";
}
