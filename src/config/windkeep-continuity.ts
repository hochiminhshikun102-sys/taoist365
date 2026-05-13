import { commerceObjects } from "@/config/operational-commerce";

export type WindkeepObjectMemory = {
  objectId: string;
  shortStory: string;
  previousKeeper: string;
  passingTime: string;
  cities: readonly string[];
  years: readonly string[];
  traces: readonly string[];
  continuityNotes: readonly string[];
  quietPairing: string;
};

const memoryByObjectId: Record<string, WindkeepObjectMemory> = {
  "taoist365-desk-mug-sand": {
    objectId: "taoist365-desk-mug-sand",
    shortStory: "Kept beside a kitchen window through three quiet winters.",
    previousKeeper: "a night-shift reader",
    passingTime: "3 winters",
    cities: ["Portland", "Vancouver"],
    years: ["2022", "2023", "2025"],
    traces: ["warm water marks", "morning steam", "one repaired rim note"],
    continuityNotes: [
      "Held during a year of early trains.",
      "Returned to the shelf whenever the room became loud.",
      "Ready for a table where mornings are kept slow.",
    ],
    quietPairing: "May continue well near a small desk, a kettle, or a window that receives first light.",
  },
  "taoist365-linen-napkin-raw": {
    objectId: "taoist365-linen-napkin-raw",
    shortStory: "Passed through two homes as a soft surface for letters and cups.",
    previousKeeper: "a person who wrote slowly",
    passingTime: "2 homes",
    cities: ["Lisbon", "Brooklyn"],
    years: ["2021", "2024"],
    traces: ["fold memory", "faint tea warmth", "paper dust"],
    continuityNotes: [
      "Stayed under unfinished letters.",
      "Carried the feeling of a table cleared at night.",
      "May continue where hands need something plain and soft.",
    ],
    quietPairing: "May continue well with someone who keeps paper, tea, and small pauses close.",
  },
  "taoist365-oak-tray-narrow": {
    objectId: "taoist365-oak-tray-narrow",
    shortStory: "Held keys, receipts, and one difficult year without asking to be noticed.",
    previousKeeper: "a hallway keeper",
    passingTime: "14 months",
    cities: ["Chicago"],
    years: ["2023", "2024"],
    traces: ["soft corner wear", "receipt shadow", "doorway dust"],
    continuityNotes: [
      "Stayed near the door while a home changed shape.",
      "Kept ordinary things from scattering.",
      "Ready for another threshold.",
    ],
    quietPairing: "May continue well in a room where small arrivals need a place to land.",
  },
  "taoist365-stone-smoke-dish": {
    objectId: "taoist365-stone-smoke-dish",
    shortStory: "Rested on a tile ledge while the room learned to breathe again.",
    previousKeeper: "a window opener",
    passingTime: "one long spring",
    cities: ["Melbourne", "Auckland"],
    years: ["2024"],
    traces: ["ash memory", "stone coolness", "open-window air"],
    continuityNotes: [
      "Used only when the window was open.",
      "Stayed quiet through moving boxes.",
      "May continue where air and care are both present.",
    ],
    quietPairing: "May continue well with someone who wants a small place for release, not display.",
  },
  "taoist365-layflat-notebook": {
    objectId: "taoist365-layflat-notebook",
    shortStory: "Opened beside a lamp during a season when words arrived slowly.",
    previousKeeper: "a quiet note taker",
    passingTime: "8 months",
    cities: ["Toronto"],
    years: ["2025"],
    traces: ["pressed pages", "lamp shadow", "margin breath"],
    continuityNotes: [
      "Kept beside a laptop without becoming work.",
      "Held lists that were never finished.",
      "May continue where thoughts need room before becoming sentences.",
    ],
    quietPairing: "May continue well beside a person returning to writing without pressure.",
  },
  "taoist365-cotton-letter-sheets": {
    objectId: "taoist365-cotton-letter-sheets",
    shortStory: "Moved between drawers, waiting for words that could not be rushed.",
    previousKeeper: "a patient correspondent",
    passingTime: "2 years",
    cities: ["Seoul", "Kyoto"],
    years: ["2022", "2024"],
    traces: ["drawer stillness", "stamp paper", "half-fold lines"],
    continuityNotes: [
      "Kept for letters that mattered.",
      "Passed on before the last sheet was used.",
      "May continue where a reply is allowed to take time.",
    ],
    quietPairing: "May continue well with someone who still believes a letter can wait.",
  },
};

const fallbackMemories: readonly Omit<WindkeepObjectMemory, "objectId">[] = [
  {
    shortStory: "Stayed on a quiet shelf while the room changed around it.",
    previousKeeper: "a careful keeper",
    passingTime: "one season",
    cities: ["Unknown room"],
    years: ["recently"],
    traces: ["shelf light", "soft dust", "ordinary touch"],
    continuityNotes: [
      "Kept close to daily life.",
      "Moved without announcement.",
      "May continue where it can remain useful and gentle.",
    ],
    quietPairing: "May continue well where an object can be used without becoming important.",
  },
  {
    shortStory: "Carried a small amount of room memory from one table to another.",
    previousKeeper: "a passing room",
    passingTime: "several months",
    cities: ["Between homes"],
    years: ["recently"],
    traces: ["table light", "packed cloth", "quiet handling"],
    continuityNotes: [
      "Arrived without ceremony.",
      "Left with a simple note.",
      "May continue with someone who prefers slow things.",
    ],
    quietPairing: "May continue well near paper, tea, window air, or evening light.",
  },
];

export const windkeepObjects = commerceObjects.slice(0, 8).map((object, index) => ({
  object,
  memory:
    memoryByObjectId[object.id] ??
    {
      objectId: object.id,
      ...fallbackMemories[index % fallbackMemories.length],
    },
}));

export const windkeepArrivalLines = [
  "Some things continue quietly here.",
  "Objects pass gently through time.",
  "Nothing is hurried into belonging.",
] as const;
