/**
 * Browser-side temporal residue — continuity without CRM memory.
 */

export const browserTemporalResidue = {
  allowed: [
    "Pinned tabs, long-open tabs, reopened history—same hostname, uneven cadence.",
    "Browser chrome dims before wallpaper catches up.",
    "Scroll depth informal debt—not tracked attention metrics.",
    "Same path again—ordinary ritual, not adaptive profiling.",
  ],

  forbidden: [
    "Welcome back, we missed you, remembered-you narratives.",
    "Personalized memory claims, streak UI, session restoration prompts.",
    "Server recall of last guidance state or cross-device mood sync.",
  ],

  /** Single line for footers / margins */
  footerLine:
    "Continuity stays in the browser—tabs, brightness, uneven reopen—not in a profile here.",
} as const;
