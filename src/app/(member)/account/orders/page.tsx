/**
 * My Orders L1 — FORMAL /account/orders
 * INPUT: V1.3.1 COVERAGE_FIX SHA fefa64626a1155d1d8cb00b763bdd064b4aa63e751d8e4d7b26be3671a0f082b
 */
import type { Metadata } from "next";
import "./fonts.css";
import "./mo.css";
import copy from "./copy_lock.locked.json";
import links from "./link_intent.locked.json";

export const metadata: Metadata = {
  title: "My Orders · Page Input V1.3 Visual Trial",
  robots: { index: false, follow: false },
};

const A = "/dh/account/orders/assets";
const H = `${A}/header`;
const I = `${A}/icons`;
const S = `${A}/scenes`;
const CHEV = `${I}/common/chevron_right.png`;

const STATUS_ICON: Record<string, string> = {
  to_pay: "status/01_to_pay.png",
  on_the_way: "status/02_on_the_way.png",
  after_sales: "status/03_after_sales.png",
  completed: "status/04_completed.png",
};
const START_ICON: Record<string, string> = {
  order_list: "start_here/01_order_list.png",
  payment: "start_here/02_payment.png",
  shipment: "start_here/03_shipment.png",
  order_details: "start_here/04_order_details.png",
  after_sales: "start_here/05_after_sales.png",
  after_sales_records: "start_here/06_after_sales_records.png",
};
const RECENT_ICON = [
  "recent_records/01_order.png",
  "recent_records/02_payment.png",
  "recent_records/03_return.png",
  "recent_records/04_invoice.png",
];
const HELP_ICON: Record<string, string> = {
  faq: "need_help/01_faq.png",
  shipping_delivery: "need_help/02_shipping_delivery.png",
  returns_after_sales: "need_help/03_returns_after_sales.png",
  support_center: "need_help/04_support_center.png",
};
/** Shared End — package semantic paths only (not start_here / order_policies substitutes). */
const END_ICON: Record<string, string> = {
  help_support: "end/01_help_support.png",
  shipping_returns: "end/02_shipping_returns.png",
  privacy_security: "end/03_privacy_security.png",
  policies_guidelines: "end/04_policies_guidelines.png",
};
const PILL: Record<string, string> = {
  Delivered: "blue",
  Paid: "green",
  "In Progress": "orange",
  Issued: "blue",
};

export default function AccountOrdersPage() {
  const statusHref = links.status_cards as Record<string, string>;
  const startHref = links.start_here as Record<string, string>;
  const helpHref = links.need_help as Record<string, string>;
  const endHref = links.shared_end as Record<string, string>;
  const recentHref = [
    links.recent_records.order,
    links.recent_records.payment,
    links.recent_records.return,
    links.recent_records.invoice,
  ];

  return (
    <div
      className="mo"
      id="top"
      data-page="my-orders-page-input-v1-3"
      data-package-sha="fefa64626a1155d1d8cb00b763bdd064b4aa63e751d8e4d7b26be3671a0f082b"
      data-auth="WORK_FACAI_VISUAL_TRANSLATION_R1_1"
      data-work-revision="MY_ORDERS_VISUAL_TRANSLATION_R1_1"
      data-chevron-standard="ARROW_PLUS_LEAF"
      data-gate="A"
      data-repair="full_page_visual_translation_pc_mobile"
    >
      <header className="mo-header" data-layer="header">
        <button className="mo-menu mobile-only" type="button" aria-label="Menu">
          <img src={`${H}/menu.png`} alt="" data-asset="header/menu.png" />
        </button>
        <img
          className="mo-logo"
          src={`${H}/dohara_logo.png`}
          alt="Dohara"
          data-asset="header/dohara_logo.png"
        />
        <a href={links.header.notification} data-control-id="header_notification" aria-label="Notifications">
          <img src={`${H}/notification.png`} alt="" data-asset="header/notification.png" />
        </a>
        <a href={links.header.support} data-control-id="header_support" aria-label="Support">
          <img src={`${H}/support.png`} alt="" data-asset="header/support.png" />
        </a>
        <a className="mo-profile" href={links.header.avatar} aria-label="Account menu">
          <img className="avatar" src={`${H}/avatar_lena.png`} alt="" data-asset="header/avatar_lena.png" />
          <span className="uname pc-only">Lena</span>
          <img className="chev pc-only" src={CHEV} alt="" data-asset="icons/common/chevron_right.png" />
        </a>
      </header>

      <section className="mo-hero" data-layer="hero" aria-label="My Orders hero">
        <picture>
          <source media="(max-width:600px)" srcSet={`${S}/mobile/my_orders_hero_mobile_390x280.png`} />
          <img
            className="mo-hero-scene"
            src={`${S}/pc/my_orders_hero_pc_1440x420.png`}
            alt=""
            data-asset="scenes/pc|mobile/my_orders_hero_*"
          />
        </picture>
        <div className="mo-hero-copy">
          <h1>{copy.hero.title}</h1>
          <span className="mo-gold" />
          <p>{copy.hero.description}</p>
        </div>
      </section>

      <main className="mo-content" data-layer="content">
        <section className="mo-status" data-layer="status" aria-label="Order status summary">
          {copy.status_cards.map((card) => (
            <a key={card.key} className="mo-sum mo-card" href={statusHref[card.key]}>
              <img
                className="mo-sum-icon"
                src={`${I}/${STATUS_ICON[card.key]}`}
                alt=""
                data-asset={`icons/${STATUS_ICON[card.key]}`}
              />
              <strong className="mo-sum-title">{card.title}</strong>
              <div className="mo-sum-count">
                <em>{card.count}</em>
                <span className="mo-sum-unit">{card.unit}</span>
              </div>
              <p className="mo-sum-scope">{card.scope}</p>
              <hr />
              <p className="mo-sum-foot">{card.footer}</p>
            </a>
          ))}
        </section>

        <section className="mo-search-row mobile-only" data-layer="search" aria-label="Search orders">
          <div className="mo-search mo-search-mobile" role="search">
            <span>{copy.search.placeholder}</span>
            <img src={`${I}/common/search.png`} alt="" data-asset="icons/common/search.png" />
          </div>
        </section>

        <section className="mo-start" data-layer="start-here">
          <h2>{copy.section_titles.start_here}</h2>
          <div className="mo-start-grid">
            {copy.start_here.map((item) => (
              <a key={item.key} className="mo-start-card mo-card" href={startHref[item.key]}>
                <img
                  src={`${I}/${START_ICON[item.key]}`}
                  alt=""
                  data-asset={`icons/${START_ICON[item.key]}`}
                />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
                <img className="chev" src={CHEV} alt="" data-asset="icons/common/chevron_right.png" />
              </a>
            ))}
          </div>
        </section>

        <section className="mo-recent" data-layer="recent-records">
          <div className="mo-recent-head">
            <h2>{copy.section_titles.recent_records}</h2>
            <div className="mo-recent-tools">
              <div className="mo-search mo-search-pc pc-only" role="search">
                <img src={`${I}/common/search.png`} alt="" data-asset="icons/common/search.png" />
                <span>{copy.search.placeholder}</span>
              </div>
              <a className="mo-view-all" href={links.recent_records.view_all}>
                {copy.recent_records.view_all}
                <img src={CHEV} alt="" data-asset="icons/common/chevron_right.png" />
              </a>
            </div>
          </div>
          <div className="mo-records mo-card">
            {copy.recent_records.rows.map((row, idx) => (
              <article className="mo-record" key={row.id}>
                <img
                  className="mo-record-icon"
                  src={`${I}/${RECENT_ICON[idx]}`}
                  alt=""
                  data-asset={`icons/${RECENT_ICON[idx]}`}
                />
                <div className="mo-record-body">
                  <div className="mo-record-main">
                    <b className="mo-record-type">{row.type}</b>
                    <strong className="mo-record-title">{row.title}</strong>
                    <small className="mo-record-id">{row.id}</small>
                  </div>
                  <div className="mo-record-meta">
                    <span className={`mo-pill ${PILL[row.status] || "blue"}`}>{row.status}</span>
                    <span className="mo-meta-text">
                      <span className="mo-meta-primary">{row.meta_primary}</span>
                      <span className="mo-meta-sep" aria-hidden="true">
                        ·
                      </span>
                      <span className="mo-meta-secondary">{row.meta_secondary}</span>
                    </span>
                  </div>
                </div>
                <a className="mo-btn" href={recentHref[idx]}>
                  {row.action}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mo-help" data-layer="need-help">
          <h2>{copy.section_titles.need_help}</h2>
          <div className="mo-help-grid">
            {copy.need_help.map((item) => (
              <a key={item.key} className="mo-help-card mo-card" href={helpHref[item.key]}>
                <img
                  src={`${I}/${HELP_ICON[item.key]}`}
                  alt=""
                  data-asset={`icons/${HELP_ICON[item.key]}`}
                />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
                <img className="chev" src={CHEV} alt="" data-asset="icons/common/chevron_right.png" />
              </a>
            ))}
          </div>
        </section>

        <a
          className="mo-policy mo-card"
          data-layer="order-policies"
          href={links.order_policies}
        >
          <picture>
            <source
              media="(max-width:600px)"
              srcSet={`${I}/order_policies/mobile_order_policies_exact_final_80x80.png`}
            />
            <img
              className="mo-policy-icon"
              src={`${I}/order_policies/pc_order_policies_exact_final_96x96.png`}
              alt=""
              data-asset="icons/order_policies/pc|mobile_order_policies_exact_final_*"
            />
          </picture>
          <span className="mo-policy-copy">
            <strong>{copy.order_policies.title}</strong>
            <small>{copy.order_policies.description}</small>
          </span>
          <img
            className="chev"
            src={CHEV}
            alt=""
            data-asset="icons/common/chevron_right.png"
            data-chevron-standard="ARROW_PLUS_LEAF"
          />
        </a>

        <section className="mo-coverage" data-layer="coverage" aria-label="Coverage">
          {/* V1.3.1: mobile scene = coverage_mobile_354x210 only. No End substitute. No cover-stretch. */}
          <picture>
            <source media="(max-width:600px)" srcSet={`${S}/mobile/coverage_mobile_354x210.png`} />
            <img
              className="mo-cover-scene"
              src={`${S}/pc/coverage_pc_1255x192.png`}
              alt=""
              data-asset="scenes/pc|mobile/coverage_*"
            />
          </picture>
          <div className="mo-cover-card">
            <img
              className="mo-cover-icon"
              src={`${I}/common/coverage_information.png`}
              alt=""
              data-asset="icons/common/coverage_information.png"
            />
            <div>
              <strong>{copy.coverage.title}</strong>
              <p>{copy.coverage.body}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mo-end" data-layer="end">
        <div className="mo-end-grid">
          {copy.shared_end.cards.map((card) => (
            <a key={card.key} className="mo-end-card" href={endHref[card.key]}>
              <span className="mo-end-glyph" aria-hidden="true">
                <img
                  src={`${I}/${END_ICON[card.key]}`}
                  alt=""
                  data-asset={`icons/${END_ICON[card.key]}`}
                />
              </span>
              <div>
                <strong>{card.title}</strong>
                <p>{card.description}</p>
              </div>
              <img
                className="chev"
                src={CHEV}
                alt=""
                data-asset="icons/common/chevron_right.png"
                data-chevron-standard="ARROW_PLUS_LEAF"
              />
            </a>
          ))}
        </div>
        <div className="mo-foot">
          <nav>
            <a href={endHref.terms}>{copy.shared_end.footer_links[0]}</a>
            <span>|</span>
            <a href={endHref.privacy}>{copy.shared_end.footer_links[1]}</a>
            <span>|</span>
            <a href={endHref.accessibility}>{copy.shared_end.footer_links[2]}</a>
            <span>|</span>
            <a href={endHref.sitemap}>{copy.shared_end.footer_links[3]}</a>
          </nav>
          <span className="copy">{copy.shared_end.copyright}</span>
          <a className="top" href={endHref.back_to_top}>
            {copy.shared_end.back_to_top}
            <img src={CHEV} alt="" data-asset="icons/common/chevron_right.png" />
          </a>
        </div>
      </footer>
    </div>
  );
}
