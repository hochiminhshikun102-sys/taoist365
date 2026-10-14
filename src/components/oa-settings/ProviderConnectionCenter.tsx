"use client";

import Link from "next/link";
import { useOaDesktopLocale } from "@/components/oa-overview/useOaDesktopLocale";
import {
  PROVIDER_CONNECTION_META,
  PROVIDER_CONNECTION_MODULES,
} from "./providerConnectionFixture";

/** Read-only Provider wiring status board. No live Provider calls. */
export function ProviderConnectionCenter() {
  const { locale, t } = useOaDesktopLocale();

  return (
    <section className="oa-page oa-settings-page" data-oa-settings="provider-connection" lang={locale}>
      <div className="oa-fixture-banner">
        DATA_SOURCE={PROVIDER_CONNECTION_META.data_source} · MODE=
        {PROVIDER_CONNECTION_META.mode} · provider_wiring=
        {PROVIDER_CONNECTION_META.provider_wiring} · real_business_write=
        {String(PROVIDER_CONNECTION_META.real_business_write)}
      </div>

      <h1 className="oa-page-title">{t("Provider 接线中心", "Provider Connection Center")}</h1>
      <p className="oa-settings-lead">
        {t(
          "只展示各模块接线状态。不连接真实 Provider，不执行真实业务写入。",
          "Status view only. No live Provider connection. No real business writes.",
        )}
      </p>

      <div className="oa-settings-summary">
        <article className="oa-card oa-settings-flag">
          <h3>{t("覆盖模块", "Modules covered")}</h3>
          <p className="oa-settings-value">{PROVIDER_CONNECTION_MODULES.length}</p>
          <p className="oa-settings-meta">{t("状态投影 · 只读", "Status projection · read only")}</p>
        </article>
        <article className="oa-card oa-settings-flag">
          <h3>{t("接线状态", "Wiring state")}</h3>
          <p className="oa-settings-value">
            <span className="oa-settings-chip is-warn">not_connected</span>
          </p>
          <p className="oa-settings-meta">{t("全模块统一口径", "Uniform across modules")}</p>
        </article>
        <article className="oa-card oa-settings-flag">
          <h3>{t("写入门禁", "Write gate")}</h3>
          <p className="oa-settings-value">
            <span className="oa-settings-chip is-warn">real_write_false</span>
          </p>
          <p className="oa-settings-meta">{t("操作按钮保持禁用", "Action buttons stay disabled")}</p>
        </article>
      </div>

      <article className="oa-card oa-settings-list-card">
        <div className="oa-settings-list-head">
          <h2>{t("模块接线清单", "Module connection list")}</h2>
          <div className="oa-settings-actions">
            <button className="oa-btn" type="button" disabled title={t("Provider 写入已阻断", "Provider write blocked")}>
              {t("接通 Provider · 已阻断", "Connect Provider · Blocked")}
            </button>
            <button className="oa-btn secondary" type="button" disabled>
              {t("刷新状态 · 已阻断", "Refresh status · Blocked")}
            </button>
          </div>
        </div>

        <div className="oa-settings-module-grid">
          {PROVIDER_CONNECTION_MODULES.map((mod) => (
            <article className="oa-settings-module" key={mod.id} data-provider-module={mod.id}>
              <div className="oa-settings-module-top">
                <div>
                  <h3>{t(mod.zh, mod.en)}</h3>
                  <p className="oa-settings-meta">
                    {t("只读状态投影", "Read-only status projection")}
                  </p>
                </div>
                <Link className="oa-settings-module-link" href={mod.href}>
                  {t("打开模块", "Open module")}
                </Link>
              </div>
              <div className="oa-settings-chip-row" aria-label={t("技术状态", "Technical status")}>
                {mod.chips.map((chip) => (
                  <span
                    key={chip}
                    className={
                      chip === "not_connected" ||
                      chip === "requires_authorization" ||
                      chip === "real_write_false"
                        ? "oa-settings-chip is-warn"
                        : "oa-settings-chip"
                    }
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>

      <div className="oa-settings-note">
        {t(
          "本页为 Settings 只读接线看板。未加载密钥，未调用 Cloudflare AI / Provider，未改 env / binding。",
          "Settings read-only connection board. No secrets loaded. No Cloudflare AI / Provider calls. No env / binding changes.",
        )}
      </div>
    </section>
  );
}
