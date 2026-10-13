"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { ProjectionTable } from "@/components/oa-projections/ProjectionTable";
import { buildFinanceProjections } from "@/lib/oa-projections/fromCoFixtures";
import { PROJECTION_META, SHARED_PROJECTION_FIELDS } from "@/lib/oa-projections/types";

export function FinanceProjectionWorkbench() {
  const { collections, refundsPending, reconExceptions } = buildFinanceProjections();

  return (
    <section className="oa-page oa-finance-page" data-oa-finance-projection="r50">
      <div className="oa-fixture-banner">
        R50_ORDER_PROJECTION_CONSUMERS_A · FINANCE · DATA_SOURCE={PROJECTION_META.data_source} ·
        LIVE_PROVIDER={PROJECTION_META.live_provider} · capability={PROJECTION_META.capability} ·
        REAL_WRITE=FALSE · CROSS_CURRENCY_SUM=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${PROJECTION_META.capability}`}>
          {capabilityLabel(PROJECTION_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 08 Finance · consumes CO Orders/Payments projection</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Finance · 财务中心</h1>
          <p className="oa-skeleton-lead">
            Readonly projection consumer for CO Orders / Payments. DEMO fixtures only — no capture, refund, or recon
            writes. Amounts stay in minor units; currencies are never summed.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Settle · 结算 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Refund execute · 退款 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        <article className="oa-card">
          <h3>Collections · 收款投影</h3>
          <p className="oa-co-kpi-value">{collections.length}</p>
          <p className="oa-skeleton-meta">DEMO rows · not a ledger sum</p>
        </article>
        <article className="oa-card">
          <h3>Refunds pending · 退款待处理</h3>
          <p className="oa-co-kpi-value">{refundsPending.length}</p>
          <p className="oa-skeleton-meta">From Payments refund_queue</p>
        </article>
        <article className="oa-card">
          <h3>Recon exceptions · 对账异常</h3>
          <p className="oa-co-kpi-value">{reconExceptions.length}</p>
          <p className="oa-skeleton-meta">held / risk_hold / recon_queue</p>
        </article>
        <article className="oa-card">
          <h3>Deposit / settlement · 保证金结算</h3>
          <p className="oa-co-kpi-value">—</p>
          <p className="oa-skeleton-meta">future slot · {capabilityLabel("not_connected")}</p>
        </article>
      </div>

      <article className="oa-card oa-proj-section">
        <h2>Order collections projection · 订单收款投影</h2>
        <ProjectionTable rows={collections} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Refund / compensation pending · 退款与补偿待处理</h2>
        <ProjectionTable rows={refundsPending} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Reconciliation exceptions · 对账异常投影</h2>
        <ProjectionTable rows={reconExceptions} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Future slot · 保证金 / 结算</h2>
        <p>
          Provider deposit & settlement APIs remain <strong>not_connected</strong>. Slot reserved — no write UI.
        </p>
        <button className="oa-btn" type="button" disabled>
          Open settlement provider · Blocked
        </button>
      </article>

      <article className="oa-card">
        <h2>Shared projection fields · 共享投影字段</h2>
        <p className="oa-skeleton-meta">{SHARED_PROJECTION_FIELDS.join(" · ")}</p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Orders Runtime · 订单系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            Payments Runtime · 支付管理
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            CO Overview · 总入口
          </Link>
        </div>
      </article>
    </section>
  );
}
