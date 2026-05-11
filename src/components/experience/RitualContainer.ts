export interface RitualContainerProps {
  mode: "draw-lot" | "daily-guidance" | "home-harmony";
}

export function RitualContainer({ mode }: RitualContainerProps) {
  return {
    type: "ritual-container",
    mode,
    intent: "hold a calm, non-dashboard ritual space",
  } as const;
}
