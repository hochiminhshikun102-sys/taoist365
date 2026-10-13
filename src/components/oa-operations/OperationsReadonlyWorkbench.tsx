"use client";

import Link from "next/link";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { getOperationsWorkbenchData } from "@/lib/oa-operations/fixture";
import { OPERATIONS_META } from "@/lib/oa-operations/types";

export function OperationsReadonlyWorkbench() {
  const { workstreams, exceptions, providers } = getOperationsWorkbenchData();

  return (
    <section className="oa-page oa-operations-page" data-oa-operations-foundation="r54">
      <div className="oa-fixture-banner">
        R54_OPERATIONS_READONLY_FOUNDATION · DATA_SOURCE={OPERATIONS_META.data_source} ·
        LIVE_PROVIDER={OPERATIONS_META.live_provider} · capability={OPERATIONS_META.capability} ·
        REAL_WRITE=FALSE · ACCOUNT_CENTER_WRITE=FALSE · SINGLE_LEVEL_INVITE_ONLY=TRUE ·
        MULTI_LEVEL_REWARD=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${OPERATIONS_META.capability}`}>
          {capabilityLabel(OPERATIONS_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">
          Owner · 03 Operations · one primary module · 7 internal workstreams · not a second ledger
        </span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Operations · 运营营销 · Readonly Foundation</h1>
          <p className="oa-skeleton-lead">
            03 Operations primary workbench. Seven internal workstreams (03A–03G) are construction lines
            only — they do not add OA primary menu items. DEMO fixtures; no Account Center writes; no
            Provider wiring; all mutate commands disabled.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Grant points · 发积分 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Send message · 发消息 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Grant reward · 发奖励 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-co-kpi-grid oa-proj-kpi">
        <article className="oa-card">
          <h3>Workstreams · 施工线</h3>
          <p className="oa-co-kpi-value">{workstreams.length}</p>
          <p className="oa-skeleton-meta">Internal only · no new primary nav</p>
        </article>
        <article className="oa-card">
          <h3>Exception queue · 异常预览</h3>
          <p className="oa-co-kpi-value">{exceptions.length}</p>
          <p className="oa-skeleton-meta">DEMO rows · not a ledger</p>
        </article>
        <article className="oa-card">
          <h3>Invite policy · 邀请策略</h3>
          <p className="oa-co-kpi-value">L1</p>
          <p className="oa-skeleton-meta">SINGLE_LEVEL_INVITE_ONLY · MULTI_LEVEL_REWARD=FALSE</p>
        </article>
        <article className="oa-card">
          <h3>Providers · 接通状态</h3>
          <p className="oa-co-kpi-value">0/{providers.length}</p>
          <p className="oa-skeleton-meta">All not_connected</p>
        </article>
      </div>

      <article className="oa-card oa-proj-section">
        <h2>Seven workstreams · 七个运营施工线</h2>
        <p className="oa-skeleton-meta">
          Creator (03E) is independent from Member Services (03C). Account / frontstage routes below
          are consumer-side reference mappings only — OA Operations does not edit Account Center.
        </p>
        <div className="oa-ops-workstream-grid">
          {workstreams.map((ws) => (
            <article key={ws.id} id={ws.id} className="oa-card oa-ops-workstream-card" data-workstream={ws.id} style={{ scrollMarginTop: 80 }}>
              <div className="oa-ops-workstream-head">
                <h3>
                  {ws.code} · {ws.title_en} · {ws.title_zh}
                </h3>
                <div className="oa-capability-row">
                  <span className={`oa-capability-pill is-${ws.capability}`}>
                    {capabilityLabel(ws.capability)}
                  </span>
                  <span className="oa-capability-pill is-not_connected">
                    Provider · {capabilityLabel(ws.provider_status)}
                  </span>
                </div>
              </div>

              <h4>Focus · 只读焦点</h4>
              <ul className="oa-list">
                {ws.focus_items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h4>Future slots · 预留槽位</h4>
              <ul className="oa-list">
                {ws.future_slots.map((slot) => (
                  <li key={slot.name}>
                    {slot.name} · <span className="oa-chip">{slot.status}</span>
                  </li>
                ))}
              </ul>

              <h4>Account / frontstage consumer mapping · 消费者侧关联（只读说明）</h4>
              <ul className="oa-list oa-ops-mapping-list">
                {ws.account_mappings.map((m) => (
                  <li key={`${ws.id}-${m.route}-${m.label}`}>
                    <strong>{m.label}</strong>
                    <div className="oa-skeleton-meta">
                      route=<code>{m.route}</code> · {m.note}
                    </div>
                  </li>
                ))}
              </ul>

              <h4>Exception preview · 异常预览</h4>
              <p className="oa-skeleton-meta">{ws.exception_preview.join(" · ")}</p>

              {ws.notes.length > 0 ? (
                <>
                  <h4>Notes · 说明</h4>
                  <ul className="oa-list">
                    {ws.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              <div className="oa-skeleton-actions">
                <button className="oa-btn" type="button" disabled>
                  Open write path · Blocked
                </button>
              </div>
            </article>
          ))}
        </div>
      </article>

      <article className="oa-card oa-proj-section">
        <h2>Exception queue preview · 异常队列预览</h2>
        <p className="oa-skeleton-meta">
          Aggregation for navigation awareness only. Overview / Operations are not second business
          ledgers.
        </p>
        <div className="oa-orders-table-wrap">
          <table className="oa-table">
            <thead>
              <tr>
                <th>id</th>
                <th>workstream</th>
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
                  <td>{ex.workstream}</td>
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
        <p className="oa-skeleton-meta">
          Related OA modules for context. Account Center routes are listed as text references in each
          workstream — this page does not edit Account Center.
        </p>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/overview">
            Overview · 总览
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            CO Orders · 订单
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/finance">
            Finance · 财务
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/cs-center">
            CS Center · 客服
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/compliance">
            Compliance · 合规
          </Link>
        </div>
      </article>
    </section>
  );
}
