import type { RitualInventoryItem } from "@/data/ritual-inventory/system";
import { pickInventory } from "@/data/ritual-inventory/system";

const homeBring = pickInventory("ceramic-window-bowl", "linen-sheet-edge", "wood-light-line");
const drawBring = pickInventory("folded-paper-note", "tea-cup-warmth");
const dailyBring = pickInventory("tea-cup-warmth", "linen-sheet-edge");
const harmonyBring = pickInventory("ceramic-window-bowl", "linen-sheet-edge");

const livingHandle: Record<string, string> = {
  "ceramic-window-bowl": "Window bowl",
  "linen-sheet-edge": "Linen edge",
  "wood-light-line": "Wood strip",
  "folded-paper-note": "Folded note",
  "tea-cup-warmth": "Cup",
  "incense-after-scent": "Incense trace",
  "open-corner-space": "Open corner",
  "unfinished-page": "Half-read page",
};

type CommerceContext = "homepage" | "drawALot" | "dailyGuidance" | "homeHarmony";

function bridgeLine(item: RitualInventoryItem, context: CommerceContext): string {
  const h = livingHandle[item.id] ?? item.name;
  const lines: Record<CommerceContext, Record<string, string>> = {
    homepage: {
      "ceramic-window-bowl": `${h} on sill.`,
      "linen-sheet-edge": `${h} on rail.`,
      "wood-light-line": `${h} along wall.`,
    },
    drawALot: {
      "folded-paper-note": `${h} on desk.`,
      "tea-cup-warmth": `${h} cooling.`,
    },
    dailyGuidance: {
      "tea-cup-warmth": `${h} nearby.`,
      "linen-sheet-edge": `${h} visible.`,
    },
    homeHarmony: {
      "ceramic-window-bowl": `${h} on shelf.`,
      "linen-sheet-edge": `${h} uneven.`,
    },
  };
  return lines[context][item.id] ?? `${h} nearby.`;
}

function bringLines(items: RitualInventoryItem[], context: CommerceContext): readonly string[] {
  return items.map((item) => bridgeLine(item, context));
}

export const gentleCommercePresence = {
  shared: {
    heading: "Mail if nearer",
    closing: "Humans reply by mail—no cart, no fulfillment copy.",
  },
  homepage: {
    line: "Picture it home; write mail when ready.",
    bringIntoLife: bringLines(homeBring, "homepage"),
  },
  drawALot: {
    line: "Objects stay where hands left them.",
    bringIntoLife: bringLines(drawBring, "drawALot"),
  },
  dailyGuidance: {
    line: "Cup or linen within reach—optional.",
    bringIntoLife: bringLines(dailyBring, "dailyGuidance"),
  },
  homeHarmony: {
    line: "Shelf already holds most of it.",
    bringIntoLife: bringLines(harmonyBring, "homeHarmony"),
  },
} as const;
