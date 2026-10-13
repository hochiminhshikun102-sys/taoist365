"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { getSiteWorkbenchData } from "@/lib/oa-site-geo/fixture";
import { SITE_GEO_META } from "@/lib/oa-site-geo/types";

export function SiteGeoReadonlyWorkbench() {
  const data = getSiteWorkbenchData();

  return (
    <section className="oa-page oa-site-geo-page" data-oa-site-foundation="r58">
      <div className="oa-fixture-banner">
        R58_SITE_READONLY_FOUNDATION · DATA_SOURCE={SITE_GEO_META.data_source} ·
        LIVE_PROVIDER={SITE_GEO_META.live_provider} · capability={SITE_GEO_META.capability} ·
        SITE_WRITE_DISABLED=TRUE · DEPLOY_DISABLED=TRUE · BUSINESS_APPROVAL_REQUIRED=TRUE ·
        REAL_BUSINESS_WRITE=FALSE · SECRETS_HIDDEN=TRUE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${SITE_GEO_META.capability}`}>
          {capabilityLabel(SITE_GEO_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">
          Owner · 05 Site · content/page governance · write disabled · no deploy
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Site · 站点前台 · Readonly Foundation</h1>
          <p className="oa-skeleton-lead">
            05 Site primary workbench. Seven internal panels for pages, blocks, SEO metadata,
            assets, review, and publish readiness. DEMO fixtures only — no real page, metadata,
            canonical, robots, sitemap, or Cloudflare writes. Visual editor is not enabled.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Publish page · 发布页面 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Sync metadata · 同步元数据 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Deploy · 部署 · Blocked
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
            <strong>SITE_WRITE_DISABLED</strong> = TRUE — 禁止真实页面 / metadata / robots 写入
          </li>
          <li>
            <strong>GEO_EXTERNAL_API_DISABLED</strong> = TRUE — 不接搜索 / GEO / 模型 API
          </li>
          <li>
            <strong>DEPLOY_DISABLED</strong> = TRUE — 禁止 staging 晋升与生产部署
          </li>
          <li>
            <strong>BUSINESS_APPROVAL_REQUIRED</strong> = TRUE — 审核与发布归业务流程
          </li>
        </ul>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Seven internal panels · 七个内部板块</h2>
        <p className="oa-skeleton-meta">
          Internal construction panels under the existing 05 Site primary module. No new primary menu.
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
        <h2>S2 · Route & Page Registry</h2>
        <p className="oa-skeleton-meta">DEMO mapping only. Does not change frontstage routes.</p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>route</th>
                <th>title</th>
                <th>canonical</th>
                <th>noindex</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {data.routes.map((row) => (
                <tr key={row.route}>
                  <td>{row.route}</td>
                  <td>{row.title}</td>
                  <td>{row.canonical}</td>
                  <td>
                    <span className="oa-chip">{row.noindex}</span>
                  </td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>S3 · Content Blocks</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>block</th>
                <th>owner</th>
                <th>status</th>
                <th>last_update</th>
              </tr>
            </thead>
            <tbody>
              {data.blocks.map((row) => (
                <tr key={row.block}>
                  <td>{row.block}</td>
                  <td>{row.owner}</td>
                  <td>{row.status}</td>
                  <td>{row.last_update}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>S4 · SEO Metadata Control</h2>
        <p className="oa-skeleton-meta">Apply / publish / sync remain disabled.</p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>route</th>
                <th>title</th>
                <th>description</th>
                <th>canonical</th>
                <th>robots</th>
              </tr>
            </thead>
            <tbody>
              {data.seo.map((row) => (
                <tr key={row.route}>
                  <td>{row.route}</td>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{row.canonical}</td>
                  <td>{row.robots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>S5 · Visual & Asset Mapping</h2>
        <p className="oa-skeleton-meta">Links to CO Media and AI Ops. No generate / upload / replace.</p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>page</th>
                <th>asset_ref</th>
                <th>kind</th>
                <th>mapping</th>
              </tr>
            </thead>
            <tbody>
              {data.assets.map((row) => (
                <tr key={`${row.page}-${row.asset_ref}`}>
                  <td>{row.page}</td>
                  <td>{row.asset_ref}</td>
                  <td>{row.kind}</td>
                  <td>{row.mapping}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/media">
            CO Media · 商品素材
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/ai-ops">
            AI Ops · AI 推广中心
          </Link>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>S6 · Site Review Queue</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>id</th>
                <th>issue</th>
                <th>severity</th>
                <th>source</th>
              </tr>
            </thead>
            <tbody>
              {data.reviews.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.issue}</td>
                  <td>
                    <span className="oa-chip">{row.severity}</span>
                  </td>
                  <td>{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>S7 · Publish Readiness</h2>
        <p className="oa-skeleton-meta">Deploy and Cloudflare remain disabled.</p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>env</th>
                <th>status</th>
                <th>note</th>
              </tr>
            </thead>
            <tbody>
              {data.publish.map((row) => (
                <tr key={row.env}>
                  <td>{row.env}</td>
                  <td>
                    <span className="oa-chip">{row.status}</span>
                  </td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card">
        <h2>Cross-module navigation · 跨模块导航</h2>
        <div className="oa-skeleton-actions">
          {data.crossLinks.map((l) => (
            <Link key={`site-nav-${l.href}`} className="oa-btn secondary" href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </article>
    </section>
  );
}
