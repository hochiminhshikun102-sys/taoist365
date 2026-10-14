import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileRegional() {
  const f = overviewFixture;
  return (
    <MobileFrame title="Regional Analysis · 区域销售分析" backHref="/admin/oa/m/overview">
      <article className="oa-m-card">
        <h3>Board status · 页面状态</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          ready · {f.regions.length} regions
        </div>
        <div className="oa-m-meta">fields=region_code, status, gmv, orders · not_connected</div>
      </article>

      <p className="oa-m-section-title">Region cards · 区域卡片</p>
      {f.regions.map((r) => (
        <div className="oa-m-row" key={r.code}>
          <div className="oa-m-row-top">
            <strong>{r.code}</strong>
            <span className={r.status === "watch" ? "oa-m-chip is-amber" : "oa-m-chip"}>{r.status}</span>
          </div>
          <div className="oa-m-meta">
            {r.gmv} · {r.orders} orders
          </div>
        </div>
      ))}

      <p className="oa-m-section-title">Heat snapshot · 热力摘要</p>
      <div className="oa-m-kpi-grid">
        {f.heat.map((h) => (
          <article className="oa-m-card" key={h.region}>
            <h3>{h.region}</h3>
            <div className="oa-m-value" style={{ fontSize: 16 }}>
              {h.sales}
            </div>
          </article>
        ))}
      </div>

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/overview">
          Back Overview · 返回总览
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          Market Write · Blocked
        </button>
      </div>

      <div className="oa-m-note">GEO / market writes disabled. This page stays read_only fixture projection.</div>
    </MobileFrame>
  );
}
