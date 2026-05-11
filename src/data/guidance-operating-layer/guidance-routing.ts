/**
 * Soft routing language — doors, not CTAs.
 */

export const guidanceRouting = {
  /** Prefix for link section — never “Try this now.” */
  softIntro: "This might fit quietly beside tonight:",
  /** Object gravity lines — coordinates, not SKUs */
  objectCoordinates: {
    sandMug: "the sand mug nearer the trackpad than the dish rack",
    nightCup: "the short crackle cup inside laptop bloom",
    linenChair: "linen left on the chair back because the table never cleared",
    oakTray: "the oak tongue that slowly became where keys land",
    mapleBlock: "the maple block still pinning the same unpaid edge",
    notebook: "the oat notebook cracked open where the sentence quit",
    stoneSill: "the flat stone that kept the sill honest through humid weeks",
    cottonSheets: "cotton sheets waiting when thumbs want weight not chat",
  },
} as const;
