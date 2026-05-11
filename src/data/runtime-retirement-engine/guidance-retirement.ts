import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function guidanceRetirementEngineLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "backgrounded" || stage === "rareReturn" || stage === "permanenceQuiet") {
    return "Guidance stops trying to complete the room: weather and a short exit can be the whole session.";
  }
  return "Guidance may still carry a second noticing when stacks are calm—never as a performance of care.";
}
