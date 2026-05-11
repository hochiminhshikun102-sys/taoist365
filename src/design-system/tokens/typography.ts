export const typographyTokens = {
  fontFamily: {
    display: "var(--font-lora)",
    body: "var(--font-inter)",
    mono: "var(--font-geist-mono)",
  },
  fontSize: {
    h1: ["3rem", { lineHeight: "3.5rem", fontWeight: "600" }],
    h2: ["2.25rem", { lineHeight: "2.75rem", fontWeight: "600" }],
    h3: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "600" }],
    bodyLg: ["1.125rem", { lineHeight: "1.875rem", fontWeight: "400" }],
    body: ["1rem", { lineHeight: "1.625rem", fontWeight: "400" }],
    caption: ["0.875rem", { lineHeight: "1.375rem", fontWeight: "500" }],
  },
} as const;
