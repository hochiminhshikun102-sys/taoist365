import { surfaceTonePlaceholders } from "@/design-system/surface-tone";

export interface HomeHarmonySurfaceZone {
  id: string;
  role:
    | "spatial-stillness"
    | "material-layout"
    | "grounding-guidance"
    | "natural-rhythm-transition";
  transitionWidth: "wide" | "very-wide";
  visualMotion: "still" | "low";
  sectionShift: string;
}

export const homeHarmonySurface: HomeHarmonySurfaceZone[] = [
  {
    id: "stillness",
    role: "spatial-stillness",
    transitionWidth: "very-wide",
    visualMotion: "still",
    sectionShift: "from utility mindset to space awareness",
  },
  {
    id: "material",
    role: "material-layout",
    transitionWidth: "wide",
    visualMotion: "low",
    sectionShift: "from abstract mood to tangible calm environment",
  },
  {
    id: "grounding",
    role: "grounding-guidance",
    transitionWidth: "wide",
    visualMotion: "low",
    sectionShift: "from observation to grounded pacing",
  },
  {
    id: "transition",
    role: "natural-rhythm-transition",
    transitionWidth: "very-wide",
    visualMotion: "still",
    sectionShift: "from flow awareness to slow living continuation",
  },
];

export const homeHarmonySurfaceTone = surfaceTonePlaceholders;
