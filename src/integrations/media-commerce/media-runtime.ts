export type CommerceMediaKind = "image" | "video";
export type CommerceMediaPurpose =
  | "normalization"
  | "placement-scene"
  | "detail-closeup"
  | "homepage-surface"
  | "collection-card"
  | "motion-loop";

export type CommerceMediaRequest = {
  sourceAssetId: string;
  kind: CommerceMediaKind;
  purpose: CommerceMediaPurpose;
  objectTitle: string;
  prompt: string;
};

export type CommerceMediaOutput = {
  purpose: CommerceMediaPurpose;
  targetAspect: "1:1" | "4:3" | "16:10" | "4:5" | "9:16" | "loop";
  treatment: string;
  storageKey: string;
};

export type CommerceMediaRuntimeAdapter = {
  id: string;
  label: string;
  canGenerate: boolean;
  prepare(request: CommerceMediaRequest): Promise<CommerceMediaOutput>;
};

export const browserAirMediaTargets: readonly CommerceMediaOutput[] = [
  {
    purpose: "normalization",
    targetAspect: "4:3",
    treatment: "Tone balance, calmer background, softer shadow, retained texture.",
    storageKey: "normalized/{objectId}/primary-4x3",
  },
  {
    purpose: "placement-scene",
    targetAspect: "16:10",
    treatment: "Room placement with window light and enough negative space.",
    storageKey: "generated/{objectId}/placement-16x10",
  },
  {
    purpose: "detail-closeup",
    targetAspect: "1:1",
    treatment: "Material detail without premium sharpness.",
    storageKey: "generated/{objectId}/detail-1x1",
  },
  {
    purpose: "homepage-surface",
    targetAspect: "4:5",
    treatment: "Mobile-friendly object surface with low brightness comfort.",
    storageKey: "generated/{objectId}/homepage-4x5",
  },
  {
    purpose: "motion-loop",
    targetAspect: "loop",
    treatment: "Slow light, fabric, paper, or object shadow movement.",
    storageKey: "generated/{objectId}/motion-loop",
  },
] as const;

export const localMediaRuntimeAdapter: CommerceMediaRuntimeAdapter = {
  id: "local-media-plan",
  label: "Local media plan",
  canGenerate: false,
  async prepare(request) {
    const target = browserAirMediaTargets.find((item) => item.purpose === request.purpose) ?? browserAirMediaTargets[0]!;

    return {
      ...target,
      storageKey: target.storageKey.replace("{objectId}", request.sourceAssetId),
    };
  },
};
