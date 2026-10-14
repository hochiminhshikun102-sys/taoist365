"use client";

import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { OaMobileLocaleProvider, useOaMobileLocale } from "@/components/oa-mobile/useOaMobileLocale";
import { MobileFrame } from "./MobileFrame";

export function MobileChannel() {
  return (
    <OaMobileLocaleProvider>
      <MobileChannelView />
    </OaMobileLocaleProvider>
  );
}

function MobileChannelView() {
  const { t } = useOaMobileLocale();
  const f = overviewFixture;

  return (
    <MobileFrame
      title={t("渠道投放明细", "Channel Detail")}
      backHref="/admin/oa/m/overview"
      bottomCurrent="channel"
    >
      <article className="oa-m-card">
        <h3>{t("页面状态", "Board status")}</h3>
        <div className="oa-m-value" style={{ fontSize: 15 }}>
          {t("就绪 · 夹具列表", "ready · fixture list")}
        </div>
        <div className="oa-m-meta">
          {t(
            "字段=channel, spend, gmv, roas, status · 实时拉取 not_connected",
            "fields=channel, spend, gmv, roas, status · live fetch not_connected",
          )}
        </div>
      </article>

      <p className="oa-m-section-title">{t("渠道卡片", "Channel cards")}</p>
      {f.channels.map((c) => (
        <div className="oa-m-row" key={c.channel}>
          <div className="oa-m-row-top">
            <strong>{c.channel}</strong>
            <span className="oa-m-chip">{c.status}</span>
          </div>
          <div className="oa-m-meta">
            {t(
              `花费 ${c.spend} · GMV ${c.gmv} · ROAS ${c.roas}`,
              `spend ${c.spend} · gmv ${c.gmv} · roas ${c.roas}`,
            )}
          </div>
        </div>
      ))}

      <article className="oa-m-card">
        <h3>{t("自然流量快照", "Organic snapshot")}</h3>
        <div className="oa-m-meta">
          {t(
            `会话 ${f.organic.sessions} · 订单 ${f.organic.orders} · 转化 ${f.organic.conversion_rate}`,
            `sessions ${f.organic.sessions} · orders ${f.organic.orders} · CVR ${f.organic.conversion_rate}`,
          )}
        </div>
      </article>

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/overview">
          {t("返回总览", "Back Overview")}
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled>
          {t("同步渠道 · 已阻断", "Sync Channel · Blocked")}
        </button>
      </div>

      <div className="oa-m-note">
        {t(
          "无实时渠道 Provider。空态/错误态保留至 Provider 接线获准。",
          "No live channel provider. Empty/error live states reserved until Provider wiring is authorized.",
        )}
      </div>
    </MobileFrame>
  );
}
