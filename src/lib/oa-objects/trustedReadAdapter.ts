import type {
  InventoryProjectionStatus,
  MediaStatus,
  OaObjectRecord,
  ObjectQueueTag,
  ObjectStatus,
  PublishStatus,
  RiskStatus,
  SaleStatus,
} from "./types";

export type AdminObjectSource = {
  object_id?: unknown;
  id?: unknown;
  title?: unknown;
  subtitle?: unknown;
  status?: unknown;
  price?: unknown;
  currency?: unknown;
  inventory?: unknown;
  sku?: unknown;
  intake_id?: unknown;
  media_ids?: unknown;
  updated_at?: unknown;
  published_at?: unknown;
};

const OBJECT_STATUSES = new Set<ObjectStatus>([
  "draft",
  "ready",
  "active",
  "paused",
  "archived",
  "blocked",
  "unknown",
]);
const PUBLISH_STATUSES = new Set<PublishStatus>([
  "unpublished",
  "pending_review",
  "published",
  "rejected",
  "withdrawn",
  "unknown",
]);

function asString(value: unknown): string {
  return String(value ?? "").trim();
}

export function mapAdminObject(source: AdminObjectSource, retrievedAt: string): OaObjectRecord {
  const objectId = asString(source.object_id) || asString(source.id) || "unknown";
  const skuRaw = asString(source.sku);
  const rawStatus = asString(source.status) || "unknown";
  const objectStatus: ObjectStatus = OBJECT_STATUSES.has(rawStatus as ObjectStatus)
    ? (rawStatus as ObjectStatus)
    : "unknown";
  let publishStatus: PublishStatus = "unknown";
  if (rawStatus === "published") publishStatus = "published";
  else if (rawStatus === "archived") publishStatus = "withdrawn";
  else if (rawStatus === "draft") publishStatus = "unpublished";
  else if (PUBLISH_STATUSES.has(rawStatus as PublishStatus)) publishStatus = rawStatus as PublishStatus;

  const saleStatus: SaleStatus = "unknown";
  const mediaIds = Array.isArray(source.media_ids) ? source.media_ids : [];
  const mediaStatus: MediaStatus = mediaIds.length === 0 ? "missing" : "unknown";
  const riskStatus: RiskStatus = "unknown";
  const inventoryProjection: InventoryProjectionStatus = "unknown";
  const sourceInventory = source.inventory;
  const inventoryKnown =
    typeof sourceInventory === "number" && Number.isFinite(sourceInventory)
      ? Math.trunc(sourceInventory)
      : null;

  const queue_tags: ObjectQueueTag[] = [];
  if (publishStatus === "unpublished" || rawStatus === "draft") queue_tags.push("draft_queue");
  if (publishStatus === "published") {
    /* sale_status is independent — do not tag on_sale */
  } else if (rawStatus !== "archived") {
    queue_tags.push("publish_queue");
  }
  if (mediaStatus === "missing") queue_tags.push("media_gap");

  const priceText = asString(source.price);
  const numericPrice = /^-?\d+$/.test(priceText) ? Number.parseInt(priceText, 10) : null;

  return {
    object_id: objectId,
    sku: skuRaw || "unknown",
    title: asString(source.title) || "—",
    title_zh: asString(source.subtitle) || "—",
    price_minor: numericPrice ?? 0,
    source_price_text: priceText || "—",
    price_known: numericPrice != null,
    currency: asString(source.currency) || "unknown",
    object_status: objectStatus,
    publish_status: publishStatus,
    sale_status: saleStatus,
    media_status: mediaStatus,
    risk_status: riskStatus,
    inventory_projection_status: inventoryProjection,
    source_inventory: inventoryKnown,
    intake_ref: asString(source.intake_id) || "—",
    media_bundle_ref: mediaIds.length ? `${mediaIds.length} media_ids` : "—",
    order_line_hits: 0,
    order_line_hits_known: false,
    updated_at: asString(source.updated_at) || asString(source.published_at) || retrievedAt,
    queue_tags,
    note: "字段待映射/来源不确认",
    retrieved_at: retrievedAt,
  };
}

export function mapAdminObjectRows(rows: unknown, retrievedAt: string): OaObjectRecord[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => mapAdminObject((row || {}) as AdminObjectSource, retrievedAt));
}
