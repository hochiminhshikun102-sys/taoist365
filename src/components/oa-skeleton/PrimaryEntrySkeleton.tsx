import Link from "next/link";
import type { OaPrimaryEntry } from "./primaryEntries";

type Props = {
  entry: OaPrimaryEntry;
};

export function PrimaryEntrySkeleton({ entry }: Props) {
  return (
    <section className="oa-page oa-skeleton-page" data-oa-entry={entry.slug}>
      <div className="oa-fixture-banner">
        DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER · READ_ONLY_SKELETON · canonical {entry.canonicalDomain}
      </div>
      <h1 className="oa-page-title">
        {entry.en} · {entry.zh}
      </h1>
      <p className="oa-skeleton-lead">
        {entry.descriptionEn} {entry.descriptionZh}
      </p>

      <div className="oa-skeleton-status-grid">
        <article className="oa-card oa-skeleton-card">
          <h3>Provider status · Provider 状态</h3>
          <p>Provider not connected</p>
          <p className="oa-skeleton-meta">Read-only skeleton</p>
        </article>
        <article className="oa-card oa-skeleton-card">
          <h3>Data · 数据</h3>
          <p>No live data connected</p>
          <p className="oa-skeleton-meta">Empty state · 空状态</p>
        </article>
        <article className="oa-card oa-skeleton-card">
          <h3>Permission · 权限</h3>
          <p>Permission gate pending</p>
          <p className="oa-skeleton-meta">No write actions enabled</p>
        </article>
      </div>

      <div className="oa-skeleton-actions">
        <Link className="oa-btn secondary" href="/admin/oa/overview">
          Back to Overview · 返回总览
        </Link>
      </div>
    </section>
  );
}
