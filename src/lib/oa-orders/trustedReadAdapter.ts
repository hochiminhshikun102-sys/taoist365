import type {
  AfterSalesStatus,
  FulfillmentStatus,
  OaOrderLine,
  OaOrderRecord,
  OrderStatus,
  PaymentStatus,
  RefundStatus,
  RiskStatus,
} from "./types";

export type CommerceOrderSource = {
  id?: unknown;
  order_id?: unknown;
  status?: unknown;
  payment_status?: unknown;
  fulfillment_status?: unknown;
  contact?: { name?: unknown; email?: unknown; address?: unknown } | null;
  items?: unknown;
  subtotal_cents?: unknown;
  total_cents?: unknown;
  currency?: unknown;
  created_at?: unknown;
  updated_at?: unknown;
  source?: unknown;
  note?: unknown;
};

const ORDER_STATUSES = new Set<OrderStatus>([
  "pending_confirm",
  "processing",
  "completed",
  "cancelled",
  "unknown",
]);
const PAYMENT_STATUSES = new Set<PaymentStatus>([
  "unpaid",
  "processing",
  "authorized",
  "paid",
  "partial_refund",
  "refunded",
  "failed",
  "unknown",
]);
const FULFILLMENT_STATUSES = new Set<FulfillmentStatus>([
  "not_started",
  "partial",
  "shipped",
  "partial_delivered",
  "delivered",
  "exception",
  "unknown",
]);

function asString(value: unknown): string {
  return String(value ?? "").trim();
}

export function maskPersonName(value: unknown): string {
  const text = asString(value);
  if (!text) return "—";
  const first = Array.from(text)[0] || "*";
  return `${first}***`;
}

function asFiniteInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && /^-?\d+$/.test(value.trim())) return Number.parseInt(value.trim(), 10);
  return null;
}

function mapOrderStatus(raw: string): OrderStatus {
  return ORDER_STATUSES.has(raw as OrderStatus) ? (raw as OrderStatus) : "unknown";
}

function mapPaymentStatus(raw: string): PaymentStatus {
  return PAYMENT_STATUSES.has(raw as PaymentStatus) ? (raw as PaymentStatus) : "unknown";
}

function mapFulfillmentStatus(raw: string): FulfillmentStatus {
  return FULFILLMENT_STATUSES.has(raw as FulfillmentStatus) ? (raw as FulfillmentStatus) : "unknown";
}

function mapLines(items: unknown, fallbackCurrency: string): { lines: OaOrderLine[]; summary: string } {
  if (!Array.isArray(items)) return { lines: [], summary: "—" };
  const lines: OaOrderLine[] = items.map((item, index) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const title = asString(row.title) || "—";
    const quantity = asFiniteInt(row.quantity) ?? 0;
    const unit = asFiniteInt(row.price_cents);
    return {
      line_id: asString(row.line_id) || `line_${index}`,
      object_id: asString(row.object_id) || "unknown",
      title_snapshot: title,
      quantity,
      unit_amount_minor: unit ?? 0,
      currency: fallbackCurrency || "unknown",
    };
  });
  const summary =
    lines
      .map((line) => `${line.title_snapshot} ×${line.quantity}`)
      .filter(Boolean)
      .join(" · ") || "—";
  return { lines, summary };
}

export function mapCommerceOrder(source: CommerceOrderSource, retrievedAt: string): OaOrderRecord {
  const orderId = asString(source.order_id) || asString(source.id) || "unknown";
  const orderNumber = asString(source.id) || orderId;
  const sourceOrderStatus = asString(source.status) || "unknown";
  const sourcePaymentStatus = asString(source.payment_status) || "unknown";
  const sourceFulfillment = asString(source.fulfillment_status) || "unknown";
  const currency = asString(source.currency) || "unknown";
  const subtotal = asFiniteInt(source.subtotal_cents);
  // The legacy order source exposes a subtotal, not the payable order total.
  const sourceTotal = asFiniteInt(source.total_cents);
  const total = sourceTotal !== null && sourceTotal >= 0 ? sourceTotal : null;
  const { lines, summary } = mapLines(source.items, currency);
  const orderStatus = mapOrderStatus(sourceOrderStatus);
  const paymentStatus = mapPaymentStatus(sourcePaymentStatus);
  const fulfillmentStatus = mapFulfillmentStatus(sourceFulfillment);
  const afterSales: AfterSalesStatus = "unknown";
  const refund: RefundStatus = "unknown";
  const risk: RiskStatus = "unknown";

  const queue_tags: OaOrderRecord["queue_tags"] = [];
  if (sourceOrderStatus === "request_received" || sourcePaymentStatus === "pending_manual_confirmation") {
    queue_tags.push("awaiting_action");
  }
  if (fulfillmentStatus === "shipped" || fulfillmentStatus === "partial") {
    queue_tags.push("fulfilling");
  }

  return {
    order_id: orderId,
    order_number: orderNumber,
    created_at: asString(source.created_at),
    updated_at: asString(source.updated_at) || asString(source.created_at),
    customer_ref: "redacted",
    customer_display_masked: maskPersonName(source.contact?.name),
    line_summary: summary,
    lines,
    currency,
    subtotal_minor: subtotal ?? 0,
    discount_minor: 0,
    shipping_minor: 0,
    tax_minor: 0,
    total_minor: total ?? 0,
    order_status: orderStatus,
    payment_status: paymentStatus,
    fulfillment_status: fulfillmentStatus,
    after_sales_status: afterSales,
    refund_status: refund,
    risk_status: risk,
    packages: [],
    policy_snapshot_id: "",
    source_system: asString(source.source) || "unknown",
    source_updated_at: asString(source.updated_at) || asString(source.created_at),
    retrieved_at: retrievedAt,
    queue_tags,
    source_order_status: sourceOrderStatus,
    source_payment_status: sourcePaymentStatus,
    field_mapping_note:
      orderStatus === "unknown" || paymentStatus === "unknown"
        ? "字段待映射/来源不确认"
        : "",
    amount_known: total != null,
    unit_amounts_known: lines.every((line, index) => {
      const raw = Array.isArray(source.items) ? source.items[index] : null;
      const row = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
      return asFiniteInt(row.price_cents) != null;
    }),
  };
}

export function mapCommerceOrderRows(rows: unknown, retrievedAt: string): OaOrderRecord[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => mapCommerceOrder((row || {}) as CommerceOrderSource, retrievedAt));
}
