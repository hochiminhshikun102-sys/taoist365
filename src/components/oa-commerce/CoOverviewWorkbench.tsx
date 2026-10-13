"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import {
  CO_OVERVIEW_ALERTS,
  CO_OVERVIEW_KPIS,
  CO_OVERVIEW_META,
  CO_WORKBENCH_CARDS,
} from "@/lib/oa-commerce/coOverviewFixture";

export function CoOverviewWorkbench() {
  return (
    <section className="oa-page oa-co-overview-page" data-oa-co-overview="r47">
      <div className="oa-fixture-banner">
        R47_CO_RUNTIME_READONLY · DATA_SOURCE={CO_OVERVIEW_META.data_source} · LIVE_PROVIDER=
        {CO_OVERVIEW_META.live_provider} · capability={CO_OVERVIEW_META.capability} · REAL_WRITE=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${CO_OVERVIEW_META.capability}`}>
          {capabilityLabel(CO_OVERVIEW_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · hub for six workbenches</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">CO Overview · 商品与订单总入口</h1>
          <p className="oa-skeleton-lead">
            Read-only operations hub for the six CO workbenches. DEMO / TEST_ONLY fixtures only — no publish,
            payment, fulfillment, or media mutation.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled title="Provider write blocked">
            Connect Provider · 接通 · Blocked
          </button>
          <Link className="oa-btn secondary" href="/admin/oa/overview">
            Back to Overview · 返回总览
          </Link>
        </div>
      </header>

      <div className="oa-co-kpi-grid">
        {CO_OVERVIEW_KPIS.map((kpi) => (
          <article key={kpi.labelEn} className="oa-card oa-co-kpi-card">
            <h3>
              {kpi.labelEn} · {kpi.labelZh}
            </h3>
            <p className="oa-co-kpi-value">{kpi.value}</p>
            <p className="oa-skeleton-meta">{kpi.hint}</p>
          </article>
        ))}
      </div>

      <article className="oa-card oa-co-alert-card">
        <h2>Exception / todo summary · 异常与待办摘要</h2>
        <ul className="oa-orders-lines">
          {CO_OVERVIEW_ALERTS.map((alert) => (
            <li key={alert.id}>
              <strong>[{alert.severity}]</strong> {alert.en} · {alert.zh}
            </li>
          ))}
        </ul>
      </article>

      <div className="oa-co-workbench-grid oa-co-overview-grid">
        {CO_WORKBENCH_CARDS.map((card) => (
          <Link key={card.id} className="oa-card oa-co-workbench-card" href={card.route}>
            <div className={`oa-capability-pill is-${card.status}`}>{capabilityLabel(card.status)}</div>
            <h3>
              {card.labelEn} · {card.labelZh}
            </h3>
            <p>
              {card.metricEn} · {card.metricZh}: <strong>{card.metricValue}</strong>
            </p>
            <p className="oa-skeleton-meta">
              {card.alertEn} · {card.alertZh}
            </p>
            <em>Open workbench · 打开工作台</em>
          </Link>
        ))}
      </div>

      <article className="oa-card">
        <h2>Provider status · Provider 状态说明</h2>
        <p>
          Formal commerce / media / payment / shipping providers remain <strong>not_connected</strong>. This hub
          aggregates DEMO projections only. UI capability gate ≠ server authorization.
        </p>
        <p className="oa-skeleton-meta">
          REAL_ORDER_WRITE=FALSE · REAL_PAYMENT_WRITE=FALSE · REAL_FULFILLMENT_WRITE=FALSE · REAL_PUBLISH=FALSE ·
          REAL_MEDIA_UPLOAD=FALSE
        </p>
      </article>
    </section>
  );
}
