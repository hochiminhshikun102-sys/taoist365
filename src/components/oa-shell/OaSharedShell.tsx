"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { NAV_KEY_TO_PRIMARY_PATH } from "@/components/oa-skeleton/primaryEntries";
import { NAV_ITEMS, OA_SUBMENUS, type OaSubmenuItem } from "./oaNavCanonical";
import { useOaUiLocale, type OaUiLocale } from "./useOaUiLocale";

const SHELL_COPY = {
  "zh-CN": {
    menu: "菜单",
    brand: "DOHARA OA · 只读地基",
    nav: "OA 一级导航",
    flags: "OA 环境边界",
    openHub: "打开看板",
    lang: "语言",
  },
  en: {
    menu: "Menu",
    brand: "DOHARA OA · Readonly Foundation",
    nav: "OA primary navigation",
    flags: "OA environment boundaries",
    openHub: "Open hub",
    lang: "Language",
  },
} as const;

const TECH_FLAGS = ["read_only", "not_connected", "deploy disabled"] as const;

function primaryLabel(item: (typeof NAV_ITEMS)[number], locale: OaUiLocale) {
  return locale === "en" ? item.en : item.zh;
}

function subLabel(item: OaSubmenuItem, locale: OaUiLocale) {
  return locale === "en" ? item.labelEn : item.labelZh;
}

type Props = {
  activeKey?: string;
  children: ReactNode;
};

type FlyoutBox = {
  key: string;
  top: number;
  left: number;
  maxHeight: number;
  flip: boolean;
};

export function OaSharedShell({ activeKey = "overview", children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [flyout, setFlyout] = useState<FlyoutBox | null>(null);
  const [railOpen, setRailOpen] = useState(false);
  const [status, setStatus] = useState("read_only");
  const [active, setActive] = useState(activeKey);
  const [hash, setHash] = useState("");
  const [fineHover, setFineHover] = useState(false);
  const { locale, setLocale } = useOaUiLocale();
  const copy = SHELL_COPY[locale];

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
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFineHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    function syncHash() {
      setHash(window.location.hash.replace(/^#/, ""));
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setFlyout(null);
        setRailOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!hash) return;
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }, [pathname, hash, children]);

  function clearCloseTimer() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function closePanelSoon() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setFlyout(null), 160);
  }

  function openPanel(key: string, anchor: HTMLElement) {
    if (!OA_SUBMENUS[key]) return;
    clearCloseTimer();
    const rail = document.getElementById("oa-primary-rail");
    const railBox = rail?.getBoundingClientRect();
    const rowBox = anchor.getBoundingClientRect();
    const panelWidth = Math.min(300, Math.max(220, window.innerWidth - 16));
    const preferredLeft = Math.round((railBox?.right ?? rowBox.right) - 8);
    const left = Math.max(8, Math.min(preferredLeft, window.innerWidth - panelWidth - 8));
    const maxHeight = Math.min(520, Math.round(window.innerHeight * 0.7));
    const flip = rowBox.bottom > window.innerHeight * 0.62;
    const top = flip
      ? Math.max(12, Math.round(window.innerHeight - maxHeight - 12))
      : Math.max(12, Math.round(rowBox.top));
    setFlyout({ key, top, left, maxHeight, flip });
  }

  function goPrimary(key: string) {
    const href = NAV_KEY_TO_PRIMARY_PATH[key];
    if (!href) return;
    setFlyout(null);
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
    setFlyout(null);
    setRailOpen(false);
    setStatus(`navigate ${route} · hint only · no write`);
    router.push(route);
  }

  function isSubActive(route: string) {
    const [path, fragment] = route.split("#");
    if (pathname !== path) return false;
    if (!fragment) return true;
    return hash === fragment;
  }

  function onRowKey(event: KeyboardEvent<HTMLElement>, key: string, hasSub: boolean, row: HTMLElement) {
    if (!hasSub) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (flyout?.key === key) setFlyout(null);
      else openPanel(key, row);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      openPanel(key, row);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setFlyout(null);
    }
  }

  const openConf = flyout ? OA_SUBMENUS[flyout.key] : null;
  const openPrimaryHref = flyout ? NAV_KEY_TO_PRIMARY_PATH[flyout.key] : null;

  return (
    <div className="oa-root" ref={rootRef}>
      <div
        className={`oa-backdrop${railOpen || flyout ? " is-open" : ""}${fineHover && flyout && !railOpen ? " is-hover-only" : ""}`}
        onClick={() => {
          setFlyout(null);
          setRailOpen(false);
        }}
        aria-hidden
      />
      <div className="oa-shell">
        <header className="oa-topbar">
          <div className="oa-topbar-lead">
            <button
              className="oa-mobile-nav-toggle"
              type="button"
              aria-expanded={railOpen}
              aria-controls="oa-primary-rail"
              onClick={() => {
                setFlyout(null);
                setRailOpen((open) => !open);
              }}
            >
              {copy.menu}
            </button>
            <div className="oa-brand">{copy.brand}</div>
          </div>
          <div className="oa-topbar-tools">
            <div className="oa-lang-switch" role="group" aria-label={copy.lang}>
              <button
                type="button"
                className={locale === "zh-CN" ? "is-active" : ""}
                aria-pressed={locale === "zh-CN"}
                onClick={() => setLocale("zh-CN")}
              >
                中文
              </button>
              <button
                type="button"
                className={locale === "en" ? "is-active" : ""}
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
            <div className="oa-banner-flags" aria-label={copy.flags}>
              {TECH_FLAGS.map((flag) => (
                <span key={flag} className={flag === "read_only" ? "oa-flag" : "oa-flag is-warn"}>
                  {flag}
                </span>
              ))}
            </div>
          </div>
        </header>
        <aside
          id="oa-primary-rail"
          className={`oa-rail${railOpen ? " is-open" : ""}`}
          aria-label={copy.nav}
        >
          {NAV_ITEMS.map((item) => {
            const hasSub = Boolean(OA_SUBMENUS[item.key]);
            const isActive = item.key === active;
            const href = NAV_KEY_TO_PRIMARY_PATH[item.key];
            return (
              <div
                key={item.key}
                className={`oa-rail-row${flyout?.key === item.key ? " is-open" : ""}`}
                data-nav-key={item.key}
                onMouseEnter={(event) => {
                  if (!fineHover) return;
                  if (hasSub) openPanel(item.key, event.currentTarget);
                  else setFlyout(null);
                }}
                onMouseLeave={() => {
                  if (fineHover) closePanelSoon();
                }}
                onKeyDown={(event) => onRowKey(event, item.key, hasSub, event.currentTarget)}
              >
                <Link
                  href={href}
                  className={`oa-rail-item${isActive ? " is-active" : ""}`}
                  data-key={item.key}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setActive(item.key);
                    if (!hasSub || !railOpen) {
                      setRailOpen(false);
                      setFlyout(null);
                    }
                    setStatus(`navigate ${href} · read_only`);
                  }}
                >
                  <span className={`oa-rail-glyph is-${item.key}`} aria-hidden="true" />
                  <span className="oa-rail-label">{primaryLabel(item, locale)}</span>
                </Link>
                {hasSub ? (
                  <button
                    className="oa-rail-caret"
                    type="button"
                    aria-expanded={flyout?.key === item.key}
                    aria-haspopup="menu"
                    aria-label={locale === "en" ? `${item.en} submenu` : `${item.zh} 子菜单`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      const row = event.currentTarget.parentElement;
                      if (!row) return;
                      if (flyout?.key === item.key) setFlyout(null);
                      else openPanel(item.key, row);
                    }}
                  >
                    ▸
                  </button>
                ) : null}
              </div>
            );
          })}
        </aside>
        <main className="oa-main">{children}</main>
      </div>
      {flyout && openConf ? (
        <div
          className={`oa-floating-panel is-open${flyout.flip ? " is-flip" : ""}`}
          role="menu"
          aria-label={locale === "en" ? openConf.titleEn : openConf.titleZh}
          style={{ top: flyout.top, left: flyout.left, maxHeight: flyout.maxHeight }}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={() => {
            if (fineHover) closePanelSoon();
          }}
        >
          <div className="oa-flyout-bridge" aria-hidden="true" />
          <div className="oa-floating-title">{locale === "en" ? openConf.titleEn : openConf.titleZh}</div>
          {openPrimaryHref ? (
            <button
              className={`oa-floating-row${pathname === openPrimaryHref ? " is-active" : ""}`}
              type="button"
              onClick={() => goPrimary(flyout.key)}
            >
              {copy.openHub}
            </button>
          ) : null}
          {openConf.items.map((item: OaSubmenuItem) => (
            <button
              key={item.route + item.labelEn}
              className={`oa-floating-row${isSubActive(item.route) ? " is-active" : ""}`}
              type="button"
              onClick={() => goRoute(item.route)}
            >
              {subLabel(item, locale)}
            </button>
          ))}
        </div>
      ) : null}
      <div className="oa-status" aria-live="polite">
        {status}
      </div>
    </div>
  );
}
