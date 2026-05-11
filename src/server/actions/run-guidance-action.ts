"use server";

import { routeEmotionalFlow } from "@/agents/router/route-emotional-flow";
import { evaluateMemoryPolicy } from "@/agents/memory/policy";
import { coordinateGuidanceAtmosphere } from "@/server/ai-pipeline/atmosphere-coordinator";
import { validateEmotionalInput } from "@/server/ai-pipeline/validate-input";
import { enforceToneAndSafety } from "@/server/security/enforce-tone-safety";
import type { EmotionalGuidanceInput, EmotionalGuidancePayload } from "@/types/engines";

export interface RunGuidanceActionResult {
  ok: boolean;
  route?: string;
  safetyMode?: "passed" | "blocked";
  issues?: string[];
}

export async function runGuidanceAction(
  input: EmotionalGuidanceInput,
  draftPayload: EmotionalGuidancePayload,
): Promise<RunGuidanceActionResult> {
  const inputGate = validateEmotionalInput(input);
  if (!inputGate.pass) {
    return { ok: false, issues: inputGate.reasons, safetyMode: "blocked" };
  }

  const memoryPolicy = evaluateMemoryPolicy(input.context.journeyMemory);
  if (!memoryPolicy.pass) {
    return { ok: false, issues: memoryPolicy.reasons, safetyMode: "blocked" };
  }

  const toneIssues = enforceToneAndSafety(draftPayload);
  if (toneIssues.length > 0) {
    return { ok: false, issues: toneIssues, safetyMode: "blocked" };
  }

  await coordinateGuidanceAtmosphere(input);
  const route = routeEmotionalFlow(input);

  return { ok: true, route: route.primaryAgent, safetyMode: "passed" };
}
