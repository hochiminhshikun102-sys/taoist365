"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CROSS_MODULE_PROJECTIONS, ORDERS_CORE_META, ORDERS_FIXTURE } from "@/lib/oa-orders/fixture";
import { formatMinor, statusLabel } from "@/lib/oa-orders/format";
import type {
  FulfillmentStatus,
  OaOrderRecord,
  OrdersWorkbenchViewState,
  PaymentStatus,
} from "@/lib/oa-orders/types";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";

type QueueKey = "all" | "awaiting_action" | "fulfilling" | "needs_attention" | "aftersales";

const QUEUE_DEFS: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "awaiting_action", en: "Awaiting action", zh: "待处理" },
  { key: "fulfilling", en: "Fulfilling", zh: "履约中" },
  { key: "needs_attention", en: "Needs attention", zh: "需关注" },
  { key: "aftersales", en: "After-sales linked", zh: "售后关联" },
];

export function OrdersRuntimeWorkbench() {
  const [viewState, setViewState] = useState<OrdersWorkbenchViewState>("ready");
  const [queue, setQueue] = useState<QueueKey>("all");
  const [keyword, setKeyword] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<FulfillmentStatus | "all">("all");
  const [selectedId, setSelectedId] = useState(ORDERS_FIXTURE[0]?.order_id ?? "");

  const queueCounts = useMemo(() => {
    const counts: Record<QueueKey, number> = {
      all: ORDERS_FIXTURE.length,
      awaiting_action: 0,
      fulfilling: 0,
      needs_attention: 0,
      aftersales: 0,
    };
    for (const row of ORDERS_FIXTURE) {
      for (const tag of row.queue_tags) counts[tag] += 1;
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    if (viewState === "empty") return [] as OaOrderRecord[];
    const q = keyword.trim().toLowerCase();
    return ORDERS_FIXTURE.filter((row) => {
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
  }, [queue, keyword, paymentFilter, fulfillmentFilter, viewState]);

  const selected = filtered.find((row) => row.order_id === selectedId) ?? filtered[0] ?? null;

  function openSummary(orderId: string) {
    setSelectedId(orderId);
    // Opening summary must never trigger write actions.
  }

  return (
    <section className="oa-page oa-orders-page" data-oa-orders-core="r43">
      <div className="oa-fixture-banner">
        WAVE1B_ORDERS_CORE · DATA_SOURCE={ORDERS_CORE_META.data_source} · LIVE_PROVIDER=
        {ORDERS_CORE_META.live_provider} · capability={ORDERS_CORE_META.capability} · REAL_WRITE=FALSE ·
        CROSS_CURRENCY_SUM=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${ORDERS_CORE_META.capability}`}>
          {capabilityLabel(ORDERS_CORE_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Orders Runtime · not under Operations</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Orders Runtime · 订单系统</h1>
          <p className="oa-skeleton-lead">
            Wave 1B core skeleton for Finance / Logistics / Supply / CS / Compliance projections. Synthetic DEMO
            rows only. Independent status dimensions — payment success is not order completed.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled title="Provider write blocked">
            Refresh live · 刷新真实源 · Not connected
          </button>
          <button className="oa-btn secondary" type="button" disabled title="Export blocked">
            Export · 导出 · Disabled
          </button>
        </div>
      </header>

      <div className="oa-orders-state-toggles" aria-label="Workbench view state demos">
        {(
          [
            ["ready", "Fixture ready"],
            ["loading", "Loading"],
            ["empty", "Empty"],
            ["failed", "Failed"],
            ["not_connected", "Not connected"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`oa-orders-chip${viewState === key ? " is-active" : ""}`}
            onClick={() => setViewState(key)}
          >
            {label}
          </button>
        ))}
      </div>

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

      {viewState === "loading" ? (
        <article className="oa-card oa-orders-state-card">Loading fixture projection… · 加载中</article>
      ) : null}
      {viewState === "failed" ? (
        <article className="oa-card oa-orders-state-card is-error">
          Provider request failed · 正式源读取失败. Retry disabled until Formal Provider wiring.
        </article>
      ) : null}
      {viewState === "not_connected" ? (
        <article className="oa-card oa-orders-state-card">
          Live orders Provider not connected · 真实订单源未接通. Showing DEMO fixture for structure only — not
          production success.
        </article>
      ) : null}

      <div className="oa-orders-layout">
        <article className="oa-card oa-orders-list-card">
          <div className="oa-commerce-list-head">
            <h2>Orders list · 订单列表</h2>
            <span className="oa-skeleton-meta">{filtered.length} rows · TEST_ONLY</span>
          </div>

          {viewState === "empty" || filtered.length === 0 ? (
            <div className="oa-orders-empty">
              <h3>Empty state · 空状态</h3>
              <p>
                {viewState === "empty"
                  ? "No DEMO rows in this simulated empty state."
                  : "No rows match current filters. Clear filters to restore DEMO list."}
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
                      <td>{formatMinor(row.total_minor, row.currency)}</td>
                      <td>{statusLabel(row.order_status)}</td>
                      <td>{statusLabel(row.payment_status)}</td>
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
          {!selected ? (
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
                  <dd>{formatMinor(selected.total_minor, selected.currency)} (minor {selected.total_minor})</dd>
                </div>
                <div>
                  <dt>order_status</dt>
                  <dd>{selected.order_status}</dd>
                </div>
                <div>
                  <dt>payment_status</dt>
                  <dd>{selected.payment_status}</dd>
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
                  <dd>{selected.policy_snapshot_id || "待核对"}</dd>
                </div>
              </dl>

              <h3>Lines · 商品行</h3>
              <ul className="oa-orders-lines">
                {selected.lines.map((line) => (
                  <li key={line.line_id}>
                    {line.title_snapshot} ×{line.quantity} · {formatMinor(line.unit_amount_minor, line.currency)}
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
          OA module shells (no 404). Live providers remain not_connected.
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
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            Back to CO hub · 返回 CO
          </Link>
        </div>
      </article>
    </section>
  );
}
