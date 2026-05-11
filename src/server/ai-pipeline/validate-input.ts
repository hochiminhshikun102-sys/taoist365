import type { EmotionalGuidanceInput } from "@/types/engines";

export interface PipelineGateResult {
  pass: boolean;
  reasons: string[];
}

export function validateEmotionalInput(
  input: EmotionalGuidanceInput,
): PipelineGateResult {
  const reasons: string[] = [];

  if (!input.context.sessionId) {
    reasons.push("missing_session_id");
  }

  if (!input.context.locale || !input.context.timezone) {
    reasons.push("missing_locale_or_timezone");
  }

  return {
    pass: reasons.length === 0,
    reasons,
  };
}
