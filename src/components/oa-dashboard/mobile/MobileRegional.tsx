import { overviewFixture } from "../overviewFixture";
import { MobileFrame } from "./MobileFrame";

export function MobileRegional() {
  const f = overviewFixture;
  return (
    <MobileFrame title="Regional Sales Analysis · 区域销售分析" backHref="/admin/oa/m/overview">
      <div className="oa-m-loading">state=ready · fields=region_code,status,gmv,orders</div>
      {f.regions.map((r) => (
        <div className="oa-m-row" key={r.code}>
          <strong>{r.code}</strong> · {r.status}
          <div>
            {r.gmv} / {r.orders} orders
          </div>
        </div>
      ))}
    </MobileFrame>
  );
}
