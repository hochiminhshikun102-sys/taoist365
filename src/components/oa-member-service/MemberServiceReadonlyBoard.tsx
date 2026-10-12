import Link from "next/link";
import {
  MEMBER_SERVICE_READONLY_META,
  getMemberServiceReadonlyModule,
} from "./memberServiceReadonlyFixture";
import type { MemberServiceReadonlyModuleId } from "./memberServiceReadonlyTypes";

type Props = {
  moduleId: MemberServiceReadonlyModuleId;
};

export function MemberServiceReadonlyBoard({ moduleId }: Props) {
  const mod = getMemberServiceReadonlyModule(moduleId);
  if (!mod) {
    throw new Error(`Unknown member-service readonly module: ${moduleId}`);
  }

  return (
    <section className="oa-page oa-member-service-page" data-oa-member-service={mod.id}>
      <div className="oa-fixture-banner">
        DATA_SOURCE={MEMBER_SERVICE_READONLY_META.data_source} · MODE=
        {MEMBER_SERVICE_READONLY_META.mode} · {MEMBER_SERVICE_READONLY_META.provider_status} ·
        READONLY_PREVIEW · canonical {mod.canonicalDomain}
      </div>

      <h1 className="oa-page-title">
        {mod.en} · {mod.zh}
      </h1>
      <p className="oa-member-service-lead">
        {mod.descriptionEn} {mod.descriptionZh}
      </p>

      <div className="oa-member-service-status-row">
        <article className="oa-card oa-member-service-flag">
          <h3>Provider · Provider</h3>
          <p>{MEMBER_SERVICE_READONLY_META.provider_status}</p>
          <p className="oa-member-service-meta">Readonly preview · 只读预览</p>
        </article>
        <article className="oa-card oa-member-service-flag">
          <h3>Write gate · 写入门禁</h3>
          <p>{mod.writeGateLine}</p>
          <p className="oa-member-service-meta">{mod.writeGateMeta}</p>
        </article>
        <article className="oa-card oa-member-service-flag">
          <h3>Permission · 权限</h3>
          <p>Permission gate pending</p>
          <p className="oa-member-service-meta">Actions stay disabled</p>
        </article>
      </div>

      <div className="oa-grid-4 oa-member-service-summary">
        {mod.summaries.map((card) => (
          <article className="oa-card" key={card.label}>
            <h3>{card.label}</h3>
            <div className="oa-kpi-value">{card.value}</div>
            <div className="oa-kpi-meta">{card.hint}</div>
          </article>
        ))}
      </div>

      <article className="oa-card oa-member-service-list-card">
        <div className="oa-member-service-list-head">
          <h2>{mod.listTitle}</h2>
          <div className="oa-member-service-actions">
            <button className="oa-btn" type="button" disabled title="Provider not connected">
              {mod.primaryActionLabel}
            </button>
            <button className="oa-btn secondary" type="button" disabled title="Not connected">
              {mod.secondaryActionLabel}
            </button>
          </div>
        </div>
        <table className="oa-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item · 条目</th>
              <th>Context · 上下文</th>
              <th>Status · 状态</th>
              <th>As of · 时间</th>
            </tr>
          </thead>
          <tbody>
            {mod.rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.primary}</td>
                <td>{row.secondary}</td>
                <td>
                  <span className="oa-chip">{row.status}</span>
                </td>
                <td>{row.asOf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <div className="oa-member-service-state-grid">
        <article className="oa-card">
          <h3>{mod.emptyTitle}</h3>
          <p>{mod.emptyBody}</p>
          <p className="oa-member-service-meta">Shown as carrier contract · 承载契约展示</p>
        </article>
        <article className="oa-card oa-member-service-error-card">
          <h3>{mod.errorTitle}</h3>
          <p>{mod.errorBody}</p>
          <button className="oa-btn secondary" type="button" disabled title="Not connected">
            Retry · 重试 · Not connected
          </button>
        </article>
      </div>

      <div className="oa-member-service-footer">
        <Link className="oa-btn secondary" href="/admin/oa/overview">
          Back to Overview · 返回总览
        </Link>
      </div>
    </section>
  );
}
