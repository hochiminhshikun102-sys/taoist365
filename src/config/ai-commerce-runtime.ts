import {
  commerceCollections,
  commerceObjects,
  type CommerceCollectionId,
} from "@/config/operational-commerce";

export type AiUploadInput = {
  prompt: string;
  mediaName?: string;
  mediaKind?: string;
};

export type AiProductDraft = {
  title: string;
  subtitle: string;
  atmosphereLine: string;
  materials: string;
  dimensions: string;
  placement: string;
  shipping: string;
  collection: CommerceCollectionId;
  tags: readonly string[];
  relatedObjectIds: readonly string[];
  featuredImage: string;
  detailSections: readonly string[];
};

export type AiMediaSuggestion = {
  label: string;
  output: string;
  note: string;
};

export type AiHomepageSuggestion = {
  surface: string;
  placement: string;
  reason: string;
};

const materialWords = [
  "linen",
  "cotton",
  "paper",
  "stone",
  "wood",
  "oak",
  "maple",
  "ceramic",
  "stoneware",
  "glass",
] as const;

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ");
}

function priceFromPrompt(prompt: string) {
  const match = prompt.match(/(?:\$|usd\s*)?(\d{2,4})(?:\s*dollars?|\s*usd|\s*美元)?/i);
  return match?.[1] ? Number(match[1]) : null;
}

function collectionFromPrompt(prompt: string): CommerceCollectionId {
  const lowered = prompt.toLowerCase();

  if (/(paper|wind|linen|letter|window)/.test(lowered)) {
    return "wind-objects";
  }

  if (/(cup|tea|smoke|ritual|incense|bowl)/.test(lowered)) {
    return "ritual-objects";
  }

  if (/(season|winter|spring|summer|autumn|fall)/.test(lowered)) {
    return "seasonal-collections";
  }

  return "quiet-desk";
}

function materialFromPrompt(prompt: string) {
  const lowered = prompt.toLowerCase();
  const found = materialWords.filter((word) => lowered.includes(word));
  return found.length > 0 ? found.join(", ") : "material to confirm";
}

function titleFromInput(input: AiUploadInput) {
  const mediaStem = input.mediaName?.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
  const cleanedPrompt = input.prompt
    .replace(/帮我|上架|这个|产品|卖|美元|usd|\$|\d+/gi, " ")
    .replace(/[，。,.]/g, " ")
    .trim();

  const base = cleanedPrompt || mediaStem || "quiet room object";
  return titleCase(base).slice(0, 64);
}

export function generateAiProductDraft(input: AiUploadInput): AiProductDraft {
  const title = titleFromInput(input);
  const collection = collectionFromPrompt(`${input.prompt} ${input.mediaName ?? ""}`);
  const collectionLabel = commerceCollections.find((item) => item.id === collection)?.shortTitle ?? "Object";
  const price = priceFromPrompt(input.prompt);
  const related = commerceObjects
    .filter((object) => object.collection === collection)
    .slice(0, 3)
    .map((object) => object.id);

  return {
    title,
    subtitle: `${collectionLabel} object for a quiet room.`,
    atmosphereLine: `${title} can sit near ordinary light without asking the room to perform.`,
    materials: materialFromPrompt(`${input.prompt} ${input.mediaName ?? ""}`),
    dimensions: "Dimensions to confirm after measuring.",
    placement: "Desk, shelf, window, table, or fabric surface with enough negative space.",
    shipping: price ? `$${price}. Shipping confirmed by human reply.` : "Price and shipping confirmed by human reply.",
    collection,
    tags: [collection, "browser-air", "low-pressure", "room-object"],
    relatedObjectIds: related,
    featuredImage: input.mediaName ?? "Use the calmest object-facing image.",
    detailSections: [
      "Material truth: list actual material, finish, edge, weight, and variation.",
      "Room placement: describe where the object can live without display pressure.",
      "Availability: write stock plainly without scarcity language.",
    ],
  };
}

export function generateBrowserAirNormalization(input: AiUploadInput): readonly AiMediaSuggestion[] {
  const media = input.mediaName ?? "selected media";

  return [
    {
      label: "Tone balance",
      output: `${media}: lower contrast slightly, keep whites off-white, preserve material texture.`,
      note: "Reduce ecommerce shine before applying any stylistic treatment.",
    },
    {
      label: "Background calm",
      output: "Prefer linen white, warm mineral gray, soft stone, quiet wood, or window light.",
      note: "Remove dark luxury framing and product glow.",
    },
    {
      label: "Mobile asset",
      output: "Generate a 4:5 crop with object center low, enough negative space above, no text overlay.",
      note: "Mobile should feel readable at low brightness.",
    },
    {
      label: "Responsive set",
      output: "Prepare square card, 4:3 detail, 16:10 collection, and 9:16 placement variants.",
      note: "Each variant should preserve room context.",
    },
  ];
}

export function generateAiMediaPlan(input: AiUploadInput): readonly AiMediaSuggestion[] {
  const title = titleFromInput(input);

  return [
    {
      label: "Placement scene",
      output: `${title} on a quiet desk or shelf, window light, soft shadow, no catalog staging.`,
      note: "Use as object detail or collection support.",
    },
    {
      label: "Detail closeup",
      output: "Close crop of material edge, grain, weave, glaze, paper tooth, or surface wear.",
      note: "Texture should breathe rather than look premium-sharp.",
    },
    {
      label: "Motion loop",
      output: "Slow object shadow drift with fabric or paper movement, 8-12 seconds, no cuts.",
      note: "Useful for homepage or object page when motion stays quiet.",
    },
  ];
}

export function generateHomepageSuggestions(input: AiUploadInput): readonly AiHomepageSuggestion[] {
  const draft = generateAiProductDraft(input);

  return [
    {
      surface: "Featured collection",
      placement: draft.collection,
      reason: "Collection entry is clearer than pushing a single object first.",
    },
    {
      surface: "Featured object",
      placement: draft.title,
      reason: "Use only if the image has enough room context and low pressure.",
    },
    {
      surface: "Editorial surface",
      placement: draft.atmosphereLine,
      reason: "One short line can support the object without making a campaign.",
    },
  ];
}

export const commerceRuntimeReadiness = [
  "Stripe provider boundary: order total, item ids, quantities, contact, shipping region.",
  "Storage boundary: original media, normalized image set, motion loop, generated placement variants.",
  "AI boundary: product draft, media treatment plan, tags, relation graph, homepage placement.",
  "Order boundary: local order request now; provider session later.",
  "Mail boundary: human reply remains available after provider connection.",
] as const;
