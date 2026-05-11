export interface SoftTransitionProps {
  from: string;
  to: string;
  durationMs: number;
}

export function SoftTransition({ from, to, durationMs }: SoftTransitionProps) {
  return {
    type: "soft-transition",
    from,
    to,
    durationMs,
    intent: "quiet transition between ritual states",
  } as const;
}
