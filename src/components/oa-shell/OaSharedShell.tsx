"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NAV_KEY_TO_PRIMARY_PATH } from "@/components/oa-skeleton/primaryEntries";
import { useOaDesktopLocale } from "@/components/oa-overview/useOaDesktopLocale";
import { CO_SECONDARY_SUBMENU, NAV_ITEMS, type OaSubmenuItem } from "./oaNavCanonical";

const HOVER_MQ = "(hover: hover) and (pointer: fine) and (min-width: 901px)";
const CLOSE_MS = 180;

type Props = {
  activeKey?: string;
  children: ReactNode;
};

function desktopHoverNav() {
  return typeof window !== "undefined" && window.matchMedia(HOVER_MQ).matches;
}

export function OaSharedShell({ activeKey = "overview", children }: Props) {
  const router = useRouter();
  const { t } = useOaDesktopLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const stickyOpen = useRef(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
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
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompactNav(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenKey(null);
        setDrawerOpen(false);
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Element && target.closest(".oa-nav-chrome")) return;
      setOpenKey(null);
      if (!desktopHoverNav()) setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  function cancelClose() {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    if (!desktopHoverNav() || stickyOpen.current) return;
    closeTimer.current = window.setTimeout(() => {
      setOpenKey(null);
      closeTimer.current = null;
    }, CLOSE_MS);
  }

  function closePanel() {
    cancelClose();
    stickyOpen.current = false;
    setOpenKey(null);
  }

  function openPanel(key: string, anchor?: HTMLButtonElement | null, sticky = false) {
    if (key !== "co") return;
    cancelClose();
    stickyOpen.current = sticky;
    if (anchor && rootRef.current && desktopHoverNav()) {
      const top = Math.max(64, anchor.getBoundingClientRect().top - rootRef.current.getBoundingClientRect().top);
      setPanelTop(top);
    }
    setOpenKey(key);
  }

  function goPrimary(key: string) {
    const href = NAV_KEY_TO_PRIMARY_PATH[key];
    if (!href) {
      setStatus(`primary ${key} · no mapped path`);
      return;
    }
    closePanel();
    setDrawerOpen(false);
    setActive(key);
    setStatus(`navigate ${href}`);
    router.push(href);
  }

  function goRoute(route: string) {
    closePanel();
    setDrawerOpen(false);
    if (!declaredRoutes.has(route)) {
      setStatus(`undeclared route blocked · ${route}`);
      return;
    }
    setStatus(`navigate ${route}`);
    router.push(route);
  }

  function onPrimaryActivate(key: string, hasSub: boolean, anchor: HTMLButtonElement) {
    if (hasSub) {
      if (openKey === key && stickyOpen.current) closePanel();
      else openPanel(key, anchor, true);
      return;
    }
    goPrimary(key);
  }

  const coOpen = openKey === "co";
  const openPrimaryHref = NAV_KEY_TO_PRIMARY_PATH.co;

  function submenuLabel(item: OaSubmenuItem) {
    return t(item.zh, item.en);
  }

  const coRows = (
    <>
      {openPrimaryHref ? (
        <button className="oa-floating-row" type="button" onClick={() => goRoute(openPrimaryHref)}>
          {t("商品与订单门户", "CO hub")}
        </button>
      ) : null}
      {CO_SECONDARY_SUBMENU.map((item) => (
        <button key={item.route} className="oa-floating-row" type="button" onClick={() => goRoute(item.route)}>
          {submenuLabel(item)}
        </button>
      ))}
    </>
  );

  return (
    <div className="oa-root" ref={rootRef}>
      <div
        className={`oa-backdrop${drawerOpen && !desktopHoverNav() ? " is-open" : ""}`}
        onClick={() => {
          setDrawerOpen(false);
          closePanel();
        }}
        aria-hidden={!(drawerOpen && !desktopHoverNav())}
      />
      <div className="oa-shell">
        <header className="oa-topbar oa-nav-chrome">
          <button
            className="oa-nav-toggle"
            type="button"
            aria-expanded={drawerOpen}
            aria-controls="oa-primary-rail"
            onClick={() => setDrawerOpen((open) => !open)}
          >
            {t("菜单", "Menu")}
          </button>
          <div className="oa-brand">DOHARA OA · Wave 0 Structure Gate</div>
          <div className="oa-top-meta">
            CANDIDATE_ONLY · ADDITIVE_ONLY · 14 MODULES · CO×6 · NO_15TH_DOMAIN · NOT_FORMAL_PROVIDER
          </div>
        </header>
        <aside
          id="oa-primary-rail"
          className={`oa-rail oa-nav-chrome${drawerOpen ? " is-drawer-open" : ""}`}
          aria-label={t("OA 一级导航", "OA primary navigation")}
        >
          {NAV_ITEMS.map((item) => {
            const hasSub = item.key === "co";
            const isActive = item.key === active;
            return (
              <div
                key={item.key}
                className="oa-rail-block"
                onMouseEnter={(event) => {
                  if (hasSub && desktopHoverNav()) {
                    const btn = event.currentTarget.querySelector("button");
                    openPanel(item.key, btn instanceof HTMLButtonElement ? btn : null);
                  }
                }}
                onMouseLeave={() => {
                  if (hasSub) scheduleClose();
                }}
              >
                <button
                  className={`oa-rail-item${isActive ? " is-active" : ""}`}
                  type="button"
                  data-key={item.key}
                  aria-current={isActive ? "page" : undefined}
                  aria-expanded={hasSub ? coOpen : undefined}
                  aria-haspopup={hasSub ? "true" : undefined}
                  onClick={(event) => onPrimaryActivate(item.key, hasSub, event.currentTarget)}
                  onFocus={(event) => {
                    if (hasSub && desktopHoverNav()) openPanel(item.key, event.currentTarget);
                  }}
                >
                  <span className="oa-rail-label">
                    {t(item.zh, item.en)}
                    <span className="oa-rail-canonical">{item.canonical}</span>
                  </span>
                </button>
                {hasSub && coOpen && compactNav ? <div className="oa-rail-sub">{coRows}</div> : null}
              </div>
            );
          })}
        </aside>
        <div
          className={`oa-floating-panel oa-nav-chrome${coOpen && !compactNav ? " is-open" : ""}`}
          role="dialog"
          aria-modal="false"
          aria-hidden={!coOpen || compactNav}
          hidden={!coOpen || compactNav}
          style={{ top: panelTop }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {coOpen ? (
            <>
              <div className="oa-floating-title">{t("商品与订单", "Products & Orders")}</div>
              {coRows}
            </>
          ) : null}
        </div>
        <div
          className={`oa-hover-bridge oa-nav-chrome${coOpen ? " is-open" : ""}`}
          aria-hidden="true"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        />
        <main className="oa-main">{children}</main>
        <div className="oa-status" role="status" aria-live="polite">
          {status}
        </div>
      </div>
    </div>
  );
}
