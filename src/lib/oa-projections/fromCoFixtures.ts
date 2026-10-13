import { ORDERS_FIXTURE } from "@/lib/oa-orders/fixture";
import { PAYMENTS_FIXTURE } from "@/lib/oa-payments/fixture";
import { SHIPPING_FIXTURE } from "@/lib/oa-shipping/fixture";
import { OBJECTS_FIXTURE } from "@/lib/oa-objects/fixture";
import type { OrderProjectionRow } from "./types";

/** Build shared order projection rows from CO Orders fixture (DEMO only). */
export function buildOrderProjections(): OrderProjectionRow[] {
  return ORDERS_FIXTURE.map((order) => ({
    order_id: order.order_id,
    order_number: order.order_number,
    order_status: order.order_status,
    payment_status: order.payment_status,
    fulfillment_status: order.fulfillment_status,
    after_sales_status: order.after_sales_status,
    refund_status: order.refund_status,
    risk_status: order.risk_status,
    currency: order.currency,
    amount_minor: order.total_minor,
    items_count: order.lines.reduce((n, line) => n + line.quantity, 0),
    package_count: order.packages.length,
    last_event_at: order.updated_at,
    source_route: "/admin/oa/co/orders",
  }));
}

export type FinanceProjectionBuckets = {
  collections: OrderProjectionRow[];
  refundsPending: OrderProjectionRow[];
  reconExceptions: OrderProjectionRow[];
};

export function buildFinanceProjections(): FinanceProjectionBuckets {
  const byOrder = new Map(buildOrderProjections().map((row) => [row.order_id, row]));

  const collections = PAYMENTS_FIXTURE.filter((p) =>
    ["paid", "authorized", "processing"].includes(p.payment_status),
  )
    .map((p) => {
      const base = byOrder.get(p.order_id);
      if (!base) return null;
      return {
        ...base,
        payment_status: p.payment_status,
        refund_status: p.refund_status,
        risk_status: p.risk_status,
        amount_minor: p.amount_minor,
        currency: p.currency,
        last_event_at: p.updated_at,
        source_route: "/admin/oa/co/payments",
      } satisfies OrderProjectionRow;
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  const refundsPending = PAYMENTS_FIXTURE.filter(
    (p) => p.refund_status === "pending" || p.queue_tags.includes("refund_queue"),
  )
    .map((p) => {
      const base = byOrder.get(p.order_id);
      if (!base) return null;
      return {
        ...base,
        payment_status: p.payment_status,
        refund_status: p.refund_status,
        risk_status: p.risk_status,
        amount_minor: p.refund_amount_minor || p.amount_minor,
        currency: p.currency,
        last_event_at: p.updated_at,
        source_route: "/admin/oa/co/payments",
      } satisfies OrderProjectionRow;
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  const reconExceptions = PAYMENTS_FIXTURE.filter(
    (p) =>
      p.queue_tags.includes("recon_queue") ||
      p.settlement_status === "held" ||
      p.risk_status === "hold",
  )
    .map((p) => {
      const base = byOrder.get(p.order_id);
      if (!base) return null;
      return {
        ...base,
        payment_status: p.payment_status,
        refund_status: p.refund_status,
        risk_status: p.risk_status,
        amount_minor: p.amount_minor,
        currency: p.currency,
        last_event_at: p.updated_at,
        source_route: "/admin/oa/co/payments",
      } satisfies OrderProjectionRow;
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  return { collections, refundsPending, reconExceptions };
}

export type LogisticsProjectionBuckets = {
  readyToShip: OrderProjectionRow[];
  transitExceptions: OrderProjectionRow[];
  packageTracking: Array<
    OrderProjectionRow & {
      shipment_id: string;
      carrier: string;
      tracking_ref: string;
      shipment_status: string;
    }
  >;
};

export function buildLogisticsProjections(): LogisticsProjectionBuckets {
  const byOrder = new Map(buildOrderProjections().map((row) => [row.order_id, row]));

  const readyToShip = SHIPPING_FIXTURE.filter(
    (s) => s.queue_tags.includes("ready_to_ship") || s.shipment_status === "label_pending",
  )
    .map((s) => {
      const base = byOrder.get(s.order_id);
      if (!base) return null;
      return {
        ...base,
        fulfillment_status: s.fulfillment_status,
        package_count: Math.max(base.package_count, 1),
        last_event_at: s.updated_at,
        source_route: "/admin/oa/co/shipping",
      } satisfies OrderProjectionRow;
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  const transitExceptions = SHIPPING_FIXTURE.filter(
    (s) => s.queue_tags.includes("exception") || s.exception_status !== "none",
  )
    .map((s) => {
      const base = byOrder.get(s.order_id);
      if (!base) return null;
      return {
        ...base,
        fulfillment_status: s.fulfillment_status,
        last_event_at: s.updated_at,
        source_route: "/admin/oa/co/shipping",
      } satisfies OrderProjectionRow;
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  const packageTracking = SHIPPING_FIXTURE.map((s) => {
    const base = byOrder.get(s.order_id);
    if (!base) return null;
    return {
      ...base,
      fulfillment_status: s.fulfillment_status,
      last_event_at: s.updated_at,
      source_route: "/admin/oa/co/shipping",
      shipment_id: s.shipment_id,
      carrier: s.carrier,
      tracking_ref: s.tracking_ref || "—",
      shipment_status: s.shipment_status,
    };
  }).filter(
    (
      row,
    ): row is OrderProjectionRow & {
      shipment_id: string;
      carrier: string;
      tracking_ref: string;
      shipment_status: string;
    } => Boolean(row),
  );

  return { readyToShip, transitExceptions, packageTracking };
}

export type SupplySkuProjection = {
  sku: string;
  object_id: string;
  title: string;
  inventory_projection_status: string;
  reserved_qty_demo: number;
  on_hand_projection: string;
  mismatch: boolean;
  order_refs: string[];
  source_route: string;
};

export function buildSupplyChainProjections(): {
  skuReservations: SupplySkuProjection[];
  exceptions: SupplySkuProjection[];
} {
  const orderHits = new Map<string, { qty: number; orders: string[] }>();
  for (const order of ORDERS_FIXTURE) {
    for (const line of order.lines) {
      const prev = orderHits.get(line.object_id) ?? { qty: 0, orders: [] };
      prev.qty += line.quantity;
      if (!prev.orders.includes(order.order_number)) prev.orders.push(order.order_number);
      orderHits.set(line.object_id, prev);
    }
  }

  // Map DEMO object_ids used in orders to Objects ledger SKUs where possible
  const skuByObjectHint: Record<string, string> = {
    "DH-OBJ-DEMO-01": "SKU-DEMO-TEA-A",
    "DH-OBJ-DEMO-02": "SKU-DEMO-INC-B",
    "DH-OBJ-DEMO-03": "SKU-DEMO-RITUAL-E",
  };

  const skuReservations: SupplySkuProjection[] = OBJECTS_FIXTURE.map((obj) => {
    const linkedObjectIds = Object.entries(skuByObjectHint)
      .filter(([, sku]) => sku === obj.sku)
      .map(([oid]) => oid);
    let reserved = 0;
    const orders: string[] = [];
    for (const oid of linkedObjectIds) {
      const hit = orderHits.get(oid);
      if (hit) {
        reserved += hit.qty;
        for (const o of hit.orders) if (!orders.includes(o)) orders.push(o);
      }
    }
    // Also match by order_line_hits when no object_id map
    if (reserved === 0 && obj.order_line_hits > 0) {
      reserved = obj.order_line_hits;
    }

    const mismatch =
      (obj.inventory_projection_status === "out_of_stock" && reserved > 0) ||
      (obj.inventory_projection_status === "low_stock" && reserved >= 2) ||
      obj.inventory_projection_status === "unknown";

    return {
      sku: obj.sku,
      object_id: obj.object_id,
      title: `${obj.title} · ${obj.title_zh}`,
      inventory_projection_status: obj.inventory_projection_status,
      reserved_qty_demo: reserved,
      on_hand_projection: obj.inventory_projection_status,
      mismatch,
      order_refs: orders,
      source_route: "/admin/oa/co/objects",
    };
  });

  const exceptions = skuReservations.filter((row) => row.mismatch);

  return { skuReservations, exceptions };
}
