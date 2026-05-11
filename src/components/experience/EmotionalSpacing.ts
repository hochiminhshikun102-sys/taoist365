export interface EmotionalSpacingProps {
  density?: "airy" | "balanced" | "focused";
}

export function EmotionalSpacing({ density = "airy" }: EmotionalSpacingProps) {
  return {
    type: "emotional-spacing",
    density,
    intent: "reduce visual pressure and preserve breathing layout",
  } as const;
}
