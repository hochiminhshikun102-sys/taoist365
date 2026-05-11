import type {
  EmotionalGuidanceInput,
  EmotionalGuidancePayload,
  RecommendationPayload,
} from "@/types/engines";
import { guidanceEngine } from "@/modules/engines/guidance-engine";
import { environmentalAdaptationEngine } from "@/modules/engines/environmental-adaptation-engine";
import { recommendationEngine } from "@/modules/engines/recommendation-engine";
import { continuityEngine } from "@/modules/engines/continuity-engine";
import { ritualEngine } from "@/modules/engines/ritual-engine";
import { buildRitualRhythm } from "@/modules/ritual-rhythm";
import { resolvePolicyRuleSet } from "@/policies/shared/resolver";
import type { RegionCode } from "@/policies/shared/types";
import { getRegionalAdaptation } from "@/regions/adaptations";
import { composeEmotionalResponse } from "@/server/ai-pipeline/response-composer";
import { assessInteractionHealth } from "@/server/interaction-health";
import { evaluateMemoryPolicy } from "@/agents/memory/policy";

export interface AtmosphereCoordinationOutcome {
  guidance: EmotionalGuidancePayload;
  recommendation: RecommendationPayload;
  healthDistanceNote: string;
  interactionHealth: ReturnType<typeof assessInteractionHealth>;
  policyVersion: string;
}

/**
 * Atmosphere coordination objectives:
 * - Emotional calmness
 * - Reflection
 * - Gentle rhythm and ritual pacing
 * - Healthy distance from dependency on synthetic rapport
 */
export async function coordinateGuidanceAtmosphere(
  input: EmotionalGuidanceInput,
): Promise<AtmosphereCoordinationOutcome> {
  const region: RegionCode = input.context.region ?? "global";
  const policy = resolvePolicyRuleSet(region, input.context.abBucket ?? "A");
  const adaptation = getRegionalAdaptation(region);
  const rhythm = buildRitualRhythm(policy);
  const memoryAssessment = evaluateMemoryPolicy(input.context.journeyMemory);

  const environmentalAdaptation = await environmentalAdaptationEngine.run(input);
  const guidance = await guidanceEngine.run(input);
  const ritual = await ritualEngine.run(input);
  const recommendation = await recommendationEngine.run(input);
  const continuity = await continuityEngine.run(input);

  const composed = composeEmotionalResponse({
    guidance: guidance.payload,
    ritual,
    environmentalAdaptation,
    recommendation: recommendation.payload,
    continuity,
    memoryAssessment,
  });
  const interactionHealth = assessInteractionHealth({
    currentSessionMinutes: input.context.sessionMinutes ?? 8,
    rhythm,
  });

  return {
    guidance: composed.guidance,
    recommendation: composed.recommendation,
    healthDistanceNote:
      `This system preserves healthy distance and calm ritual pacing for ${adaptation.region}.`,
    interactionHealth,
    policyVersion: policy.version,
  };
}
