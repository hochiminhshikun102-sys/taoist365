export type ObjectStatus =
  | "draft"
  | "ready"
  | "active"
  | "paused"
  | "archived"
  | "blocked";

export type PublishStatus = "unpublished" | "pending_review" | "published" | "rejected" | "withdrawn";

export type SaleStatus = "not_for_sale" | "on_sale" | "sold_out" | "scheduled" | "delisted";

export type MediaStatus = "missing" | "partial" | "complete" | "rights_hold";

export type RiskStatus = "clear" | "watch" | "hold" | "blocked";

export type InventoryProjectionStatus =
  | "unknown"
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "preorder";

export type ObjectQueueTag =
  | "all"
  | "draft_queue"
  | "publish_queue"
  | "on_sale"
  | "risk_hold"
  | "media_gap";

export type OaObjectRecord = {
  object_id: string;
  sku: string;
  title: string;
  title_zh: string;
  price_minor: number;
  currency: string;
  object_status: ObjectStatus;
  publish_status: PublishStatus;
  sale_status: SaleStatus;
  media_status: MediaStatus;
  risk_status: RiskStatus;
  inventory_projection_status: InventoryProjectionStatus;
  intake_ref: string;
  media_bundle_ref: string;
  order_line_hits: number;
  updated_at: string;
  queue_tags: ObjectQueueTag[];
  note: string;
};
