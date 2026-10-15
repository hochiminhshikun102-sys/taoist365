import type { OaShipmentRecord, ShippingWorkbenchStatus } from "./types";

const FULFILLMENT_STATUSES = new Set([
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

function firstLineId(items: unknown): string {
  if (!Array.isArray(items) || !items[0] || typeof items[0] !== "object") return "";
  const row = items[0] as Record<string, unknown>;
  return asString(row.line_id);
}

function packageRows(source: Record<string, unknown>): Record<string, unknown>[] {
  if (!Array.isArray(source.packages)) return [{}];
  const rows = source.packages.filter((item) => item && typeof item === "object") as Record<string, unknown>[];
  return rows.length ? rows : [{}];
}

function isTruthyFlag(value: unknown): boolean {
  return value === true || value === "true";
}

/** Confirmed ship-ready only from an explicit source grant — never from fulfillment not_started or paid. */
export function hasExplicitShipReadyGrant(source: Record<string, unknown>, pkg: Record<string, unknown> = {}): boolean {
  if (isTruthyFlag(pkg.ready_to_ship) || isTruthyFlag(source.ready_to_ship)) return true;
  if (isTruthyFlag(pkg.ship_eligible) || isTruthyFlag(source.ship_eligible)) return true;
  const shipmentStatus = asString(pkg.shipment_status) || asString(source.shipment_status);
  return shipmentStatus === "ready_to_ship";
}

/** One row per source package, or one order row when no package exists. Paid ≠ shipped. */
export function mapCommerceShipmentRowsFromOrder(source: Record<string, unknown>): OaShipmentRecord[] {
  const orderId = asString(source.order_id) || asString(source.id) || "unknown";
  const orderNumber = asString(source.id) || orderId;
  const sourceFulfillment = asString(source.fulfillment_status);
  const fulfillmentStatus = FULFILLMENT_STATUSES.has(sourceFulfillment)
    ? sourceFulfillment
    : sourceFulfillment
      ? "unknown"
      : "unknown";
  const lineId = firstLineId(source.items);
  const updated = asString(source.updated_at) || asString(source.created_at);

  return packageRows(source).map((pkg, index) => {
    const shipmentId = asString(pkg.shipment_id) || asString(source.shipment_id);
    const tracking = asString(pkg.tracking_ref) || asString(source.tracking);
    const carrier = asString(pkg.carrier) || asString(source.carrier);
    const warehouse = asString(pkg.warehouse_ref) || asString(source.warehouse_ref);
    const handoff = asString(pkg.handoff_status) || asString(source.handoff_status);
    const exceptionRaw = asString(pkg.exception_status) || asString(source.exception_status);
    const shipmentStatus = asString(pkg.shipment_status) || asString(source.shipment_status);
    const fulfillmentSource = asString(pkg.fulfillment_source) || asString(source.fulfillment_source);
    const returnFlag =
      isTruthyFlag(source.return_logistics) ||
      isTruthyFlag(pkg.return_logistics) ||
      isTruthyFlag(source.reverse_shipment) ||
      isTruthyFlag(pkg.reverse_shipment);

    const explicitReady = hasExplicitShipReadyGrant(source, pkg);
    const ship_eligibility: OaShipmentRecord["ship_eligibility"] = explicitReady
      ? "eligible"
      : sourceFulfillment === "not_started"
        ? "pending"
        : "unknown";

    const queue_tags: ShippingWorkbenchStatus[] = [];
    if (explicitReady) queue_tags.push("ready_to_ship");
    if (sourceFulfillment === "shipped" || shipmentStatus === "in_transit") queue_tags.push("in_transit");
    if (sourceFulfillment === "exception" || (exceptionRaw && exceptionRaw !== "none")) queue_tags.push("exception");
    if (returnFlag) queue_tags.push("return_logistics");
    if (handoff) queue_tags.push("handoff");

    const rowKey = shipmentId || `${orderId}:${index}`;
    return {
      row_key: rowKey,
      order_id: orderId,
      order_number: orderNumber,
      line_id: lineId || "unknown",
      shipment_id: shipmentId,
      fulfillment_status: fulfillmentStatus,
      source_fulfillment_status: sourceFulfillment || "unknown",
      shipment_status: shipmentStatus || "unknown",
      fulfillment_source: fulfillmentSource || "unknown",
      carrier: carrier || "not_connected",
      tracking_ref: tracking,
      warehouse_ref: warehouse || "unknown",
      handoff_status: handoff || "unknown",
      exception_status: exceptionRaw || (sourceFulfillment === "exception" ? "exception" : "unknown"),
      ship_eligibility,
      updated_at: updated,
      queue_tags,
      shipment_known: Boolean(shipmentId),
      tracking_known: Boolean(tracking),
      carrier_known: Boolean(carrier),
      warehouse_known: Boolean(warehouse),
      handoff_known: Boolean(handoff),
      exception_known: Boolean(exceptionRaw) || sourceFulfillment === "exception",
    };
  });
}

export function mapCommerceShipmentRows(rows: unknown): OaShipmentRecord[] {
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((row) =>
    mapCommerceShipmentRowsFromOrder((row && typeof row === "object" ? row : {}) as Record<string, unknown>),
  );
}

export function paidDoesNotImplyShipped(source: Record<string, unknown>): boolean {
  return asString(source.payment_status) === "paid" && asString(source.fulfillment_status) === "not_started";
}
