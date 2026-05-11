export const layoutObjectSystem = {
  layoutAnchors: {
    ceramicCalmness: {
      texture: "matte",
      role: "stability-anchor",
    },
    incenseTrace: {
      intensity: "restrained",
      role: "layout-marker",
    },
    paperAndLinen: {
      texture: "soft-fiber",
      role: "layout-anchor",
    },
    woodGrounding: {
      warmth: "quiet",
      role: "grounding-anchor",
    },
    teaWarmth: {
      warmth: "gentle",
      role: "human-scale-comfort",
    },
    naturalMaterialSilence: {
      visualNoise: "low",
      role: "calm-continuity",
    },
  },
  objectIntent: "spatial-anchor-not-product-display",
} as const;

export const layoutObjectAvoid = [
  "mystical_props",
  "occult_accessories",
  "fantasy_artifacts",
  "ecommerce_showcase",
  "decorative_overload",
] as const;
