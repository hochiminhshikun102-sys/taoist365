import { evaluateRhythmGuard } from "@/modules/ritual-rhythm/rhythm-guard";
import type { RitualRhythmState } from "@/modules/ritual-rhythm/rhythm-engine";

export interface InteractionHealthInput {
  currentSessionMinutes: number;
  rhythm: RitualRhythmState;
}

export interface InteractionHealthResult {
  interactionPacing: "calm" | "slowdown";
  cooldownSuggestion?: string;
  betweenStepPause?: string;
  ritualSpacingNote: string;
  healthyBoundaryNote: string;
}

export function assessInteractionHealth(
  input: InteractionHealthInput,
): InteractionHealthResult {
  const guard = evaluateRhythmGuard(input.currentSessionMinutes, input.rhythm);

  if (guard.shouldSuggestPause) {
    return {
      interactionPacing: "slowdown",
      cooldownSuggestion: "Take a short break before the next guidance step.",
      betweenStepPause: "Pause for a few quiet minutes and return only if it feels helpful.",
      ritualSpacingNote: "Spacing rituals helps preserve clarity and calmness.",
      healthyBoundaryNote: "Guidance is optional support, not continuous dependence.",
    };
  }

  return {
    interactionPacing: guard.shouldSlowDown ? "slowdown" : "calm",
    ritualSpacingNote: "Keep a gentle pace between rituals.",
    healthyBoundaryNote: "A healthy rhythm includes room away from the product.",
  };
}
