import Link from "next/link";

/** R67 Overview Readiness Control Board — UI fixture only. Not a live Provider. */
type OaReadinessStatus =
  | "read_only"
  | "not_connected"
  | "provider_pending"
  | "blocked"
  | "ready_for_review";

type OaReadinessRow = {
  key: string;
  module: string;
  owner: string;
  status: OaReadinessStatus;
  provider: "not_connected";
  realWrite: false;
  nextAction: string;
  route: string;
};

const GLOBAL_FLAGS = [
  "OA readonly foundation",
  "Provider not connected",
  "Production deploy disabled",
  "Real business write disabled",
] as const;

const RISKS = [
  "Product Publish R3/R68 is owned by Digua04. This ticket does not participate. · 商品发布 R3/R68 由04负责，本单不参与",
  "Account Center is not in scope. · Account Center 不改",
  "Frontstage is not in scope. · Frontstage 不改",
  "Cloudflare / env / binding stays untouched. · Cloudflare/env/binding 不改",
  "Real business writes stay disabled. · 真实业务写入禁用",
] as const;

const ROWS: OaReadinessRow[] = [
  {
    key: "overview",
    module: "Overview · 全局看板",
    owner: "Dogdan · OA Overview (readonly)",
    status: "ready_for_review",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Controller review of R67 board. Keep exception projection readonly.",
    route: "/admin/oa/overview",
  },
  {
    key: "co",
    module: "CO · 商品与订单",
    owner: "OA CO hub: Dogdan. Product Publish R3 content: Digua04",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "04 continues intake content. Dogdan does not touch /admin/oa/co/intake.",
    route: "/admin/oa/commerce",
  },
  {
    key: "operations",
    module: "Operations · 运营营销",
    owner: "Dogdan · OA Operations (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep 03A–03G projection. No live campaign writes.",
    route: "/admin/oa/operations",
  },
  {
    key: "ai_ops",
    module: "AI Ops · AI 推广中心",
    owner: "Dogdan · OA AI Ops (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep A1–A8 readonly. Model provider stays not_connected.",
    route: "/admin/oa/ai-ops",
  },
  {
    key: "site",
    module: "Site · 站点前台",
    owner: "Dogdan · OA Site (readonly). Frontstage out of scope",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep S1–S7 registry. Do not edit Frontstage.",
    route: "/admin/oa/site",
  },
  {
    key: "geo",
    module: "GEO · 区域全局配置",
    owner: "Dogdan · OA GEO (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep G1–G7 projection. No market writes.",
    route: "/admin/oa/geo",
  },
  {
    key: "cs_center",
    module: "CS Center · 客户满意中心",
    owner: "Dogdan · OA CS Center (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep CS projection. No ticket mutations.",
    route: "/admin/oa/cs-center",
  },
  {
    key: "finance",
    module: "Finance · 财务中心",
    owner: "Dogdan · OA Finance (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep finance projection. No payment writes.",
    route: "/admin/oa/finance",
  },
  {
    key: "logistics",
    module: "Logistics · 物流管理",
    owner: "Dogdan · OA Logistics (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep logistics projection. No fulfillment writes.",
    route: "/admin/oa/logistics",
  },
  {
    key: "supply_chain",
    module: "Supply Chain · 供应链管理",
    owner: "Dogdan · OA Supply Chain (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep supply projection. No inventory writes.",
    route: "/admin/oa/supply-chain",
  },
  {
    key: "wk",
    module: "WK · WindKeep",
    owner: "Dogdan · OA WK entry only",
    status: "not_connected",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Stay not_connected. Do not fake a live WindKeep provider.",
    route: "/admin/oa/wk",
  },
  {
    key: "gs",
    module: "GS · 全球买手",
    owner: "Dogdan · OA GS entry only",
    status: "not_connected",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Stay not_connected. Review-required publish is out of this ticket.",
    route: "/admin/oa/gs",
  },
  {
    key: "compliance",
    module: "Compliance · 合规法务",
    owner: "Dogdan · OA Compliance (readonly)",
    status: "read_only",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Keep risk projection. No legal-record writes.",
    route: "/admin/oa/compliance",
  },
  {
    key: "settings",
    module: "Settings · 系统底座",
    owner: "Dogdan · OA Settings entry. Account Center out of scope",
    status: "not_connected",
    provider: "not_connected",
    realWrite: false,
    nextAction: "Stay not_connected. Do not edit Account Center or env/bindings.",
    route: "/admin/oa/settings",
  },
];

export function OverviewReadinessControlBoard() {
  return (
    <section className="oa-readiness-board" data-oa-readiness="true">
      <header className="oa-readiness-head">
        <h2 className="oa-readiness-title">Readiness Control Board · 全局就绪看板</h2>
        <p className="oa-readiness-lead">
          Readonly status, owner boundary, Provider / deploy / write posture for the 14 OA primary
          modules. · 14 个 OA 一级模块的只读状态、Owner 边界、Provider / 部署 / 写入口径. Not a second
          nav. Does not enter product-publish content.
        </p>
      </header>

      <div className="oa-readiness-global" data-oa-readiness-global="true">
        {GLOBAL_FLAGS.map((flag) => (
          <span key={flag} className="oa-capability-pill is-read_only" data-oa-readiness-flag={flag}>
            {flag}
          </span>
        ))}
      </div>

      <article className="oa-card oa-readiness-risks">
        <h3>Risk boundary · 风险边界</h3>
        <ul>
          {RISKS.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
      </article>

      <div className="oa-readiness-table-wrap">
        <table className="oa-table oa-readiness-table">
          <thead>
            <tr>
              <th>module</th>
              <th>owner</th>
              <th>status</th>
              <th>provider</th>
              <th>realWrite</th>
              <th>nextAction</th>
              <th>route</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} data-oa-readiness-module={row.key}>
                <td>{row.module}</td>
                <td>{row.owner}</td>
                <td>
                  <span className={`oa-capability-pill is-${row.status}`}>{row.status}</span>
                </td>
                <td>
                  <span className="oa-capability-pill is-not_connected">{row.provider}</span>
                </td>
                <td>
                  <span className="oa-capability-pill is-not_connected">FALSE</span>
                </td>
                <td>{row.nextAction}</td>
                <td>
                  <Link href={row.route} className="oa-readiness-route">
                    {row.route}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
