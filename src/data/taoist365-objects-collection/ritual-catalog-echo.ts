/**
 * Soft bridges from ritual-inventory ids → Taoist365 catalog anchors.
 * Not merchandising: same calm line weight as shelf copy; link is optional residue.
 */
export type RitualCatalogEchoLine = {
  catalogId: string;
  line: string;
};

export const ritualCatalogEchoByInventoryId: Partial<Record<string, readonly RitualCatalogEchoLine[]>> = {
  "tea-cup-warmth": [
    {
      catalogId: "taoist365-night-teacup",
      line: "If the cup you picture already lives inside laptop bloom—",
    },
    {
      catalogId: "taoist365-desk-mug-sand",
      line: "Or the sand mug still nearer the trackpad than the dish rack—",
    },
  ],
  "linen-sheet-edge": [
    {
      catalogId: "taoist365-linen-napkin-raw",
      line: "When linen means something stayed under the bowl—",
    },
  ],
  "wood-light-line": [
    {
      catalogId: "taoist365-oak-tray-narrow",
      line: "When wood only asks to catch what your pockets empty—",
    },
    {
      catalogId: "taoist365-maple-paperweight",
      line: "Or weight that keeps drafts from escaping the stack—",
    },
  ],
  "ceramic-window-bowl": [
    {
      catalogId: "taoist365-stone-smoke-dish",
      line: "Flat cool beside glass—ash or empty, still honest—",
    },
  ],
  "folded-paper-note": [
    {
      catalogId: "taoist365-layflat-notebook",
      line: "Paper that refuses to snap shut on a half sentence—",
    },
    {
      catalogId: "taoist365-cotton-letter-sheets",
      line: "Or cotton waiting for a sentence too tender for chat—",
    },
  ],
};
