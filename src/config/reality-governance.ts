export type RealityStatus =
  | "VERIFIED_REAL"
  | "REAL_SUPPLIER_CONFIRMED"
  | "HYBRID_REAL_AI"
  | "COMMUNITY_VERIFIED"
  | "UNVERIFIED"
  | "CONCEPT_OBJECT";

export type ObjectTrustLayer = {
  verificationHistory: readonly string[];
  previousReports: readonly string[];
  fulfillmentHistory: readonly string[];
  realArrivalEvidence: readonly string[];
  communityConfirmations: readonly string[];
};

export type ArrivalResidueSlot = {
  id: string;
  label: string;
  use: string;
};

export const realityStatusPriority: Record<RealityStatus, number> = {
  VERIFIED_REAL: 60,
  REAL_SUPPLIER_CONFIRMED: 50,
  COMMUNITY_VERIFIED: 40,
  HYBRID_REAL_AI: 30,
  UNVERIFIED: 20,
  CONCEPT_OBJECT: 10,
};

export const quietRealityLabels: Record<RealityStatus, string> = {
  VERIFIED_REAL: "Quietly Verified",
  REAL_SUPPLIER_CONFIRMED: "Confirmed Nearby",
  COMMUNITY_VERIFIED: "Present in Another Room",
  HYBRID_REAL_AI: "Real Object, Soft Atmosphere",
  UNVERIFIED: "Still Being Confirmed",
  CONCEPT_OBJECT: "Concept Object",
};

export const realityStatusDefinitions: Record<RealityStatus, string> = {
  VERIFIED_REAL: "Real photos, real fulfillment path, and real object availability are present.",
  REAL_SUPPLIER_CONFIRMED: "A real workshop, studio, factory, or long-term source has confirmed the object path.",
  COMMUNITY_VERIFIED: "Longer-term received-object evidence or room placement confirmation exists.",
  HYBRID_REAL_AI: "The object exists; atmosphere images may assist room light, mood, or browser-air visualization.",
  UNVERIFIED: "The object may enter quietly, but should remain lower in recommendation surfaces until confirmed.",
  CONCEPT_OBJECT: "The object is not confirmed for real production and must stay plainly marked.",
};

export const wideEntryRealityPolicy = [
  "Small observers, independent makers, studios, workshops, personal objects, and drifting objects can enter early.",
  "Entry stays wide so the world can move before the trust layer becomes heavy.",
  "Priority, visibility, and continuity rights increase only when reality evidence accumulates.",
] as const;

export const falseExistencePenalty = {
  trigger: "Confirmed false existence, false fulfillment, false source claim, nonexistent object, false transit claim, or stolen image evidence.",
  action: "Permanent removal from observation access, Windkeep participation, Quiet Receiving participation, object circulation rights, upload privileges, and source confirmation rights.",
  note: "The object world can stay open only if false existence is governed at the highest level.",
} as const;

export const aiObjectRules = [
  "AI can support atmosphere, emotional rendering, browser-air scenes, room lighting, and environmental visualization.",
  "AI cannot replace real object existence.",
  "A pure generated item without real object evidence must remain a concept object.",
  "Hybrid imagery must remain attached to an existing object_id and real-object evidence.",
] as const;

export const arrivalResidueSlots: readonly ArrivalResidueSlot[] = [
  { id: "object-in-room", label: "Object in room", use: "A real placement photo after arrival." },
  { id: "beside-shelf", label: "Beside shelf", use: "A low-pressure shelf or surface photo." },
  { id: "after-use", label: "After use", use: "A used-state photo showing ordinary handling." },
  { id: "near-window", label: "Near window", use: "A real light and window placement photo." },
  { id: "real-placement", label: "Real placement", use: "Any confirmed room evidence that adds time weight." },
] as const;

export function realityPriority(status: RealityStatus) {
  return realityStatusPriority[status];
}

export function defaultTrustLayer(status: RealityStatus, sourceLine: string): ObjectTrustLayer {
  const confirmed = status === "VERIFIED_REAL" || status === "REAL_SUPPLIER_CONFIRMED" || status === "COMMUNITY_VERIFIED";

  return {
    verificationHistory: confirmed ? [sourceLine] : ["Entered quietly; reality evidence is still being gathered."],
    previousReports: [],
    fulfillmentHistory: status === "VERIFIED_REAL" ? ["Fulfillment path present in object runtime."] : [],
    realArrivalEvidence: status === "COMMUNITY_VERIFIED" ? ["Room placement confirmation exists."] : [],
    communityConfirmations: status === "COMMUNITY_VERIFIED" ? ["Confirmed by received-object presence."] : [],
  };
}
