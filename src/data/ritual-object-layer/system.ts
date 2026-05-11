import { pickInventory } from "@/data/ritual-inventory/system";

const homepageObjects = pickInventory(
  "ceramic-window-bowl",
  "linen-sheet-edge",
  "wood-light-line",
  "tea-cup-warmth",
);

const drawObjects = pickInventory("ceramic-window-bowl", "folded-paper-note", "tea-cup-warmth");
const dailyObjects = pickInventory("tea-cup-warmth", "folded-paper-note", "wood-light-line");
const homeObjects = pickInventory("ceramic-window-bowl", "linen-sheet-edge", "wood-light-line");

export const ritualObjectLayer = {
  homepage: {
    objects: homepageObjects.map((item) => item.name),
    traces: ["Dog-eared page.", "Cup ring.", "Empty corner kept empty."],
  },
  drawALot: {
    anchorLine: "Bowl, note, cup—desk clutter.",
    softObjects: drawObjects.map((item) => item.name),
  },
  dailyGuidance: {
    anchorLine: "Cup, paper, wood—within reach.",
    softObjects: dailyObjects.map((item) => item.name),
  },
  homeHarmony: {
    anchorLine: "Ceramic, linen, wood—used surfaces.",
    softObjects: homeObjects.map((item) => item.name),
  },
} as const;
