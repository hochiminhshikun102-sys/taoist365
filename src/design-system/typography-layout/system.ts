export const typographyAtmosphere = {
  breathingReadingRhythm: {
    bodyLineHeight: 1.86,
    paragraphGapEm: 1.15,
    maxReadingWidth: "68ch",
  },
  slowLinePacing: {
    headingLineHeight: 1.24,
    subheadingLineHeight: 1.52,
    avoidCompressedBlocks: true,
  },
  continuitySpacing: {
    sectionIntroGap: "clamp(1.25rem, 3vw, 2rem)",
    sectionGap: "clamp(2rem, 5vw, 3.5rem)",
  },
  quietEmphasis: {
    preferredWeights: [400, 500, 600],
    emphasisMethod: "tone_and_spacing",
    avoidExcessBold: true,
  },
  warmRestraint: {
    letterSpacing: "0.005em",
    punctuationDensity: "calm",
  },
} as const;

export const typographyAtmosphereAvoid = [
  "aggressive_bold_hierarchy",
  "productivity_typography",
  "app_ui_typography",
  "over_condensed_layouts",
] as const;
