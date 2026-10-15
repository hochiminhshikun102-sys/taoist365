import type { OaPaymentRecord, PaymentWorkbenchStatus } from "./types";

const PAYMENT_STATUSES = new Set([
  "unpaid",
  "processing",
  "authorized",
  "paid",
  "partial_refund",
  "refunded",
  "failed",
  "unknown",
]);

const REFUND_STATUSES = new Set(["none", "pending", "partial", "completed", "unknown"]);
const SETTLEMENT_STATUSES = new Set(["not_started", "pending", "settling", "held", "complete", "unknown"]);
const RISK_STATUSES = new Set(["clear", "watch", "hold", "unknown"]);

function asString(value: unknown): string {
  return String(value ?? "").trim();
}

function asFiniteInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && /^-?\d+$/.test(value.trim())) return Number.parseInt(value.trim(), 10);
  return null;
}

function mapKnown(raw: string, allowed: Set<string>): string {
  return allowed.has(raw) ? raw : raw ? "unknown" : "unknown";
}

/** Queue from explicit source fields only. Never invent a Payment Intent or ledger row. */
export function mapCommercePayment(source: Record<string, unknown>): OaPaymentRecord {
  const orderId = asString(source.order_id) || asString(source.id) || "unknown";
  const orderNumber = asString(source.id) || orderId;
  const sourcePayment = asString(source.payment_status);
  const paymentStatus = PAYMENT_STATUSES.has(sourcePayment) ? sourcePayment : sourcePayment ? "unknown" : "unknown";
  const intent = asString(source.payment_intent_ref) || asString(source.payment_intent_id);
  const provider = asString(source.payment_provider) || asString(source.provider);
  const currency = asString(source.currency) || "unknown";
  const payable = asFiniteInt(source.total_cents);
  const refundRaw = asString(source.refund_status);
  const refundStatus = refundRaw ? mapKnown(refundRaw, REFUND_STATUSES) : "unknown";
  const refundAmount = asFiniteInt(source.refund_amount_minor) ?? asFiniteInt(source.refund_cents);
  const settlementRaw = asString(source.settlement_status);
  const settlementStatus = settlementRaw ? mapKnown(settlementRaw, SETTLEMENT_STATUSES) : "unknown";
  const riskRaw = asString(source.risk_status);
  const riskStatus = riskRaw ? mapKnown(riskRaw, RISK_STATUSES) : "unknown";

  const queue_tags: PaymentWorkbenchStatus[] = [];
  if (
    sourcePayment === "unpaid" ||
    sourcePayment === "processing" ||
    sourcePayment === "authorized" ||
    sourcePayment === "pending_manual_confirmation" ||
    sourcePayment === "payment_pending"
  ) {
    queue_tags.push("awaiting_capture");
  }
  if (settlementRaw === "pending" || settlementRaw === "settling") queue_tags.push("settling");
  if (refundRaw === "pending") queue_tags.push("refund_queue");
  if (asString(source.recon_status) === "exception" || asString(source.recon_queue) === "true") {
    queue_tags.push("recon_queue");
  }
  if (riskRaw === "hold") queue_tags.push("risk_hold");

  return {
    row_key: intent || orderId,
    order_id: orderId,
    order_number: orderNumber,
    payment_status: paymentStatus,
    source_payment_status: sourcePayment || "unknown",
    payment_provider: provider || "not_connected",
    payment_intent_ref: intent,
    currency,
    amount_minor: payable ?? 0,
    refund_status: refundStatus,
    refund_amount_minor: refundAmount ?? 0,
    settlement_status: settlementStatus,
    risk_status: riskStatus,
    updated_at: asString(source.updated_at) || asString(source.created_at),
    queue_tags,
    amount_known: payable != null,
    intent_known: Boolean(intent),
    provider_known: Boolean(provider),
    refund_amount_known: refundAmount != null,
    settlement_known: Boolean(settlementRaw),
    risk_known: Boolean(riskRaw),
  };
}

export function mapCommercePaymentRows(rows: unknown): OaPaymentRecord[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => mapCommercePayment((row && typeof row === "object" ? row : {}) as Record<string, unknown>));
}
