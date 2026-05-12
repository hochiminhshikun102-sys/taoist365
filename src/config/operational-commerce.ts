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
  media: {
    hero: string;
    alt: string;
    caption: string;
    videoPoster: string;
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
    subtitle: "Stoneware for desk and kitchen.",
    atmosphereLine: "A cup that can cool beside the keyboard without becoming a signal.",
    materials: ["Stoneware", "clear glaze", "hand-thrown body"],
    dimensions: "3.4 in tall / 3.1 in wide / about 10 oz",
    priceCents: 4200,
    stock: 6,
  },
  "taoist365-linen-napkin-raw": {
    subtitle: "Single raw-edge linen cloth.",
    atmosphereLine: "A cloth that accepts laundry and still comes back uneven.",
    materials: ["Washed linen", "raw edge", "natural thread"],
    dimensions: "18 in x 18 in, each edge varies slightly",
    priceCents: 1800,
    stock: 18,
  },
  "taoist365-oak-tray-narrow": {
    subtitle: "White-oak tray for counter or desk.",
    atmosphereLine: "A small place for keys, receipts, and the screw saved for later.",
    materials: ["White oak", "hand oil", "felt foot option"],
    dimensions: "10.5 in x 4.2 in x 0.8 in",
    priceCents: 6400,
    stock: 4,
  },
  "taoist365-stone-smoke-dish": {
    subtitle: "Flat river-stone dish.",
    atmosphereLine: "A cool gray seat for ash, ember, or a finished pause.",
    materials: ["River stone", "soft felt base option"],
    dimensions: "about 4.5 in x 3.5 in, each stone differs",
    priceCents: 3200,
    stock: 5,
  },
  "taoist365-layflat-notebook": {
    subtitle: "Oat cover notebook.",
    atmosphereLine: "Paper that can stay open without becoming a work system.",
    materials: ["Oat cover stock", "lined paper", "thread binding"],
    dimensions: "5.8 in x 8.2 in / 96 pages",
    priceCents: 2400,
    stock: 12,
  },
  "taoist365-cotton-letter-sheets": {
    subtitle: "Half-fold cotton letter sheets.",
    atmosphereLine: "A small paper stack for sentences that should arrive softer.",
    materials: ["Cotton paper", "half-fold sheets", "uncoated surface"],
    dimensions: "12 sheets / 5.5 in x 8.5 in folded",
    priceCents: 1600,
    stock: 20,
  },
  "taoist365-night-teacup": {
    subtitle: "Short-handle crackle glaze cup.",
    atmosphereLine: "Night tea without the mug that wants to be a brand.",
    materials: ["Stoneware", "crackle glaze", "small handle"],
    dimensions: "2.7 in tall / about 6 oz",
    priceCents: 3800,
    stock: 3,
  },
  "taoist365-maple-paperweight": {
    subtitle: "Hand-oiled maple block.",
    atmosphereLine: "A small weight for drafts that should stop moving.",
    materials: ["Maple", "hand oil", "softened corners"],
    dimensions: "3.8 in x 2.3 in x 1.1 in",
    priceCents: 3000,
    stock: 7,
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
    title: piece.title,
    subtitle: details.subtitle,
    atmosphereLine: details.atmosphereLine,
    collection,
    collectionTitle: collectionTitle(collection),
    materials: details.materials,
    dimensions: details.dimensions,
    placement: piece.roomPlacement,
    detailSurfaces: [piece.livedWithPresence, piece.roomTrace, piece.necessityNote],
    shippingState: details.stock <= 4 ? "limited" : "available",
    archiveState: "active",
    stock: details.stock,
    priceCents: details.priceCents,
    media: {
      hero: piece.photo.src,
      alt: piece.photo.alt,
      caption: piece.photo.caption,
      videoPoster: piece.photo.src,
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
