import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileProductRanking() {
  const f = overviewFixture;
  return (
    <MobileFrame
      title="Product Ranking · 商品销量排行"
      backHref="/admin/oa/m/overview"
      bottomCurrent="ranking"
    >
      <article className="oa-m-card">
        <h3>Board status · 页面状态</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          ready · top {f.ranking.length}
        </div>
        <div className="oa-m-meta">fields=rank, title, units, gmv · DEMO fixture</div>
      </article>

      <p className="oa-m-section-title">Ranking list · 排行列表</p>
      {f.ranking.map((r) => (
        <div className="oa-m-row" key={r.rank}>
          <div className="oa-m-row-top">
            <strong>
              #{r.rank} {r.title}
            </strong>
            <span className="oa-m-chip">TEST_ONLY</span>
          </div>
          <div className="oa-m-meta">
            units {r.units} · gmv {r.gmv}
          </div>
        </div>
      ))}

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/regional">
          Regional · 区域分析
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          Export Ranking · Blocked
        </button>
      </div>

      <div className="oa-m-note">
        Ranking is projection-only. Publish / inventory write paths stay disabled on this mobile board.
      </div>
    </MobileFrame>
  );
}
