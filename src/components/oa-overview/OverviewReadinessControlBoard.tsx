"use client";

import Link from "next/link";
import { oaPick, useOaUiLocale } from "@/components/oa-shell/useOaUiLocale";
import {
  OA_R67_GLOBAL_FLAGS,
  OA_R67_READINESS_ROWS,
  OA_R67_RISKS,
  type OaReadinessStatus,
} from "./readinessBoard";

const STATUS_COPY: Record<OaReadinessStatus, { en: string; zh: string }> = {
  read_only: { en: "read_only", zh: "read_only" },
  not_connected: { en: "not_connected", zh: "not_connected" },
  provider_pending: { en: "provider_pending", zh: "provider_pending" },
  blocked: { en: "blocked", zh: "blocked" },
  ready_for_review: { en: "ready_for_review", zh: "ready_for_review" },
};

export function OverviewReadinessControlBoard() {
  const { locale } = useOaUiLocale();
  const t = (zh: string, en: string) => oaPick(locale, zh, en);

  return (
    <section className="oa-page oa-r67-readiness" data-oa-r67-readiness="true">
      <header className="oa-r67-head">
        <h1 className="oa-page-title">{t("全局就绪看板", "Readiness Control Board")}</h1>
        <p className="oa-r67-lead">
          {t(
            "14 个 OA 一级模块的只读状态、Owner 边界、Provider / 部署 / 写入口径。不是第二套导航，也不进入商品发布内容。",
            "Readonly status, owner boundary, Provider / deploy / write posture for the 14 OA primary modules. Not a second nav. Does not enter product-publish content.",
          )}
        </p>
      </header>

      <div className="oa-r67-global" data-oa-r67-global="true">
        {OA_R67_GLOBAL_FLAGS.map((flag) => (
          <span key={flag} className="oa-capability-pill is-read_only" data-oa-r67-flag={flag}>
            {flag}
          </span>
        ))}
      </div>

      <article className="oa-card oa-r67-risks">
        <h2>{t("风险边界", "Risk boundary")}</h2>
        <ul>
          {OA_R67_RISKS.map((risk) => (
            <li key={risk.en}>{t(risk.zh, risk.en)}</li>
          ))}
        </ul>
      </article>

      <div className="oa-r67-table-wrap">
        <table className="oa-table oa-r67-table">
          <thead>
            <tr>
              <th>{t("模块", "Module")}</th>
              <th>{t("状态", "Status")}</th>
              <th>{t("Owner", "Owner")}</th>
              <th>{t("真实写入", "Real write")}</th>
              <th>{t("Provider", "Provider")}</th>
              <th>{t("部署", "Deploy")}</th>
              <th>{t("下一步", "Next")}</th>
            </tr>
          </thead>
          <tbody>
            {OA_R67_READINESS_ROWS.map((row) => (
              <tr key={row.key} data-oa-r67-module={row.key}>
                <td>
                  <Link href={row.route} className="oa-r67-module-link">
                    {t(row.labelZh, row.labelEn)}
                  </Link>
                  <div className="oa-r67-meta">{row.id}</div>
                </td>
                <td>
                  <span className={`oa-capability-pill is-${row.status}`}>{STATUS_COPY[row.status].en}</span>
                </td>
                <td>{t(row.ownerZh, row.ownerEn)}</td>
                <td>
                  <span className="oa-capability-pill is-not_connected">FALSE</span>
                </td>
                <td>
                  <span className="oa-capability-pill is-not_connected">not_connected</span>
                </td>
                <td>
                  <span className="oa-capability-pill is-not_connected">disabled</span>
                </td>
                <td>{t(row.nextZh, row.nextEn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
