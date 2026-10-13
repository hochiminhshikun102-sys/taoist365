"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { ProjectionTable } from "@/components/oa-projections/ProjectionTable";
import { buildCsCenterProjections } from "@/lib/oa-projections/fromCoFixtures";
import { PROJECTION_META, SHARED_PROJECTION_FIELDS } from "@/lib/oa-projections/types";

export function CsCenterProjectionWorkbench() {
  const {
    customerVisible,
    aftersalesPending,
    shippingExceptionAssist,
    paymentRefundInquiry,
  } = buildCsCenterProjections();

  return (
    <section className="oa-page oa-cs-center-page" data-oa-cs-center-projection="r52">
      <div className="oa-fixture-banner">
        R52_ORDER_PROJECTION_CONSUMERS_B · CS_CENTER · DATA_SOURCE={PROJECTION_META.data_source} ·
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
          Owner · CS Center · coordinates &amp; views only · not order/refund/shipping fact Owner
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">CS Center · 客服中心</h1>
          <p className="oa-skeleton-lead">
            Readonly projection consumer for customer-visible orders, aftersales, shipping assist, and
            payment/refund inquiry. DEMO fixtures only — no ticket, refund, or logistics writes.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Open ticket · 工单 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Force refund · 退款 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        <article className="oa-card">
          <h3>Customer visible · 客户可见订单</h3>
          <p className="oa-co-kpi-value">{customerVisible.length}</p>
          <p className="oa-skeleton-meta">CO Orders projection</p>
        </article>
        <article className="oa-card">
          <h3>Aftersales pending · 售后待处理</h3>
          <p className="oa-co-kpi-value">{aftersalesPending.length}</p>
          <p className="oa-skeleton-meta">after_sales open / aftersales tag</p>
        </article>
        <article className="oa-card">
          <h3>Shipping assist · 物流异常协助</h3>
          <p className="oa-co-kpi-value">{shippingExceptionAssist.length}</p>
          <p className="oa-skeleton-meta">From Shipping exceptions</p>
        </article>
        <article className="oa-card">
          <h3>Complaint / callback · 投诉回访</h3>
          <p className="oa-co-kpi-value">—</p>
          <p className="oa-skeleton-meta">future slot · {capabilityLabel("not_connected")}</p>
        </article>
      </div>

      <article className="oa-card oa-proj-section">
        <h2>Customer visible order projection · 客户可见订单投影</h2>
        <ProjectionTable rows={customerVisible} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Aftersales pending projection · 售后待处理投影</h2>
        <ProjectionTable rows={aftersalesPending} emptyLabel="No DEMO aftersales pending rows" />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Shipping exception assist · 物流异常协助投影</h2>
        <ProjectionTable
          rows={shippingExceptionAssist}
          emptyLabel="No DEMO shipping exceptions for CS assist"
        />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Payment / refund inquiry · 支付与退款查询投影</h2>
        <ProjectionTable rows={paymentRefundInquiry} emptyLabel="No DEMO refund inquiry rows" />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Future slot · Complaint / callback</h2>
        <p>
          Complaint &amp; callback provider remains <strong>not_connected</strong>. Slot reserved — no
          write UI. CS Center does not become ticket Owner.
        </p>
        <button className="oa-btn" type="button" disabled>
          Open complaint provider · Blocked
        </button>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>CS next-step entries · 客服可见的下一步处理入口</h2>
        <p className="oa-skeleton-meta">
          Navigation only — open the owning CO runtime. CS Center does not write orders, refunds, or
          shipments.
        </p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Next · Orders inquiry · 订单查询
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            Next · Payment / refund inquiry · 支付退款查询
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            Next · Shipping assist · 物流协助
          </Link>
          <button className="oa-btn" type="button" disabled>
            Next · Open ticket · 开单 · Blocked
          </button>
        </div>
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
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            Shipping Runtime · 发货管理
          </Link>
        </div>
      </article>
    </section>
  );
}
