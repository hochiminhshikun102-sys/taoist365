export const typographyEmotionSystem = {
  display: {
    intent: "restrained_editorial",
    fontFamilyToken: "--font-lora",
    size: "clamp(2.25rem, 5vw, 4rem)",
    lineHeight: 1.2,
    letterSpacing: "0.01em",
  },
  ritualQuote: {
    intent: "quiet_plain",
    size: "clamp(1.25rem, 2.8vw, 1.9rem)",
    lineHeight: 1.7,
    maxWidth: "42ch",
  },
  guidance: {
    intent: "clear_warm_supportive",
    size: "1.0625rem",
    lineHeight: 1.9,
    maxWidth: "66ch",
  },
  standardParagraphSpacing: {
    paragraphGap: "1.1em",
    sectionGap: "2.2em",
  },
  softEmphasis: {
    style: "weight_shift_and_tone",
    allowedWeights: [400, 500, 600],
    avoidAllCapsBody: true,
    avoidTechyCodeAesthetic: true,
  },
} as const;

export const typographyEmotionAntiPatterns = [
  "startup_sans_overload",
  "tight_line_height",
  "marketing_hype_typography",
  "aggressive_bold_usage",
] as const;
