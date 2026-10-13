/**
 * AUTH-06B / R33 — server-side publish policy guard.
 * Normative: official OA upload + official role → direct_publish;
 * buyer / barter / windkeep owner / unknown / external_link / supplier_batch → review_required.
 * UI hints must not authorize publish.
 */

const OFFICIAL_SOURCE_TYPES = new Set(["official_oa", "admin_upload", "boss_upload"]);
const BUYER_SOURCE_TYPES = new Set([
  "global_buyer",
  "buyer_upload",
  "marketplace",
  "external_buyer",
]);
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
/** Explicitly NOT official under AUTH-06A/B. */
const NON_OFFICIAL_ADMIN_SURFACE_SOURCES = new Set(["external_link", "supplier_batch", "legacy_product_sample"]);

const OFFICIAL_ACTOR_TYPES = new Set(["admin_official", "oa_admin", "admin", "boss"]);
const OFFICIAL_ROLES = new Set(["oa_admin", "admin", "boss", "admin_official", "owner_operator"]);

const OA_CHANNELS = new Set(["oa_admin", "admin_os"]);
const BUYER_CHANNELS = new Set(["buyer_portal", "wind_seeker"]);
const OWNER_CHANNELS = new Set(["windkeep", "barter", "member_center"]);

/**
 * @typedef {object} PublishPolicyInput
 * @property {string} [source_type]
 * @property {string} [actor_type]
 * @property {string} [channel]
 * @property {string} [role]
 * @property {string} [created_by_role]
 * @property {string} [review_status]
 * @property {string} [entry_surface]
 * @property {string} [identity_scope]
 * @property {string} [supply_program]
 * @property {object} [intake]
 */

/**
 * @param {PublishPolicyInput} input
 */
export function resolvePublishPolicy(input = {}) {
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

  const publishPolicy = canDirect ? "direct_publish" : "review_required";
  const canSkipReview = canDirect;
  const denyCode = canDirect ? "" : denyCodeFor(classification, officialRole, actorType, role);

  return {
    publish_policy: publishPolicy,
    canSkipReview,
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
    deny_code: denyCode,
    auditAction: auditActionFor(classification.bucket, canDirect),
    auditReason: auditReasonFor(classification.bucket, canDirect),
    actorId: officialRole ? "admin_official" : actorType || "unknown",
  };
}

/**
 * @param {PublishPolicyInput} input
 */
export function canDirectPublish(input = {}) {
  const policy = resolvePublishPolicy(input);
  return Boolean(policy.can_direct_publish);
}

/**
 * Build policy input from intake + optional request actor claims.
 * Body actor cannot upgrade a non-official intake to direct_publish.
 * @param {object} intake
 * @param {object} [actorClaims]
 */
export function buildPublishPolicyInput(intake, actorClaims = {}) {
  return {
    intake,
    source_type: intake?.source_type,
    entry_surface: intake?.entry_surface,
    identity_scope: intake?.identity_scope,
    supply_program: intake?.supply_program,
    channel: actorClaims.channel || intake?.entry_surface,
    actor_type: actorClaims.actor_type,
    role: actorClaims.role || actorClaims.created_by_role,
    created_by_role: actorClaims.created_by_role,
    review_status: actorClaims.review_status,
  };
}

function classifySource({ sourceType, entrySurface, identityScope, supplyProgram, channel }) {
  // Source/channel/scope classify the bucket. Actor/role only gate canDirectPublish.
  if (NON_OFFICIAL_ADMIN_SURFACE_SOURCES.has(sourceType)) {
    return {
      bucket: "UNKNOWN_OR_UNMAPPED",
      source_classification: sourceType,
      reason: `${sourceType}_not_auto_official`,
    };
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
    const oaSurface =
      isOaChannel(channel, entrySurface, identityScope) ||
      identityScope === "admin" ||
      entrySurface === "admin_os";
    if (oaSurface) {
      return {
        bucket: "OFFICIAL_OA_UPLOAD",
        source_classification: sourceType,
        reason: "official_oa_source",
      };
    }
    return {
      bucket: "UNKNOWN_OR_UNMAPPED",
      source_classification: sourceType,
      reason: "official_source_without_oa_channel",
    };
  }

  if (!sourceType) {
    return {
      bucket: "UNKNOWN_OR_UNMAPPED",
      source_classification: "missing",
      reason: "missing_source_type",
    };
  }

  return {
    bucket: "UNKNOWN_OR_UNMAPPED",
    source_classification: sourceType,
    reason: "unmapped_source_fail_closed",
  };
}

function resolveActorType(input, intake, role) {
  const explicit = norm(input.actor_type);
  if (explicit) return explicit;
  if (OFFICIAL_ROLES.has(role)) return "admin_official";
  if (role === "global_buyer" || role === "buyer") return "buyer";
  if (role === "windkeep_owner" || role === "owner") return "owner";

  // Legacy OA publish path (no auth provider yet): infer official actor only for official-shaped intakes.
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

function isOfficialRole(actorType, role) {
  return OFFICIAL_ACTOR_TYPES.has(actorType) || OFFICIAL_ROLES.has(role);
}

function isOaChannel(channel, entrySurface, identityScope) {
  return OA_CHANNELS.has(channel) || OA_CHANNELS.has(entrySurface) || identityScope === "admin";
}

function denyCodeFor(classification, officialRole, actorType, role) {
  if (classification.bucket === "OFFICIAL_OA_UPLOAD" && !officialRole) {
    return "FORBIDDEN_ROLE";
  }
  if (classification.bucket === "GLOBAL_BUYER_UPLOAD") return "POLICY_REVIEW_REQUIRED";
  if (classification.bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "POLICY_REVIEW_REQUIRED";
  if (classification.bucket === "UNKNOWN_OR_UNMAPPED") return "POLICY_UNMAPPED";
  if (!actorType || actorType === "unknown") return "AUTH_REQUIRED";
  if (role && !officialRole) return "FORBIDDEN_ROLE";
  return "POLICY_REVIEW_REQUIRED";
}

function auditActionFor(bucket, canDirect) {
  if (canDirect) return "official_direct_publish";
  if (bucket === "GLOBAL_BUYER_UPLOAD") return "buyer_publish_after_review";
  if (bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "owner_publish_after_review";
  return "published_object";
}

function auditReasonFor(bucket, canDirect) {
  if (canDirect) return "official_oa_direct_publish_after_server_guard";
  if (bucket === "GLOBAL_BUYER_UPLOAD") return "buyer_publish_after_review";
  if (bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "owner_publish_after_review";
  return "standard_publish_after_review";
}

function mapReviewStatus(intakeStatus) {
  const status = norm(intakeStatus);
  if (!status) return "";
  if (status === "approved") return "approved";
  if (status === "rejected") return "rejected";
  if (status === "review_pending") return "review_pending";
  if (status === "published") return "published";
  return "draft";
}

function derivedRole(actorType) {
  if (OFFICIAL_ACTOR_TYPES.has(actorType)) return "oa_admin";
  if (actorType === "buyer" || actorType === "global_buyer" || actorType === "wind_seeker" || actorType === "marketplace") {
    return "global_buyer";
  }
  if (actorType === "owner" || actorType === "windkeep_owner" || actorType === "barter_owner" || actorType === "member") {
    return "windkeep_owner";
  }
  return "unknown";
}

function norm(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}
