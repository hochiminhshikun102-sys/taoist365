"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useOaMobileLocale } from "@/components/oa-mobile/useOaMobileLocale";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backHref?: string;
  bottomCurrent?: "overview" | "channel" | "ranking" | "risk";
};

/** Technical status chips — English tokens by design. */
const STATUS_PILLS = ["read_only", "not_connected", "deploy_disabled", "real_write_false"] as const;

export function MobileFrame({
  title,
  subtitle,
  children,
  backHref,
  bottomCurrent = "overview",
}: Props) {
  const { lang, t, toggleLanguage } = useOaMobileLocale();
  const resolvedSubtitle =
    subtitle ??
    t("数据源=TEST_ONLY_UI_FIXTURE · 非正式 Provider", "DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER");

  return (
    <div className="oa-mobile-host" lang={lang}>
      <div className="oa-mobile-frame" data-artboard="390">
        <header className="oa-m-header">
          <div className="oa-m-header-top">
            {backHref ? (
              <Link className="oa-m-back" href={backHref}>
                {t("← 经营总览", "← Overview")}
              </Link>
            ) : (
              <span className="oa-m-back-spacer" />
            )}
            <button
              type="button"
              className="oa-m-lang"
              onClick={toggleLanguage}
              aria-label={t("切换语言", "Switch language")}
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
          </div>
          <h1>{title}</h1>
          <p className="oa-m-sub">{resolvedSubtitle}</p>
          <div className="oa-m-status-row" aria-label={t("OA 移动端状态", "OA mobile status")}>
            {STATUS_PILLS.map((pill) => (
              <span
                key={pill}
                className={
                  pill.includes("disabled") || pill === "not_connected" || pill === "real_write_false"
                    ? "oa-m-pill is-warn"
                    : "oa-m-pill"
                }
              >
                {pill}
              </span>
            ))}
          </div>
        </header>
        <div className="oa-m-body">{children}</div>
        <nav className="oa-m-bottom" aria-label={t("OA 移动导航", "OA mobile navigation")}>
          <Link href="/admin/oa/m/overview" aria-current={bottomCurrent === "overview" ? "page" : undefined}>
            {t("总览", "Overview")}
          </Link>
          <Link href="/admin/oa/m/channel" aria-current={bottomCurrent === "channel" ? "page" : undefined}>
            {t("渠道", "Channel")}
          </Link>
          <Link href="/admin/oa/m/product-ranking" aria-current={bottomCurrent === "ranking" ? "page" : undefined}>
            {t("排行", "Ranking")}
          </Link>
          <Link href="/admin/oa/m/risk-todo" aria-current={bottomCurrent === "risk" ? "page" : undefined}>
            {t("风控", "Risk")}
          </Link>
        </nav>
      </div>
    </div>
  );
}
