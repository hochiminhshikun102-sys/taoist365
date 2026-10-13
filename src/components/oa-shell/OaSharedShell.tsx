"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PRIMARY_CAPABILITY, capabilityLabel } from "@/components/oa-skeleton/capabilityGate";
import { NAV_KEY_TO_PRIMARY_PATH } from "@/components/oa-skeleton/primaryEntries";
import { NAV_ITEMS, OA_SUBMENUS, type OaSubmenuItem } from "./oaNavCanonical";

type Props = {
  activeKey?: string;
  children: ReactNode;
};

export function OaSharedShell({ activeKey = "overview", children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [panelTop, setPanelTop] = useState(64);
  const [railOpen, setRailOpen] = useState(false);
  const [status, setStatus] = useState("OA readonly foundation · 只读地基");
  const [active, setActive] = useState(activeKey);

  const declaredRoutes = useMemo(() => {
    const routes = new Set<string>(Object.values(NAV_KEY_TO_PRIMARY_PATH));
    for (const conf of Object.values(OA_SUBMENUS)) {
      for (const item of conf.items) routes.add(item.route);
    }
    return routes;
  }, []);

  useEffect(() => {
    setActive(activeKey);
  }, [activeKey]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenKey(null);
        setRailOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    if (!hash) return;
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }, [pathname, children]);

  function clearCloseTimer() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function closePanelSoon() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpenKey(null), 140);
  }

  function openPanel(key: string, anchor: HTMLElement) {
    if (!OA_SUBMENUS[key] || !rootRef.current) return;
    clearCloseTimer();
    const top = Math.max(56, anchor.getBoundingClientRect().top - rootRef.current.getBoundingClientRect().top);
    setPanelTop(top);
    setOpenKey(key);
  }

  function goPrimary(key: string) {
    const href = NAV_KEY_TO_PRIMARY_PATH[key];
    if (!href) return;
    setOpenKey(null);
    setRailOpen(false);
    setActive(key);
    setStatus(`navigate ${href} · read_only`);
    router.push(href);
  }

  function goRoute(route: string) {
    const pathOnly = route.split("#")[0];
    if (!declaredRoutes.has(route) && !declaredRoutes.has(pathOnly)) {
      setStatus(`undeclared route blocked · ${route}`);
      return;
    }
    setOpenKey(null);
    setRailOpen(false);
    setStatus(`navigate ${route} · hint only · no write`);
    router.push(route);
  }

  const openConf = openKey ? OA_SUBMENUS[openKey] : null;
  const openPrimaryHref = openKey ? NAV_KEY_TO_PRIMARY_PATH[openKey] : null;

  return (
    <div className="oa-root" ref={rootRef}>
      <div
        className={`oa-backdrop${openKey || railOpen ? " is-open" : ""}`}
        onClick={() => {
          setOpenKey(null);
          setRailOpen(false);
        }}
        aria-hidden={!(openKey || railOpen)}
      />
      <div className="oa-shell">
        <header className="oa-topbar">
          <div className="oa-topbar-lead">
            <button
              className="oa-mobile-nav-toggle"
              type="button"
              aria-expanded={railOpen}
              aria-controls="oa-primary-rail"
              onClick={() => setRailOpen((open) => !open)}
            >
              Menu · 导航
            </button>
            <div className="oa-brand">DOHARA OA · Readonly Foundation · 只读地基</div>
          </div>
          <div className="oa-banner-flags" aria-label="OA environment boundaries">
            <span className="oa-flag">OA readonly foundation · 只读地基</span>
            <span className="oa-flag is-warn">Provider not connected · 未接通</span>
            <span className="oa-flag is-warn">Production deploy disabled · 禁止上线</span>
            <span className="oa-flag is-warn">Real business write disabled · 禁止真实写入</span>
          </div>
        </header>
        <aside
          id="oa-primary-rail"
          className={`oa-rail${railOpen ? " is-open" : ""}`}
          aria-label="OA primary navigation"
        >
          {NAV_ITEMS.map((item) => {
            const hasSub = Boolean(OA_SUBMENUS[item.key]);
            const isActive = item.key === active;
            const cap = PRIMARY_CAPABILITY[item.capabilitySlug] ?? "not_connected";
            const href = NAV_KEY_TO_PRIMARY_PATH[item.key];
            return (
              <div
                key={item.key}
                className="oa-rail-row"
                onMouseEnter={(event) => {
                  if (hasSub) openPanel(item.key, event.currentTarget);
                }}
                onMouseLeave={hasSub ? closePanelSoon : undefined}
              >
                <Link
                  href={href}
                  className={`oa-rail-item${isActive ? " is-active" : ""}`}
                  data-key={item.key}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setActive(item.key);
                    setRailOpen(false);
                    setOpenKey(null);
                    setStatus(`navigate ${href} · read_only`);
                  }}
                >
                  <span className="oa-rail-label">
                    {item.en} · {item.zh}
                    <span className="oa-rail-canonical">canonical {item.canonical}</span>
                    <span className={`oa-rail-status is-${cap}`}>{capabilityLabel(cap)}</span>
                  </span>
                </Link>
                {hasSub ? (
                  <button
                    className="oa-rail-caret"
                    type="button"
                    aria-expanded={openKey === item.key}
                    aria-haspopup="dialog"
                    aria-label={`${item.en} submenu`}
                    onClick={(event) => {
                      event.preventDefault();
                      if (openKey === item.key) setOpenKey(null);
                      else openPanel(item.key, event.currentTarget.parentElement || event.currentTarget);
                    }}
                  >
                    ▸
                  </button>
                ) : null}
              </div>
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
          onMouseEnter={clearCloseTimer}
          onMouseLeave={closePanelSoon}
        >
          {openConf ? (
            <>
              <div className="oa-floating-title">{openConf.title}</div>
              {openPrimaryHref ? (
                <button className="oa-floating-row" type="button" onClick={() => goPrimary(openKey || "")}>
                  Open hub · 打开看板
                </button>
              ) : null}
              {openConf.items.map((item: OaSubmenuItem) => (
                <button
                  key={item.route + item.label}
                  className="oa-floating-row"
                  type="button"
                  onClick={() => goRoute(item.route)}
                >
                  {item.label}
                  {item.hint ? <span className="oa-floating-hint">{item.hint}</span> : null}
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
