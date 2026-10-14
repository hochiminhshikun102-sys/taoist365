"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import {
  createCoReadController,
  oaPrivateGetJson,
  subscribeOaAuthEpoch,
  type CoReadErrorCode,
} from "@/lib/oa-auth/oaPrivateReadClient";
import { CROSS_MODULE_PROJECTIONS, ORDERS_CORE_META, ORDERS_FIXTURE } from "@/lib/oa-orders/fixture";
import { formatMinor, statusLabel } from "@/lib/oa-orders/format";
import { mapCommerceOrderRows } from "@/lib/oa-orders/trustedReadAdapter";
import type {
  FulfillmentStatus,
  OaOrderRecord,
  OrdersWorkbenchViewState,
  PaymentStatus,
} from "@/lib/oa-orders/types";

type QueueKey = "all" | "awaiting_action" | "fulfilling" | "needs_attention" | "aftersales";

const QUEUE_DEFS: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "awaiting_action", en: "Awaiting action", zh: "待处理" },
  { key: "fulfilling", en: "Fulfilling", zh: "履约中" },
  { key: "needs_attention", en: "Needs attention", zh: "需关注" },
  { key: "aftersales", en: "After-sales linked", zh: "售后关联" },
];

function money(amount: number, currency: string, known = true): string {
  if (!known) return "—";
  return formatMinor(amount, currency || "unknown");
}

function liveStateMessage(state: OrdersWorkbenchViewState): string | null {
  if (state === "loading") return "Loading Preview read source… · 加载中";
  if (state === "auth_required") return "auth_required · Sign in required. Retry is safe GET only.";
  if (state === "permission_denied") return "permission_denied · Viewer cannot read order PII.";
  if (state === "provider_unavailable") return "provider_unavailable · Preview read source unavailable. Retry.";
  if (state === "failed") return "Provider request failed · 正式源读取失败.";
  if (state === "not_connected") return "Live orders Provider not connected · 真实订单源未接通.";
  return null;
}

export function OrdersRuntimeWorkbench() {
  const [demoMode, setDemoMode] = useState(false);
  const [viewState, setViewState] = useState<OrdersWorkbenchViewState>("loading");
  const [liveRows, setLiveRows] = useState<OaOrderRecord[]>([]);
  const [storage, setStorage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<CoReadErrorCode | null>(null);
  const [queue, setQueue] = useState<QueueKey>("all");
  const [keyword, setKeyword] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<FulfillmentStatus | "all">("all");
  const [selectedId, setSelectedId] = useState("");
  const controllerRef = useRef(createCoReadController());

  const loadLive = useCallback(async () => {
    const ctl = controllerRef.current;
    const { generation, signal } = ctl.next();
    setLiveRows([]);
    setSelectedId("");
    setErrorCode(null);
    setViewState("loading");
    const result = await oaPrivateGetJson<{ rows?: unknown; storage?: string }>("/api/admin/orders", signal);
    if (!ctl.isCurrent(generation)) return;
    if (!result.ok) {
      setErrorCode(result.code);
      setViewState(result.code === "preview_read_unavailable" ? "provider_unavailable" : result.code);
      return;
    }
    const mapped = mapCommerceOrderRows(result.payload.rows, new Date().toISOString());
    setStorage(result.storage);
    setLiveRows(mapped);
    setViewState(mapped.length ? "ready" : "empty");
    setSelectedId(mapped[0]?.order_id ?? "");
  }, []);

  useEffect(() => {
    const ctl = controllerRef.current;
    void loadLive();
    const stop = subscribeOaAuthEpoch(() => {
      void loadLive();
    });
    return () => {
      ctl.clear();
      stop();
    };
  }, [loadLive]);

  const sourceRows = demoMode ? ORDERS_FIXTURE : liveRows;

  const queueCounts = useMemo(() => {
    const counts: Record<QueueKey, number> = {
      all: sourceRows.length,
      awaiting_action: 0,
      fulfilling: 0,
      needs_attention: 0,
      aftersales: 0,
    };
    for (const row of sourceRows) {
      for (const tag of row.queue_tags) counts[tag] += 1;
    }
    return counts;
  }, [sourceRows]);

  const filtered = useMemo(() => {
    if (!demoMode && (viewState === "empty" || viewState === "loading")) return [] as OaOrderRecord[];
    const q = keyword.trim().toLowerCase();
    return sourceRows.filter((row) => {
      if (queue !== "all" && !row.queue_tags.includes(queue)) return false;
      if (paymentFilter !== "all" && row.payment_status !== paymentFilter) return false;
      if (fulfillmentFilter !== "all" && row.fulfillment_status !== fulfillmentFilter) return false;
      if (!q) return true;
      return (
        row.order_number.toLowerCase().includes(q) ||
        row.customer_display_masked.toLowerCase().includes(q) ||
        row.line_summary.toLowerCase().includes(q) ||
        row.order_id.toLowerCase().includes(q)
      );
    });
  }, [queue, keyword, paymentFilter, fulfillmentFilter, viewState, sourceRows, demoMode]);

  const selected = filtered.find((row) => row.order_id === selectedId) ?? filtered[0] ?? null;
  const liveBlocked = !demoMode && viewState !== "ready" && viewState !== "empty";
  const dataSource = demoMode ? ORDERS_CORE_META.data_source : "VERIFIED_LOCAL_READ_SOURCE";

  function openSummary(orderId: string) {
    setSelectedId(orderId);
  }

  return (
    <section className="oa-page oa-orders-page" data-oa-orders-core="r43">
      <div className="oa-fixture-banner">
        WAVE1B_ORDERS_CORE · DATA_SOURCE={dataSource} · LIVE_PROVIDER=not_connected · storage=
        {demoMode ? "TEST_ONLY" : storage || "—"} · capability=read_only · REAL_WRITE=FALSE ·
        CROSS_CURRENCY_SUM=FALSE · DEMO_LIVE_MIX=FALSE
      </div>

      <div className="oa-capability-row">
        <span className="oa-capability-pill is-read_only">{capabilityLabel("read_only")}</span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Orders Runtime · not under Operations</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Orders Runtime · 订单系统</h1>
          <p className="oa-skeleton-lead">
            Preview trusted GET only. Independent status dimensions — payment success is not order completed.
            Missing amounts and after-sales stay unknown.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" onClick={() => void loadLive()} disabled={demoMode}>
            Refresh read · 刷新只读
          </button>
          <button className="oa-btn secondary" type="button" disabled title="Export blocked">
            Export · 导出 · Disabled
          </button>
        </div>
      </header>

      <div className="oa-orders-state-toggles" aria-label="Workbench data mode">
        <button
          type="button"
          className={`oa-orders-chip${!demoMode ? " is-active" : ""}`}
          onClick={() => setDemoMode(false)}
        >
          Live Preview read
        </button>
        <button
          type="button"
          className={`oa-orders-chip${demoMode ? " is-active" : ""}`}
          onClick={() => setDemoMode(true)}
        >
          TEST_ONLY DEMO structure
        </button>
      </div>

      {!demoMode && liveStateMessage(viewState) ? (
        <article
          className={`oa-card oa-orders-state-card${errorCode ? " is-error" : ""}`}
          data-oa-read-state={viewState}
        >
          {liveStateMessage(viewState)}
          {errorCode === "provider_unavailable" ? (
            <div>
              <button className="oa-btn secondary" type="button" onClick={() => void loadLive()}>
                Retry · 重试
              </button>
            </div>
          ) : null}
        </article>
      ) : null}
      {demoMode ? (
        <article className="oa-card oa-orders-state-card">
          TEST_ONLY DEMO · not mixed with live rows or KPIs.
        </article>
      ) : null}

      <div className="oa-orders-queues" role="tablist" aria-label="Work queues">
        {QUEUE_DEFS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={queue === item.key}
            className={`oa-orders-queue${queue === item.key ? " is-active" : ""}`}
            onClick={() => setQueue(item.key)}
          >
            <span>
              {item.en} · {item.zh}
            </span>
            <strong>{queueCounts[item.key]}</strong>
          </button>
        ))}
      </div>

      <div className="oa-orders-filters">
        <label className="oa-orders-field">
          <span>Search · 搜索</span>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Order no. / masked customer / item"
          />
        </label>
        <label className="oa-orders-field">
          <span>Payment · 支付状态</span>
          <select
            value={paymentFilter}
            onChange={(event) => setPaymentFilter(event.target.value as PaymentStatus | "all")}
          >
            <option value="all">All</option>
            <option value="unpaid">unpaid</option>
            <option value="processing">processing</option>
            <option value="paid">paid</option>
            <option value="partial_refund">partial_refund</option>
            <option value="refunded">refunded</option>
            <option value="failed">failed</option>
            <option value="unknown">unknown</option>
          </select>
        </label>
        <label className="oa-orders-field">
          <span>Fulfillment · 履约状态</span>
          <select
            value={fulfillmentFilter}
            onChange={(event) => setFulfillmentFilter(event.target.value as FulfillmentStatus | "all")}
          >
            <option value="all">All</option>
            <option value="not_started">not_started</option>
            <option value="partial">partial</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="exception">exception</option>
            <option value="unknown">unknown</option>
          </select>
        </label>
        <button
          className="oa-btn secondary"
          type="button"
          onClick={() => {
            setKeyword("");
            setPaymentFilter("all");
            setFulfillmentFilter("all");
            setQueue("all");
          }}
        >
          Clear filters · 清除筛选
        </button>
      </div>

      <div className="oa-orders-layout">
        <article className="oa-card oa-orders-list-card">
          <div className="oa-commerce-list-head">
            <h2>Orders list · 订单列表</h2>
            <span className="oa-skeleton-meta">
              {filtered.length} rows · {demoMode ? "TEST_ONLY" : "LIVE_PREVIEW_READ"}
            </span>
          </div>

          {liveBlocked || filtered.length === 0 ? (
            <div className="oa-orders-empty">
              <h3>Empty state · 空状态</h3>
              <p>
                {liveBlocked
                  ? "Live list hidden until a successful trusted read."
                  : demoMode
                    ? "No DEMO rows match current filters."
                    : "No rows from Preview read source."}
              </p>
            </div>
          ) : (
            <div className="oa-orders-table-wrap">
              <table className="oa-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Order</th>
                    <th>Payment</th>
                    <th>Fulfillment</th>
                    <th>After-sales</th>
                    <th>Risk</th>
                    <th>Retrieved</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr
                      key={row.order_id}
                      className={selected?.order_id === row.order_id ? "is-selected" : undefined}
                      onClick={() => openSummary(row.order_id)}
                    >
                      <td>
                        <button type="button" className="oa-orders-linkish" onClick={() => openSummary(row.order_id)}>
                          {row.order_number}
                        </button>
                        <div className="oa-skeleton-meta">{row.source_system}</div>
                      </td>
                      <td>{row.customer_display_masked}</td>
                      <td>{row.line_summary}</td>
                      <td>{money(row.total_minor, row.currency, row.amount_known !== false)}</td>
                      <td>{statusLabel(row.source_order_status || row.order_status)}</td>
                      <td>{statusLabel(row.source_payment_status || row.payment_status)}</td>
                      <td>{statusLabel(row.fulfillment_status)}</td>
                      <td>{statusLabel(row.after_sales_status)}</td>
                      <td>{statusLabel(row.risk_status)}</td>
                      <td>{row.retrieved_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <aside className="oa-card oa-orders-summary" aria-label="Order summary">
          <h2>Order summary · 订单摘要</h2>
          {!selected || liveBlocked ? (
            <p className="oa-skeleton-meta">Select a row to open summary. No write on open.</p>
          ) : (
            <>
              <p className="oa-orders-summary-id">
                {selected.order_number} · {selected.order_id}
              </p>
              <dl className="oa-orders-dl">
                <div>
                  <dt>Customer</dt>
                  <dd>{selected.customer_display_masked}</dd>
                </div>
                <div>
                  <dt>Amount</dt>
                  <dd>
                    {money(selected.total_minor, selected.currency, selected.amount_known !== false)}
                    {selected.amount_known === false ? " · 字段待映射" : ""}
                  </dd>
                </div>
                <div>
                  <dt>order_status</dt>
                  <dd>{selected.source_order_status || selected.order_status}</dd>
                </div>
                <div>
                  <dt>payment_status</dt>
                  <dd>{selected.source_payment_status || selected.payment_status}</dd>
                </div>
                <div>
                  <dt>fulfillment_status</dt>
                  <dd>{selected.fulfillment_status}</dd>
                </div>
                <div>
                  <dt>after_sales_status</dt>
                  <dd>{selected.after_sales_status}</dd>
                </div>
                <div>
                  <dt>refund_status</dt>
                  <dd>{selected.refund_status}</dd>
                </div>
                <div>
                  <dt>risk_status</dt>
                  <dd>{selected.risk_status}</dd>
                </div>
                <div>
                  <dt>policy_snapshot</dt>
                  <dd>{selected.policy_snapshot_id || "字段待映射"}</dd>
                </div>
              </dl>

              <h3>Lines · 商品行</h3>
              <ul className="oa-orders-lines">
                {selected.lines.map((line) => (
                  <li key={line.line_id}>
                    {line.title_snapshot} ×{line.quantity} · {money(line.unit_amount_minor, line.currency, selected.unit_amounts_known !== false)}
                  </li>
                ))}
              </ul>

              <h3>Packages · 包裹</h3>
              {selected.packages.length === 0 ? (
                <p className="oa-skeleton-meta">No packages yet · 暂无包裹</p>
              ) : (
                <ul className="oa-orders-lines">
                  {selected.packages.map((pkg) => (
                    <li key={pkg.shipment_id}>
                      {pkg.carrier} · {pkg.tracking_ref} · {pkg.shipment_status} · {pkg.fulfillment_source}
                    </li>
                  ))}
                </ul>
              )}

              <div className="oa-orders-write-gate">
                <button className="oa-btn" type="button" disabled>
                  Refund · 退款 · Blocked
                </button>
                <button className="oa-btn" type="button" disabled>
                  Ship · 发货 · Blocked
                </button>
                <button className="oa-btn" type="button" disabled>
                  Edit status · 改状态 · Blocked
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

      <article className="oa-card oa-orders-projection">
        <h2>Cross-module projections · 跨模块投影</h2>
        <p className="oa-skeleton-meta">
          Orders Core is the commerce fact surface for projections. Overview aggregates only. Links land on existing
          OA module shells (no 404). Live providers remain not_connected. DEMO fixture is never mixed into live KPIs.
        </p>
        <div className="oa-orders-projection-grid">
          {CROSS_MODULE_PROJECTIONS.map((item) => (
            <Link key={item.module} href={item.route} className="oa-orders-projection-card">
              <strong>{item.module}</strong>
              <span>{item.consumes}</span>
              <em>Open module shell · 打开模块壳</em>
            </Link>
          ))}
        </div>
        <div className="oa-skeleton-actions" style={{ marginTop: 12 }}>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            Payments Runtime preserved · 支付管理
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            Shipping Runtime preserved · 发货管理
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            Objects Runtime · 商品系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/media">
            Product Media · 商品素材
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            Back to CO hub · 返回 CO
          </Link>
        </div>
      </article>
    </section>
  );
}
