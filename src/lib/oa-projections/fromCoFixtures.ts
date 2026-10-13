import { ORDERS_FIXTURE } from "@/lib/oa-orders/fixture";
import { PAYMENTS_FIXTURE } from "@/lib/oa-payments/fixture";
import { SHIPPING_FIXTURE } from "@/lib/oa-shipping/fixture";
import { OBJECTS_FIXTURE } from "@/lib/oa-objects/fixture";
import type { OrderProjectionRow, OverviewWorkItem } from "./types";

function withConsumerMeta(
  row: Omit<OrderProjectionRow, "owner_module" | "exception_type" | "capability_status"> &
    Partial<Pick<OrderProjectionRow, "owner_module" | "exception_type" | "capability_status">>,
  owner_module: string,
  exception_type: string,
): OrderProjectionRow {
  return {
    ...row,
    owner_module: row.owner_module ?? owner_module,
    exception_type: row.exception_type ?? exception_type,
    capability_status: row.capability_status ?? "read_only",
  };
}

/** Build shared order projection rows from CO Orders fixture (DEMO only). */
export function buildOrderProjections(): OrderProjectionRow[] {
  return ORDERS_FIXTURE.map((order) =>
    withConsumerMeta(
      {
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
      },
      "co_orders",
      order.queue_tags.includes("needs_attention") || order.risk_status !== "clear"
        ? "order_exception"
        : "none",
    ),
  );
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
      return withConsumerMeta(
        {
          ...base,
          payment_status: p.payment_status,
          refund_status: p.refund_status,
          risk_status: p.risk_status,
          amount_minor: p.amount_minor,
          currency: p.currency,
          last_event_at: p.updated_at,
          source_route: "/admin/oa/co/payments",
        },
        "finance",
        "collection",
      );
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  const refundsPending = PAYMENTS_FIXTURE.filter(
    (p) => p.refund_status === "pending" || p.queue_tags.includes("refund_queue"),
  )
    .map((p) => {
      const base = byOrder.get(p.order_id);
      if (!base) return null;
      return withConsumerMeta(
        {
          ...base,
          payment_status: p.payment_status,
          refund_status: p.refund_status,
          risk_status: p.risk_status,
          amount_minor: p.refund_amount_minor || p.amount_minor,
          currency: p.currency,
          last_event_at: p.updated_at,
          source_route: "/admin/oa/co/payments",
        },
        "finance",
        "refund_pending",
      );
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
      return withConsumerMeta(
        {
          ...base,
          payment_status: p.payment_status,
          refund_status: p.refund_status,
          risk_status: p.risk_status,
          amount_minor: p.amount_minor,
          currency: p.currency,
          last_event_at: p.updated_at,
          source_route: "/admin/oa/co/payments",
        },
        "finance",
        "recon_exception",
      );
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
      return withConsumerMeta(
        {
          ...base,
          fulfillment_status: s.fulfillment_status,
          package_count: Math.max(base.package_count, 1),
          last_event_at: s.updated_at,
          source_route: "/admin/oa/co/shipping",
        },
        "logistics",
        "ready_to_ship",
      );
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  const transitExceptions = SHIPPING_FIXTURE.filter(
    (s) => s.queue_tags.includes("exception") || s.exception_status !== "none",
  )
    .map((s) => {
      const base = byOrder.get(s.order_id);
      if (!base) return null;
      return withConsumerMeta(
        {
          ...base,
          fulfillment_status: s.fulfillment_status,
          last_event_at: s.updated_at,
          source_route: "/admin/oa/co/shipping",
        },
        "logistics",
        "shipping_exception",
      );
    })
    .filter((row): row is OrderProjectionRow => Boolean(row));

  const packageTracking = SHIPPING_FIXTURE.map((s) => {
    const base = byOrder.get(s.order_id);
    if (!base) return null;
    return {
      ...withConsumerMeta(
        {
          ...base,
          fulfillment_status: s.fulfillment_status,
          last_event_at: s.updated_at,
          source_route: "/admin/oa/co/shipping",
        },
        "logistics",
        "package_tracking",
      ),
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
  owner_module: string;
  exception_type: string;
  capability_status: "read_only" | "not_connected";
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
      owner_module: "supply_chain",
      exception_type: mismatch ? "inventory_mismatch" : "sku_reservation",
      capability_status: "read_only" as const,
    };
  });

  const exceptions = skuReservations.filter((row) => row.mismatch);

  return { skuReservations, exceptions };
}

export type CsCenterProjectionBuckets = {
  customerVisible: OrderProjectionRow[];
  aftersalesPending: OrderProjectionRow[];
  shippingExceptionAssist: OrderProjectionRow[];
  paymentRefundInquiry: OrderProjectionRow[];
};

export function buildCsCenterProjections(): CsCenterProjectionBuckets {
  const orders = buildOrderProjections();
  const { transitExceptions } = buildLogisticsProjections();
  const { refundsPending } = buildFinanceProjections();

  const customerVisible = orders
    .filter((row) => row.order_status !== "cancelled")
    .map((row) =>
      withConsumerMeta(
        { ...row, source_route: "/admin/oa/co/orders" },
        "cs_center",
        "customer_visible_order",
      ),
    );

  const aftersalesPending = orders
    .filter(
      (row) =>
        row.after_sales_status === "open" ||
        ORDERS_FIXTURE.find((o) => o.order_id === row.order_id)?.queue_tags.includes("aftersales"),
    )
    .map((row) =>
      withConsumerMeta(
        { ...row, source_route: "/admin/oa/co/orders" },
        "cs_center",
        "aftersales_pending",
      ),
    );

  const shippingExceptionAssist = transitExceptions.map((row) =>
    withConsumerMeta(
      { ...row, source_route: "/admin/oa/co/shipping" },
      "cs_center",
      "shipping_exception_assist",
    ),
  );

  const paymentRefundInquiry = refundsPending.map((row) =>
    withConsumerMeta(
      { ...row, source_route: "/admin/oa/co/payments" },
      "cs_center",
      "payment_refund_inquiry",
    ),
  );

  return {
    customerVisible,
    aftersalesPending,
    shippingExceptionAssist,
    paymentRefundInquiry,
  };
}

export type ComplianceProjectionBuckets = {
  riskStatusQueue: OrderProjectionRow[];
  refundAbuseProjection: OrderProjectionRow[];
  logisticsDisputeProjection: OrderProjectionRow[];
};

export function buildComplianceProjections(): ComplianceProjectionBuckets {
  const orders = buildOrderProjections();
  const { refundsPending } = buildFinanceProjections();
  const { transitExceptions } = buildLogisticsProjections();

  const riskStatusQueue = orders
    .filter((row) => row.risk_status === "watch" || row.risk_status === "hold")
    .map((row) =>
      withConsumerMeta(
        { ...row, source_route: "/admin/oa/co/orders" },
        "compliance",
        "risk_status",
      ),
    );

  const refundAbuseProjection = refundsPending
    .filter((row) => row.risk_status === "watch" || row.risk_status === "hold" || row.refund_status === "pending")
    .map((row) =>
      withConsumerMeta(
        { ...row, source_route: "/admin/oa/co/payments" },
        "compliance",
        "refund_abuse",
      ),
    );

  const logisticsDisputeProjection = transitExceptions.map((row) =>
    withConsumerMeta(
      { ...row, source_route: "/admin/oa/co/shipping" },
      "compliance",
      "logistics_dispute",
    ),
  );

  return { riskStatusQueue, refundAbuseProjection, logisticsDisputeProjection };
}

export type OverviewExceptionBuckets = {
  myWork: OverviewWorkItem[];
  orderExceptions: OrderProjectionRow[];
  paymentRefundExceptions: OrderProjectionRow[];
  fulfillmentShippingExceptions: OrderProjectionRow[];
  inventoryExceptions: SupplySkuProjection[];
  customerServiceExceptions: OrderProjectionRow[];
  complianceRiskExceptions: OrderProjectionRow[];
};

export function buildOverviewExceptionProjections(): OverviewExceptionBuckets {
  const orders = buildOrderProjections();
  const finance = buildFinanceProjections();
  const logistics = buildLogisticsProjections();
  const supply = buildSupplyChainProjections();
  const cs = buildCsCenterProjections();
  const compliance = buildComplianceProjections();

  const orderExceptions = orders
    .filter(
      (row) =>
        row.exception_type === "order_exception" ||
        ORDERS_FIXTURE.find((o) => o.order_id === row.order_id)?.queue_tags.includes("needs_attention"),
    )
    .map((row) =>
      withConsumerMeta({ ...row }, "overview", "order_exception"),
    );

  const paymentRefundExceptions = [
    ...finance.refundsPending,
    ...finance.reconExceptions,
  ].map((row) => withConsumerMeta({ ...row }, "overview", row.exception_type || "payment_exception"));

  const fulfillmentShippingExceptions = [
    ...logistics.readyToShip.filter((r) => r.fulfillment_status === "not_started"),
    ...logistics.transitExceptions,
  ].map((row) =>
    withConsumerMeta({ ...row }, "overview", row.exception_type || "fulfillment_exception"),
  );

  const inventoryExceptions = supply.exceptions;
  const customerServiceExceptions = cs.aftersalesPending.map((row) =>
    withConsumerMeta({ ...row }, "overview", "cs_exception"),
  );
  const complianceRiskExceptions = compliance.riskStatusQueue.map((row) =>
    withConsumerMeta({ ...row }, "overview", "compliance_risk"),
  );

  const myWork: OverviewWorkItem[] = [
    {
      id: "mw-order",
      title: "Order exceptions",
      title_zh: "订单异常",
      count: orderExceptions.length,
      owner_module: "co_orders",
      href: "/admin/oa/co/orders",
      exception_type: "order_exception",
      capability_status: "read_only",
    },
    {
      id: "mw-pay",
      title: "Payment / refund exceptions",
      title_zh: "支付与退款异常",
      count: paymentRefundExceptions.length,
      owner_module: "finance",
      href: "/admin/oa/finance",
      exception_type: "payment_exception",
      capability_status: "read_only",
    },
    {
      id: "mw-ship",
      title: "Fulfillment / shipping exceptions",
      title_zh: "履约与物流异常",
      count: fulfillmentShippingExceptions.length,
      owner_module: "logistics",
      href: "/admin/oa/logistics",
      exception_type: "shipping_exception",
      capability_status: "read_only",
    },
    {
      id: "mw-inv",
      title: "Inventory exceptions",
      title_zh: "库存异常",
      count: inventoryExceptions.length,
      owner_module: "supply_chain",
      href: "/admin/oa/supply-chain",
      exception_type: "inventory_mismatch",
      capability_status: "read_only",
    },
    {
      id: "mw-cs",
      title: "Customer service exceptions",
      title_zh: "客服异常",
      count: customerServiceExceptions.length,
      owner_module: "cs_center",
      href: "/admin/oa/cs-center",
      exception_type: "cs_exception",
      capability_status: "read_only",
    },
    {
      id: "mw-comp",
      title: "Compliance risk exceptions",
      title_zh: "合规风险异常",
      count: complianceRiskExceptions.length,
      owner_module: "compliance",
      href: "/admin/oa/compliance",
      exception_type: "compliance_risk",
      capability_status: "read_only",
    },
  ];

  return {
    myWork,
    orderExceptions,
    paymentRefundExceptions,
    fulfillmentShippingExceptions,
    inventoryExceptions,
    customerServiceExceptions,
    complianceRiskExceptions,
  };
}
