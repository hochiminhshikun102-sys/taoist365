"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { statusLabel } from "@/lib/oa-orders/format";
import {
  MEDIA_BOUNDARY_NOTES,
  MEDIA_CORE_META,
  MEDIA_CROSS_LINKS,
  MEDIA_FIXTURE,
} from "@/lib/oa-media/fixture";
import type { MediaQueueTag, OaMediaRecord } from "@/lib/oa-media/types";

type QueueKey = MediaQueueTag;

const QUEUES: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "needs_rights", en: "Needs rights", zh: "待权属" },
  { key: "awaiting_review", en: "Awaiting review", zh: "待审" },
  { key: "public_ready", en: "Public ready", zh: "可公开" },
  { key: "ai_hold", en: "AI hold", zh: "AI 挂起" },
  { key: "orphaned", en: "Orphaned", zh: "未绑定" },
];

export function MediaRuntimeWorkbench() {
  const [queue, setQueue] = useState<QueueKey>("all");
  const [selectedId, setSelectedId] = useState(MEDIA_FIXTURE[0]?.media_id ?? "");

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: MEDIA_FIXTURE.length };
    for (const q of QUEUES) if (q.key !== "all") map[q.key] = 0;
    for (const row of MEDIA_FIXTURE) for (const tag of row.queue_tags) map[tag] = (map[tag] || 0) + 1;
    return map;
  }, []);

  const rows = useMemo(() => {
    if (queue === "all") return MEDIA_FIXTURE;
    return MEDIA_FIXTURE.filter((row) => row.queue_tags.includes(queue));
  }, [queue]);

  const selected: OaMediaRecord | null =
    rows.find((row) => row.media_id === selectedId) ?? rows[0] ?? null;

  return (
    <section className="oa-page oa-media-page" data-oa-media-core="r47">
      <div className="oa-fixture-banner">
        R47_MEDIA_READONLY · DATA_SOURCE={MEDIA_CORE_META.data_source} · LIVE_PROVIDER=
        {MEDIA_CORE_META.live_provider} · capability={MEDIA_CORE_META.capability} · REAL_UPLOAD=FALSE
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${MEDIA_CORE_META.capability}`}>
          {capabilityLabel(MEDIA_CORE_META.capability)}
        </span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Product Media · stays under CO</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Product Media · 商品素材</h1>
          <p className="oa-skeleton-lead">
            Read-only media ledger skeleton. original_asset ≠ public_asset; rights_evidence ≠ product_image;
            ai_derivative ≠ approved_public_asset.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" disabled>
            Upload · 上传 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Delete · 删除 · Blocked
          </button>
        </div>
      </header>

      <article className="oa-card oa-media-boundary">
        <h2>Boundary locks · 边界锁</h2>
        <ul className="oa-orders-lines">
          {MEDIA_BOUNDARY_NOTES.map((note) => (
            <li key={note}>
              <code>{note}</code>
            </li>
          ))}
        </ul>
      </article>

      <div className="oa-orders-queues oa-media-queues">
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
            <h2>Media ledger · 素材台账</h2>
            <span className="oa-skeleton-meta">{rows.length} DEMO rows</span>
          </div>
          <div className="oa-orders-table-wrap">
            <table className="oa-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>source</th>
                  <th>kind</th>
                  <th>rights</th>
                  <th>review</th>
                  <th>SKU</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.media_id}
                    className={selected?.media_id === row.media_id ? "is-selected" : undefined}
                    onClick={() => setSelectedId(row.media_id)}
                  >
                    <td>
                      <button type="button" className="oa-orders-linkish" onClick={() => setSelectedId(row.media_id)}>
                        {row.media_id}
                      </button>
                    </td>
                    <td>{row.title}</td>
                    <td>{statusLabel(row.source)}</td>
                    <td>{statusLabel(row.asset_kind)}</td>
                    <td>{statusLabel(row.rights_status)}</td>
                    <td>{statusLabel(row.review_status)}</td>
                    <td>{row.object_sku}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="oa-card oa-orders-summary">
          <h2>Media summary · 素材摘要</h2>
          {!selected ? (
            <p className="oa-skeleton-meta">Select a row · 选择一行</p>
          ) : (
            <>
              <p className="oa-orders-summary-id">
                {selected.media_id} · {selected.bundle_ref}
              </p>
              <dl className="oa-orders-dl">
                <div>
                  <dt>source</dt>
                  <dd>{selected.source}</dd>
                </div>
                <div>
                  <dt>asset_kind</dt>
                  <dd>{selected.asset_kind}</dd>
                </div>
                <div>
                  <dt>rights_status</dt>
                  <dd>{selected.rights_status}</dd>
                </div>
                <div>
                  <dt>review_status</dt>
                  <dd>{selected.review_status}</dd>
                </div>
                <div>
                  <dt>original_asset</dt>
                  <dd>{String(selected.is_original)}</dd>
                </div>
                <div>
                  <dt>public_asset</dt>
                  <dd>{String(selected.is_public_asset)}</dd>
                </div>
                <div>
                  <dt>ai_derivative</dt>
                  <dd>{String(selected.is_ai_derivative)}</dd>
                </div>
                <div>
                  <dt>rights_evidence</dt>
                  <dd>{String(selected.has_rights_evidence)}</dd>
                </div>
                <div>
                  <dt>intake_ref</dt>
                  <dd>{selected.intake_ref}</dd>
                </div>
                <div>
                  <dt>object_sku</dt>
                  <dd>{selected.object_sku}</dd>
                </div>
              </dl>
              <p className="oa-skeleton-meta">{selected.compliance_note}</p>
              <div className="oa-orders-write-gate">
                <button className="oa-btn" type="button" disabled>
                  Approve public · Blocked
                </button>
                <button className="oa-btn" type="button" disabled>
                  Delete asset · Blocked
                </button>
              </div>
            </>
          )}
        </aside>
      </div>

      <article className="oa-card oa-orders-projection">
        <h2>Projection links · 投影入口</h2>
        <div className="oa-orders-projection-grid">
          {MEDIA_CROSS_LINKS.map((item) => (
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
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            Objects Runtime · 商品系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/product-media">
            Legacy Product Media · 旧入口保留
          </Link>
        </div>
      </article>
    </section>
  );
}
