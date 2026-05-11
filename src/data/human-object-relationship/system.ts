/**
 * Quiet human–object cohabitation: state, not use; living-with, not display.
 * Same grammar across rituals — no craft story, benefit copy, or ownership pressure.
 */
const livedWithPresenceByItemId: Record<string, string> = {
  "folded-paper-note":
    "Stopped mid-fold where the last line ended; the crease has softened from being opened again.",
  "tea-cup-warmth":
    "Set back before it dried; a shallow ring stays inside, unclaimed and ordinary.",
  "ceramic-window-bowl":
    "Sits nearer the glass than the table’s middle—still a little off-center from the last time it was set down.",
  "linen-sheet-edge":
    "Left half-open; one edge loosened where an arm or a book last rested.",
  "wood-light-line":
    "Stays along the same board; light finds it before it gets moved for other reasons.",
  "incense-after-scent":
    "Holder cool while the air thins; the trace stays narrow enough to leave alone.",
  "open-corner-space":
    "Kept bare on purpose long enough that the emptiness has its own habit.",
  "unfinished-page":
    "Turned down at the same line; the margin wears a little dull from thumb and pause.",
};

export function livedWithLine(itemId: string): string {
  return livedWithPresenceByItemId[itemId] ?? "Kept nearby long enough to forget it was ever new.";
}
