/**
 * R60 — client-side hint only. Never authorizes publish.
 * Server functions/_publish-policy.js is the sole authorizer.
 */

export type PublishPolicyBucket =
  | "OFFICIAL_OA_UPLOAD"
  | "GLOBAL_BUYER_UPLOAD"
  | "BARTER_WINDKEEP_OWNER_UPLOAD"
  | "UNKNOWN_OR_UNMAPPED";

export type PublishPolicyResult = {
  publish_policy: "direct_publish" | "review_required";
  canSkipReview: boolean;
  can_direct_publish: boolean;
  require_review_before_publish: boolean;
  policy_bucket: PublishPolicyBucket;
  source_classification: string;
  source_type: string;
  actor_type: string;
  channel: string;
  role: string;
  review_status: string;
  reason: string;
  deny_code: string;
  auditAction: string;
  auditReason: string;
  actorId: string;
};

export type PublishPolicyInput = {
  source_type?: string;
  actor_type?: string;
  channel?: string;
  role?: string;
  created_by_role?: string;
  review_status?: string;
  entry_surface?: string;
  identity_scope?: string;
  supply_program?: string;
  intake?: {
    source_type?: string;
    entry_surface?: string;
    identity_scope?: string;
    supply_program?: string;
    status?: string;
  };
};

const BUYER_SOURCE_TYPES = new Set(["global_buyer", "buyer_upload", "marketplace", "external_buyer"]);
const OWNER_SOURCE_TYPES = new Set([
  "barter_owner",
  "windkeep_owner",
  "owner_uploaded",
  "barter_upload",
  "c2c_upload",
  "windkeep_member",
  "windkeep_member_upload",
  "member_consignment",
  "neighbor_referral",
  "windkeep_external_link",
]);
const NON_OFFICIAL_ADMIN_SURFACE_SOURCES = new Set(["external_link", "supplier_batch", "legacy_product_sample"]);
const OFFICIAL_SOURCE_TYPES = new Set(["official_oa", "admin_upload", "boss_upload"]);
const BUYER_CHANNELS = new Set(["buyer_portal", "wind_seeker"]);
const OWNER_CHANNELS = new Set(["windkeep", "barter", "member_center"]);

export function resolvePublishPolicy(input: PublishPolicyInput = {}): PublishPolicyResult {
  const intake = input.intake && typeof input.intake === "object" ? input.intake : {};
  const sourceType = norm(input.source_type ?? intake.source_type);
  const entrySurface = norm(input.entry_surface ?? intake.entry_surface);
  const identityScope = norm(input.identity_scope ?? intake.identity_scope);
  const supplyProgram = norm(input.supply_program ?? intake.supply_program);
  const channel = norm(input.channel || entrySurface);
  const classification = classifySource({
    sourceType,
    entrySurface,
    identityScope,
    supplyProgram,
    channel,
  });

  return {
    publish_policy: "review_required",
    canSkipReview: false,
    can_direct_publish: false,
    require_review_before_publish: true,
    policy_bucket: classification.bucket,
    source_classification: classification.source_classification,
    source_type: sourceType || "",
    actor_type: "client_hint_only",
    channel: channel || entrySurface || "",
    role: "",
    review_status: mapReviewStatus(intake.status),
    reason: "CLIENT_HINT_ONLY_SERVER_AUTHORIZES",
    deny_code: "CLIENT_HINT_NO_ELEVATION",
    auditAction: "hint_only",
    auditReason: classification.reason,
    actorId: "client_hint",
  };
}

export function canDirectPublish(_input: PublishPolicyInput = {}): boolean {
  return false;
}

function classifySource(args: {
  sourceType: string;
  entrySurface: string;
  identityScope: string;
  supplyProgram: string;
  channel: string;
}): { bucket: PublishPolicyBucket; source_classification: string; reason: string } {
  const { sourceType, entrySurface, identityScope, supplyProgram, channel } = args;
  if (NON_OFFICIAL_ADMIN_SURFACE_SOURCES.has(sourceType)) {
    return { bucket: "UNKNOWN_OR_UNMAPPED", source_classification: sourceType, reason: `${sourceType}_review_required` };
  }
  if (
    BUYER_SOURCE_TYPES.has(sourceType) ||
    BUYER_CHANNELS.has(channel) ||
    BUYER_CHANNELS.has(entrySurface) ||
    identityScope === "buyer" ||
    identityScope === "wind_seeker"
  ) {
    return { bucket: "GLOBAL_BUYER_UPLOAD", source_classification: sourceType || "global_buyer", reason: "global_buyer_review_required" };
  }
  if (
    OWNER_SOURCE_TYPES.has(sourceType) ||
    OWNER_CHANNELS.has(channel) ||
    OWNER_CHANNELS.has(entrySurface) ||
    identityScope === "member" ||
    identityScope === "windkeep_member" ||
    identityScope === "windkeep_referral" ||
    supplyProgram === "windkeep"
  ) {
    return { bucket: "BARTER_WINDKEEP_OWNER_UPLOAD", source_classification: sourceType || "windkeep_owner", reason: "owner_upload_review_required" };
  }
  if (OFFICIAL_SOURCE_TYPES.has(sourceType)) {
    return { bucket: "OFFICIAL_OA_UPLOAD", source_classification: sourceType, reason: "official_oa_source_class_only" };
  }
  if (!sourceType) {
    return { bucket: "UNKNOWN_OR_UNMAPPED", source_classification: "missing", reason: "missing_source_type" };
  }
  return { bucket: "UNKNOWN_OR_UNMAPPED", source_classification: sourceType, reason: "unmapped_source_fail_closed" };
}

function mapReviewStatus(intakeStatus?: string) {
  const status = norm(intakeStatus);
  if (!status) return "";
  if (status === "approved" || status === "rejected" || status === "review_pending" || status === "published") return status;
  return "draft";
}

function norm(value?: string) {
  return String(value || "")
    .trim()
    .toLowerCase();
}
