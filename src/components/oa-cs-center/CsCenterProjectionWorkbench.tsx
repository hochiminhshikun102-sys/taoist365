"use client";

import Link from "next/link";
import { ProjectionTable } from "@/components/oa-projections/ProjectionTable";
import { useOaDesktopLocale } from "@/components/oa-overview/useOaDesktopLocale";
import { buildCsCenterProjections } from "@/lib/oa-projections/fromCoFixtures";
import { PROJECTION_META, SHARED_PROJECTION_FIELDS } from "@/lib/oa-projections/types";

export function CsCenterProjectionWorkbench() {
  const { locale, t } = useOaDesktopLocale();
  const {
    customerVisible,
    aftersalesPending,
    shippingExceptionAssist,
    paymentRefundInquiry,
  } = buildCsCenterProjections();

  return (
    <section className="oa-page oa-cs-center-page" data-oa-cs-center-projection="r52" lang={locale}>
      <div className="oa-fixture-banner">
        R52_ORDER_PROJECTION_CONSUMERS_B · CS_CENTER · DATA_SOURCE={PROJECTION_META.data_source} ·
        LIVE_PROVIDER={PROJECTION_META.live_provider} · capability={PROJECTION_META.capability} ·
        REAL_WRITE=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${PROJECTION_META.capability}`}>
          {PROJECTION_META.capability}
        </span>
        <span className="oa-capability-pill is-not_connected">not_connected</span>
        <span className="oa-capability-owner">
          {t(
            "客服中心只做协同查看，不是订单、退款或发货事实责任方。",
            "CS Center coordinates and views only. It is not the order, refund, or shipping fact owner.",
          )}
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">{t("客服中心", "CS Center")}</h1>
          <p className="oa-skeleton-lead">
            {t(
              "只读查看客户可见订单、售后、物流协助和退款查询。演示夹具，不能开单、退款或改物流。",
              "Readonly projection of customer-visible orders, aftersales, shipping assist, and refund inquiry. DEMO fixtures only. No ticket, refund, or logistics writes.",
            )}
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            {t("开单（已阻断）", "Open ticket (blocked)")}
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            {t("强制退款（已阻断）", "Force refund (blocked)")}
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        <article className="oa-card">
          <h3>{t("客户可见订单", "Customer-visible orders")}</h3>
          <p className="oa-co-kpi-value">{customerVisible.length}</p>
          <p className="oa-skeleton-meta">{t("来自订单投影", "From Orders projection")}</p>
        </article>
        <article className="oa-card">
          <h3>{t("售后待处理", "Aftersales pending")}</h3>
          <p className="oa-co-kpi-value">{aftersalesPending.length}</p>
          <p className="oa-skeleton-meta">{t("未结售后标签", "Open aftersales tag")}</p>
        </article>
        <article className="oa-card">
          <h3>{t("物流异常协助", "Shipping assist")}</h3>
          <p className="oa-co-kpi-value">{shippingExceptionAssist.length}</p>
          <p className="oa-skeleton-meta">{t("来自发货异常", "From shipping exceptions")}</p>
        </article>
        <article className="oa-card">
          <h3>{t("投诉回访", "Complaint / callback")}</h3>
          <p className="oa-co-kpi-value">not_connected</p>
          <p className="oa-skeleton-meta">
            {t("投诉通道未接通，预留位，禁止写入", "Complaint channel reserved. Write disabled.")}
          </p>
        </article>
      </div>

      <article className="oa-card oa-proj-section">
        <h2>{t("客户可见订单投影", "Customer-visible order projection")}</h2>
        <ProjectionTable rows={customerVisible} />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>{t("售后待处理投影", "Aftersales pending projection")}</h2>
        <ProjectionTable
          rows={aftersalesPending}
          emptyLabel={t("暂无演示售后待处理", "No DEMO aftersales pending rows")}
        />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>{t("物流异常协助投影", "Shipping exception assist")}</h2>
        <ProjectionTable
          rows={shippingExceptionAssist}
          emptyLabel={t("暂无演示物流协助行", "No DEMO shipping exceptions for CS assist")}
        />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>{t("支付与退款查询投影", "Payment / refund inquiry")}</h2>
        <ProjectionTable
          rows={paymentRefundInquiry}
          emptyLabel={t("暂无演示退款查询行", "No DEMO refund inquiry rows")}
        />
      </article>

      <article className="oa-card oa-proj-section">
        <h2>{t("投诉回访预留位", "Complaint callback slot")}</h2>
        <p>
          {t(
            "投诉回访通道保持未接通。只预留位置，不提供写入。客服中心不会变成工单责任方。",
            "The complaint callback channel stays disconnected. Slot reserved, no write UI. CS Center does not become ticket owner.",
          )}
        </p>
        <button className="oa-btn" type="button" disabled>
          {t("打开投诉通道（已阻断）", "Open complaint channel (blocked)")}
        </button>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>{t("下一步处理入口", "Next-step entries")}</h2>
        <p className="oa-skeleton-meta">
          {t(
            "仅导航到责任模块。客服中心不写订单、退款或发货。",
            "Navigation only. CS Center does not write orders, refunds, or shipments.",
          )}
        </p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            {t("订单查询", "Orders inquiry")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            {t("支付退款查询", "Payment / refund inquiry")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            {t("物流协助", "Shipping assist")}
          </Link>
          <button className="oa-btn" type="button" disabled>
            {t("开单（已阻断）", "Open ticket (blocked)")}
          </button>
        </div>
      </article>

      <article className="oa-card">
        <h2>{t("共享投影字段", "Shared projection fields")}</h2>
        <p className="oa-skeleton-meta">{SHARED_PROJECTION_FIELDS.join(" · ")}</p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            {t("订单系统", "Orders")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            {t("支付管理", "Payments")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            {t("发货管理", "Shipping")}
          </Link>
        </div>
      </article>
    </section>
  );
}
