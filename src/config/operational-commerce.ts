import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";

export type CommerceCollectionId = "wind-objects" | "quiet-desk" | "ritual-objects" | "seasonal-collections";

export type CommerceCollection = {
  id: CommerceCollectionId;
  title: string;
  shortTitle: string;
  summary: string;
  entry: string;
};

export type CommerceObject = {
  id: string;
  title: string;
  subtitle: string;
  atmosphereLine: string;
  collection: CommerceCollectionId;
  collectionTitle: string;
  materials: readonly string[];
  dimensions: string;
  placement: string;
  detailSurfaces: readonly string[];
  shippingState: "available" | "limited" | "made-to-order" | "archived";
  archiveState: "active" | "quiet-archive";
  stock: number;
  priceCents: number;
  trustNotes: readonly string[];
  shippingNote: string;
  media: {
    hero: string;
    alt: string;
    caption: string;
    videoPoster: string;
    motion: string;
    placement: string;
    detail: string;
    collection: string;
  };
  relatedIds: readonly string[];
};

export const commerceCollections: readonly CommerceCollection[] = [
  {
    id: "wind-objects",
    title: "Wind Objects",
    shortTitle: "Wind",
    summary: "Light room objects that can move between shelf, window, and correspondence.",
    entry: "Small pieces for air, paper, window light, and slow repositioning.",
  },
  {
    id: "quiet-desk",
    title: "Quiet Desk",
    shortTitle: "Desk",
    summary: "Useful desk objects that do not turn the room into a productivity surface.",
    entry: "Cups, paper, trays, and weights for ordinary work beside the day.",
  },
  {
    id: "ritual-objects",
    title: "Ritual Objects",
    shortTitle: "Ritual",
    summary: "Objects for a small act, not for performance or spiritual staging.",
    entry: "Bowls, dishes, cups, and paper that support a pause.",
  },
  {
    id: "seasonal-collections",
    title: "Seasonal Collections",
    shortTitle: "Seasonal",
    summary: "Objects that appear when the room and weather can hold them.",
    entry: "Short availability windows without countdown pressure.",
  },
] as const;

const collectionByIndex: readonly CommerceCollectionId[] = [
  "quiet-desk",
  "wind-objects",
  "quiet-desk",
  "ritual-objects",
  "quiet-desk",
  "wind-objects",
  "ritual-objects",
  "seasonal-collections",
] as const;

const objectDetails = {
  "taoist365-desk-mug-sand": {
    title: "Still Water incense box",
    subtitle: "Wooden incense box with small ceramic rest.",
    atmosphereLine: "A table object for incense that reads as daily use, not ceremony staging.",
    materials: ["Finished wood box", "ceramic rest", "paper sleeve"],
    dimensions: "8.6 in x 2.1 in x 1.2 in",
    placement: "Desk edge, tea table, or shelf where one stick can rest without becoming a display.",
    priceCents: 3900,
    stock: 6,
    media: ["incense-box.jpg", "57.jpg", "52.jpg"],
  },
  "taoist365-linen-napkin-raw": {
    title: "Window crystal bracelet",
    subtitle: "Mixed crystal bracelet with quiet metal charm.",
    atmosphereLine: "A wrist object with enough color to catch light and enough restraint to stay ordinary.",
    materials: ["Mixed crystal beads", "alloy charm", "elastic cord"],
    dimensions: "6.7 in inner circumference, stretch fit",
    placement: "Wrist, tray, bedside dish, or window ledge between uses.",
    priceCents: 2800,
    stock: 18,
    media: ["25.jpg", "23.jpg", "24.jpg"],
  },
  "taoist365-oak-tray-narrow": {
    title: "Lotus table light",
    subtitle: "Small lotus lamp for shelf, desk, or night table.",
    atmosphereLine: "A warm object that can hold light without turning the room theatrical.",
    materials: ["Printed shade", "metal stem", "weighted base"],
    dimensions: "10.2 in tall / 4.5 in shade diameter",
    placement: "Side table, low shelf, tea corner, or desk back edge.",
    priceCents: 6400,
    stock: 4,
    media: ["8.jpg", "5.jpg", "18.png"],
  },
  "taoist365-stone-smoke-dish": {
    title: "Round moon pendant",
    subtitle: "Round metal pendant with cloud-mark face.",
    atmosphereLine: "A small weight near the collarbone; readable up close, quiet from across the room.",
    materials: ["Aged alloy", "cord", "small bead detail"],
    dimensions: "Pendant about 1.1 in wide / adjustable cord",
    placement: "Neck, wall peg, tray, or beside a mirror after use.",
    priceCents: 3200,
    stock: 5,
    media: ["31.jpg", "50.jpg", "70.jpg"],
  },
  "taoist365-layflat-notebook": {
    title: "Tao fruit tea set",
    subtitle: "Fruit tea gift set with cup and shelf-ready packaging.",
    atmosphereLine: "A soft kitchen object for gifting without loud gift-box energy.",
    materials: ["Dried fruit tea", "paper box", "ceramic cup reference"],
    dimensions: "Gift box about 9.4 in x 6.1 in x 2.6 in",
    placement: "Kitchen shelf, tea table, guest drawer, or morning counter.",
    priceCents: 4600,
    stock: 12,
    media: ["76.png", "77.png", "12.jpg"],
  },
  "taoist365-cotton-letter-sheets": {
    title: "Protective room charm",
    subtitle: "Color charm with small hanging bell.",
    atmosphereLine: "A small hanging object for doorway, lamp pull, or a shelf corner.",
    materials: ["Printed charm face", "metal bell", "braided hanging cord"],
    dimensions: "3.2 in body / 5.1 in hanging length",
    placement: "Door hook, cabinet pull, lamp side, or window latch.",
    priceCents: 2200,
    stock: 20,
    media: ["49.jpg", "49.2.jpg", "49.4.jpg"],
  },
  "taoist365-night-teacup": {
    title: "Quiet desk mug",
    subtitle: "Ceramic mug with small Taoist365 graphic.",
    atmosphereLine: "A working mug that can sit beside a laptop without becoming office merch.",
    materials: ["Ceramic", "glazed print", "rounded handle"],
    dimensions: "3.7 in tall / about 11 oz",
    placement: "Desk, breakfast table, studio shelf, or beside paper notes.",
    priceCents: 2400,
    stock: 3,
    media: ["85.jpg", "84.jpg", "12.jpg"],
  },
  "taoist365-maple-paperweight": {
    title: "Moon standing ornament",
    subtitle: "Small crescent standing ornament for table or shelf.",
    atmosphereLine: "A standing curve for light and shadow, useful when a surface needs one quiet vertical line.",
    materials: ["Metal crescent", "stone-like base", "small hanging form"],
    dimensions: "9.8 in tall / 5.6 in wide",
    placement: "Shelf, desk back edge, entry table, or windowsill.",
    priceCents: 5200,
    stock: 7,
    media: ["68.jpg", "35.jpg", "36.jpg"],
  },
} as const;

function collectionTitle(collectionId: CommerceCollectionId) {
  return commerceCollections.find((collection) => collection.id === collectionId)?.title ?? "Objects";
}

export const commerceObjects: readonly CommerceObject[] = taoist365ObjectsCatalog.map((piece, index) => {
  const details = objectDetails[piece.id as keyof typeof objectDetails];
  const collection = collectionByIndex[index] ?? "quiet-desk";

  return {
    id: piece.id,
    title: details.title,
    subtitle: details.subtitle,
    atmosphereLine: details.atmosphereLine,
    collection,
    collectionTitle: collectionTitle(collection),
    materials: details.materials,
    dimensions: details.dimensions,
    placement: details.placement,
    detailSurfaces: [piece.livedWithPresence, piece.roomTrace, piece.necessityNote],
    shippingState: details.stock <= 4 ? "limited" : "available",
    archiveState: "active",
    stock: details.stock,
    priceCents: details.priceCents,
    trustNotes: [
      "Ships after human stock confirmation.",
      "Photos are current material references from the Taoist365 asset shelf.",
      "Small visible variation is treated as ordinary, not defective.",
    ],
    shippingNote: "Ships from a small-stock shelf. Typical packing window is 3-5 business days after confirmation.",
    media: {
      hero: `/objects-living/${details.media[0]}`,
      alt: `${details.title} photographed for Taoist365`,
      caption: `${details.title} in a real product surface from the Taoist365 material shelf.`,
      videoPoster: `/objects-living/${details.media[0]}`,
      motion: `/objects-motion/${piece.id}.gif`,
      placement: `/objects-living/${details.media[1]}`,
      detail: `/objects-living/${details.media[2]}`,
      collection: `/objects-living/${details.media[0]}`,
    },
    relatedIds: taoist365ObjectsCatalog
      .filter((candidate) => candidate.id !== piece.id)
      .slice((index + 1) % taoist365ObjectsCatalog.length)
      .slice(0, 3)
      .map((candidate) => candidate.id),
  };
});

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(cents / 100);
}

export function objectById(id: string) {
  return commerceObjects.find((object) => object.id === id);
}

export function objectsForCollection(collectionId: CommerceCollectionId) {
  return commerceObjects.filter((object) => object.collection === collectionId);
}

export function collectionById(id: string) {
  return commerceCollections.find((collection) => collection.id === id);
}
