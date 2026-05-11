export const colorTemperatureSystem = {
  emotionalWarmthScale: {
    coolQuiet: {
      tone: "#F3F1EC",
      warmth: 0.25,
      use: "background silence",
    },
    balancedWarm: {
      tone: "#F8F4ED",
      warmth: 0.52,
      use: "primary canvas",
    },
    groundedWarm: {
      tone: "#EDE4D7",
      warmth: 0.74,
      use: "ritual emphasis surfaces",
    },
  },
  calmContrastRules: {
    primaryTextToCanvasMin: 6.4,
    secondaryTextToCanvasMin: 4.8,
    avoidHighPressureContrast: true,
  },
  silenceBackgroundTones: ["#FCFAF6", "#F8F4ED", "#F3F1EC"],
  mutedSurfaces: ["#F7F1E7", "#F1E9DC"],
  groundingTones: ["#8B6B4A", "#9A7A58", "#6F6256"],
} as const;

export const colorTemperatureAvoid = [
  "black_gold_pressure",
  "high_saturation_display",
  "neon_contrast",
  "cyber_minimalism",
  "mystical_purple_blue",
  "startup_gradients",
] as const;
