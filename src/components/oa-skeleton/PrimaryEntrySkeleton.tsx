import Link from "next/link";
import type { OaPrimaryEntry } from "./primaryEntries";
import { CO_SECONDARY_CAPABILITY, PRIMARY_CAPABILITY, capabilityLabel } from "./capabilityGate";

type Props = {
  entry: OaPrimaryEntry;
};

export function PrimaryEntrySkeleton({ entry }: Props) {
  const status = PRIMARY_CAPABILITY[entry.slug] ?? "not_connected";
  const showCoLinks = entry.slug === "commerce";

  return (
    <section className="oa-page oa-skeleton-page" data-oa-entry={entry.slug}>
      <div className="oa-fixture-banner">
        WAVE0_STRUCTURE_GATE · DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER · capability=
        {status} · canonical {entry.canonicalDomain}
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${status}`}>{capabilityLabel(status)}</span>
          <span className="oa-capability-owner">Dashboard is projection only · 看板仅投影</span>
      </div>

      <h1 className="oa-page-title">
        {entry.en} · {entry.zh}
      </h1>
      <p className="oa-skeleton-lead">
        {entry.descriptionEn} {entry.descriptionZh}
      </p>

      <div className="oa-skeleton-status-grid">
        <article className="oa-card oa-skeleton-card">
          <h3>Capability · 能力状态</h3>
          <p>{capabilityLabel(status)}</p>
          <p className="oa-skeleton-meta">not_connected / read_only / skeleton / available</p>
        </article>
        <article className="oa-card oa-skeleton-card">
          <h3>Provider · Provider</h3>
          <p>Formal Provider not connected</p>
          <p className="oa-skeleton-meta">No fake production success</p>
        </article>
        <article className="oa-card oa-skeleton-card">
          <h3>Write gate · 写入门禁</h3>
          <p>Business writes blocked this round</p>
          <p className="oa-skeleton-meta">Structure gate only</p>
        </article>
      </div>

      {showCoLinks ? (
        <div className="oa-co-workbench-grid">
          {Object.values(CO_SECONDARY_CAPABILITY).map((item) => (
            <Link key={item.id} className="oa-card oa-co-workbench-card" href={item.route}>
              <div className={`oa-capability-pill is-${item.status}`}>{capabilityLabel(item.status)}</div>
              <h3>
                {item.labelEn} · {item.labelZh}
              </h3>
              <p>{item.noteEn}</p>
            </Link>
          ))}
        </div>
      ) : null}

      <div className="oa-skeleton-actions">
        <Link className="oa-btn secondary" href="/admin/oa/overview">
          Back to Overview · 返回总览
        </Link>
      </div>
    </section>
  );
}
