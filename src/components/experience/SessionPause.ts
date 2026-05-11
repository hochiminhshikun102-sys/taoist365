export interface SessionPauseProps {
  durationMs: number;
}

export function SessionPause({ durationMs }: SessionPauseProps) {
  return {
    type: "between-step-pause",
    durationMs,
    intent: "leave space after reveal before continuation",
  } as const;
}
