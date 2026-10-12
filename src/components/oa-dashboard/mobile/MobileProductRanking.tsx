import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileProductRanking() {
  const f = overviewFixture;
  return (
    <MobileFrame title="Product Sales Ranking · 商品销量排行" backHref="/admin/oa/m/overview">
      <div className="oa-m-loading">state=ready · fields=rank,title,units,gmv</div>
      {f.ranking.map((r) => (
        <div className="oa-m-row" key={r.rank}>
          #{r.rank} {r.title}
          <div>
            units {r.units} · gmv {r.gmv}
          </div>
        </div>
      ))}
    </MobileFrame>
  );
}
