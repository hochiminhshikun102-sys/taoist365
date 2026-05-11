export interface CalmRevealProps {
  stages: string[];
  cadenceMs: number;
}

export function CalmReveal({ stages, cadenceMs }: CalmRevealProps) {
  return {
    type: "calm-reveal",
    stages,
    cadenceMs,
    intent: "progressive reveal without chat-tool feeling",
  } as const;
}
