import Link from "next/link";
import {
  COMMERCE_READONLY_META,
  getCommerceReadonlyModule,
} from "./commerceReadonlyFixture";
import type { CommerceReadonlyModuleId } from "./commerceReadonlyTypes";

type Props = {
  moduleId: CommerceReadonlyModuleId;
};

export function CommerceReadonlyBoard({ moduleId }: Props) {
  const mod = getCommerceReadonlyModule(moduleId);
  if (!mod) {
    throw new Error(`Unknown commerce readonly module: ${moduleId}`);
  }

  return (
    <section className="oa-page oa-commerce-page" data-oa-commerce={mod.id}>
      <div className="oa-fixture-banner">
        DATA_SOURCE={COMMERCE_READONLY_META.data_source} · MODE=
        {COMMERCE_READONLY_META.mode} · {COMMERCE_READONLY_META.provider_status} ·
        READONLY_PREVIEW · canonical {mod.canonicalDomain}
      </div>

      <h1 className="oa-page-title">
        {mod.en} · {mod.zh}
      </h1>
      <p className="oa-commerce-lead">
        {mod.descriptionEn} {mod.descriptionZh}
      </p>

      <div className="oa-commerce-status-row">
        <article className="oa-card oa-commerce-flag">
          <h3>Provider · Provider</h3>
          <p>{COMMERCE_READONLY_META.provider_status}</p>
          <p className="oa-commerce-meta">Readonly preview · 只读预览</p>
        </article>
        <article className="oa-card oa-commerce-flag">
          <h3>Write gate · 写入门禁</h3>
          <p>Real business write blocked</p>
          <p className="oa-commerce-meta">No order / stock / shipment mutation</p>
        </article>
        <article className="oa-card oa-commerce-flag">
          <h3>Permission · 权限</h3>
          <p>Permission gate pending</p>
          <p className="oa-commerce-meta">Actions stay disabled</p>
        </article>
      </div>

      <div className="oa-grid-4 oa-commerce-summary">
        {mod.summaries.map((card) => (
          <article className="oa-card" key={card.label}>
            <h3>{card.label}</h3>
            <div className="oa-kpi-value">{card.value}</div>
            <div className="oa-kpi-meta">{card.hint}</div>
          </article>
        ))}
      </div>

      <article className="oa-card oa-commerce-list-card">
        <div className="oa-commerce-list-head">
          <h2>{mod.listTitle}</h2>
          <div className="oa-commerce-actions">
            <button className="oa-btn" type="button" disabled title="Not connected">
              Refresh · 刷新 · Not connected
            </button>
            <button className="oa-btn secondary" type="button" disabled title="Not connected">
              Export · 导出 · Not connected
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

      <div className="oa-commerce-state-grid">
        <article className="oa-card">
          <h3>{mod.emptyTitle}</h3>
          <p>{mod.emptyBody}</p>
          <p className="oa-commerce-meta">Shown as carrier contract · 承载契约展示</p>
        </article>
        <article className="oa-card oa-commerce-error-card">
          <h3>{mod.errorTitle}</h3>
          <p>{mod.errorBody}</p>
          <button className="oa-btn secondary" type="button" disabled title="Not connected">
            Retry · 重试 · Not connected
          </button>
        </article>
      </div>

      <div className="oa-commerce-footer">
        <Link className="oa-btn secondary" href="/admin/oa/overview">
          Back to Overview · 返回总览
        </Link>
      </div>
    </section>
  );
}
