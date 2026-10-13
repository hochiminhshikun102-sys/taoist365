"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { getGeoWorkbenchData } from "@/lib/oa-site-geo/fixture";
import { SITE_GEO_META } from "@/lib/oa-site-geo/types";

export function GeoReadonlyWorkbench() {
  const data = getGeoWorkbenchData();

  return (
    <section className="oa-page oa-site-geo-page" data-oa-geo-foundation="r58">
      <div className="oa-fixture-banner">
        R58_GEO_READONLY_FOUNDATION · DATA_SOURCE={SITE_GEO_META.data_source} ·
        LIVE_PROVIDER={SITE_GEO_META.live_provider} · capability={SITE_GEO_META.capability} ·
        GEO_EXTERNAL_API_DISABLED=TRUE · DEPLOY_DISABLED=TRUE · BUSINESS_APPROVAL_REQUIRED=TRUE ·
        REAL_EXTERNAL_API_CALL=FALSE · SECRETS_HIDDEN=TRUE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${SITE_GEO_META.capability}`}>
          {capabilityLabel(SITE_GEO_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">
          Owner · 06 GEO · market / discovery governance · APIs disabled · suggestion only
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">GEO · 区域全局配置 · Readonly Foundation</h1>
          <p className="oa-skeleton-lead">
            06 GEO primary workbench. Seven internal panels for markets, search/generative
            discovery, localization, channels, and regional compliance. DEMO fixtures only — no
            search API, GEO API, model call, translation write, or analytics provider.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Call search API · 搜索接口 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Translate · 翻译 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Publish GEO · 发布 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        {data.metrics.map((m) => (
          <article className="oa-card" key={m.label}>
            <h3>{m.label}</h3>
            <p className="oa-co-kpi-value">{m.value}</p>
            <p className="oa-skeleton-meta">{m.meta}</p>
          </article>
        ))}
      </div>

      <article className="oa-card oa-proj-section">
        <h2>Policy locks · 策略锁</h2>
        <ul className="oa-list">
          <li>
            <strong>SITE_WRITE_DISABLED</strong> = TRUE — 不改前台页面
          </li>
          <li>
            <strong>GEO_EXTERNAL_API_DISABLED</strong> = TRUE — 禁止搜索 / GEO / 模型外部调用
          </li>
          <li>
            <strong>DEPLOY_DISABLED</strong> = TRUE — 本轮不 deploy
          </li>
          <li>
            <strong>BUSINESS_APPROVAL_REQUIRED</strong> = TRUE — GEO 内容动作只是建议
          </li>
        </ul>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Seven internal panels · 七个内部板块</h2>
        <p className="oa-skeleton-meta">
          Internal construction panels under the existing 06 GEO primary module. No new primary menu.
        </p>
        <div className="oa-site-geo-panel-grid">
          {data.panels.map((panel) => (
            <article key={panel.id} className="oa-card oa-site-geo-panel-card" data-panel={panel.id}>
              <div className="oa-site-geo-panel-head">
                <h3>
                  {panel.code} · {panel.title_en} · {panel.title_zh}
                </h3>
                <div className="oa-capability-row">
                  <span className={`oa-capability-pill is-${panel.capability}`}>
                    {capabilityLabel(panel.capability)}
                  </span>
                  <span className="oa-capability-pill is-not_connected">
                    Provider · {capabilityLabel(panel.provider_status)}
                  </span>
                </div>
              </div>
              <h4>Focus · 只读焦点</h4>
              <ul className="oa-list">
                {panel.focus_items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>Future slots · 预留槽位</h4>
              <ul className="oa-list">
                {panel.future_slots.map((slot) => (
                  <li key={slot.name}>
                    {slot.name} · <span className="oa-chip">{slot.status}</span>
                  </li>
                ))}
              </ul>
              <h4>Disabled commands · 禁用命令</h4>
              <div className="oa-skeleton-actions">
                {panel.disabled_commands.map((cmd) => (
                  <button key={cmd} className="oa-btn secondary" type="button" disabled>
                    {cmd} · Blocked
                  </button>
                ))}
              </div>
              {panel.links.length > 0 ? (
                <>
                  <h4>Links · 关联</h4>
                  <div className="oa-skeleton-actions">
                    {panel.links.map((l) => (
                      <Link key={`${panel.id}-${l.href}-${l.label}`} className="oa-btn secondary" href={l.href}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : null}
              {panel.notes.length > 0 ? (
                <>
                  <h4>Notes · 说明</h4>
                  <ul className="oa-list">
                    {panel.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </article>
          ))}
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>G2 · Market Matrix</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>market</th>
                <th>region</th>
                <th>language</th>
                <th>currency</th>
                <th>priority</th>
                <th>opportunity</th>
                <th>risk</th>
                <th>localization</th>
              </tr>
            </thead>
            <tbody>
              {data.markets.map((row) => (
                <tr key={row.market}>
                  <td>{row.market}</td>
                  <td>{row.region}</td>
                  <td>{row.language}</td>
                  <td>{row.currency}</td>
                  <td>{row.priority}</td>
                  <td>{row.opportunity}</td>
                  <td>{row.risk}</td>
                  <td>{row.localization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>G3 · Search & AI Discovery</h2>
        <p className="oa-skeleton-meta">No search API and no model calls.</p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>signal</th>
                <th>intent</th>
                <th>readiness</th>
                <th>visibility</th>
              </tr>
            </thead>
            <tbody>
              {data.discovery.map((row) => (
                <tr key={row.signal}>
                  <td>{row.signal}</td>
                  <td>{row.intent}</td>
                  <td>
                    <span className="oa-chip">{row.readiness}</span>
                  </td>
                  <td>{row.visibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>G4 · Localization Queue</h2>
        <p className="oa-skeleton-meta">Translation future slot remains not_connected.</p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>locale</th>
                <th>language</th>
                <th>page_map</th>
                <th>translation_slot</th>
              </tr>
            </thead>
            <tbody>
              {data.locales.map((row) => (
                <tr key={row.locale}>
                  <td>{row.locale}</td>
                  <td>{row.language}</td>
                  <td>{row.page_map}</td>
                  <td>
                    <span className="oa-chip">{row.translation_slot}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>G5 · Channel Signals</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>channel</th>
                <th>volume</th>
                <th>note</th>
              </tr>
            </thead>
            <tbody>
              {data.channels.map((row) => (
                <tr key={row.channel}>
                  <td>{row.channel}</td>
                  <td>{row.volume}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>G6 · Regional Compliance Flags</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>region</th>
                <th>category</th>
                <th>flag</th>
                <th>note</th>
              </tr>
            </thead>
            <tbody>
              {data.compliance.map((row) => (
                <tr key={`${row.region}-${row.category}`}>
                  <td>{row.region}</td>
                  <td>{row.category}</td>
                  <td>
                    <span className="oa-chip">{row.flag}</span>
                  </td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/compliance">
            Compliance · 合规
          </Link>
        </div>
      </article>

      <article className="oa-card">
        <h2>Cross-module navigation · 跨模块导航</h2>
        <div className="oa-skeleton-actions">
          {data.crossLinks.map((l) => (
            <Link key={`geo-nav-${l.href}`} className="oa-btn secondary" href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </article>
    </section>
  );
}
