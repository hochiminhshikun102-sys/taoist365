import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";

export type QuietPlacementCadence = "kept" | "slow" | "seasonal" | "rare";

export type QuietPlacementSlot = {
  id: string;
  label: string;
  where: "home" | "objects" | "draw-a-lot" | "browser-air" | "mail" | "commerce";
  cadence: QuietPlacementCadence;
  replaceBy: "human" | "human-first";
  note: string;
};

export const quietPlacementSlots: readonly QuietPlacementSlot[] = [
  {
    id: "home-entry-links",
    label: "Home links",
    where: "home",
    cadence: "kept",
    replaceBy: "human-first",
    note: "Change only when a plain page needs to be easier to find.",
  },
  {
    id: "home-object-shelf",
    label: "Home shelf",
    where: "home",
    cadence: "slow",
    replaceBy: "human",
    note: "Swap objects like moving a few things on a table.",
  },
  {
    id: "browser-air-corner",
    label: "Air corner",
    where: "browser-air",
    cadence: "rare",
    replaceBy: "human-first",
    note: "One low-visibility object can remain in the edge.",
  },
  {
    id: "draw-table",
    label: "Draw table",
    where: "draw-a-lot",
    cadence: "slow",
    replaceBy: "human",
    note: "Objects stay useful before they become symbolic.",
  },
  {
    id: "mail-line",
    label: "Mail line",
    where: "mail",
    cadence: "kept",
    replaceBy: "human",
    note: "Keep contact wording plain.",
  },
  {
    id: "object-circulation",
    label: "Object circulation",
    where: "commerce",
    cadence: "seasonal",
    replaceBy: "human",
    note: "Let object presence change only like a shelf being tended.",
  },
];

export const quietPlacementBoundaries = [
  "No publishing cadence.",
  "No campaign slots.",
  "No performance placement.",
  "No carousel pressure.",
  "No dashboard language.",
] as const;

export const quietPlacementReviewLines = [
  "A replacement should feel like upkeep, not an update.",
  "If a slot starts asking for attention, leave it empty longer.",
  "Human placement outranks automatic rotation.",
  "Objects can move slowly; the site should not announce the movement.",
] as const;

export const homepagePresenceEntries = [
  { label: "Daily note", href: "/rituals/daily-guidance", air: "One line near the morning.", mark: "01" },
  { label: "Shelf", href: "/objects", air: "Objects that can sit nearby.", mark: "03" },
  { label: "Mail", href: "/inquiry", air: "A letter that can wait.", mark: "04" },
  { label: "Room page", href: "/rituals/home-harmony", air: "A page for the room.", mark: "07" },
  { label: "Evening", href: "/rituals", air: "Night light kept low.", mark: "08" },
  { label: "Small line", href: "/rituals/daily-guidance", air: "A small sentence for the day.", mark: "11" },
] as const;

export const homepageSeasonalRooms = [
  {
    label: "Morning",
    note: "Before work",
    image: taoist365ObjectsCatalog[1]?.photo.src,
  },
  {
    label: "Kitchen",
    note: "Counter light",
    image: taoist365ObjectsCatalog[2]?.photo.src,
  },
  {
    label: "Shelf",
    note: "Put down",
    image: taoist365ObjectsCatalog[6]?.photo.src,
  },
  {
    label: "Window",
    note: "Later",
    image: taoist365ObjectsCatalog[3]?.photo.src,
  },
  {
    label: "Return",
    note: "Back later",
    image: "/homepage-hero/windkeep-lantern-sea.png",
  },
] as const;

export const homepageObjectSlots = {
  shelf: taoist365ObjectsCatalog.slice(0, 6),
  secondaryShelf: taoist365ObjectsCatalog.slice(2, 8),
} as const;

export const homepageRoomNotes = [
  "Open when useful.",
  "Plain page.",
  "Same site.",
  "No order needed.",
] as const;

export const homepageFallbackRooms = [
  "A line for later",
  "A page by the window",
  "A quiet note",
  "A small story",
  "Something half-made",
  "A shelf left open",
] as const;

export const windResiduePlacement = {
  image: "/objects-living/\u98ce\u94c3001.jpg",
  slot: "browser-air-corner",
  cadence: "rare",
} as const;
