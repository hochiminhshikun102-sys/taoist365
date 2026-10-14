"use client";

import Link from "next/link";
import { useOaDesktopLocale } from "./useOaDesktopLocale";

export type OaDesktopModuleKey =
  | "overview"
  | "co"
  | "operations"
  | "ai_ops"
  | "site"
  | "geo"
  | "cs_center"
  | "finance"
  | "logistics"
  | "supply_chain"
  | "wk"
  | "gs"
  | "compliance"
  | "settings";

type OaDesktopStatus = "read_only" | "not_connected";
type OaDesktopNextKey = "overview" | "orders" | "payments" | "shipping";

type Props = {
  moduleKey: OaDesktopModuleKey;
  status: OaDesktopStatus;
  nextHref?: string;
  nextKey?: OaDesktopNextKey;
};

const MODULE_COPY: Record<OaDesktopModuleKey, { zh: string; en: string }> = {
  overview: { zh: "全局看板", en: "Overview" },
  co: { zh: "商品与订单", en: "CO" },
  operations: { zh: "运营营销", en: "Operations" },
  ai_ops: { zh: "AI 推广中心", en: "AI Ops" },
  site: { zh: "站点前台", en: "Site" },
  geo: { zh: "区域全局配置", en: "GEO" },
  cs_center: { zh: "客户满意中心", en: "CS Center" },
  finance: { zh: "财务中心", en: "Finance" },
  logistics: { zh: "物流管理", en: "Logistics" },
  supply_chain: { zh: "供应链管理", en: "Supply Chain" },
  wk: { zh: "WindKeep", en: "WK" },
  gs: { zh: "全球买手", en: "GS" },
  compliance: { zh: "合规法务", en: "Compliance" },
  settings: { zh: "系统底座", en: "Settings" },
};

const NEXT_COPY: Record<OaDesktopNextKey, { zh: string; en: string }> = {
  overview: { zh: "下一步：返回总览", en: "Next: Overview" },
  orders: { zh: "下一步：订单系统", en: "Next: Orders" },
  payments: { zh: "下一步：支付管理", en: "Next: Payments" },
  shipping: { zh: "下一步：发货管理", en: "Next: Shipping" },
};

/** Shared desktop status chrome. Fixture UI only — not a Provider. */
export function OaDesktopStatusStrip({ moduleKey, status, nextHref, nextKey }: Props) {
  const { locale, setLocale, t } = useOaDesktopLocale();
  const moduleName = t(MODULE_COPY[moduleKey].zh, MODULE_COPY[moduleKey].en);

  return (
    <div className="oa-desktop-status" data-oa-desktop-status={status} lang={locale}>
      <div className="oa-desktop-status-lang" role="group" aria-label={t("界面语言", "UI language")}>
        <button
          className="oa-btn secondary"
          type="button"
          aria-pressed={locale === "zh-CN"}
          onClick={() => setLocale("zh-CN")}
        >
          中文
        </button>
        <button
          className="oa-btn secondary"
          type="button"
          aria-pressed={locale === "en"}
          onClick={() => setLocale("en")}
        >
          EN
        </button>
      </div>
      <div className="oa-capability-row oa-desktop-status-row">
        <span className={`oa-capability-pill is-${status}`}>{status}</span>
        <span className="oa-capability-pill is-not_connected">not_connected</span>
        <span className="oa-capability-pill is-not_connected">deploy_disabled</span>
        <span className="oa-capability-pill is-not_connected">real_write_false</span>
        <span className="oa-capability-owner">
          {moduleName}
          {t(" · 桌面只读 · 业务服务未接通", " · Desktop readonly · live service not connected")}
        </span>
      </div>
      {nextHref && nextKey ? (
        <div className="oa-desktop-status-next">
          <Link className="oa-btn secondary" href={nextHref}>
            {t(NEXT_COPY[nextKey].zh, NEXT_COPY[nextKey].en)}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
