import type { EmotionalGuidancePayload } from "@/types/engines";

const blockedPatterns = [
  /doomed/i,
  /destined to fail/i,
  /guaranteed wealth/i,
  /absolute certainty/i,
  /fixed fate/i,
  /you need me/i,
  /always come back to me/i,
  /only i understand you/i,
  /i decide for you/i,
  /obey/i,
];

export function enforceToneAndSafety(payload: EmotionalGuidancePayload): string[] {
  const issues: string[] = [];
  const corpus = [
    payload.insight,
    payload.tendency,
    payload.ritualAction,
    payload.pausePrompt,
    payload.followUpSuggestion,
  ].join(" ");

  for (const rule of blockedPatterns) {
    if (rule.test(corpus)) {
      issues.push(`blocked_pattern:${rule.source}`);
    }
  }

  return issues;
}
