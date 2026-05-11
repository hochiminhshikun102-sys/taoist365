export type RitualObjectFamily =
  | "paper-guidance"
  | "tea-vessel"
  | "ceramic-stillness"
  | "cloth-linen"
  | "wood-grounding"
  | "incense-aftermath"
  | "quiet-corner"
  | "quiet-objects";

export interface RitualInventoryItem {
  id: string;
  name: string;
  family: RitualObjectFamily;
  relationship: "grounding" | "soft-focus" | "stillness" | "warmth" | "still";
  presence: "low" | "medium";
  rhythm: "settling" | "holding" | "lingering";
  atmosphere: "warm" | "quiet" | "soft";
  silence: "open" | "resting";
}

export const ritualObjectFamilies: Record<RitualObjectFamily, string> = {
  "paper-guidance": "Paper and guidance objects",
  "tea-vessel": "Tea and vessel objects",
  "ceramic-stillness": "Ceramic stillness objects",
  "cloth-linen": "Cloth and linen objects",
  "wood-grounding": "Wood grounding objects",
  "incense-aftermath": "Incense aftermath objects",
  "quiet-corner": "Quiet corner objects",
  "quiet-objects": "Quiet objects",
};

export const ritualInventory: RitualInventoryItem[] = [
  {
    id: "folded-paper-note",
    name: "Folded paper note",
    family: "paper-guidance",
    relationship: "still",
    presence: "low",
    rhythm: "lingering",
    atmosphere: "quiet",
    silence: "open",
  },
  {
    id: "tea-cup-warmth",
    name: "Tea cup with remaining warmth",
    family: "tea-vessel",
    relationship: "warmth",
    presence: "medium",
    rhythm: "holding",
    atmosphere: "warm",
    silence: "resting",
  },
  {
    id: "ceramic-window-bowl",
    name: "Ceramic bowl near the window",
    family: "ceramic-stillness",
    relationship: "stillness",
    presence: "medium",
    rhythm: "settling",
    atmosphere: "soft",
    silence: "resting",
  },
  {
    id: "linen-sheet-edge",
    name: "Linen sheet left half-open",
    family: "cloth-linen",
    relationship: "soft-focus",
    presence: "low",
    rhythm: "lingering",
    atmosphere: "soft",
    silence: "open",
  },
  {
    id: "wood-light-line",
    name: "Quiet wood edge in warm light",
    family: "wood-grounding",
    relationship: "grounding",
    presence: "medium",
    rhythm: "holding",
    atmosphere: "warm",
    silence: "resting",
  },
  {
    id: "incense-after-scent",
    name: "A faint incense trace after stillness",
    family: "incense-aftermath",
    relationship: "still",
    presence: "low",
    rhythm: "lingering",
    atmosphere: "quiet",
    silence: "open",
  },
  {
    id: "open-corner-space",
    name: "One corner intentionally left open",
    family: "quiet-corner",
    relationship: "grounding",
    presence: "medium",
    rhythm: "holding",
    atmosphere: "quiet",
    silence: "open",
  },
  {
    id: "unfinished-page",
    name: "A page left unfinished",
    family: "quiet-objects",
    relationship: "still",
    presence: "low",
    rhythm: "lingering",
    atmosphere: "soft",
    silence: "open",
  },
];

export function pickInventory(...ids: string[]) {
  return ids
    .map((id) => ritualInventory.find((item) => item.id === id))
    .filter((item): item is RitualInventoryItem => Boolean(item));
}
