"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { getAiOpsWorkbenchData } from "@/lib/oa-ai-ops/fixture";
import { AI_OPS_META } from "@/lib/oa-ai-ops/types";

export function AiOpsReadonlyWorkbench() {
  const { panels, metrics, exceptions, providers, library } = getAiOpsWorkbenchData();

  return (
    <section className="oa-page oa-ai-ops-page" data-oa-ai-ops-foundation="r56">
      <div className="oa-fixture-banner">
        R56_AI_OPERATIONS_READONLY_FOUNDATION · DATA_SOURCE={AI_OPS_META.data_source} ·
        LIVE_PROVIDER={AI_OPS_META.live_provider} · capability={AI_OPS_META.capability} ·
        AI_OUTPUT_IS_SUGGESTION_ONLY=TRUE · BUSINESS_APPROVAL_REQUIRED=TRUE ·
        MODEL_CALLS_DISABLED=TRUE · REAL_MODEL_CALL=FALSE · SECRETS_HIDDEN=TRUE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${AI_OPS_META.capability}`}>
          {capabilityLabel(AI_OPS_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">
          Owner · 04 AI Operations · suggestion-only · business approval required · no model calls
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">AI Operations · AI 推广中心 · Readonly Foundation</h1>
          <p className="oa-skeleton-lead">
            04 AI Operations primary workbench. Eight internal panels for tasks, materials, models,
            usage, quality, rights, traffic, and short-video factory. DEMO fixtures only — AI output
            is suggestion-only and never becomes business fact until approved elsewhere. No OpenAI /
            Cloudflare AI / Provider calls; secrets never loaded.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Call model · 调用模型 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Generate · 生成 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Publish / Dispatch · 发布投放 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        {metrics.map((m) => (
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
            <strong>AI_OUTPUT_IS_SUGGESTION_ONLY</strong> = TRUE — AI 输出只是建议，不成为业务事实
          </li>
          <li>
            <strong>BUSINESS_APPROVAL_REQUIRED</strong> = TRUE — 正式采用 / 审核 / 发布归业务流程
          </li>
          <li>
            <strong>MODEL_CALLS_DISABLED</strong> = TRUE — 本轮禁止一切模型调用
          </li>
        </ul>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Eight internal panels · 八个内部板块</h2>
        <p className="oa-skeleton-meta">
          Internal construction panels under a single OA primary module. No new primary menu items.
        </p>
        <div className="oa-ai-ops-panel-grid">
          {panels.map((panel) => (
            <article key={panel.id} id={panel.id} className="oa-card oa-ai-ops-panel-card" data-panel={panel.id} style={{ scrollMarginTop: 80 }}>
              <div className="oa-ai-ops-panel-head">
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
                      <Link key={`${panel.id}-${l.href}`} className="oa-btn secondary" href={l.href}>
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
        <h2>AI Material Library preview · 产物素材库预览</h2>
        <p className="oa-skeleton-meta">
          DEMO ledger with source / rights / original / public / ai labels. Not a publish path.
        </p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>asset_id</th>
                <th>title</th>
                <th>kind</th>
                <th>source</th>
                <th>rights</th>
                <th>original</th>
                <th>public</th>
                <th>label</th>
              </tr>
            </thead>
            <tbody>
              {library.map((row) => (
                <tr key={row.asset_id}>
                  <td>{row.asset_id}</td>
                  <td>{row.title}</td>
                  <td>{row.kind}</td>
                  <td>{row.source}</td>
                  <td>{row.rights}</td>
                  <td>{String(row.original)}</td>
                  <td>{String(row.public)}</td>
                  <td>
                    <span className="oa-chip">{row.label}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/media">
            CO Media · 商品素材
          </Link>
          <button className="oa-btn" type="button" disabled>
            Promote to Media · Blocked
          </button>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Exception queue preview · 异常队列预览</h2>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>id</th>
                <th>panel</th>
                <th>title</th>
                <th>severity</th>
                <th>source</th>
                <th>as_of</th>
              </tr>
            </thead>
            <tbody>
              {exceptions.map((ex) => (
                <tr key={ex.id}>
                  <td>{ex.id}</td>
                  <td>{ex.panel}</td>
                  <td>{ex.title}</td>
                  <td>
                    <span className="oa-chip">{ex.severity}</span>
                  </td>
                  <td>{ex.source}</td>
                  <td>{ex.as_of}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Provider readiness · Provider 接通准备</h2>
        <p className="oa-skeleton-meta">
          No secrets are loaded or printed. All providers remain not_connected.
        </p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>provider</th>
                <th>status</th>
                <th>note</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>
                    <span className="oa-chip">{p.status}</span>
                  </td>
                  <td>{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="oa-card">
        <h2>Cross-module navigation · 跨模块导航</h2>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/media">
            CO Media
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/compliance">
            Compliance
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/site">
            Site
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/geo">
            GEO
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/operations">
            Operations
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/overview">
            Overview
          </Link>
        </div>
      </article>
    </section>
  );
}
