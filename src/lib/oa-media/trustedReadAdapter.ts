import type { AssetKind, MediaQueueTag, MediaSource, OaMediaRecord, ReviewStatus, RightsStatus } from "./types";

export type AdminAssetSource = {
  id?: unknown;
  file_name?: unknown;
  alt_text?: unknown;
  usage?: unknown;
  scope?: unknown;
  object_id?: unknown;
  linked_object_id?: unknown;
  intake_id?: unknown;
  status?: unknown;
  public_url?: unknown;
  file_url?: unknown;
  data_url?: unknown;
  tags?: unknown;
  updated_at?: unknown;
  created_at?: unknown;
};

function asString(value: unknown): string {
  return String(value ?? "").trim();
}

function assetKindFrom(source: AdminAssetSource): AssetKind {
  const usage = asString(source.usage).toLowerCase();
  const tags = Array.isArray(source.tags) ? source.tags.map((tag) => String(tag).toLowerCase()) : [];
  if (usage === "original" || tags.includes("original")) return "original_asset";
  if (usage === "rights" || tags.includes("rights")) return "rights_evidence";
  if (asString(source.scope) === "air_engine" || usage.includes("ai")) return "ai_derivative";
  return "original_asset";
}

export function mapAdminAsset(source: AdminAssetSource, retrievedAt: string): OaMediaRecord {
  const mediaId = asString(source.id) || "unknown";
  const kind = assetKindFrom(source);
  const objectId = asString(source.object_id) || asString(source.linked_object_id);
  const rightsStatus: RightsStatus = "unknown";
  const reviewStatus: ReviewStatus = "unknown";
  const mediaSource: MediaSource = "owner_upload";
  const isOriginal = kind === "original_asset";
  const isPublicAsset = false;
  const isAi = kind === "ai_derivative";
  const hasRights = kind === "rights_evidence";

  const queue_tags: MediaQueueTag[] = [];
  if (!objectId) queue_tags.push("orphaned");
  if (kind === "rights_evidence" || kind === "original_asset") queue_tags.push("needs_rights");
  if (isAi) queue_tags.push("ai_hold");
  queue_tags.push("awaiting_review");

  return {
    media_id: mediaId,
    bundle_ref: objectId || asString(source.intake_id) || "unbound",
    object_sku: "unknown",
    title: asString(source.file_name) || asString(source.alt_text) || mediaId,
    source: mediaSource,
    asset_kind: kind,
    rights_status: rightsStatus,
    review_status: reviewStatus,
    is_original: isOriginal,
    is_public_asset: isPublicAsset,
    is_ai_derivative: isAi,
    has_rights_evidence: hasRights,
    intake_ref: asString(source.intake_id) || "—",
    compliance_note: "rights/review unknown · byte URL not used as img src",
    updated_at: asString(source.updated_at) || asString(source.created_at) || retrievedAt,
    queue_tags,
    preview_href_blocked: true,
    source_scope: asString(source.scope) || "unknown",
    source_status: asString(source.status) || "unknown",
  };
}

export function mapAdminAssetRows(rows: unknown, retrievedAt: string): OaMediaRecord[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => mapAdminAsset((row || {}) as AdminAssetSource, retrievedAt));
}
