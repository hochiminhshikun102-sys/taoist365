"use client";

import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { OaMobileLocaleProvider, useOaMobileLocale } from "@/components/oa-mobile/useOaMobileLocale";
import { MobileFrame } from "./MobileFrame";

const RANK_TITLES = [
  { zh: "茶具组合 A", en: "Tea Set A" },
  { zh: "线香 B", en: "Incense B" },
  { zh: "典籍 C", en: "Book C" },
] as const;

export function MobileProductRanking() {
  return (
    <OaMobileLocaleProvider>
      <MobileProductRankingView />
    </OaMobileLocaleProvider>
  );
}

function MobileProductRankingView() {
  const { t } = useOaMobileLocale();
  const f = overviewFixture;

  return (
    <MobileFrame
      title={t("商品销量排行", "Product Ranking")}
      backHref="/admin/oa/m/overview"
      bottomCurrent="ranking"
    >
      <article className="oa-m-card">
        <h3>{t("页面状态", "Board status")}</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          {t(`就绪 · 前 ${f.ranking.length} 名`, `ready · top ${f.ranking.length}`)}
        </div>
        <div className="oa-m-meta">
          {t("字段=rank, title, units, gmv · DEMO 夹具", "fields=rank, title, units, gmv · DEMO fixture")}
        </div>
      </article>

      <p className="oa-m-section-title">{t("排行列表", "Ranking list")}</p>
      {f.ranking.map((r, i) => (
        <div className="oa-m-row" key={r.rank}>
          <div className="oa-m-row-top">
            <strong>
              #{r.rank} {t(RANK_TITLES[i]?.zh ?? r.title, RANK_TITLES[i]?.en ?? r.title)}
            </strong>
            <span className="oa-m-chip">TEST_ONLY</span>
          </div>
          <div className="oa-m-meta">
            {t(`销量 ${r.units} · GMV ${r.gmv}`, `units ${r.units} · gmv ${r.gmv}`)}
          </div>
        </div>
      ))}

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/regional">
          {t("区域分析", "Regional")}
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          {t("导出排行 · 已阻断", "Export Ranking · Blocked")}
        </button>
      </div>

      <div className="oa-m-note">
        {t(
          "排行为投影只读。本页不开放发布 / 库存写入路径。",
          "Ranking is projection-only. Publish / inventory write paths stay disabled on this mobile board.",
        )}
      </div>
    </MobileFrame>
  );
}
