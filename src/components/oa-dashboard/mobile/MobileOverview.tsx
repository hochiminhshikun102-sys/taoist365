import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileOverview() {
  const f = overviewFixture;
  return (
    <MobileFrame title="Operations Overview Board · 经营总览看板">
      <div className="oa-m-kpi-grid">
        {f.kpis.map((k) => (
          <article className="oa-m-card" key={k.label}>
            <h3>{k.label}</h3>
            <div className="oa-m-value">{k.value}</div>
            <div style={{ fontSize: 11, color: "#5A728C" }}>{k.delta}</div>
          </article>
        ))}
      </div>
      <article className="oa-m-card">
        <h3>7-Day GMV Trend · 7日GMV趋势</h3>
        <div className="oa-chart" style={{ height: 110 }}>
          {f.trend.map((p) => (
            <div className="oa-bar" key={p.d} style={{ height: `${Math.round((p.v / 70) * 100)}%` }} />
          ))}
        </div>
      </article>
      <div className="oa-m-entries">
        <Link className="oa-m-entry" href="/admin/oa/m/channel">
          Channel Data Detail · 渠道投放明细
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/product-ranking">
          Product Sales Ranking · 商品销量排行
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/regional">
          Regional Sales Analysis · 区域销售分析
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/risk-todo">
          Risk & To-do List · 风险待办清单
        </Link>
      </div>
      <article className="oa-m-card">
        Risk / Todo summary · 风险待办摘要：risks={f.risks.length} · tasks={f.tasks.length}
      </article>
    </MobileFrame>
  );
}
