"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { statusLabel } from "@/lib/oa-orders/format";
import { SHIPPING_CORE_META, SHIPPING_FIXTURE, SHIPPING_ORDER_FIELD_MAP } from "@/lib/oa-shipping/fixture";
import type { OaShipmentRecord, ShippingWorkbenchStatus } from "@/lib/oa-shipping/types";

type QueueKey = "all" | ShippingWorkbenchStatus;

const QUEUES: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "ready_to_ship", en: "Ready to ship", zh: "待发货" },
  { key: "in_transit", en: "In transit", zh: "运输中" },
  { key: "exception", en: "Exception", zh: "异常" },
  { key: "return_logistics", en: "Return logistics", zh: "退货物流" },
  { key: "handoff", en: "Handoff", zh: "交接" },
];

export function ShippingRuntimeWorkbench() {
  const [queue, setQueue] = useState<QueueKey>("all");
  const [selectedId, setSelectedId] = useState(SHIPPING_FIXTURE[0]?.shipment_id ?? "");
  const [panel, setPanel] = useState<"detail" | "tracking" | "returns">("detail");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: SHIPPING_FIXTURE.length };
    for (const q of QUEUES) if (q.key !== "all") map[q.key] = 0;
    for (const row of SHIPPING_FIXTURE) for (const tag of row.queue_tags) map[tag] = (map[tag] || 0) + 1;
    return map;
  }, []);

  const rows = useMemo(() => {
    if (queue === "all") return SHIPPING_FIXTURE;
    return SHIPPING_FIXTURE.filter((row) => row.queue_tags.includes(queue));
  }, [queue]);

  const selected: OaShipmentRecord | null =
    rows.find((row) => row.shipment_id === selectedId) ?? rows[0] ?? null;

  return (
    <section className="oa-page oa-ps-page" data-oa-shipping-core="r44">
      <div className="oa-fixture-banner">
        WAVE1C_SHIPPING_SKELETON · DATA_SOURCE={SHIPPING_CORE_META.data_source} · LIVE_PROVIDER=
        {SHIPPING_CORE_META.live_provider} · capability={SHIPPING_CORE_META.capability} · REAL_WRITE=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${SHIPPING_CORE_META.capability}`}>
          {capabilityLabel(SHIPPING_CORE_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Shipping Runtime · stays under CO</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Shipping Runtime · 发货管理</h1>
          <p className="oa-skeleton-lead">
            Read-only skeleton for Logistics / Supply Chain / CS return-logistics projections. DEMO only — no label,
            ship, or tracking writes.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Create label · 面单 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Confirm ship · 确认发货 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-orders-queues oa-ps-queues">
        {QUEUES.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`oa-orders-queue${queue === item.key ? " is-active" : ""}`}
            onClick={() => setQueue(item.key)}
          >
            <span>
              {item.en} · {item.zh}
            </span>
            <strong>{counts[item.key] || 0}</strong>
          </button>
        ))}
      </div>

      <div className="oa-orders-layout">
        <article className="oa-card">
          <div className="oa-commerce-list-head">
            <h2>Package list skeleton · 包裹列表骨架</h2>
            <span className="oa-skeleton-meta">{rows.length} DEMO rows</span>
          </div>
          <div className="oa-orders-table-wrap">
            <table className="oa-table">
              <thead>
                <tr>
                  <th>Order / Line</th>
                  <th>Shipment</th>
                  <th>Fulfillment</th>
                  <th>Shipment status</th>
                  <th>Source</th>
                  <th>Carrier / Tracking</th>
                  <th>Warehouse</th>
                  <th>Handoff</th>
                  <th>Exception</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.shipment_id}
                    className={selected?.shipment_id === row.shipment_id ? "is-selected" : undefined}
                    onClick={() => setSelectedId(row.shipment_id)}
                  >
                    <td>
                      {row.order_number}
                      <div className="oa-skeleton-meta">
                        {row.order_id} · {row.line_id}
                      </div>
                    </td>
                    <td>{row.shipment_id}</td>
                    <td>{statusLabel(row.fulfillment_status)}</td>
                    <td>{statusLabel(row.shipment_status)}</td>
                    <td>{row.fulfillment_source}</td>
                    <td>
                      {row.carrier}
                      <div className="oa-skeleton-meta">{row.tracking_ref || "tracking pending"}</div>
                    </td>
                    <td>{row.warehouse_ref}</td>
                    <td>{statusLabel(row.handoff_status)}</td>
                    <td>{statusLabel(row.exception_status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="oa-card">
          <div className="oa-ps-panel-tabs">
            {(
              [
                ["detail", "Shipment detail"],
                ["tracking", "Tracking entry"],
                ["returns", "Return logistics"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`oa-orders-chip${panel === key ? " is-active" : ""}`}
                onClick={() => setPanel(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {!selected ? (
            <p className="oa-skeleton-meta">Select a shipment row.</p>
          ) : panel === "detail" ? (
            <dl className="oa-orders-dl">
              <div>
                <dt>order / line</dt>
                <dd>
                  {selected.order_number} · {selected.line_id}
                </dd>
              </div>
              <div>
                <dt>shipment_id</dt>
                <dd>{selected.shipment_id}</dd>
              </div>
              <div>
                <dt>fulfillment_status</dt>
                <dd>{selected.fulfillment_status}</dd>
              </div>
              <div>
                <dt>shipment_status</dt>
                <dd>{selected.shipment_status}</dd>
              </div>
              <div>
                <dt>fulfillment_source</dt>
                <dd>{selected.fulfillment_source}</dd>
              </div>
              <div>
                <dt>carrier / tracking_ref</dt>
                <dd>
                  {selected.carrier} · {selected.tracking_ref || "—"}
                </dd>
              </div>
              <div>
                <dt>warehouse_ref</dt>
                <dd>{selected.warehouse_ref}</dd>
              </div>
              <div>
                <dt>handoff_status</dt>
                <dd>{selected.handoff_status}</dd>
              </div>
              <div>
                <dt>exception_status</dt>
                <dd>{selected.exception_status}</dd>
              </div>
            </dl>
          ) : panel === "tracking" ? (
            <div>
              <h3>Tracking entry · 物流轨迹入口</h3>
              <p className="oa-skeleton-meta">
                Skeleton only. Carrier API not connected. Opens Logistics shell for projection.
              </p>
              <p>
                {selected.carrier} / {selected.tracking_ref || "no tracking yet"}
              </p>
              <Link className="oa-btn secondary" href="/admin/oa/logistics">
                Open Logistics shell · 物流壳
              </Link>
            </div>
          ) : (
            <div>
              <h3>Return logistics · 退货物流入口</h3>
              <p className="oa-skeleton-meta">
                Skeleton only. Exception={selected.exception_status}. No reverse-label write.
              </p>
              <div className="oa-skeleton-actions">
                <Link className="oa-btn secondary" href="/admin/oa/cs-center">
                  CS Center · 客服
                </Link>
                <Link className="oa-btn secondary" href="/admin/oa/supply-chain">
                  Supply Chain · 供应链
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>

      <article className="oa-card">
        <h2>Orders / Supply field map · 与订单与供应链映射</h2>
        <ul className="oa-orders-lines">
          {SHIPPING_ORDER_FIELD_MAP.map((row) => (
            <li key={row.shipping_field}>
              <strong>{row.shipping_field}</strong> ← {row.orders_source}
            </li>
          ))}
        </ul>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Orders Runtime · 订单系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            Payments Runtime · 支付管理
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            Objects Runtime · 商品系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            CO Overview · 总入口
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/logistics">
            Logistics · 物流管理
          </Link>
        </div>
      </article>
    </section>
  );
}
