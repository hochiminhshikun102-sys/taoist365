import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileOverview() {
  const f = overviewFixture;
  return (
    <MobileFrame title="Operations Overview · 经营总览" bottomCurrent="overview">
      <p className="oa-m-section-title">Core KPIs · 核心指标</p>
      <div className="oa-m-kpi-grid">
        {f.kpis.map((k) => (
          <article className="oa-m-card" key={k.label}>
            <h3>{k.label}</h3>
            <div className="oa-m-value">{k.value}</div>
            <div className="oa-m-meta">
              {k.delta} · {k.source}
            </div>
          </article>
        ))}
      </div>

      <article className="oa-m-card">
        <h3>7-Day GMV Trend · 7日GMV趋势</h3>
        <div className="oa-m-chart" aria-hidden="true">
          {f.trend.map((p) => (
            <div className="oa-m-bar" key={p.d} style={{ height: `${Math.max(12, Math.round((p.v / 70) * 100))}%` }} />
          ))}
        </div>
        <div className="oa-m-chart-labels">
          {f.trend.map((p) => (
            <span key={p.d}>{p.d.slice(3)}</span>
          ))}
        </div>
      </article>

      <p className="oa-m-section-title">Mobile workspaces · 移动工作区</p>
      <div className="oa-m-entries">
        <Link className="oa-m-entry" href="/admin/oa/m/channel">
          <strong>Channel</strong>
          <span>渠道投放明细</span>
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/product-ranking">
          <strong>Ranking</strong>
          <span>商品销量排行</span>
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/regional">
          <strong>Regional</strong>
          <span>区域销售分析</span>
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/risk-todo">
          <strong>Risk / Todo</strong>
          <span>风险待办清单</span>
        </Link>
      </div>

      <article className="oa-m-card">
        <h3>Risk / Todo summary · 风险待办摘要</h3>
        <div className="oa-m-value" style={{ fontSize: 16 }}>
          risks {f.risks.length} · tasks {f.tasks.length}
        </div>
        <div className="oa-m-meta">Fixture summary only · live queue not_connected</div>
      </article>

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/risk-todo">
          Open Risk · 打开风控
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled title="Provider write blocked">
          Connect Provider · Blocked
        </button>
      </div>

      <div className="oa-m-note">
        Mobile OA foundation · DEMO/TEST_ONLY only. Provider not connected. Deploy disabled. Real business write
        disabled.
      </div>
    </MobileFrame>
  );
}
