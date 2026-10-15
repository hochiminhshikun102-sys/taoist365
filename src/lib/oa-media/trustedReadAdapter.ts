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
  mime_type?: unknown;
  tags?: unknown;
  updated_at?: unknown;
  created_at?: unknown;
};

const PRODUCT_SLOTS = new Set(["main", "detail", "scene", "pc", "mobile", "social", "motion", "original", "rights"]);

export function isTrustedMediaBytePath(path: string): boolean {
  return /^\/api\/(?:assets|object-media)\/[A-Za-z0-9._-]+$/.test(path);
}

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

function mediaSlotFrom(source: AdminAssetSource): string {
  const usage = asString(source.usage).toLowerCase();
  if (PRODUCT_SLOTS.has(usage)) return usage;
  const tags = Array.isArray(source.tags) ? source.tags.map((tag) => String(tag).toLowerCase()) : [];
  const hit = tags.find((tag) => PRODUCT_SLOTS.has(tag));
  return hit || "unknown";
}

function previewKindFrom(mime: string, slot: string): "image" | "video" | "unknown" {
  if (mime.startsWith("video/") || slot === "motion") return "video";
  if (mime.startsWith("image/")) return "image";
  return "unknown";
}

function previewPathFrom(source: AdminAssetSource, mediaId: string): string {
  const fileUrl = asString(source.file_url);
  if (isTrustedMediaBytePath(fileUrl)) return fileUrl;
  if (mediaId && mediaId !== "unknown") return `/api/assets/${mediaId}`;
  return "";
}

export function mapAdminAsset(source: AdminAssetSource, retrievedAt: string): OaMediaRecord {
  const mediaId = asString(source.id) || "unknown";
  const kind = assetKindFrom(source);
  const objectId = asString(source.object_id) || asString(source.linked_object_id);
  const rightsStatus: RightsStatus = "unknown";
  const reviewStatus: ReviewStatus = "unknown";
  const mediaSource: MediaSource = "owner_upload";
  const slot = mediaSlotFrom(source);
  const mime = asString(source.mime_type);
  const previewPath = previewPathFrom(source, mediaId);
  const isOriginal = kind === "original_asset" || slot === "original";
  const isPublicAsset = false;
  const isAi = kind === "ai_derivative";
  const hasRights = kind === "rights_evidence" || slot === "rights";

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
    compliance_note: "rights/review unknown · preview via Bearer blob only",
    updated_at: asString(source.updated_at) || asString(source.created_at) || retrievedAt,
    queue_tags,
    preview_href_blocked: true,
    source_scope: asString(source.scope) || "unknown",
    source_status: asString(source.status) || "unknown",
    mime_type: mime || "unknown",
    media_slot: slot,
    preview_path: previewPath,
    preview_kind: previewKindFrom(mime, slot),
  };
}

export function mapAdminAssetRows(rows: unknown, retrievedAt: string): OaMediaRecord[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => mapAdminAsset((row || {}) as AdminAssetSource, retrievedAt));
}
