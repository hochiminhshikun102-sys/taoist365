import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function mailRetirementEngineLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "permanenceQuiet" || stage === "rareReturn") {
    return "Mail copy avoids pipeline language; long threads age in place instead of re-explaining the shelf.";
  }
  return "Mail stays correspondence-shaped; retirement here means fewer meta paragraphs, not fewer humans.";
}
