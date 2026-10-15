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
import { statusLabel } from "@/lib/oa-orders/format";
import { SHIPPING_CORE_META, SHIPPING_FIXTURE, SHIPPING_ORDER_FIELD_MAP } from "@/lib/oa-shipping/fixture";
import { mapCommerceShipmentRows } from "@/lib/oa-shipping/trustedReadAdapter";
import type { OaShipmentRecord, ShippingWorkbenchStatus, ShippingWorkbenchViewState } from "@/lib/oa-shipping/types";

type QueueKey = "all" | ShippingWorkbenchStatus;

const QUEUES: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "ready_to_ship", en: "Ready to ship", zh: "待发货" },
  { key: "in_transit", en: "In transit", zh: "运输中" },
  { key: "exception", en: "Exception", zh: "异常" },
  { key: "return_logistics", en: "Return logistics", zh: "退货物流" },
  { key: "handoff", en: "Handoff", zh: "交接" },
];

function liveStateMessage(state: ShippingWorkbenchViewState): string | null {
  if (state === "loading") return "Loading Preview read source… · 加载中";
  if (state === "auth_required") return "auth_required · Sign in required. Retry is safe GET only.";
  if (state === "permission_denied") return "permission_denied · Viewer cannot read fulfillment fields.";
  if (state === "provider_unavailable") return "provider_unavailable · Preview read source unavailable. Retry.";
  if (state === "failed") return "Provider request failed · 正式源读取失败.";
  if (state === "not_connected") return "Live shipping Provider not connected · 真实运单源未接通.";
  return null;
}

export function ShippingRuntimeWorkbench() {
  const [demoMode, setDemoMode] = useState(false);
  const [viewState, setViewState] = useState<ShippingWorkbenchViewState>("loading");
  const [liveRows, setLiveRows] = useState<OaShipmentRecord[]>([]);
  const [storage, setStorage] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<CoReadErrorCode | null>(null);
  const [queue, setQueue] = useState<QueueKey>("all");
  const [selectedId, setSelectedId] = useState("");
  const [panel, setPanel] = useState<"detail" | "tracking" | "returns">("detail");
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
    const mapped = mapCommerceShipmentRows(result.payload.rows);
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

  const sourceRows = demoMode ? SHIPPING_FIXTURE : liveRows;
  const liveBlocked = !demoMode && viewState !== "ready" && viewState !== "empty";
  const dataSource = demoMode ? SHIPPING_CORE_META.data_source : "VERIFIED_LOCAL_READ_SOURCE";

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: sourceRows.length };
    for (const q of QUEUES) if (q.key !== "all") map[q.key] = 0;
    for (const row of sourceRows) for (const tag of row.queue_tags) map[tag] = (map[tag] || 0) + 1;
    return map;
  }, [sourceRows]);

  const rows = useMemo(() => {
    if (liveBlocked) return [] as OaShipmentRecord[];
    if (queue === "all") return sourceRows;
    return sourceRows.filter((row) => row.queue_tags.includes(queue));
  }, [queue, sourceRows, liveBlocked]);

  const selected: OaShipmentRecord | null =
    rows.find((row) => row.row_key === selectedId) ?? rows[0] ?? null;

  return (
    <section className="oa-page oa-ps-page" data-oa-shipping-core="r44">
      <div className="oa-fixture-banner">
        R92_SHIPPING_TRUSTED_READ · DATA_SOURCE={dataSource} · LIVE_PROVIDER=not_connected ·
        CARRIER_PROVIDER=not_connected · WAREHOUSE_PROVIDER=not_connected · storage=
        {demoMode ? "TEST_ONLY" : storage || "—"} · capability=read_only · REAL_WRITE=FALSE · DEMO_LIVE_MIX=FALSE
      </div>

      <div className="oa-capability-row">
        <span className="oa-capability-pill is-read_only">{capabilityLabel("read_only")}</span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Shipping Runtime · stays under CO</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Shipping Runtime · 发货管理</h1>
          <p className="oa-skeleton-lead">
            Trusted GET /api/admin/orders only. Paid does not mean shipped. Missing packages / tracking / warehouse stay
            unknown. No label, ship, or tracking writes.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" onClick={() => void loadLive()} disabled={demoMode}>
            Refresh read · 刷新只读
          </button>
          <button className="oa-btn" type="button" disabled>
            Create label · 面单 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Confirm ship · 确认发货 · Blocked
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
          TEST_ONLY DEMO · not mixed with live rows. Not a carrier waybill or warehouse movement.
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
            <h2>Package list skeleton · 包裹列表骨架</h2>
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
                    <th>Order / Line</th>
                    <th>Shipment</th>
                    <th>Fulfillment</th>
                    <th>Shipment status</th>
                    <th>Source</th>
                    <th>Carrier / Tracking</th>
                    <th>Warehouse</th>
                    <th>Handoff</th>
                    <th>Exception</th>
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
                        <div className="oa-skeleton-meta">
                          {row.order_id} · {row.line_id}
                        </div>
                      </td>
                      <td>{row.shipment_known ? row.shipment_id : "—"}</td>
                      <td>
                        {statusLabel(row.fulfillment_status)}
                        {row.source_fulfillment_status !== row.fulfillment_status ? (
                          <div className="oa-skeleton-meta">source {row.source_fulfillment_status}</div>
                        ) : null}
                      </td>
                      <td>{statusLabel(row.shipment_status)}</td>
                      <td>{row.fulfillment_source}</td>
                      <td>
                        {row.carrier_known ? row.carrier : "not_connected"}
                        <div className="oa-skeleton-meta">
                          {row.tracking_known ? row.tracking_ref : "tracking unknown"}
                        </div>
                      </td>
                      <td>{row.warehouse_known ? row.warehouse_ref : "unknown"}</td>
                      <td>{row.handoff_known ? statusLabel(row.handoff_status) : "unknown"}</td>
                      <td>{row.exception_known ? statusLabel(row.exception_status) : "unknown"}</td>
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
                ["detail", "Shipment detail"],
                ["tracking", "Tracking entry"],
                ["returns", "Return logistics"],
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
            <p className="oa-skeleton-meta">Select a shipment row.</p>
          ) : panel === "detail" ? (
            <dl className="oa-orders-dl">
              <div>
                <dt>order / line</dt>
                <dd>
                  {selected.order_number} · {selected.line_id}
                </dd>
              </div>
              <div>
                <dt>shipment_id</dt>
                <dd>{selected.shipment_known ? selected.shipment_id : "unknown · not invented"}</dd>
              </div>
              <div>
                <dt>fulfillment_status</dt>
                <dd>
                  {selected.fulfillment_status}
                  {selected.source_fulfillment_status !== selected.fulfillment_status
                    ? ` · source ${selected.source_fulfillment_status}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt>shipment_status</dt>
                <dd>{selected.shipment_status}</dd>
              </div>
              <div>
                <dt>fulfillment_source</dt>
                <dd>{selected.fulfillment_source}</dd>
              </div>
              <div>
                <dt>carrier / tracking_ref</dt>
                <dd>
                  {selected.carrier_known ? selected.carrier : "not_connected"} ·{" "}
                  {selected.tracking_known ? selected.tracking_ref : "—"}
                </dd>
              </div>
              <div>
                <dt>warehouse_ref</dt>
                <dd>{selected.warehouse_known ? selected.warehouse_ref : "unknown · warehouse Provider not_connected"}</dd>
              </div>
              <div>
                <dt>handoff_status</dt>
                <dd>{selected.handoff_known ? selected.handoff_status : "unknown"}</dd>
              </div>
              <div>
                <dt>exception_status</dt>
                <dd>{selected.exception_known ? selected.exception_status : "unknown"}</dd>
              </div>
            </dl>
          ) : panel === "tracking" ? (
            <div>
              <h3>Tracking entry · 物流轨迹入口</h3>
              <p className="oa-skeleton-meta">
                Carrier tracking Provider not_connected. Opens Logistics shell for projection. No tracking write.
              </p>
              <p>
                {selected.carrier_known ? selected.carrier : "not_connected"} /{" "}
                {selected.tracking_known ? selected.tracking_ref : "no tracking field"}
              </p>
              <Link className="oa-btn secondary" href="/admin/oa/logistics">
                Open Logistics shell · 物流壳
              </Link>
            </div>
          ) : (
            <div>
              <h3>Return logistics · 退货物流入口</h3>
              <p className="oa-skeleton-meta">
                Reverse logistics Provider not_connected. Exception=
                {selected.exception_known ? selected.exception_status : "unknown"}. No reverse-label write.
              </p>
              <div className="oa-skeleton-actions">
                <Link className="oa-btn secondary" href="/admin/oa/cs-center">
                  CS Center · 客服
                </Link>
                <Link className="oa-btn secondary" href="/admin/oa/supply-chain">
                  Supply Chain · 供应链
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>

      <article className="oa-card">
        <h2>Orders / Supply field map · 与订单与供应链映射</h2>
        <ul className="oa-orders-lines">
          {SHIPPING_ORDER_FIELD_MAP.map((row) => (
            <li key={row.shipping_field}>
              <strong>{row.shipping_field}</strong> ← {row.orders_source}
            </li>
          ))}
        </ul>
        <div className="oa-skeleton-actions">
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Orders Runtime · 订单系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/payments">
            Payments Runtime · 支付管理
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            Objects Runtime · 商品系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            CO Overview · 总入口
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/logistics">
            Logistics · 物流管理
          </Link>
        </div>
      </article>
    </section>
  );
}
