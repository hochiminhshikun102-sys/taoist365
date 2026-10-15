"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import {
  createCoReadController,
  oaPrivateGetBlob,
  oaPrivateGetJson,
  subscribeOaAuthEpoch,
  type CoReadErrorCode,
} from "@/lib/oa-auth/oaPrivateReadClient";
import { statusLabel } from "@/lib/oa-orders/format";
import {
  MEDIA_BOUNDARY_NOTES,
  MEDIA_CORE_META,
  MEDIA_CROSS_LINKS,
  MEDIA_FIXTURE,
} from "@/lib/oa-media/fixture";
import { mapAdminAssetRows } from "@/lib/oa-media/trustedReadAdapter";
import type { MediaQueueTag, OaMediaRecord } from "@/lib/oa-media/types";

type QueueKey = MediaQueueTag;
type PreviewState =
  | { status: "idle" | "loading" | "demo" }
  | { status: "ready"; url: string; kind: "image" | "video"; contentType: string }
  | { status: "auth_required" | "permission_denied" | "not_found" | "provider_unavailable" | "restricted" };

function previewStatusMessage(status: Exclude<PreviewState["status"], "ready">): string {
  if (status === "loading") return "Loading authorized preview… · 授权预览加载中";
  if (status === "demo") return "TEST_ONLY DEMO · live blob preview not used.";
  if (status === "auth_required") return "auth_required · Sign in required for preview.";
  if (status === "permission_denied") return "permission_denied · Viewer cannot read private bytes.";
  if (status === "not_found") return "not_found · Media bytes missing.";
  if (status === "provider_unavailable") return "provider_unavailable · Preview byte read failed.";
  if (status === "restricted") return "restricted · Unsupported or untrusted media type.";
  return "Select a row · 选择一行";
}

const QUEUES: Array<{ key: QueueKey; en: string; zh: string }> = [
  { key: "all", en: "All", zh: "全部" },
  { key: "needs_rights", en: "Needs rights", zh: "待权属" },
  { key: "awaiting_review", en: "Awaiting review", zh: "待审" },
  { key: "public_ready", en: "Public ready", zh: "可公开" },
  { key: "ai_hold", en: "AI hold", zh: "AI 挂起" },
  { key: "orphaned", en: "Orphaned", zh: "未绑定" },
];

export function MediaRuntimeWorkbench() {
  const [demoMode, setDemoMode] = useState(false);
  const [viewState, setViewState] = useState("loading");
  const [errorCode, setErrorCode] = useState<CoReadErrorCode | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [liveRows, setLiveRows] = useState<OaMediaRecord[]>([]);
  const [queue, setQueue] = useState<QueueKey>("all");
  const [selectedId, setSelectedId] = useState("");
  const [preview, setPreview] = useState<PreviewState>({ status: "idle" });
  const controllerRef = useRef(createCoReadController());
  const previewAbortRef = useRef<AbortController | null>(null);
  const previewUrlsRef = useRef(new Set<string>());
  const previewGenerationRef = useRef(0);

  function revokePreviewUrls() {
    for (const url of previewUrlsRef.current) {
      try {
        URL.revokeObjectURL(url);
      } catch {
        /* ignore */
      }
    }
    previewUrlsRef.current.clear();
  }

  const loadLive = useCallback(async () => {
    const ctl = controllerRef.current;
    const { generation, signal } = ctl.next();
    previewGenerationRef.current += 1;
    previewAbortRef.current?.abort();
    setPreview({ status: "idle" });
    revokePreviewUrls();
    setLiveRows([]);
    setSelectedId("");
    setErrorCode(null);
    setViewState("loading");
    const result = await oaPrivateGetJson<{ rows?: unknown; storage?: string }>("/api/admin/assets", signal);
    if (!ctl.isCurrent(generation)) return;
    if (!result.ok) {
      setErrorCode(result.code);
      setViewState(result.code === "preview_read_unavailable" ? "provider_unavailable" : result.code);
      return;
    }
    const mapped = mapAdminAssetRows(result.payload.rows, new Date().toISOString());
    setStorage(result.storage);
    setLiveRows(mapped);
    setViewState(mapped.length ? "ready" : "empty");
    setSelectedId(mapped[0]?.media_id ?? "");
  }, []);

  useEffect(() => {
    const ctl = controllerRef.current;
    void loadLive();
    const stop = subscribeOaAuthEpoch(() => {
      void loadLive();
    });
    return () => {
      previewAbortRef.current?.abort();
      revokePreviewUrls();
      ctl.clear();
      stop();
    };
  }, [loadLive]);

  const sourceRows = demoMode ? MEDIA_FIXTURE : liveRows;
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

  const selected: OaMediaRecord | null =
    rows.find((row) => row.media_id === selectedId) ?? rows[0] ?? null;
  const dataSource = demoMode ? MEDIA_CORE_META.data_source : "VERIFIED_LOCAL_READ_SOURCE";

  useEffect(() => {
    const generation = ++previewGenerationRef.current;
    previewAbortRef.current?.abort();
    if (demoMode) {
      setPreview({ status: "demo" });
      revokePreviewUrls();
      return;
    }
    if (liveBlocked || !selected) {
      setPreview({ status: "idle" });
      revokePreviewUrls();
      return;
    }
    const path = selected.preview_path || "";
    if (!path) {
      setPreview({ status: "restricted" });
      revokePreviewUrls();
      return;
    }
    setPreview({ status: "loading" });
    revokePreviewUrls();
    const abort = new AbortController();
    previewAbortRef.current = abort;
    void oaPrivateGetBlob(path, abort.signal).then((result) => {
      if (generation !== previewGenerationRef.current || abort.signal.aborted) return;
      if (!result.ok) {
        let code: Exclude<PreviewState["status"], "ready"> = "provider_unavailable";
        if (result.code === "restricted") code = "restricted";
        else if (result.code === "not_found") code = "not_found";
        else if (result.code === "auth_required") code = "auth_required";
        else if (result.code === "permission_denied") code = "permission_denied";
        setPreview({ status: code });
        return;
      }
      const url = URL.createObjectURL(result.blob);
      if (generation !== previewGenerationRef.current || abort.signal.aborted) {
        URL.revokeObjectURL(url);
        return;
      }
      previewUrlsRef.current.add(url);
      controllerRef.current.trackBlob(url);
      setPreview({ status: "ready", url, kind: result.kind, contentType: result.contentType });
    });
    return () => {
      abort.abort();
      if (generation === previewGenerationRef.current) {
        setPreview({ status: "idle" });
        revokePreviewUrls();
      }
    };
  }, [demoMode, liveBlocked, selected?.media_id, selected?.preview_path]);

  return (
    <section className="oa-page oa-media-page" data-oa-media-core="r47">
      <div className="oa-fixture-banner">
        R47_MEDIA_READONLY · DATA_SOURCE={dataSource} · LIVE_PROVIDER=not_connected · storage=
        {demoMode ? "TEST_ONLY" : storage || "—"} · capability=read_only · REAL_UPLOAD=FALSE ·
        DEMO_LIVE_MIX=FALSE
      </div>

      <div className="oa-capability-row">
        <span className="oa-capability-pill is-read_only">{capabilityLabel("read_only")}</span>
        <span className="oa-capability-pill is-not_connected">
          Live Provider · {capabilityLabel("not_connected")}
        </span>
        <span className="oa-capability-owner">Owner · 02 CO · Product Media · stays under CO</span>
      </div>

      <header className="oa-orders-header">
        <div>
          <h1 className="oa-page-title">Product Media · 商品素材</h1>
          <p className="oa-skeleton-lead">
            Read-only Preview GET. original_asset ≠ public_asset; rights_evidence ≠ product_image;
            ai_derivative ≠ approved_public_asset. Authorized preview uses Bearer bytes then a temporary blob URL.
          </p>
        </div>
        <div className="oa-orders-header-actions">
          <button className="oa-btn" type="button" onClick={() => void loadLive()} disabled={demoMode}>
            Refresh read · 刷新只读
          </button>
          <button className="oa-btn" type="button" disabled>
            Upload · 上传 · Blocked
          </button>
          <button className="oa-btn secondary" type="button" disabled>
            Delete · 删除 · Blocked
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
            : `${viewState} · Preview media metadata read did not succeed.`}
          {errorCode === "provider_unavailable" ? (
            <div>
              <button className="oa-btn secondary" type="button" onClick={() => void loadLive()}>
                Retry · 重试
              </button>
            </div>
          ) : null}
        </article>
      ) : null}

      <article className="oa-card oa-media-boundary">
        <h2>Boundary locks · 边界锁</h2>
        <ul className="oa-orders-lines">
          {MEDIA_BOUNDARY_NOTES.map((note) => (
            <li key={note}>
              <code>{note}</code>
            </li>
          ))}
          <li>
            <code>preview = Bearer GET + blob URL · no token in src · no anonymous byte reopen</code>
          </li>
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
                    <th>ID</th>
                    <th>Title</th>
                    <th>source</th>
                    <th>kind</th>
                    <th>slot</th>
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
                      <td>{statusLabel(row.media_slot || "unknown")}</td>
                      <td>{statusLabel(row.rights_status)}</td>
                      <td>{statusLabel(row.review_status)}</td>
                      <td>{row.object_sku}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
              <div className="oa-media-preview" data-oa-media-preview={preview.status}>
                {preview.status === "ready" && preview.kind === "video" ? (
                  <video src={preview.url} controls playsInline preload="metadata" />
                ) : null}
                {preview.status === "ready" && preview.kind !== "video" ? (
                  <img src={preview.url} alt={selected.title} />
                ) : null}
                {preview.status !== "ready" ? (
                  <p className="oa-media-preview-msg">{previewStatusMessage(preview.status)}</p>
                ) : null}
              </div>
              <dl className="oa-orders-dl">
                <div>
                  <dt>media_slot</dt>
                  <dd>{selected.media_slot || "unknown"}</dd>
                </div>
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
                <div>
                  <dt>preview_href</dt>
                  <dd>blocked · blob only</dd>
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
