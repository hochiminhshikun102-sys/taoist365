import type { EngineOutput, EmotionalGuidancePayload, RecommendationPayload } from "@/types/engines";
import type { EnvironmentalAdaptationPayload } from "@/modules/engines/environmental-adaptation-engine";
import type { RitualPlanPayload } from "@/modules/engines/ritual-engine";
import type { ContinuityPayload } from "@/modules/engines/continuity-engine";
import type { MemoryPolicyResult } from "@/agents/memory/policy";

interface ComposeInput {
  guidance: EmotionalGuidancePayload;
  ritual: EngineOutput<RitualPlanPayload>;
  environmentalAdaptation: EngineOutput<EnvironmentalAdaptationPayload>;
  recommendation: RecommendationPayload;
  continuity: EngineOutput<ContinuityPayload>;
  memoryAssessment: MemoryPolicyResult;
}

interface ComposeOutput {
  guidance: EmotionalGuidancePayload;
  recommendation: RecommendationPayload;
}

const blockedAuthorityPatterns = [
  /must obey/i,
  /i decide for you/i,
  /your fate is/i,
  /only i can guide you/i,
  /do not question/i,
];

export function composeEmotionalResponse(input: ComposeInput): ComposeOutput {
  const base = input.guidance;

  const safeTendency = sanitizeAuthorityTone(base.tendency);
  const safeFollowUp = ensureHealthyDistance(
    `${base.followUpSuggestion} ${input.continuity.payload.followUpMessage}`,
  );

  const guidance: EmotionalGuidancePayload = {
    ...base,
    tendency: `${safeTendency} Keep your own pace and choose what feels supportive.`,
    ritualAction: `${base.ritualAction} (${input.ritual.payload.estimatedMinutes} minutes)`,
    followUpSuggestion: safeFollowUp,
    emotionalSafetyNote:
      "This guidance is ordinary supportive text, not authority, destiny judgement, or a substitute for human relationships.",
  };

  const recommendation: RecommendationPayload = {
    ...input.recommendation,
    gentleCopy: ensureHealthyDistance(input.recommendation.gentleCopy),
    reasonCodes: [...input.recommendation.reasonCodes, input.memoryAssessment.scopeTag],
  };

  return { guidance, recommendation };
}

function sanitizeAuthorityTone(text: string): string {
  let output = text;
  for (const pattern of blockedAuthorityPatterns) {
    output = output.replace(pattern, "");
  }
  return output.trim();
}

function ensureHealthyDistance(text: string): string {
  const dependencyPhrases = [/always come back to me/i, /you need me/i, /only i understand you/i];
  let output = text;
  for (const pattern of dependencyPhrases) {
    output = output.replace(pattern, "");
  }
  return `${output.trim()} You can pause anytime and return when it feels right.`;
}
