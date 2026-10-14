export type ObjectStatus =
  | "draft"
  | "ready"
  | "active"
  | "paused"
  | "archived"
  | "blocked"
  | "unknown";

export type PublishStatus =
  | "unpublished"
  | "pending_review"
  | "published"
  | "rejected"
  | "withdrawn"
  | "unknown";

export type SaleStatus = "not_for_sale" | "on_sale" | "sold_out" | "scheduled" | "delisted" | "unknown";

export type MediaStatus = "missing" | "partial" | "complete" | "rights_hold" | "unknown";

export type RiskStatus = "clear" | "watch" | "hold" | "blocked" | "unknown";

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
  source_price_text?: string;
  price_known?: boolean;
  currency: string;
  object_status: ObjectStatus;
  publish_status: PublishStatus;
  sale_status: SaleStatus;
  media_status: MediaStatus;
  risk_status: RiskStatus;
  inventory_projection_status: InventoryProjectionStatus;
  source_inventory?: number | null;
  intake_ref: string;
  media_bundle_ref: string;
  order_line_hits: number;
  order_line_hits_known?: boolean;
  updated_at: string;
  queue_tags: ObjectQueueTag[];
  note: string;
  retrieved_at?: string;
};
