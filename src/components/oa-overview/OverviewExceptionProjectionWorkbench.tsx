"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { ProjectionTable } from "@/components/oa-projections/ProjectionTable";
import { buildOverviewExceptionProjections } from "@/lib/oa-projections/fromCoFixtures";
import { PROJECTION_META, SHARED_PROJECTION_FIELDS } from "@/lib/oa-projections/types";

export function OverviewExceptionProjectionWorkbench() {
  const {
    myWork,
    orderExceptions,
    paymentRefundExceptions,
    fulfillmentShippingExceptions,
    inventoryExceptions,
    customerServiceExceptions,
    complianceRiskExceptions,
  } = buildOverviewExceptionProjections();

  return (
    <section className="oa-page oa-overview-proj-page" data-oa-overview-projection="r52">
      <div className="oa-fixture-banner">
        R52_ORDER_PROJECTION_CONSUMERS_B · OVERVIEW · DATA_SOURCE={PROJECTION_META.data_source} ·
        LIVE_PROVIDER={PROJECTION_META.live_provider} · capability={PROJECTION_META.capability} ·
        REAL_WRITE=FALSE · NOT_A_SECOND_LEDGER
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${PROJECTION_META.capability}`}>
          {capabilityLabel(PROJECTION_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">
          Owner · Overview · projection + navigation only · no business command execution
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Overview · 经营总览 · Exception Projection</h1>
          <p className="oa-skeleton-lead">
            Aggregated readonly exception projections across Orders · Finance · Logistics · Supply · CS
            · Compliance. Navigation links only — Overview is not a second business ledger.
          </p>
        </div>
      </header>

      <article className="oa-card oa-proj-section">
        <h2>My Work · 我的待办</h2>
        <div className="oa-co-kpi-grid oa-proj-kpi oa-overview-mywork">
          {myWork.map((item) => (
            <Link key={item.id} className="oa-card oa-overview-work-link" href={item.href}>
              <h3>
                {item.title} · {item.title_zh}
              </h3>
              <p className="oa-co-kpi-value">{item.count}</p>
              <p className="oa-skeleton-meta">
                owner={item.owner_module} · {item.exception_type} · {item.capability_status}
              </p>
            </Link>
          ))}
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Order exceptions · 订单异常</h2>
        <ProjectionTable rows={orderExceptions} emptyLabel="No DEMO order exceptions" />
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Owner · Orders
          </Link>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Payment / refund exceptions · 支付与退款异常</h2>
        <ProjectionTable rows={paymentRefundExceptions} emptyLabel="No DEMO payment exceptions" />
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/finance">
            Owner · Finance
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            CO Payments
          </Link>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Fulfillment / shipping exceptions · 履约与物流异常</h2>
        <ProjectionTable
          rows={fulfillmentShippingExceptions}
          emptyLabel="No DEMO fulfillment exceptions"
        />
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/logistics">
            Owner · Logistics
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            CO Shipping
          </Link>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Inventory exceptions · 库存异常</h2>
        {inventoryExceptions.length === 0 ? (
          <p className="oa-skeleton-meta">No DEMO inventory mismatch rows</p>
        ) : (
          <div className="oa-orders-table-wrap">
            <table className="oa-table">
              <thead>
                <tr>
                  <th>sku</th>
                  <th>title</th>
                  <th>inventory</th>
                  <th>reserved</th>
                  <th>order_refs</th>
                  <th>exception_type</th>
                  <th>source_route</th>
                </tr>
              </thead>
              <tbody>
                {inventoryExceptions.map((row) => (
                  <tr key={row.object_id}>
                    <td>{row.sku}</td>
                    <td>{row.title}</td>
                    <td>{row.inventory_projection_status}</td>
                    <td>{row.reserved_qty_demo}</td>
                    <td>{row.order_refs.join(", ") || "—"}</td>
                    <td>{row.exception_type}</td>
                    <td>
                      <code>{row.source_route}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/supply-chain">
            Owner · Supply Chain
          </Link>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Customer service exceptions · 客服异常</h2>
        <ProjectionTable rows={customerServiceExceptions} emptyLabel="No DEMO CS exceptions" />
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/cs-center">
            Owner · CS Center
          </Link>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Compliance risk exceptions · 合规风险异常</h2>
        <ProjectionTable rows={complianceRiskExceptions} emptyLabel="No DEMO compliance risks" />
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/compliance">
            Owner · Compliance
          </Link>
        </div>
      </article>

      <article className="oa-card">
        <h2>Shared projection fields · 共享投影字段</h2>
        <p className="oa-skeleton-meta">{SHARED_PROJECTION_FIELDS.join(" · ")}</p>
        <p className="oa-skeleton-meta">
          Overview aggregates projections for navigation only. Business writes remain blocked at owner
          modules.
        </p>
      </article>
    </section>
  );
}
