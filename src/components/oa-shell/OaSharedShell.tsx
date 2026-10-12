"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AFTER_SALES_SUBMENU,
  CONTENT_ASSETS_SUBMENU,
  LOGISTICS_SUBMENU,
  NAV_ITEMS,
  PRODUCTS_ORDERS_SUBMENU,
  SEO_GEO_SUBMENU,
  USERS_MEMBERS_SUBMENU,
  type OaSubmenuItem,
} from "./oaNavCanonical";

const SUBMENUS: Record<string, { title: string; items: OaSubmenuItem[] }> = {
  products_orders: { title: "Products & Orders · 商品与订单", items: PRODUCTS_ORDERS_SUBMENU },
  content_assets: { title: "Content & Assets · 内容与素材", items: CONTENT_ASSETS_SUBMENU },
  users_members: { title: "Users & Members · 用户与会员", items: USERS_MEMBERS_SUBMENU },
  seo_geo: { title: "SEO / GEO · SEO / GEO", items: SEO_GEO_SUBMENU },
  logistics: { title: "Logistics · 物流与仓配", items: LOGISTICS_SUBMENU },
  after_sales: { title: "After-sales · 售后与退款", items: AFTER_SALES_SUBMENU },
};

type Props = {
  activeKey?: string;
  children: ReactNode;
};

export function OaSharedShell({ activeKey = "overview", children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [panelTop, setPanelTop] = useState(64);
  const [status, setStatus] = useState("pc shell + overview candidate");
  const [active, setActive] = useState(activeKey);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenKey(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function closePanel() {
    setOpenKey(null);
  }

  function openPanel(key: string, anchor: HTMLButtonElement) {
    if (!SUBMENUS[key] || !rootRef.current) return;
    const top = Math.max(64, anchor.getBoundingClientRect().top - rootRef.current.getBoundingClientRect().top);
    setPanelTop(top);
    setOpenKey(key);
  }

  const openConf = openKey ? SUBMENUS[openKey] : null;

  return (
    <div className="oa-root" ref={rootRef}>
      <div className={`oa-backdrop${openKey ? " is-open" : ""}`} onClick={closePanel} aria-hidden={!openKey} />
      <div className="oa-shell">
        <header className="oa-topbar">
          <div className="oa-brand">DOHARA OA · Shared Shell R3 Candidate</div>
          <div className="oa-top-meta">CANDIDATE_ONLY · DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER · NO_15TH_DOMAIN</div>
        </header>
        <aside className="oa-rail" aria-label="OA primary navigation">
          {NAV_ITEMS.map((item) => {
            const hasSub = Boolean(SUBMENUS[item.key]);
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                className={`oa-rail-item${isActive ? " is-active" : ""}`}
                type="button"
                data-key={item.key}
                aria-current={isActive ? "page" : undefined}
                aria-expanded={hasSub ? openKey === item.key : false}
                aria-haspopup={hasSub ? "dialog" : undefined}
                onClick={(event) => {
                  if (hasSub) {
                    if (openKey === item.key) closePanel();
                    else openPanel(item.key, event.currentTarget);
                    return;
                  }
                  closePanel();
                  setActive(item.key);
                  if (item.key === "overview") {
                    setStatus("pc overview · 1440 candidate");
                  } else {
                    setStatus(`primary ${item.key} scaffold · DISABLED_UNTIL_READY`);
                  }
                }}
              >
                <span className="oa-rail-label">
                  {item.en} · {item.zh}
                  <span className="oa-rail-canonical">canonical {item.canonical}</span>
                </span>
              </button>
            );
          })}
        </aside>
        <div
          className={`oa-floating-panel${openKey ? " is-open" : ""}`}
          role="dialog"
          aria-modal="false"
          aria-hidden={!openKey}
          hidden={!openKey}
          style={{ top: panelTop }}
        >
          {openConf ? (
            <>
              <div className="oa-floating-title">{openConf.title}</div>
              {openConf.items.map((item) => (
                <button
                  key={item.route + item.label}
                  className="oa-floating-row"
                  type="button"
                  onClick={() => {
                    closePanel();
                    setStatus(`submenu candidate route ${item.route} · DISABLED_UNTIL_READY`);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </>
          ) : null}
        </div>
        <main className="oa-main">
          {active === "overview" ? (
            children
          ) : (
            <section className="oa-page">
              <div className="oa-fixture-banner">
                Primary nav &quot;{active}&quot; scaffold · DISABLED_UNTIL_READY · canonical owner mapping only
              </div>
              <h1 className="oa-page-title">Module scaffold · 模块骨架</h1>
              <p>No Provider / Runtime wiring in this candidate.</p>
            </section>
          )}
        </main>
      </div>
      <div className="oa-status" aria-live="polite">
        {status}
      </div>
    </div>
  );
}
