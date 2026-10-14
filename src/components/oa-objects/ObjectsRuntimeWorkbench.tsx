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
import { OBJECT_CROSS_LINKS, OBJECTS_CORE_META, OBJECTS_FIXTURE } from "@/lib/oa-objects/fixture";
import { mapAdminObjectRows } from "@/lib/oa-objects/trustedReadAdapter";
import type { ObjectQueueTag, OaObjectRecord } from "@/lib/oa-objects/types";

type QueueKey = ObjectQueueTag;

const QUEUES: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "draft_queue", en: "Draft", zh: "草稿" },
  { key: "publish_queue", en: "Publish queue", zh: "发布队列" },
  { key: "on_sale", en: "On sale", zh: "在售" },
  { key: "risk_hold", en: "Risk hold", zh: "风险挂起" },
  { key: "media_gap", en: "Media gap", zh: "素材缺口" },
];

function money(amount: number, currency: string, known = true, sourceText?: string): string {
  if (!known) return sourceText && sourceText !== "—" ? `${sourceText} · not minor` : "—";
  return formatMinor(amount, currency || "unknown");
}

export function ObjectsRuntimeWorkbench() {
  const [demoMode, setDemoMode] = useState(false);
  const [viewState, setViewState] = useState("loading");
  const [errorCode, setErrorCode] = useState<CoReadErrorCode | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [liveRows, setLiveRows] = useState<OaObjectRecord[]>([]);
  const [queue, setQueue] = useState<QueueKey>("all");
  const [selectedId, setSelectedId] = useState("");
  const controllerRef = useRef(createCoReadController());

  const loadLive = useCallback(async () => {
    const ctl = controllerRef.current;
    const { generation, signal } = ctl.next();
    setLiveRows([]);
    setSelectedId("");
    setErrorCode(null);
    setViewState("loading");
    const result = await oaPrivateGetJson<{ rows?: unknown; storage?: string }>("/api/admin/objects", signal);
    if (!ctl.isCurrent(generation)) return;
    if (!result.ok) {
      setErrorCode(result.code);
      setViewState(result.code === "preview_read_unavailable" ? "provider_unavailable" : result.code);
      return;
    }
    const mapped = mapAdminObjectRows(result.payload.rows, new Date().toISOString());
    setStorage(result.storage);
    setLiveRows(mapped);
    setViewState(mapped.length ? "ready" : "empty");
    setSelectedId(mapped[0]?.object_id ?? "");
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

  const sourceRows = demoMode ? OBJECTS_FIXTURE : liveRows;
  const liveBlocked = !demoMode && viewState !== "ready" && viewState !== "empty";

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: sourceRows.length };
    for (const q of QUEUES) if (q.key !== "all") map[q.key] = 0;
    for (const row of sourceRows) for (const tag of row.queue_tags) map[tag] = (map[tag] || 0) + 1;
    return map;
  }, [sourceRows]);

  const rows = useMemo(() => {
    if (liveBlocked) return [];
    if (queue === "all") return sourceRows;
    return sourceRows.filter((row) => row.queue_tags.includes(queue));
  }, [queue, sourceRows, liveBlocked]);

  const selected: OaObjectRecord | null =
    rows.find((row) => row.object_id === selectedId) ?? rows[0] ?? null;
  const dataSource = demoMode ? OBJECTS_CORE_META.data_source : "VERIFIED_LOCAL_READ_SOURCE";

  return (
    <section className="oa-page oa-objects-page" data-oa-objects-core="r47">
      <div className="oa-fixture-banner">
        R47_OBJECTS_READONLY · DATA_SOURCE={dataSource} · LIVE_PROVIDER=not_connected · storage=
        {demoMode ? "TEST_ONLY" : storage || "—"} · capability=read_only · REAL_PUBLISH=FALSE ·
        DEMO_LIVE_MIX=FALSE
      </div>

      <div className="oa-capability-row">
        <span className="oa-capability-pill is-read_only">{capabilityLabel("read_only")}</span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Objects Runtime · stays under CO</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Objects Runtime · 商品系统</h1>
          <p className="oa-skeleton-lead">
            Read-only Preview GET. Six independent status dimensions — publish success is not sale readiness;
            media completeness is not rights clearance. Missing SKU stays unknown.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" onClick={() => void loadLive()} disabled={demoMode}>
            Refresh read · 刷新只读
          </button>
          <button className="oa-btn" type="button" disabled>
            Publish · 发布 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Edit SKU · 改 SKU · Blocked
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

      {!demoMode && viewState !== "ready" && viewState !== "empty" ? (
        <article className={`oa-card oa-orders-state-card${errorCode ? " is-error" : ""}`} data-oa-read-state={viewState}>
          {viewState === "loading"
            ? "Loading Preview read source… · 加载中"
            : `${viewState} · Preview object read did not succeed.`}
          {errorCode === "provider_unavailable" ? (
            <div>
              <button className="oa-btn secondary" type="button" onClick={() => void loadLive()}>
                Retry · 重试
              </button>
            </div>
          ) : null}
        </article>
      ) : null}

      <div className="oa-orders-queues oa-objects-queues">
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
            <h2>Object ledger · 商品台账</h2>
            <span className="oa-skeleton-meta">
              {rows.length} {demoMode ? "DEMO rows" : "LIVE_PREVIEW_READ rows"}
            </span>
          </div>
          {rows.length === 0 ? (
            <div className="oa-orders-empty">
              <h3>Empty state · 空状态</h3>
              <p>{liveBlocked ? "Live list hidden until a successful trusted read." : "No rows."}</p>
            </div>
          ) : (
            <div className="oa-orders-table-wrap">
              <table className="oa-table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>object</th>
                    <th>publish</th>
                    <th>sale</th>
                    <th>media</th>
                    <th>risk</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.object_id}
                      className={selected?.object_id === row.object_id ? "is-selected" : undefined}
                      onClick={() => setSelectedId(row.object_id)}
                    >
                      <td>
                        <button type="button" className="oa-orders-linkish" onClick={() => setSelectedId(row.object_id)}>
                          {row.sku}
                        </button>
                      </td>
                      <td>
                        {row.title}
                        <div className="oa-skeleton-meta">{row.title_zh}</div>
                      </td>
                      <td>{money(row.price_minor, row.currency, row.price_known !== false, row.source_price_text)}</td>
                      <td>{statusLabel(row.object_status)}</td>
                      <td>{statusLabel(row.publish_status)}</td>
                      <td>{statusLabel(row.sale_status)}</td>
                      <td>{statusLabel(row.media_status)}</td>
                      <td>{statusLabel(row.risk_status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <aside className="oa-card oa-orders-summary">
          <h2>Object summary · 商品摘要</h2>
          {!selected ? (
            <p className="oa-skeleton-meta">Select a row · 选择一行</p>
          ) : (
            <>
              <p className="oa-orders-summary-id">
                {selected.object_id} · {selected.sku}
              </p>
              <dl className="oa-orders-dl">
                <div>
                  <dt>object_status</dt>
                  <dd>{selected.object_status}</dd>
                </div>
                <div>
                  <dt>publish_status</dt>
                  <dd>{selected.publish_status}</dd>
                </div>
                <div>
                  <dt>sale_status</dt>
                  <dd>{selected.sale_status}</dd>
                </div>
                <div>
                  <dt>media_status</dt>
                  <dd>{selected.media_status}</dd>
                </div>
                <div>
                  <dt>risk_status</dt>
                  <dd>{selected.risk_status}</dd>
                </div>
                <div>
                  <dt>inventory_projection_status</dt>
                  <dd>{selected.inventory_projection_status}</dd>
                </div>
                <div>
                  <dt>source_inventory</dt>
                  <dd>{selected.source_inventory == null ? "—" : String(selected.source_inventory)}</dd>
                </div>
                <div>
                  <dt>price</dt>
                  <dd>{money(selected.price_minor, selected.currency, selected.price_known !== false, selected.source_price_text)}</dd>
                </div>
                <div>
                  <dt>intake_ref</dt>
                  <dd>{selected.intake_ref}</dd>
                </div>
                <div>
                  <dt>media_bundle_ref</dt>
                  <dd>{selected.media_bundle_ref}</dd>
                </div>
                <div>
                  <dt>order_line_hits</dt>
                  <dd>{selected.order_line_hits_known === false ? "—" : String(selected.order_line_hits)}</dd>
                </div>
              </dl>
              <p className="oa-skeleton-meta">{selected.note}</p>
              <div className="oa-orders-write-gate">
                <button className="oa-btn" type="button" disabled>
                  Publish · Blocked
                </button>
                <button className="oa-btn" type="button" disabled>
                  Delist · Blocked
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

      <article className="oa-card oa-orders-projection">
        <h2>Projection links · 投影入口</h2>
        <div className="oa-orders-projection-grid">
          {OBJECT_CROSS_LINKS.map((item) => (
            <Link key={item.module} href={item.route} className="oa-orders-projection-card">
              <strong>{item.module}</strong>
              <span>{item.consumes}</span>
              <em>Open · 打开</em>
            </Link>
          ))}
        </div>
        <div className="oa-skeleton-actions" style={{ marginTop: 12 }}>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            CO Overview · 总入口
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/media">
            Product Media · 商品素材
          </Link>
          <Link className="oa-btn secondary" href="/admin/objects">
            Legacy Objects AdminOS · 旧入口保留
          </Link>
        </div>
      </article>
    </section>
  );
}
