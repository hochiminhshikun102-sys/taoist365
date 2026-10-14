/**
 * OA Wave 1B Orders Core — independent status dimensions.
 * Payment success ≠ order completed; delivery ≠ aftersales closed.
 */

export type OrderStatus = "pending_confirm" | "processing" | "completed" | "cancelled" | "unknown";
export type PaymentStatus =
  | "unpaid"
  | "processing"
  | "authorized"
  | "paid"
  | "partial_refund"
  | "refunded"
  | "failed"
  | "unknown";
export type FulfillmentStatus =
  | "not_started"
  | "partial"
  | "shipped"
  | "partial_delivered"
  | "delivered"
  | "exception"
  | "unknown";
export type AfterSalesStatus = "none" | "open" | "closed" | "unknown";
export type RefundStatus = "none" | "pending" | "partial" | "completed" | "unknown";
export type RiskStatus = "clear" | "watch" | "hold" | "unknown";

export type OaOrderLine = {
  line_id: string;
  object_id: string;
  title_snapshot: string;
  quantity: number;
  unit_amount_minor: number;
  currency: string;
};

export type OaOrderPackage = {
  shipment_id: string;
  fulfillment_source: string;
  carrier: string;
  tracking_ref: string;
  shipment_status: string;
};

export type OaOrderRecord = {
  order_id: string;
  order_number: string;
  created_at: string;
  updated_at: string;
  customer_ref: string;
  customer_display_masked: string;
  line_summary: string;
  lines: OaOrderLine[];
  currency: string;
  subtotal_minor: number;
  discount_minor: number;
  shipping_minor: number;
  tax_minor: number;
  total_minor: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  after_sales_status: AfterSalesStatus;
  refund_status: RefundStatus;
  risk_status: RiskStatus;
  packages: OaOrderPackage[];
  policy_snapshot_id: string;
  source_system: string;
  source_updated_at: string;
  retrieved_at: string;
  queue_tags: Array<"awaiting_action" | "fulfilling" | "needs_attention" | "aftersales">;
  source_order_status?: string;
  source_payment_status?: string;
  field_mapping_note?: string;
  amount_known?: boolean;
  unit_amounts_known?: boolean;
};

export type OrdersWorkbenchViewState =
  | "ready"
  | "loading"
  | "empty"
  | "failed"
  | "not_connected"
  | "auth_required"
  | "permission_denied"
  | "provider_unavailable"
  | "demo";
