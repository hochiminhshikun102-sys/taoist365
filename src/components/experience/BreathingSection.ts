export interface BreathingSectionProps {
  name: string;
  pauseBeforeMs?: number;
}

export function BreathingSection({
  name,
  pauseBeforeMs = 900,
}: BreathingSectionProps) {
  return {
    type: "breathing-section",
    name,
    pauseBeforeMs,
    intent: "create emotional silence before new guidance",
  } as const;
}
