/**
 * AUTH-06B / R33 — client-side mirror of functions/_publish-policy.js for UI hints only.
 * Server publish endpoint remains the sole authorizer.
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

const OFFICIAL_SOURCE_TYPES = new Set(["official_oa", "admin_upload", "boss_upload"]);
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
const OFFICIAL_ACTOR_TYPES = new Set(["admin_official", "oa_admin", "admin", "boss"]);
const OFFICIAL_ROLES = new Set(["oa_admin", "admin", "boss", "admin_official", "owner_operator"]);
const OA_CHANNELS = new Set(["oa_admin", "admin_os"]);
const BUYER_CHANNELS = new Set(["buyer_portal", "wind_seeker"]);
const OWNER_CHANNELS = new Set(["windkeep", "barter", "member_center"]);

export function resolvePublishPolicy(input: PublishPolicyInput = {}): PublishPolicyResult {
  const intake = input.intake && typeof input.intake === "object" ? input.intake : {};
  const sourceType = norm(input.source_type ?? intake.source_type);
  const entrySurface = norm(input.entry_surface ?? intake.entry_surface);
  const identityScope = norm(input.identity_scope ?? intake.identity_scope);
  const supplyProgram = norm(input.supply_program ?? intake.supply_program);
  const channel = norm(input.channel || entrySurface);
  const role = norm(input.role || input.created_by_role);
  const actorType = resolveActorType(input, intake, role);
  const reviewStatus = norm(input.review_status || mapReviewStatus(intake.status));

  const classification = classifySource({
    sourceType,
    entrySurface,
    identityScope,
    supplyProgram,
    channel,
  });

  const officialRole = isOfficialRole(actorType, role);
  const canDirect =
    classification.bucket === "OFFICIAL_OA_UPLOAD" &&
    officialRole &&
    isOaChannel(channel, entrySurface, identityScope);

  return {
    publish_policy: canDirect ? "direct_publish" : "review_required",
    canSkipReview: canDirect,
    can_direct_publish: canDirect,
    require_review_before_publish: !canDirect,
    policy_bucket: classification.bucket,
    source_classification: classification.source_classification,
    source_type: sourceType || "",
    actor_type: actorType,
    channel: channel || entrySurface || "",
    role: role || derivedRole(actorType),
    review_status: reviewStatus,
    reason: canDirect
      ? "official_oa_upload_with_official_role"
      : classification.reason || "review_required_fail_closed",
    deny_code: canDirect ? "" : denyCodeFor(classification.bucket, officialRole, actorType, role),
    auditAction: auditActionFor(classification.bucket, canDirect),
    auditReason: auditReasonFor(classification.bucket, canDirect),
    actorId: officialRole ? "admin_official" : actorType || "unknown",
  };
}

export function canDirectPublish(input: PublishPolicyInput = {}): boolean {
  return resolvePublishPolicy(input).can_direct_publish;
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
    return { bucket: "UNKNOWN_OR_UNMAPPED", source_classification: sourceType, reason: `${sourceType}_not_auto_official` };
  }
  if (
    BUYER_SOURCE_TYPES.has(sourceType) ||
    BUYER_CHANNELS.has(channel) ||
    BUYER_CHANNELS.has(entrySurface) ||
    identityScope === "buyer" ||
    identityScope === "wind_seeker"
  ) {
    return {
      bucket: "GLOBAL_BUYER_UPLOAD",
      source_classification: sourceType || "global_buyer",
      reason: "global_buyer_review_required",
    };
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
    return {
      bucket: "BARTER_WINDKEEP_OWNER_UPLOAD",
      source_classification: sourceType || "windkeep_owner",
      reason: "owner_upload_review_required",
    };
  }
  if (OFFICIAL_SOURCE_TYPES.has(sourceType)) {
    if (isOaChannel(channel, entrySurface, identityScope) || identityScope === "admin" || entrySurface === "admin_os") {
      return { bucket: "OFFICIAL_OA_UPLOAD", source_classification: sourceType, reason: "official_oa_source" };
    }
    return {
      bucket: "UNKNOWN_OR_UNMAPPED",
      source_classification: sourceType,
      reason: "official_source_without_oa_channel",
    };
  }
  if (!sourceType) {
    return { bucket: "UNKNOWN_OR_UNMAPPED", source_classification: "missing", reason: "missing_source_type" };
  }
  return { bucket: "UNKNOWN_OR_UNMAPPED", source_classification: sourceType, reason: "unmapped_source_fail_closed" };
}

function resolveActorType(input: PublishPolicyInput, intake: NonNullable<PublishPolicyInput["intake"]>, role: string) {
  const explicit = norm(input.actor_type);
  if (explicit) return explicit;
  if (OFFICIAL_ROLES.has(role)) return "admin_official";
  if (role === "global_buyer" || role === "buyer") return "buyer";
  if (role === "windkeep_owner" || role === "owner") return "owner";
  const sourceType = norm(intake.source_type);
  if (
    OFFICIAL_SOURCE_TYPES.has(sourceType) &&
    !NON_OFFICIAL_ADMIN_SURFACE_SOURCES.has(sourceType) &&
    norm(intake.entry_surface) === "admin_os" &&
    norm(intake.identity_scope) === "admin"
  ) {
    return "admin_official";
  }
  return "unknown";
}

function isOfficialRole(actorType: string, role: string) {
  return OFFICIAL_ACTOR_TYPES.has(actorType) || OFFICIAL_ROLES.has(role);
}

function isOaChannel(channel: string, entrySurface: string, identityScope: string) {
  return OA_CHANNELS.has(channel) || OA_CHANNELS.has(entrySurface) || identityScope === "admin";
}

function denyCodeFor(bucket: PublishPolicyBucket, officialRole: boolean, actorType: string, role: string) {
  if (bucket === "OFFICIAL_OA_UPLOAD" && !officialRole) return "FORBIDDEN_ROLE";
  if (bucket === "GLOBAL_BUYER_UPLOAD" || bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "POLICY_REVIEW_REQUIRED";
  if (bucket === "UNKNOWN_OR_UNMAPPED") return "POLICY_UNMAPPED";
  if (!actorType || actorType === "unknown") return "AUTH_REQUIRED";
  if (role && !officialRole) return "FORBIDDEN_ROLE";
  return "POLICY_REVIEW_REQUIRED";
}

function auditActionFor(bucket: PublishPolicyBucket, canDirect: boolean) {
  if (canDirect) return "official_direct_publish";
  if (bucket === "GLOBAL_BUYER_UPLOAD") return "buyer_publish_after_review";
  if (bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "owner_publish_after_review";
  return "published_object";
}

function auditReasonFor(bucket: PublishPolicyBucket, canDirect: boolean) {
  if (canDirect) return "official_oa_direct_publish_after_server_guard";
  if (bucket === "GLOBAL_BUYER_UPLOAD") return "buyer_publish_after_review";
  if (bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "owner_publish_after_review";
  return "standard_publish_after_review";
}

function mapReviewStatus(intakeStatus?: string) {
  const status = norm(intakeStatus);
  if (!status) return "";
  if (status === "approved" || status === "rejected" || status === "review_pending" || status === "published") return status;
  return "draft";
}

function derivedRole(actorType: string) {
  if (OFFICIAL_ACTOR_TYPES.has(actorType)) return "oa_admin";
  if (actorType === "buyer" || actorType === "global_buyer" || actorType === "wind_seeker") return "global_buyer";
  if (actorType === "owner" || actorType === "windkeep_owner" || actorType === "member") return "windkeep_owner";
  return "unknown";
}

function norm(value?: string) {
  return String(value || "")
    .trim()
    .toLowerCase();
}
