import { courierStatesLayer, longStayObjects } from "@/config/ri-foundation-civilization";
import { commerceObjects, formatPrice, quietPairingsForObjectId, type CommerceObject } from "@/config/operational-commerce";
import {
  defaultTrustLayer,
  quietRealityLabels,
  realityPriority,
  type ObjectTrustLayer,
  type RealityStatus,
} from "@/config/reality-governance";
import { arrivalResidueRuntime, unifiedMediaCivilizationStructure } from "@/config/runtime-coherence";
import { quietReceivingObjects, windkeepPassingObjects, type QuietReceivingObject, type WindkeepPassingObject } from "@/config/windkeep-continuity";

export type ProductRuntimeMediaKind =
  | "hero"
  | "shelf"
  | "object"
  | "emotional"
  | "residue"
  | "pc"
  | "mobile"
  | "ai"
  | "real"
  | "atmosphere"
  | "story"
  | "continuity";

export type ProductRuntimeMedia = {
  kind: ProductRuntimeMediaKind;
  src: string;
  alt: string;
  source: "real" | "ai" | "derived";
  crop: "pc" | "mobile" | "shelf" | "story" | "object" | "atmosphere";
};

export type ProductRuntimeObject = {
  object_id: string;
  sourceId: string;
  runtimeKind: "commerce" | "windkeep" | "quiet-receiving";
  name: string;
  oneLine: string;
  priceLine: string;
  softCta: "Keep Nearby" | "Bring Home Quietly" | "Place in Room" | "Write a Plain Note";
  materials: readonly string[];
  materialNote: string;
  placedInLife: readonly string[];
  objectStory: readonly string[];
  emotionalMetadata: {
    residue: string;
    tags: readonly string[];
    roomFeeling: string;
  };
  reality_status: RealityStatus;
  realityPriority: number;
  quietRealityLabel: string;
  trustLayer: ObjectTrustLayer;
  arrivalResidue: {
    enabled: boolean;
    reservedSlots: readonly string[];
    currentEvidence: readonly string[];
  };
  continuityRuntime: {
    previousHolder?: string;
    previousRoom: string;
    previousWeather: string;
    emotionalResidue: string;
    passageMemory: readonly string[];
    continuityChain: readonly string[];
  };
  media: readonly ProductRuntimeMedia[];
  quietStoryGrid: readonly ProductRuntimeMedia[];
  mediaCivilization: readonly string[];
  nearbyObjectIds: readonly string[];
  timeLayer: {
    windkeep?: string;
    courier?: string;
    longStay?: string;
    previousHolder?: string;
    quietReceiving?: string;
  };
  cmsStructure: {
    object: string;
    media: readonly ProductRuntimeMediaKind[];
    story: string;
    continuity: readonly string[];
  };
  globalObservationRuntime: {
    observationState: string;
    uploadState: string;
    mediaNormalization: readonly string[];
  };
  commerce?: CommerceObject;
  windkeep?: WindkeepPassingObject;
  receiving?: QuietReceivingObject;
};

function objectId(index: number) {
  return `RI-OBJ-${String(index + 1).padStart(4, "0")}`;
}

function storyMediaFromCommerce(object: CommerceObject): readonly ProductRuntimeMedia[] {
  const base = [
    ["hero", object.media.hero, "real object", "real", "object"],
    ["shelf", object.media.collection, "object on shelf", "real", "shelf"],
    ["object", object.media.hero, "object presence", "real", "object"],
    ["emotional", object.media.placement, "placed in room", "real", "story"],
    ["residue", object.media.detail, "texture and use", "real", "story"],
    ["pc", object.media.placement, "desktop crop", "derived", "pc"],
    ["mobile", object.media.detail, "mobile crop", "derived", "mobile"],
    ["ai", object.media.motion, "atmosphere crop", "ai", "atmosphere"],
    ["atmosphere", object.media.package, "packing and atmosphere", "derived", "atmosphere"],
  ] as const;

  return base.map(([kind, src, label, source, crop]) => ({
    kind,
    src,
    alt: `${object.title} ${label}`,
    source,
    crop,
  }));
}

function storyMediaFromWindkeep(object: WindkeepPassingObject): readonly ProductRuntimeMedia[] {
  const base = [
    ["hero", object.image.src, "real object", "real", "object"],
    ["shelf", object.image.src, "shelf image", "real", "shelf"],
    ["object", object.image.src, "object image", "real", "object"],
    ["emotional", object.image.src, "emotional room crop", "derived", "story"],
    ["residue", object.image.src, "surface trace", "derived", "story"],
    ["pc", object.image.src, "desktop crop", "derived", "pc"],
    ["mobile", object.image.src, "mobile crop", "derived", "mobile"],
    ["ai", object.image.src, "atmospheric image", "ai", "atmosphere"],
    ["atmosphere", object.image.src, "quiet atmosphere", "derived", "atmosphere"],
  ] as const;

  return base.map(([kind, src, label, source, crop]) => ({
    kind,
    src,
    alt: `${object.title} ${label}`,
    source,
    crop,
  }));
}

function continuityForCommerce(object: CommerceObject, index: number) {
  const courier = courierStatesLayer[index % courierStatesLayer.length];
  const longStay = longStayObjects[index % longStayObjects.length];

  return {
    previousRoom: index % 2 === 0 ? "A quiet studio shelf before release." : "A small packing table near window light.",
    previousWeather: courier.time,
    emotionalResidue: object.atmosphereLine,
    passageMemory: [courier.state, longStay.stayed, "Can be received quietly after use."],
    continuityChain: ["product runtime", "media runtime", "courier", "long stay", "quiet receiving"],
  };
}

function continuityForWindkeep(object: WindkeepPassingObject, index: number, receiving?: QuietReceivingObject) {
  const courier = courierStatesLayer[index % courierStatesLayer.length];
  const longStay = longStayObjects[index % longStayObjects.length];

  return {
    previousHolder: object.previousHolderNote,
    previousRoom: receiving?.emotionalContext ?? `A room in ${object.city}.`,
    previousWeather: object.timeMark,
    emotionalResidue: object.emotionalResidue,
    passageMemory: [object.passingStatus, courier.state, longStay.stayed, receiving?.receivingNote ?? "Still available for a plain note."],
    continuityChain: ["windkeep", "courier", "long stay", "quiet receiving", "arrival traces"],
  };
}

function commerceRuntime(object: CommerceObject, index: number): ProductRuntimeObject {
  const media = storyMediaFromCommerce(object);
  const related = quietPairingsForObjectId(object.id, 4);
  const longStay = longStayObjects[index % longStayObjects.length];
  const courier = courierStatesLayer[index % courierStatesLayer.length];
  const continuityRuntime = continuityForCommerce(object, index);

  const reality_status: RealityStatus = object.media.motion.includes("/objects-derived/") ? "HYBRID_REAL_AI" : index < 12 ? "VERIFIED_REAL" : "REAL_SUPPLIER_CONFIRMED";

  return {
    object_id: objectId(index),
    sourceId: object.id,
    runtimeKind: "commerce",
    name: object.title,
    oneLine: object.atmosphereLine,
    priceLine: formatPrice(object.priceCents),
    softCta: "Bring Home Quietly",
    materials: object.materials,
    materialNote: object.detailSurfaces[1] ?? "Material, edge, weight, and surface remain visible before styling language.",
    placedInLife: [object.placement, "Bedside, shelf, tea table, reading corner, or evening room.", object.shippingNote],
    objectStory: [object.subtitle, object.detailSurfaces[0] ?? object.atmosphereLine, object.detailSurfaces[2] ?? "It is kept close to ordinary room life."],
    emotionalMetadata: {
      residue: object.atmosphereLine,
      tags: [object.collectionTitle, ...object.materials.slice(0, 3)],
      roomFeeling: object.placement,
    },
    reality_status,
    realityPriority: realityPriority(reality_status),
    quietRealityLabel: quietRealityLabels[reality_status],
    trustLayer: defaultTrustLayer(reality_status, `${object.title} source and media attached to the RI object runtime.`),
    arrivalResidue: {
      enabled: arrivalResidueRuntime.enabled,
      reservedSlots: arrivalResidueRuntime.reservedSlots,
      currentEvidence: reality_status === "VERIFIED_REAL" ? ["Current real-object media attached."] : [],
    },
    continuityRuntime,
    media,
    quietStoryGrid: media,
    mediaCivilization: unifiedMediaCivilizationStructure,
    nearbyObjectIds: related.map((item) => item.id),
    timeLayer: {
      windkeep: "Available to enter Windkeep after use.",
      courier: `${courier.state} / ${courier.city}`,
      longStay: longStay.stayed,
      quietReceiving: "Can later become a Quiet Receiving object.",
    },
    cmsStructure: {
      object: "products",
      media: ["hero", "shelf", "object", "emotional", "residue", "pc", "mobile", "ai", "atmosphere", "story"],
      story: "object stories",
      continuity: ["windkeep", "quiet receiving", "courier", "long stay", "nearby objects"],
    },
    globalObservationRuntime: {
      observationState: "Global quiet object observation ready.",
      uploadState: "Observer uploads normalize into object, shelf, pc, mobile, homepage, emotional, and story crops.",
      mediaNormalization: ["mobile crop", "pc crop", "shelf image", "atmospheric image", "object image"],
    },
    commerce: object,
  };
}

function windkeepRuntime(object: WindkeepPassingObject, index: number, receiving?: QuietReceivingObject): ProductRuntimeObject {
  const media = storyMediaFromWindkeep(object);
  const courier = courierStatesLayer[index % courierStatesLayer.length];
  const longStay = longStayObjects[index % longStayObjects.length];
  const continuityRuntime = continuityForWindkeep(object, index, receiving);

  const reality_status: RealityStatus = receiving ? "COMMUNITY_VERIFIED" : index % 5 === 0 ? "UNVERIFIED" : "COMMUNITY_VERIFIED";

  return {
    object_id: objectId(commerceObjects.length + index),
    sourceId: object.id,
    runtimeKind: receiving ? "quiet-receiving" : "windkeep",
    name: object.title,
    oneLine: object.storyFragment,
    priceLine: "No price shown here",
    softCta: receiving ? "Write a Plain Note" : "Keep Nearby",
    materials: [object.objectType, "room light", "human handling"],
    materialNote: object.emotionalResidue,
    placedInLife: ["Bedside, shelf, tea table, balcony, reading corner, or evening room.", object.storyFragment, object.emotionalResidue],
    objectStory: [
      object.storyFragment,
      receiving?.releaseReason ?? object.previousHolderNote ?? "It stayed ordinary enough to be passed on.",
      receiving?.receivingNote ?? "It can continue without becoming a product performance.",
    ],
    emotionalMetadata: {
      residue: object.emotionalResidue,
      tags: [object.objectType, object.city, object.passingStatus],
      roomFeeling: object.storyFragment,
    },
    reality_status,
    realityPriority: realityPriority(reality_status),
    quietRealityLabel: quietRealityLabels[reality_status],
    trustLayer: defaultTrustLayer(reality_status, `${object.title} entered through Windkeep circulation in ${object.city}.`),
    arrivalResidue: {
      enabled: arrivalResidueRuntime.enabled,
      reservedSlots: arrivalResidueRuntime.reservedSlots,
      currentEvidence: receiving ? [receiving.receivingNote] : [],
    },
    continuityRuntime,
    media,
    quietStoryGrid: media,
    mediaCivilization: unifiedMediaCivilizationStructure,
    nearbyObjectIds: windkeepPassingObjects
      .filter((candidate) => candidate.id !== object.id)
      .slice((index + 1) % windkeepPassingObjects.length)
      .slice(0, 4)
      .map((candidate) => candidate.id),
    timeLayer: {
      windkeep: `${object.passingStatus} / ${object.city}`,
      courier: `${courier.state} / ${courier.city}`,
      longStay: longStay.stayed,
      previousHolder: object.previousHolderNote,
      quietReceiving: receiving?.receivingNote,
    },
    cmsStructure: {
      object: "products",
      media: ["hero", "shelf", "object", "emotional", "residue", "pc", "mobile", "ai", "atmosphere", "story"],
      story: "object stories",
      continuity: ["windkeep", "quiet receiving", "courier", "long stay", "nearby objects"],
    },
    globalObservationRuntime: {
      observationState: "Observed as a quiet circulating object.",
      uploadState: "Future observer uploads attach to this object_id without creating another detail page.",
      mediaNormalization: ["mobile crop", "pc crop", "shelf image", "atmospheric image", "object image"],
    },
    windkeep: object,
    receiving,
  };
}

const receivingById = new Map(quietReceivingObjects.map((object) => [object.id, object]));

export const productRuntimeObjects: readonly ProductRuntimeObject[] = [
  ...commerceObjects.map(commerceRuntime),
  ...windkeepPassingObjects.map((object, index) => windkeepRuntime(object, index, receivingById.get(object.id))),
].sort((a, b) => b.realityPriority - a.realityPriority || a.name.localeCompare(b.name));

const productRuntimeByObjectId = new Map(productRuntimeObjects.map((object) => [object.object_id, object]));
const productRuntimeBySourceId = new Map(productRuntimeObjects.map((object) => [object.sourceId, object]));

export function productByRuntimeId(id: string) {
  return productRuntimeByObjectId.get(id) ?? productRuntimeBySourceId.get(id);
}

export function productRuntimeIdForSourceId(id: string) {
  return productRuntimeBySourceId.get(id)?.object_id ?? id;
}
