"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { ProjectionTable } from "@/components/oa-projections/ProjectionTable";
import { buildComplianceProjections } from "@/lib/oa-projections/fromCoFixtures";
import { PROJECTION_META, SHARED_PROJECTION_FIELDS } from "@/lib/oa-projections/types";

export function ComplianceProjectionWorkbench() {
  const { riskStatusQueue, refundAbuseProjection, logisticsDisputeProjection } =
    buildComplianceProjections();

  return (
    <section className="oa-page oa-compliance-page" data-oa-compliance-projection="r52">
      <div className="oa-fixture-banner">
        R52_ORDER_PROJECTION_CONSUMERS_B · COMPLIANCE · DATA_SOURCE={PROJECTION_META.data_source} ·
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
          Owner · Compliance · risk &amp; policy entry · not refund/fulfillment executor
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Compliance · 合规中心</h1>
          <p className="oa-skeleton-lead">
            Readonly risk / refund-abuse / logistics-dispute projections from CO Orders · Payments ·
            Shipping. DEMO only — no case open, sanction action, or risk disposition writes.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Open case · 立案 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Disposition · 处置 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        <article className="oa-card">
          <h3>Risk status queue · 风险状态队列</h3>
          <p className="oa-co-kpi-value">{riskStatusQueue.length}</p>
          <p className="oa-skeleton-meta">risk_status = watch | hold</p>
        </article>
        <article className="oa-card">
          <h3>Refund abuse · 退款滥用投影</h3>
          <p className="oa-co-kpi-value">{refundAbuseProjection.length}</p>
          <p className="oa-skeleton-meta">Pending refund + risk signal</p>
        </article>
        <article className="oa-card">
          <h3>Logistics dispute · 物流争议投影</h3>
          <p className="oa-co-kpi-value">{logisticsDisputeProjection.length}</p>
          <p className="oa-skeleton-meta">From Shipping exceptions</p>
        </article>
        <article className="oa-card">
          <h3>Evidence / audit · 证据审计</h3>
          <p className="oa-co-kpi-value">—</p>
          <p className="oa-skeleton-meta">future slot · {capabilityLabel("not_connected")}</p>
        </article>
      </div>

      <article className="oa-card oa-proj-section">
        <h2>Risk status queue · 风险状态队列投影</h2>
        <ProjectionTable rows={riskStatusQueue} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Refund abuse / dispute · 退款滥用投影</h2>
        <ProjectionTable rows={refundAbuseProjection} emptyLabel="No DEMO refund-abuse rows" />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Logistics dispute projection · 物流争议投影</h2>
        <ProjectionTable
          rows={logisticsDisputeProjection}
          emptyLabel="No DEMO logistics dispute rows"
        />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Future slot · Evidence / audit</h2>
        <p>
          Evidence &amp; audit trail provider remains <strong>not_connected</strong>. Slot reserved —
          no write UI.
        </p>
        <button className="oa-btn" type="button" disabled>
          Open evidence locker · Blocked
        </button>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Future slot · Region / sanction / policy</h2>
        <p>
          Region, sanction, and policy engines remain <strong>not_connected</strong>. Compliance does
          not replace product review, fulfillment, or refund execution.
        </p>
        <button className="oa-btn" type="button" disabled>
          Open sanction screen · Blocked
        </button>
      </article>

      <article className="oa-card">
        <h2>Shared projection fields · 共享投影字段</h2>
        <p className="oa-skeleton-meta">{SHARED_PROJECTION_FIELDS.join(" · ")}</p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Orders Runtime · 订单系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/finance">
            Finance · 财务中心
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/logistics">
            Logistics · 物流管理
          </Link>
        </div>
      </article>
    </section>
  );
}
