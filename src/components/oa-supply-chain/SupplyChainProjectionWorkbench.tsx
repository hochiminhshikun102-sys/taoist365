"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { statusLabel } from "@/lib/oa-orders/format";
import { buildOrderProjections, buildSupplyChainProjections } from "@/lib/oa-projections/fromCoFixtures";
import { ProjectionTable } from "@/components/oa-projections/ProjectionTable";
import { PROJECTION_META, SHARED_PROJECTION_FIELDS } from "@/lib/oa-projections/types";

export function SupplyChainProjectionWorkbench() {
  const { skuReservations, exceptions } = buildSupplyChainProjections();
  const orderProjection = buildOrderProjections().filter(
    (row) => row.fulfillment_status === "not_started" || row.fulfillment_status === "partial",
  );

  return (
    <section className="oa-page oa-supply-page" data-oa-supply-projection="r50">
      <div className="oa-fixture-banner">
        R50_ORDER_PROJECTION_CONSUMERS_A · SUPPLY_CHAIN · DATA_SOURCE={PROJECTION_META.data_source} ·
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
        <span className="oa-capability-owner">
          Owner · 10 Supply Chain · consumes Objects / Orders / Shipping projection
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Supply Chain · 供应链管理</h1>
          <p className="oa-skeleton-lead">
            Readonly SKU / reservation projection from Objects + Orders DEMO fixtures. No inventory adjust, reserve, or
            release writes.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Reserve stock · 预占 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Release · 释放 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        <article className="oa-card">
          <h3>SKU projections · SKU 投影</h3>
          <p className="oa-co-kpi-value">{skuReservations.length}</p>
          <p className="oa-skeleton-meta">From Objects ledger</p>
        </article>
        <article className="oa-card">
          <h3>Mismatch alerts · 预占异常</h3>
          <p className="oa-co-kpi-value">{exceptions.length}</p>
          <p className="oa-skeleton-meta">low/out/unknown vs reserved</p>
        </article>
        <article className="oa-card">
          <h3>Unfulfilled orders · 待履约订单</h3>
          <p className="oa-co-kpi-value">{orderProjection.length}</p>
          <p className="oa-skeleton-meta">Orders not_started / partial</p>
        </article>
        <article className="oa-card">
          <h3>QC / warehouse · 质检仓库</h3>
          <p className="oa-co-kpi-value">—</p>
          <p className="oa-skeleton-meta">future slot · {capabilityLabel("not_connected")}</p>
        </article>
      </div>

      <article className="oa-card oa-proj-section">
        <h2>SKU / reservation projection · SKU 与库存预占投影</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>sku</th>
                <th>title</th>
                <th>inventory_projection_status</th>
                <th>reserved_qty_demo</th>
                <th>order_refs</th>
                <th>mismatch</th>
                <th>source_route</th>
              </tr>
            </thead>
            <tbody>
              {skuReservations.map((row) => (
                <tr key={row.object_id}>
                  <td>
                    <strong>{row.sku}</strong>
                    <div className="oa-skeleton-meta">{row.object_id}</div>
                  </td>
                  <td>{row.title}</td>
                  <td>{statusLabel(row.inventory_projection_status)}</td>
                  <td>{row.reserved_qty_demo}</td>
                  <td>{row.order_refs.join(", ") || "—"}</td>
                  <td>{row.mismatch ? "YES" : "no"}</td>
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
        <h2>Shortage / reservation mismatch · 库存不足与预占不一致</h2>
        {exceptions.length === 0 ? (
          <p className="oa-skeleton-meta">No DEMO mismatch rows</p>
        ) : (
          <ul className="oa-orders-lines">
            {exceptions.map((row) => (
              <li key={row.sku}>
                <strong>{row.sku}</strong> · status={row.inventory_projection_status} · reserved=
                {row.reserved_qty_demo} · orders={row.order_refs.join(", ") || "n/a"}
              </li>
            ))}
          </ul>
        )}
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Order demand projection · 订单需求投影（待履约）</h2>
        <ProjectionTable rows={orderProjection} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Future slot · 质检 / 仓库</h2>
        <p>
          Warehouse WMS / QC provider remains <strong>not_connected</strong>. Slot reserved — no write UI.
        </p>
        <button className="oa-btn" type="button" disabled>
          Open WMS · Blocked
        </button>
      </article>

      <article className="oa-card">
        <h2>Shared projection fields · 共享投影字段</h2>
        <p className="oa-skeleton-meta">{SHARED_PROJECTION_FIELDS.join(" · ")}</p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            Objects Runtime · 商品系统
          </Link>
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
