"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { ProjectionTable } from "@/components/oa-projections/ProjectionTable";
import { statusLabel } from "@/lib/oa-orders/format";
import { buildLogisticsProjections } from "@/lib/oa-projections/fromCoFixtures";
import { PROJECTION_META, SHARED_PROJECTION_FIELDS } from "@/lib/oa-projections/types";

export function LogisticsProjectionWorkbench() {
  const { readyToShip, transitExceptions, packageTracking } = buildLogisticsProjections();

  return (
    <section className="oa-page oa-logistics-page" data-oa-logistics-projection="r50">
      <div className="oa-fixture-banner">
        R50_ORDER_PROJECTION_CONSUMERS_A · LOGISTICS · DATA_SOURCE={PROJECTION_META.data_source} ·
        LIVE_PROVIDER={PROJECTION_META.live_provider} · capability={PROJECTION_META.capability} ·
        REAL_WRITE=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${PROJECTION_META.capability}`}>
          {capabilityLabel(PROJECTION_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 09 Logistics · consumes CO Orders/Shipping projection</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Logistics · 物流管理</h1>
          <p className="oa-skeleton-lead">
            Readonly projection consumer for CO Orders / Shipping. DEMO only — no label buy, handoff, or carrier API
            writes.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Create label · 面单 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Mark shipped · 发货 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        <article className="oa-card">
          <h3>Ready to ship · 发货待处理</h3>
          <p className="oa-co-kpi-value">{readyToShip.length}</p>
          <p className="oa-skeleton-meta">From Shipping ready_to_ship</p>
        </article>
        <article className="oa-card">
          <h3>Transit exceptions · 运输异常</h3>
          <p className="oa-co-kpi-value">{transitExceptions.length}</p>
          <p className="oa-skeleton-meta">exception_status ≠ none</p>
        </article>
        <article className="oa-card">
          <h3>Package rows · 包裹投影</h3>
          <p className="oa-co-kpi-value">{packageTracking.length}</p>
          <p className="oa-skeleton-meta">Readonly tracking skeleton</p>
        </article>
        <article className="oa-card">
          <h3>Return logistics · 退货物流</h3>
          <p className="oa-co-kpi-value">—</p>
          <p className="oa-skeleton-meta">future slot · {capabilityLabel("not_connected")}</p>
        </article>
      </div>

      <article className="oa-card oa-proj-section">
        <h2>Ready-to-ship projection · 发货待处理投影</h2>
        <ProjectionTable rows={readyToShip} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Transit exceptions · 运输异常投影</h2>
        <ProjectionTable rows={transitExceptions} emptyLabel="No DEMO transit exceptions in fixture" />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Package / tracking readonly · 包裹与轨迹只读投影</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>order_number</th>
                <th>shipment_id</th>
                <th>carrier</th>
                <th>tracking_ref</th>
                <th>shipment_status</th>
                <th>fulfillment</th>
                <th>source_route</th>
              </tr>
            </thead>
            <tbody>
              {packageTracking.map((row) => (
                <tr key={row.shipment_id}>
                  <td>{row.order_number}</td>
                  <td>{row.shipment_id}</td>
                  <td>{row.carrier}</td>
                  <td>{row.tracking_ref}</td>
                  <td>{statusLabel(row.shipment_status)}</td>
                  <td>{statusLabel(row.fulfillment_status)}</td>
                  <td>
                    <code>{row.source_route}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Future slot · 退货物流</h2>
        <p>
          Reverse logistics provider remains <strong>not_connected</strong>. Slot reserved — no write UI.
        </p>
        <button className="oa-btn" type="button" disabled>
          Create return label · Blocked
        </button>
      </article>

      <article className="oa-card">
        <h2>Shared projection fields · 共享投影字段</h2>
        <p className="oa-skeleton-meta">{SHARED_PROJECTION_FIELDS.join(" · ")}</p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Orders Runtime · 订单系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            Shipping Runtime · 发货管理
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            CO Overview · 总入口
          </Link>
        </div>
      </article>
    </section>
  );
}
