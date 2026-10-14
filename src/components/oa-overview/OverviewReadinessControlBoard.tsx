import Link from "next/link";
import {
  OA_R67_GLOBAL_FLAGS,
  OA_R67_READINESS_ROWS,
  OA_R67_RISKS,
} from "./readinessBoard";

/** Master has no stable OA locale hook. Keep existing bilingual copy in-page; no second language provider. */
export function OverviewReadinessControlBoard() {
  return (
    <section className="oa-page oa-r67-readiness" data-oa-r67-readiness="true">
      <header className="oa-r67-head">
        <h1 className="oa-page-title">Readiness Control Board / 全局就绪看板</h1>
        <p className="oa-r67-lead">
          Readonly status, owner boundary, Provider / deploy / write posture for the 14 OA primary
          modules. 14 个 OA 一级模块的只读状态、Owner 边界、Provider / 部署 / 写入口径. Not a second
          nav. Does not enter product-publish content.
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
        <h2>Risk boundary / 风险边界</h2>
        <ul>
          {OA_R67_RISKS.map((risk) => (
            <li key={risk.en}>
              {risk.en} / {risk.zh}
            </li>
          ))}
        </ul>
      </article>

      <div className="oa-r67-table-wrap">
        <table className="oa-table oa-r67-table">
          <thead>
            <tr>
              <th>Module / 模块</th>
              <th>Status / 状态</th>
              <th>Owner</th>
              <th>Real write / 真实写入</th>
              <th>Provider</th>
              <th>Deploy / 部署</th>
              <th>Next / 下一步</th>
            </tr>
          </thead>
          <tbody>
            {OA_R67_READINESS_ROWS.map((row) => (
              <tr key={row.key} data-oa-r67-module={row.key}>
                <td>
                  <Link href={row.route} className="oa-r67-module-link">
                    {row.labelEn}
                  </Link>
                  <div className="oa-r67-meta">
                    {row.id} · {row.labelZh}
                  </div>
                </td>
                <td>
                  <span className={`oa-capability-pill is-${row.status}`}>{row.status}</span>
                </td>
                <td>
                  {row.ownerEn}
                  <div className="oa-r67-meta">{row.ownerZh}</div>
                </td>
                <td>
                  <span className="oa-capability-pill is-not_connected">FALSE</span>
                </td>
                <td>
                  <span className="oa-capability-pill is-not_connected">not_connected</span>
                </td>
                <td>
                  <span className="oa-capability-pill is-not_connected">disabled</span>
                </td>
                <td>
                  {row.nextEn}
                  <div className="oa-r67-meta">{row.nextZh}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
