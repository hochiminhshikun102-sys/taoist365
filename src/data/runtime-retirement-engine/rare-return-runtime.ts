import type { RuntimeRetirementEngineStage } from "./retirement-stages";

export function rareReturnRuntimeLine(stage: RuntimeRetirementEngineStage): string {
  if (stage === "rareReturn" || stage === "permanenceQuiet") {
    return "A few runtimes may return briefly on quiet days—never as a growing stack, only as a rare breath.";
  }
  return "Most channels stay on steady duty; rare return is not scheduled as spectacle.";
}
