"use client";

import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { OaMobileLocaleProvider, useOaMobileLocale } from "@/components/oa-mobile/useOaMobileLocale";
import { MobileFrame } from "./MobileFrame";

export function MobileRegional() {
  return (
    <OaMobileLocaleProvider>
      <MobileRegionalView />
    </OaMobileLocaleProvider>
  );
}

function MobileRegionalView() {
  const { t } = useOaMobileLocale();
  const f = overviewFixture;

  return (
    <MobileFrame title={t("区域销售分析", "Regional Analysis")} backHref="/admin/oa/m/overview">
      <article className="oa-m-card">
        <h3>{t("页面状态", "Board status")}</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          {t(`就绪 · ${f.regions.length} 个区域`, `ready · ${f.regions.length} regions`)}
        </div>
        <div className="oa-m-meta">
          {t(
            "字段=region_code, status, gmv, orders · not_connected",
            "fields=region_code, status, gmv, orders · not_connected",
          )}
        </div>
      </article>

      <p className="oa-m-section-title">{t("区域卡片", "Region cards")}</p>
      {f.regions.map((r) => (
        <div className="oa-m-row" key={r.code}>
          <div className="oa-m-row-top">
            <strong>{r.code}</strong>
            <span className={r.status === "watch" ? "oa-m-chip is-amber" : "oa-m-chip"}>{r.status}</span>
          </div>
          <div className="oa-m-meta">
            {t(`${r.gmv} · ${r.orders} 单`, `${r.gmv} · ${r.orders} orders`)}
          </div>
        </div>
      ))}

      <p className="oa-m-section-title">{t("热力摘要", "Heat snapshot")}</p>
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
          {t("返回总览", "Back Overview")}
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          {t("市场写入 · 已阻断", "Market Write · Blocked")}
        </button>
      </div>

      <div className="oa-m-note">
        {t(
          "GEO / 市场写入已禁用。本页保持 read_only 夹具投影。",
          "GEO / market writes disabled. This page stays read_only fixture projection.",
        )}
      </div>
    </MobileFrame>
  );
}
