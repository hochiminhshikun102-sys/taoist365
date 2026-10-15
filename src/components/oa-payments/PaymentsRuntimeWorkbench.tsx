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
import { formatMinor, statusLabel } from "@/lib/oa-orders/format";
import { PAYMENT_ORDER_FIELD_MAP, PAYMENTS_CORE_META, PAYMENTS_FIXTURE } from "@/lib/oa-payments/fixture";
import { mapCommercePaymentRows } from "@/lib/oa-payments/trustedReadAdapter";
import type { OaPaymentRecord, PaymentWorkbenchStatus, PaymentsWorkbenchViewState } from "@/lib/oa-payments/types";

type QueueKey = "all" | PaymentWorkbenchStatus;

const QUEUES: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "awaiting_capture", en: "Awaiting capture", zh: "待扣款" },
  { key: "settling", en: "Settling", zh: "结算中" },
  { key: "refund_queue", en: "Refund queue", zh: "退款队列" },
  { key: "recon_queue", en: "Recon", zh: "对账" },
  { key: "risk_hold", en: "Risk hold", zh: "风险挂起" },
];

function money(amount: number, currency: string, known: boolean): string {
  if (!known) return "—";
  return formatMinor(amount, currency || "unknown");
}

function liveStateMessage(state: PaymentsWorkbenchViewState): string | null {
  if (state === "loading") return "Loading Preview read source… · 加载中";
  if (state === "auth_required") return "auth_required · Sign in required. Retry is safe GET only.";
  if (state === "permission_denied") return "permission_denied · Viewer cannot read payment fields.";
  if (state === "provider_unavailable") return "provider_unavailable · Preview read source unavailable. Retry.";
  if (state === "failed") return "Provider request failed · 正式源读取失败.";
  if (state === "not_connected") return "Live payments Provider not connected · 真实支付源未接通.";
  return null;
}

export function PaymentsRuntimeWorkbench() {
  const [demoMode, setDemoMode] = useState(false);
  const [viewState, setViewState] = useState<PaymentsWorkbenchViewState>("loading");
  const [liveRows, setLiveRows] = useState<OaPaymentRecord[]>([]);
  const [storage, setStorage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<CoReadErrorCode | null>(null);
  const [queue, setQueue] = useState<QueueKey>("all");
  const [selectedId, setSelectedId] = useState("");
  const [panel, setPanel] = useState<"detail" | "refunds" | "recon">("detail");
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
    const mapped = mapCommercePaymentRows(result.payload.rows);
    setStorage(result.storage);
    setLiveRows(mapped);
    setViewState(mapped.length ? "ready" : "empty");
    setSelectedId(mapped[0]?.row_key ?? "");
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

  const sourceRows = demoMode ? PAYMENTS_FIXTURE : liveRows;
  const liveBlocked = !demoMode && viewState !== "ready" && viewState !== "empty";
  const dataSource = demoMode ? PAYMENTS_CORE_META.data_source : "VERIFIED_LOCAL_READ_SOURCE";

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: sourceRows.length };
    for (const q of QUEUES) if (q.key !== "all") map[q.key] = 0;
    for (const row of sourceRows) for (const tag of row.queue_tags) map[tag] = (map[tag] || 0) + 1;
    return map;
  }, [sourceRows]);

  const rows = useMemo(() => {
    if (liveBlocked) return [] as OaPaymentRecord[];
    if (queue === "all") return sourceRows;
    return sourceRows.filter((row) => row.queue_tags.includes(queue));
  }, [queue, sourceRows, liveBlocked]);

  const selected: OaPaymentRecord | null =
    rows.find((row) => row.row_key === selectedId) ?? rows[0] ?? null;

  return (
    <section className="oa-page oa-ps-page" data-oa-payments-core="r44">
      <div className="oa-fixture-banner">
        R92_PAYMENTS_TRUSTED_READ · DATA_SOURCE={dataSource} · LIVE_PROVIDER=not_connected ·
        PAYMENT_INTENT_PROVIDER=not_connected · FINANCE_LEDGER=not_connected · storage=
        {demoMode ? "TEST_ONLY" : storage || "—"} · capability=read_only · REAL_WRITE=FALSE · DEMO_LIVE_MIX=FALSE
      </div>

      <div className="oa-capability-row">
        <span className="oa-capability-pill is-read_only">{capabilityLabel("read_only")}</span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Payments Runtime · stays under CO</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Payments Runtime · 支付管理</h1>
          <p className="oa-skeleton-lead">
            Trusted GET /api/admin/orders only. Missing intent / refund / settlement / risk stay unknown. No capture,
            refund, or recon writes. Amounts use total_cents only.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" onClick={() => void loadLive()} disabled={demoMode}>
            Refresh read · 刷新只读
          </button>
          <button className="oa-btn" type="button" disabled>
            Capture · 扣款 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Refund execute · 执行退款 · Blocked
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
          TEST_ONLY DEMO · not mixed with live rows or KPIs. Not a Payment Intent or Finance Ledger.
        </article>
      ) : null}

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
            <strong>{liveBlocked ? 0 : counts[item.key] || 0}</strong>
          </button>
        ))}
      </div>

      <div className="oa-orders-layout">
        <article className="oa-card">
          <div className="oa-commerce-list-head">
            <h2>Payment ledger skeleton · 支付流水骨架</h2>
            <span className="oa-skeleton-meta">
              {rows.length} rows · {demoMode ? "TEST_ONLY" : "LIVE_PREVIEW_READ"}
            </span>
          </div>
          {liveBlocked || rows.length === 0 ? (
            <div className="oa-orders-empty">
              <h3>Empty state · 空状态</h3>
              <p>
                {liveBlocked
                  ? "Live list hidden until a successful trusted read."
                  : demoMode
                    ? "No DEMO rows match current filters."
                    : "No rows from Preview order read source."}
              </p>
            </div>
          ) : (
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
                      key={row.row_key}
                      className={selected?.row_key === row.row_key ? "is-selected" : undefined}
                      onClick={() => setSelectedId(row.row_key)}
                    >
                      <td>
                        {row.order_number}
                        <div className="oa-skeleton-meta">{row.order_id}</div>
                      </td>
                      <td>{row.provider_known ? row.payment_provider : "not_connected"}</td>
                      <td>{row.intent_known ? row.payment_intent_ref : "—"}</td>
                      <td>{money(row.amount_minor, row.currency, row.amount_known)}</td>
                      <td>
                        {statusLabel(row.payment_status)}
                        {row.source_payment_status && row.source_payment_status !== row.payment_status ? (
                          <div className="oa-skeleton-meta">source {row.source_payment_status}</div>
                        ) : null}
                      </td>
                      <td>
                        {statusLabel(row.refund_status)}
                        {row.refund_amount_known && row.refund_amount_minor > 0
                          ? ` · ${formatMinor(row.refund_amount_minor, row.currency)}`
                          : ""}
                      </td>
                      <td>{row.settlement_known ? statusLabel(row.settlement_status) : "unknown"}</td>
                      <td>{row.risk_known ? statusLabel(row.risk_status) : "unknown"}</td>
                      <td>{row.updated_at || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
                <dd>
                  {selected.payment_status}
                  {selected.source_payment_status !== selected.payment_status
                    ? ` · source ${selected.source_payment_status}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt>payment_provider</dt>
                <dd>{selected.provider_known ? selected.payment_provider : "not_connected"}</dd>
              </div>
              <div>
                <dt>payment_intent_ref</dt>
                <dd>{selected.intent_known ? selected.payment_intent_ref : "unknown · not invented"}</dd>
              </div>
              <div>
                <dt>amount_minor</dt>
                <dd>
                  {selected.amount_known
                    ? `${selected.amount_minor} · ${formatMinor(selected.amount_minor, selected.currency)}`
                    : "unknown · total_cents missing (subtotal is not payable)"}
                </dd>
              </div>
              <div>
                <dt>refund_status</dt>
                <dd>
                  {selected.refund_status}
                  {selected.refund_amount_known
                    ? ` · minor ${selected.refund_amount_minor}`
                    : " · amount unknown"}
                </dd>
              </div>
              <div>
                <dt>settlement_status</dt>
                <dd>{selected.settlement_known ? selected.settlement_status : "unknown · Finance ledger not_connected"}</dd>
              </div>
              <div>
                <dt>risk_status</dt>
                <dd>{selected.risk_known ? selected.risk_status : "unknown"}</dd>
              </div>
            </dl>
          ) : panel === "refunds" ? (
            <div>
              <h3>Refund records entry · 退款记录入口</h3>
              <p className="oa-skeleton-meta">
                Finance Refund Provider not_connected. No refund write. Missing refund fields stay unknown.
              </p>
              <p>
                Current: {selected.refund_status} /{" "}
                {selected.refund_amount_known
                  ? formatMinor(selected.refund_amount_minor, selected.currency)
                  : "amount unknown"}
              </p>
              <Link className="oa-btn secondary" href="/admin/oa/finance">
                Open Finance shell · 财务壳
              </Link>
            </div>
          ) : (
            <div>
              <h3>Reconciliation entry · 对账入口</h3>
              <p className="oa-skeleton-meta">
                Settlement={selected.settlement_known ? selected.settlement_status : "unknown"}. Provider recon not
                connected.
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
