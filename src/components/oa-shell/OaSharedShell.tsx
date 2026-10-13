"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NAV_KEY_TO_PRIMARY_PATH } from "@/components/oa-skeleton/primaryEntries";
import { CO_SECONDARY_SUBMENU, NAV_ITEMS, type OaSubmenuItem } from "./oaNavCanonical";

const SUBMENUS: Record<string, { title: string; items: OaSubmenuItem[] }> = {
  co: { title: "CO · Products & Orders · 商品与订单", items: CO_SECONDARY_SUBMENU },
};

type Props = {
  activeKey?: string;
  children: ReactNode;
};

export function OaSharedShell({ activeKey = "overview", children }: Props) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [panelTop, setPanelTop] = useState(64);
  const [status, setStatus] = useState("wave0 structure gate · declared nav navigable");
  const [active, setActive] = useState(activeKey);

  const declaredRoutes = useMemo(() => {
    const routes = new Set<string>(Object.values(NAV_KEY_TO_PRIMARY_PATH));
    for (const item of CO_SECONDARY_SUBMENU) routes.add(item.route);
    return routes;
  }, []);

  useEffect(() => {
    setActive(activeKey);
  }, [activeKey]);

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

  function goPrimary(key: string) {
    const href = NAV_KEY_TO_PRIMARY_PATH[key];
    if (!href) {
      setStatus(`primary ${key} · no mapped path`);
      return;
    }
    closePanel();
    setActive(key);
    setStatus(`navigate ${href}`);
    router.push(href);
  }

  function goRoute(route: string) {
    closePanel();
    if (!declaredRoutes.has(route)) {
      setStatus(`undeclared route blocked · ${route}`);
      return;
    }
    setStatus(`navigate ${route}`);
    router.push(route);
  }

  const openConf = openKey ? SUBMENUS[openKey] : null;
  const openPrimaryHref = openKey ? NAV_KEY_TO_PRIMARY_PATH[openKey] : null;

  return (
    <div className="oa-root" ref={rootRef}>
      <div className={`oa-backdrop${openKey ? " is-open" : ""}`} onClick={closePanel} aria-hidden={!openKey} />
      <div className="oa-shell">
        <header className="oa-topbar">
          <div className="oa-brand">DOHARA OA · Wave 0 Structure Gate</div>
          <div className="oa-top-meta">
            CANDIDATE_ONLY · ADDITIVE_ONLY · 14 MODULES · CO×6 · NO_15TH_DOMAIN · NOT_FORMAL_PROVIDER
          </div>
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
                  goPrimary(item.key);
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
              {openPrimaryHref ? (
                <button className="oa-floating-row" type="button" onClick={() => goRoute(openPrimaryHref)}>
                  CO hub · 商品与订单门户
                </button>
              ) : null}
              {openConf.items.map((item) => (
                <button
                  key={item.route + item.label}
                  className="oa-floating-row"
                  type="button"
                  onClick={() => goRoute(item.route)}
                >
                  {item.label}
                </button>
              ))}
            </>
          ) : null}
        </div>
        <main className="oa-main">{children}</main>
      </div>
      <div className="oa-status" aria-live="polite">
        {status}
      </div>
    </div>
  );
}
