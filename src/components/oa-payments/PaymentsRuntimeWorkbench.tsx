"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { formatMinor, statusLabel } from "@/lib/oa-orders/format";
import { PAYMENT_ORDER_FIELD_MAP, PAYMENTS_CORE_META, PAYMENTS_FIXTURE } from "@/lib/oa-payments/fixture";
import type { OaPaymentRecord, PaymentWorkbenchStatus } from "@/lib/oa-payments/types";

type QueueKey = "all" | PaymentWorkbenchStatus;

const QUEUES: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "awaiting_capture", en: "Awaiting capture", zh: "待扣款" },
  { key: "settling", en: "Settling", zh: "结算中" },
  { key: "refund_queue", en: "Refund queue", zh: "退款队列" },
  { key: "recon_queue", en: "Recon", zh: "对账" },
  { key: "risk_hold", en: "Risk hold", zh: "风险挂起" },
];

export function PaymentsRuntimeWorkbench() {
  const [queue, setQueue] = useState<QueueKey>("all");
  const [selectedId, setSelectedId] = useState(PAYMENTS_FIXTURE[0]?.payment_intent_ref ?? "");
  const [panel, setPanel] = useState<"detail" | "refunds" | "recon">("detail");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PAYMENTS_FIXTURE.length };
    for (const q of QUEUES) if (q.key !== "all") map[q.key] = 0;
    for (const row of PAYMENTS_FIXTURE) for (const tag of row.queue_tags) map[tag] = (map[tag] || 0) + 1;
    return map;
  }, []);

  const rows = useMemo(() => {
    if (queue === "all") return PAYMENTS_FIXTURE;
    return PAYMENTS_FIXTURE.filter((row) => row.queue_tags.includes(queue));
  }, [queue]);

  const selected: OaPaymentRecord | null =
    rows.find((row) => row.payment_intent_ref === selectedId) ?? rows[0] ?? null;

  return (
    <section className="oa-page oa-ps-page" data-oa-payments-core="r44">
      <div className="oa-fixture-banner">
        WAVE1C_PAYMENTS_SKELETON · DATA_SOURCE={PAYMENTS_CORE_META.data_source} · LIVE_PROVIDER=
        {PAYMENTS_CORE_META.live_provider} · capability={PAYMENTS_CORE_META.capability} · REAL_WRITE=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${PAYMENTS_CORE_META.capability}`}>
          {capabilityLabel(PAYMENTS_CORE_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Payments Runtime · stays under CO</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Payments Runtime · 支付管理</h1>
          <p className="oa-skeleton-lead">
            Read-only skeleton for Finance settlement / refund / recon projections. DEMO only — no capture, refund,
            or recon writes.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Capture · 扣款 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Refund execute · 执行退款 · Blocked
          </button>
        </div>
      </header>

      <div className="oa-orders-queues oa-ps-queues">
        {QUEUES.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`oa-orders-queue${queue === item.key ? " is-active" : ""}`}
            onClick={() => setQueue(item.key)}
          >
            <span>
              {item.en} · {item.zh}
            </span>
            <strong>{counts[item.key] || 0}</strong>
          </button>
        ))}
      </div>

      <div className="oa-orders-layout">
        <article className="oa-card">
          <div className="oa-commerce-list-head">
            <h2>Payment ledger skeleton · 支付流水骨架</h2>
            <span className="oa-skeleton-meta">{rows.length} DEMO rows</span>
          </div>
          <div className="oa-orders-table-wrap">
            <table className="oa-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Provider</th>
                  <th>Intent</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Refund</th>
                  <th>Settlement</th>
                  <th>Risk</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.payment_intent_ref}
                    className={selected?.payment_intent_ref === row.payment_intent_ref ? "is-selected" : undefined}
                    onClick={() => setSelectedId(row.payment_intent_ref)}
                  >
                    <td>
                      {row.order_number}
                      <div className="oa-skeleton-meta">{row.order_id}</div>
                    </td>
                    <td>{row.payment_provider}</td>
                    <td>{row.payment_intent_ref}</td>
                    <td>{formatMinor(row.amount_minor, row.currency)}</td>
                    <td>{statusLabel(row.payment_status)}</td>
                    <td>
                      {statusLabel(row.refund_status)}
                      {row.refund_amount_minor > 0
                        ? ` · ${formatMinor(row.refund_amount_minor, row.currency)}`
                        : ""}
                    </td>
                    <td>{statusLabel(row.settlement_status)}</td>
                    <td>{statusLabel(row.risk_status)}</td>
                    <td>{row.updated_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="oa-card">
          <div className="oa-ps-panel-tabs">
            {(
              [
                ["detail", "Payment detail"],
                ["refunds", "Refund entry"],
                ["recon", "Recon entry"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`oa-orders-chip${panel === key ? " is-active" : ""}`}
                onClick={() => setPanel(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {!selected ? (
            <p className="oa-skeleton-meta">Select a payment row.</p>
          ) : panel === "detail" ? (
            <dl className="oa-orders-dl">
              <div>
                <dt>order</dt>
                <dd>
                  {selected.order_number} · {selected.order_id}
                </dd>
              </div>
              <div>
                <dt>payment_status</dt>
                <dd>{selected.payment_status}</dd>
              </div>
              <div>
                <dt>payment_provider</dt>
                <dd>{selected.payment_provider}</dd>
              </div>
              <div>
                <dt>payment_intent_ref</dt>
                <dd>{selected.payment_intent_ref}</dd>
              </div>
              <div>
                <dt>amount_minor</dt>
                <dd>
                  {selected.amount_minor} · {formatMinor(selected.amount_minor, selected.currency)}
                </dd>
              </div>
              <div>
                <dt>refund_status</dt>
                <dd>
                  {selected.refund_status} · minor {selected.refund_amount_minor}
                </dd>
              </div>
              <div>
                <dt>settlement_status</dt>
                <dd>{selected.settlement_status}</dd>
              </div>
              <div>
                <dt>risk_status</dt>
                <dd>{selected.risk_status}</dd>
              </div>
            </dl>
          ) : panel === "refunds" ? (
            <div>
              <h3>Refund records entry · 退款记录入口</h3>
              <p className="oa-skeleton-meta">
                Skeleton only. Links to Finance projection shell. No refund write.
              </p>
              <p>
                Current: {selected.refund_status} / {formatMinor(selected.refund_amount_minor, selected.currency)}
              </p>
              <Link className="oa-btn secondary" href="/admin/oa/finance">
                Open Finance shell · 财务壳
              </Link>
            </div>
          ) : (
            <div>
              <h3>Reconciliation entry · 对账入口</h3>
              <p className="oa-skeleton-meta">
                Skeleton only. Settlement={selected.settlement_status}. Provider recon not connected.
              </p>
              <button className="oa-btn" type="button" disabled>
                Run recon · 对账 · Blocked
              </button>
            </div>
          )}
        </aside>
      </div>

      <article className="oa-card">
        <h2>Orders Runtime field map · 与订单字段映射</h2>
        <ul className="oa-orders-lines">
          {PAYMENT_ORDER_FIELD_MAP.map((row) => (
            <li key={row.payments_field}>
              <strong>{row.payments_field}</strong> ← {row.orders_source}
            </li>
          ))}
        </ul>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Orders Runtime · 订单系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/shipping">
            Shipping Runtime · 发货管理
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            Objects Runtime · 商品系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            CO Overview · 总入口
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/finance">
            Finance · 财务中心
          </Link>
        </div>
      </article>
    </section>
  );
}
