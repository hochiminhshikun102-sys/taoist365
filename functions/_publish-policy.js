/**
 * R60 — server-side publish identity + policy.
 * Official identity is server-verified only.
 * Untrusted fields never grant identity or direct_publish:
 * request body, draft tags, submitted_by, created_by, source, actor_type,
 * UI hints, local draft metadata, client headers.
 *
 * Authz order:
 * 1) missing / invalid / expired identity → HTTP 401, ZERO_WRITE
 * 2) verified but unauthorized → HTTP 403, ZERO_WRITE
 * 3) only then business split: official+permission → direct_publish;
 *    verified buyer / WindKeep / barter → review_required
 * review_required is not a fallback for unauthenticated callers.
 */

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
const BUYER_CHANNELS = new Set(["buyer_portal", "wind_seeker"]);
const OWNER_CHANNELS = new Set(["windkeep", "barter", "member_center"]);
const OFFICIAL_ROLES = new Set(["oa_admin", "admin", "boss", "admin_official", "owner_operator"]);
const TRUSTED_IDENTITY_SOURCES = new Set(["session", "jwt", "app_metadata", "allowlist", "middleware"]);

/**
 * @param {object} [context]
 */
export function readServerVerifiedIdentity(context = {}) {
  const trusted = context?.data?.serverAuth;
  if (!trusted || typeof trusted !== "object") {
    return emptyIdentity("none");
  }
  return normalizeTrustedIdentity(trusted);
}

export function emptyIdentity(source = "none") {
  return {
    authenticated: false,
    valid: false,
    expired: false,
    invalid: false,
    server_verified: false,
    identity_kind: "",
    role: "",
    permissions: [],
    sub: "",
    source,
    subject_deferred: true,
  };
}

function normalizeTrustedIdentity(raw) {
  const expired = Boolean(raw.expired);
  const invalid = Boolean(raw.invalid);
  const authenticated = Boolean(raw.authenticated);
  const source = TRUSTED_IDENTITY_SOURCES.has(norm(raw.source)) ? norm(raw.source) : "middleware";
  const role = norm(raw.role);
  const identityKind = norm(raw.identity_kind);
  const permissions = Array.isArray(raw.permissions) ? raw.permissions.map((p) => norm(p)).filter(Boolean) : [];
  const sub = String(raw.sub || raw.subject || "").trim();
  const serverVerified = Boolean(raw.server_verified) && authenticated && !expired && !invalid;
  return {
    authenticated,
    valid: authenticated && !expired && !invalid && serverVerified,
    expired,
    invalid,
    server_verified: serverVerified,
    identity_kind: identityKind,
    role,
    permissions,
    sub,
    source,
    subject_deferred: !sub,
  };
}

const ACTION_PERMISSIONS = {
  publish: ["publish"],
  review: ["review"],
  intake_create: ["intake_create"],
  intake_mutate: ["intake_mutate"],
  mutate_intake: ["intake_mutate"],
  ai_draft: ["ai_draft"],
  media: ["media"],
  object_patch: ["object_patch"],
  object_patch_publish: ["object_patch_publish"],
};

/**
 * Role alone does not grant actions. Explicit permission is required.
 * @param {ReturnType<typeof readServerVerifiedIdentity>} identity
 * @param {keyof typeof ACTION_PERMISSIONS | string} [action]
 */
export function assertActionAuthz(identity, action = "publish") {
  if (!identity || !identity.authenticated || identity.source === "none") {
    return deny(401, "AUTH_MISSING", "Server-verified identity is required.");
  }
  if (identity.expired) {
    return deny(401, "AUTH_EXPIRED", "Server-verified identity is expired.");
  }
  if (identity.invalid || !identity.valid || !identity.server_verified) {
    return deny(401, "AUTH_INVALID", "Server-verified identity is invalid.");
  }

  const needed = ACTION_PERMISSIONS[action] || [String(action || "")];
  const hasNeeded = needed.some((perm) => identity.permissions.includes(perm));
  if (!hasNeeded) {
    return deny(403, "AUTH_FORBIDDEN", `Verified identity is not authorized for action ${action}.`);
  }
  return allow(identity);
}

export function enforceServerAuthz(context, action = "publish") {
  const identity = readServerVerifiedIdentity(context);
  const gate = assertActionAuthz(identity, action);
  if (!gate.ok) {
    return {
      denied: jsonDenied(gate),
      identity: null,
      gate,
    };
  }
  return { denied: null, identity, gate };
}

/** Admin-only handlers: action permission is not enough for buyer/owner identities. */
export function enforceOfficialAction(context, action) {
  const authz = enforceServerAuthz(context, action);
  if (authz.denied) return authz;
  if (!isOfficialIdentity(authz.identity)) {
    const gate = deny(403, "AUTH_FORBIDDEN", "Official identity is required for this admin action.");
    return { denied: jsonDenied(gate), identity: null, gate };
  }
  return authz;
}

function jsonDenied(gate) {
  return new Response(
    JSON.stringify({
      ok: false,
      code: gate.code,
      error: gate.message,
      write: false,
      zero_write: true,
    }),
    {
      status: gate.httpStatus,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}

function deny(httpStatus, code, message) {
  return { ok: false, httpStatus, code, message, write: false };
}

function allow(identity) {
  return { ok: true, httpStatus: 200, code: "", message: "", write: true, identity };
}

export function isOfficialIdentity(identity) {
  return Boolean(
    identity?.server_verified &&
      identity.valid &&
      identity.identity_kind === "official" &&
      OFFICIAL_ROLES.has(norm(identity.role)),
  );
}

/**
 * Business split only. Callers must already pass assertActionAuthz.
 * Untrusted actor/source/body fields cannot grant official identity.
 */
export function resolvePublishPolicy(input = {}) {
  const identity = input.identity && typeof input.identity === "object" ? input.identity : emptyIdentity();
  const intake = input.intake && typeof input.intake === "object" ? input.intake : {};
  const sourceType = norm(intake.source_type ?? input.source_type);
  const entrySurface = norm(intake.entry_surface ?? input.entry_surface);
  const identityScope = norm(intake.identity_scope ?? input.identity_scope);
  const supplyProgram = norm(intake.supply_program ?? input.supply_program);
  const channel = norm(intake.entry_surface || input.channel);
  const reviewStatus = norm(input.review_status || mapReviewStatus(intake.status));

  const classification = classifySource({
    sourceType,
    entrySurface,
    identityScope,
    supplyProgram,
    channel,
  });

  const official = isOfficialIdentity(identity);
  const externalOrigin = isExternalOrigin(intake);
  const canDirect = official && classification.bucket === "OFFICIAL_OA_UPLOAD" && !externalOrigin;
  const publishPolicy = canDirect ? "direct_publish" : "review_required";

  return {
    publish_policy: publishPolicy,
    canSkipReview: canDirect,
    can_direct_publish: canDirect,
    require_review_before_publish: !canDirect,
    policy_bucket: classification.bucket,
    source_classification: classification.source_classification,
    source_type: sourceType || "",
    actor_type: identity.identity_kind || "unknown",
    channel: channel || entrySurface || "",
    role: identity.role || "",
    review_status: reviewStatus,
    reason: canDirect
      ? "official_oa_upload_with_server_verified_identity"
      : classification.reason || "review_required_after_authz",
    deny_code: canDirect ? "" : denyCodeFor(classification.bucket),
    auditAction: auditActionFor(classification.bucket, canDirect),
    auditReason: auditReasonFor(classification.bucket, canDirect),
    actorId: auditActorId(identity),
    identity_source: identity.source || "none",
    server_verified: Boolean(identity.server_verified),
  };
}

export function canDirectPublish(input = {}) {
  return Boolean(resolvePublishPolicy(input).can_direct_publish);
}

export function buildPublishPolicyInput(intake, identity) {
  return {
    intake,
    identity,
    source_type: intake?.source_type,
    entry_surface: intake?.entry_surface,
    identity_scope: intake?.identity_scope,
    supply_program: intake?.supply_program,
  };
}

function classifySource({ sourceType, entrySurface, identityScope, supplyProgram, channel }) {
  if (NON_OFFICIAL_ADMIN_SURFACE_SOURCES.has(sourceType)) {
    return {
      bucket: "UNKNOWN_OR_UNMAPPED",
      source_classification: sourceType,
      reason: `${sourceType}_review_required`,
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
    return {
      bucket: "OFFICIAL_OA_UPLOAD",
      source_classification: sourceType,
      reason: "official_oa_source_class_only",
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

function denyCodeFor(bucket) {
  if (bucket === "GLOBAL_BUYER_UPLOAD" || bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "POLICY_REVIEW_REQUIRED";
  if (bucket === "UNKNOWN_OR_UNMAPPED") return "POLICY_UNMAPPED";
  return "POLICY_REVIEW_REQUIRED";
}

function auditActionFor(bucket, canDirect) {
  if (canDirect) return "official_direct_publish";
  if (bucket === "GLOBAL_BUYER_UPLOAD") return "buyer_publish_after_review";
  if (bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "owner_publish_after_review";
  return "published_object";
}

function auditReasonFor(bucket, canDirect) {
  if (canDirect) return "official_oa_direct_publish_after_server_verified_identity";
  if (bucket === "GLOBAL_BUYER_UPLOAD") return "buyer_publish_after_review";
  if (bucket === "BARTER_WINDKEEP_OWNER_UPLOAD") return "owner_publish_after_review";
  return "standard_publish_after_review";
}

export function auditActorId(identity) {
  if (identity?.sub) return String(identity.sub);
  return "DEFERRED_NO_TRUSTED_SUB";
}

export function isExternalOrigin(intake = {}) {
  const kind = norm(intake.originator_kind || intake.owner_kind);
  return kind === "buyer" || kind === "global_buyer" || kind === "windkeep_owner" || kind === "barter_owner" || kind === "owner" || intake.external_origin === true;
}

const OFFICIAL_REQUEST_ALIASES = new Set(["official", "official_oa", "admin_upload", "boss_upload", "admin", "oa_admin", "admin_official"]);

export function bindCreateSource(identity, requestedRaw) {
  const requested = norm(requestedRaw);
  const kind = norm(identity?.identity_kind);
  if ((kind === "buyer" || kind === "global_buyer" || kind === "windkeep_owner" || kind === "barter_owner" || kind === "owner") && !String(identity?.sub || "").trim()) {
    return deny(401, "AUTH_MISSING", "Trusted subject sub is required for external create.");
  }
  if (kind === "buyer" || kind === "global_buyer") {
    if (OFFICIAL_REQUEST_ALIASES.has(requested) || OFFICIAL_SOURCE_TYPES.has(requested)) {
      return deny(403, "SOURCE_BINDING_DENIED", "External subject cannot bind an official intake source.");
    }
    return { ok: true, httpStatus: 200, sourceType: "buyer_upload", originator_kind: "buyer", external_origin: true, empty_source_default: false };
  }
  if (kind === "windkeep_owner" || kind === "barter_owner" || kind === "owner") {
    if (OFFICIAL_REQUEST_ALIASES.has(requested) || OFFICIAL_SOURCE_TYPES.has(requested)) {
      return deny(403, "SOURCE_BINDING_DENIED", "External subject cannot bind an official intake source.");
    }
    const ownerType = OWNER_SOURCE_TYPES.has(requested) ? requested : "windkeep_member";
    return { ok: true, httpStatus: 200, sourceType: ownerType, originator_kind: kind, external_origin: true, empty_source_default: false };
  }
  if (isOfficialIdentity(identity)) {
    if (!requested) {
      return {
        ok: true,
        httpStatus: 200,
        sourceType: "admin_upload",
        originator_kind: "official",
        external_origin: false,
        empty_source_default: true,
      };
    }
    if (OFFICIAL_SOURCE_TYPES.has(requested) || OFFICIAL_REQUEST_ALIASES.has(requested)) {
      const officialType = OFFICIAL_SOURCE_TYPES.has(requested) ? requested : "admin_upload";
      return {
        ok: true,
        httpStatus: 200,
        sourceType: officialType,
        originator_kind: "official",
        external_origin: false,
        empty_source_default: false,
      };
    }
    if (BUYER_SOURCE_TYPES.has(requested)) {
      return { ok: true, httpStatus: 200, sourceType: requested, originator_kind: "buyer", external_origin: true, empty_source_default: false };
    }
    if (OWNER_SOURCE_TYPES.has(requested)) {
      return { ok: true, httpStatus: 200, sourceType: requested, originator_kind: "windkeep_owner", external_origin: true, empty_source_default: false };
    }
    if (NON_OFFICIAL_ADMIN_SURFACE_SOURCES.has(requested)) {
      return {
        ok: true,
        httpStatus: 200,
        sourceType: requested,
        originator_kind: "official",
        external_origin: true,
        empty_source_default: false,
      };
    }
    return deny(403, "SOURCE_BINDING_DENIED", "Unrecognized source_type cannot be bound as an official upload.");
  }
  return deny(403, "SOURCE_BINDING_DENIED", "Cannot bind intake source for this identity.");
}

export function assertTargetOwnership(identity, target) {
  if (!target) {
    return deny(404, "TARGET_NOT_FOUND", "Target was not found.");
  }
  if (isOfficialIdentity(identity)) {
    return allow(identity);
  }
  const sub = String(identity?.sub || "").trim();
  const ownerSub = String(target.owner_sub || "").trim();
  if (!sub || !ownerSub || sub !== ownerSub) {
    return deny(403, "TARGET_OWNERSHIP_DENIED", "Verified identity cannot mutate another subject's target.");
  }
  return allow(identity);
}

export function denyResponse(gate) {
  return jsonDenied(gate);
}

function mapReviewStatus(intakeStatus) {
  const status = norm(intakeStatus);
  if (!status) return "";
  if (status === "approved" || status === "rejected" || status === "review_pending" || status === "published") return status;
  return "draft";
}

function norm(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}
