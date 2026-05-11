import type { RitualRhythmState } from "@/modules/ritual-rhythm/rhythm-engine";

export interface RhythmGuardResult {
  shouldSlowDown: boolean;
  shouldSuggestPause: boolean;
  notes: string[];
}

export function evaluateRhythmGuard(
  sessionMinutes: number,
  rhythm: RitualRhythmState,
): RhythmGuardResult {
  const notes: string[] = [];
  const shouldSuggestPause = sessionMinutes >= rhythm.sessionBoundaryMinutes;
  const shouldSlowDown = sessionMinutes >= rhythm.sessionBoundaryMinutes * 0.7;

  if (shouldSlowDown) {
    notes.push("soft_slowdown");
  }

  if (shouldSuggestPause) {
    notes.push("between_step_pause_suggestion");
  }

  return { shouldSlowDown, shouldSuggestPause, notes };
}
