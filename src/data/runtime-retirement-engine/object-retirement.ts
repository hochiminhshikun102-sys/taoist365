import type { RuntimeRetirementEngineStage } from "./retirement-stages";

/** Object channel retirement (engine policy) — distinct from catalog object-quiet-retirement copy. */
export function objectRetirementEngineLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "softening" || stage === "backgrounded" || stage === "rareReturn" || stage === "permanenceQuiet") {
    return "Objects move toward infrastructure: less re-introduction, more “already in the room” posture.";
  }
  return "Object foreground stays regulated by existing caps; this layer only names the direction.";
}
