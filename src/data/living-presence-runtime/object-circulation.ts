import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "./same-day-world-state";

/**
 * Sparse editorial circulation — same object phrases may surface on Daily / Desk / Mail / shelf.
 * Not recommendations — occasional coordinate echoes.
 */

export type CatalogPieceId =
  | "taoist365-desk-mug-sand"
  | "taoist365-linen-napkin-raw"
  | "taoist365-oak-tray-narrow"
  | "taoist365-stone-smoke-dish"
  | "taoist365-layflat-notebook"
  | "taoist365-cotton-letter-sheets"
  | "taoist365-night-teacup"
  | "taoist365-maple-paperweight";

/** Sparse echo lines keyed by catalog id — most days null via gate in pickCirculationEcho */
export const circulationEchoes: Record<CatalogPieceId, readonly string[]> = {
  "taoist365-desk-mug-sand": [
    "Sand mug nearer the trackpad than yesterday’s dishes.",
    "The short rim cooled uneven—same mug, different patience.",
  ],
  "taoist365-linen-napkin-raw": [
    "Linen left on the chair back — fold migrated without instruction.",
    "Raw hem softer where thumbs grabbed hot.",
  ],
  "taoist365-oak-tray-narrow": [
    "Oak tongue collecting softer marks — keys land quieter.",
    "Tray slid half an inch toward the outlet cord.",
  ],
  "taoist365-stone-smoke-dish": [
    "Flat stone kept the sill honest another humid week.",
    "Ash sat gray; nobody staged the lesson.",
  ],
  "taoist365-layflat-notebook": [
    "Notebook spine looser — spreads flat without asking.",
    "Oat cover curling where humidity voted.",
  ],
  "taoist365-cotton-letter-sheets": [
    "Paper edges softening — mail slower lately.",
    "Cotton stack thinner — fewer ceremonial folds.",
  ],
  "taoist365-night-teacup": [
    "Night cup surviving several evenings — rim stain democracy.",
    "Short crackle cup inside laptop bloom — same patience.",
  ],
  "taoist365-maple-paperweight": [
    "Maple block pinning paper slower — unpaid edge honest.",
    "Grain warmed where palm rested longer lately.",
  ],
};

/** Aging layer — time passes through materials, not vintage fetish. */
export const objectAgingLines: Record<CatalogPieceId, readonly string[]> = {
  "taoist365-desk-mug-sand": [
    "Glaze darkening slightly where thumbs vote daily.",
    "Spine of handle polish — anonymous democracy of reach.",
  ],
  "taoist365-linen-napkin-raw": [
    "Linen folding permanently into one crease.",
    "Edges warming toward honesty faster than drawer.",
  ],
  "taoist365-oak-tray-narrow": [
    "Tray collecting softer marks — coins wrote slower rings.",
    "Grain raised where oil met keys first.",
  ],
  "taoist365-stone-smoke-dish": [
    "Stone stayed cool longer — ash learned its seat.",
    "Sill dust counted weeks without dashboard.",
  ],
  "taoist365-layflat-notebook": [
    "Notebook spine loosening — signatures migrating inward.",
    "Paper edges warming toward thumb honesty.",
  ],
  "taoist365-cotton-letter-sheets": [
    "Cotton fibers easing — corners surrender slower.",
    "Fold marks permanent — linen democracy of drafts.",
  ],
  "taoist365-night-teacup": [
    "Glaze micro-scuffs — thumb constituency unchanged.",
    "Base ring darker — tannin sediment honest.",
  ],
  "taoist365-maple-paperweight": [
    "Oil from palms slower to leave — maple darker honestly.",
    "Edge ding accrued — apartment democracy of bumps.",
  ],
};

export function pickCirculationEcho(pieceId: string, dayKey: string): string | null {
  const lines = circulationEchoes[pieceId as CatalogPieceId];
  if (!lines?.length) return null;
  const gate = dailyIndex(dayKey + ":circ:" + pieceId, 100);
  if (gate > 22) return null;
  return lines[dailyIndex(dayKey + pieceId, lines.length)]!;
}

const GENERIC_AGING: readonly string[] = [
  "Surfaces keep voting slowly — no SKU clocks them.",
  "Edges soften at different speeds — ordinary democracy of thumbs.",
];

export function pickObjectAgingLine(pieceId: string, dayKey: string): string {
  const lines = objectAgingLines[pieceId as CatalogPieceId] ?? GENERIC_AGING;
  const idx = dailyIndex(dayKey + ":age:" + pieceId, lines.length);
  return lines[idx]!;
}

/** Inventory ids used on homepage shelf — optional cross-page echo */
export function circulationEchoForInventoryId(id: string, dayKey: string): string | null {
  const map: Record<string, CatalogPieceId> = {
    "tea-cup-warmth": "taoist365-desk-mug-sand",
    "linen-sheet-edge": "taoist365-linen-napkin-raw",
    "wood-light-line": "taoist365-oak-tray-narrow",
    "ceramic-window-bowl": "taoist365-stone-smoke-dish",
    "folded-paper-note": "taoist365-linen-napkin-raw",
  };
  const catalog = map[id];
  if (!catalog) return null;
  return pickCirculationEcho(catalog, dayKey);
}

/** Desk side note — sparse */
export function deskCirculationLine(dayKey: string, worldId: WorldStateId): string | null {
  const gate = dailyIndex(dayKey + ":desk-circ", 100);
  if (gate > 24) return null;
  const lines = [
    "Tray edge rotated toward the cord — nobody scored it.",
    "Mug shadow longer tonight — same Pacific day as elsewhere on this domain.",
    "Paper corner lifted — humidity won another vote.",
  ];
  return lines[dailyIndex(dayKey + worldId, lines.length)]!;
}
