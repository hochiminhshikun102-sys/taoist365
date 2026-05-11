export const materialSurfaceLanguage = {
  paperSoftness: {
    textureIntent: "soft-fiber",
    contrast: "low",
    edgeDefinition: "gentle",
  },
  linenFeeling: {
    warmth: "medium",
    roughness: "subtle",
    use: "large calm surfaces",
  },
  ceramicCalmness: {
    highlight: "muted",
    depth: "shallow",
    use: "ritual content containers",
  },
  quietWoodWarmth: {
    toneRange: ["#8B6B4A", "#9A7A58"],
    saturation: "restrained",
  },
  softMatteSurfaces: {
    gloss: "none",
    layeringPressure: "low",
  },
  breathingShadows: {
    blur: 28,
    opacity: 0.08,
    spread: 0,
  },
} as const;

export const materialSurfaceAvoid = [
  "glassmorphism_overload",
  "floating_saas_cards",
  "crypto_shine",
  "hard_glossy_ui",
  "over_layered_finish",
] as const;
