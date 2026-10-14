"use client";

import Link from "next/link";
import { overviewFixture } from "../overviewFixture";
import { OaMobileLocaleProvider, useOaMobileLocale } from "@/components/oa-mobile/useOaMobileLocale";
import { MobileFrame } from "./MobileFrame";

const KPI_LABELS = [
  { zh: "成交额", en: "GMV" },
  { zh: "订单数", en: "Orders" },
  { zh: "客单价", en: "AOV" },
  { zh: "退款率", en: "Refund Rate" },
] as const;

export function MobileOverview() {
  return (
    <OaMobileLocaleProvider>
      <MobileOverviewView />
    </OaMobileLocaleProvider>
  );
}

function MobileOverviewView() {
  const { t } = useOaMobileLocale();
  const f = overviewFixture;

  return (
    <MobileFrame title={t("经营总览", "Operations Overview")} bottomCurrent="overview">
      <p className="oa-m-section-title">{t("核心指标", "Core KPIs")}</p>
      <div className="oa-m-kpi-grid">
        {f.kpis.map((k, i) => (
          <article className="oa-m-card" key={KPI_LABELS[i]?.en ?? k.label}>
            <h3>{t(KPI_LABELS[i]?.zh ?? k.label, KPI_LABELS[i]?.en ?? k.label)}</h3>
            <div className="oa-m-value">{k.value}</div>
            <div className="oa-m-meta">
              {k.delta} · {k.source}
            </div>
          </article>
        ))}
      </div>

      <article className="oa-m-card">
        <h3>{t("7日 GMV 趋势", "7-Day GMV Trend")}</h3>
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

      <p className="oa-m-section-title">{t("移动工作区", "Mobile workspaces")}</p>
      <div className="oa-m-entries">
        <Link className="oa-m-entry" href="/admin/oa/m/channel">
          <strong>{t("渠道", "Channel")}</strong>
          <span>{t("渠道投放明细", "Channel spend detail")}</span>
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/product-ranking">
          <strong>{t("排行", "Ranking")}</strong>
          <span>{t("商品销量排行", "Product sales ranking")}</span>
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/regional">
          <strong>{t("区域", "Regional")}</strong>
          <span>{t("区域销售分析", "Regional sales analysis")}</span>
        </Link>
        <Link className="oa-m-entry" href="/admin/oa/m/risk-todo">
          <strong>{t("风控待办", "Risk / Todo")}</strong>
          <span>{t("风险待办清单", "Risk and todo list")}</span>
        </Link>
      </div>

      <article className="oa-m-card">
        <h3>{t("风险待办摘要", "Risk / Todo summary")}</h3>
        <div className="oa-m-value" style={{ fontSize: 16 }}>
          {t(`风险 ${f.risks.length} · 任务 ${f.tasks.length}`, `risks ${f.risks.length} · tasks ${f.tasks.length}`)}
        </div>
        <div className="oa-m-meta">{t("仅夹具摘要 · 实时队列 not_connected", "Fixture summary only · live queue not_connected")}</div>
      </article>

      <div className="oa-m-actions">
        <Link className="oa-m-btn is-primary" href="/admin/oa/m/risk-todo">
          {t("打开风控", "Open Risk")}
        </Link>
        <button className="oa-m-btn is-disabled" type="button" disabled title={t("Provider 写入已阻断", "Provider write blocked")}>
          {t("连接 Provider · 已阻断", "Connect Provider · Blocked")}
        </button>
      </div>

      <div className="oa-m-note">
        {t(
          "移动端 OA 基础页 · 仅 DEMO/TEST_ONLY。Provider 未连接。Deploy 已禁用。真实业务写入已禁用。",
          "Mobile OA foundation · DEMO/TEST_ONLY only. Provider not connected. Deploy disabled. Real business write disabled.",
        )}
      </div>
    </MobileFrame>
  );
}
