import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backHref?: string;
  bottomCurrent?: "overview" | "channel" | "ranking" | "risk";
};

const STATUS_PILLS = [
  "read_only",
  "not_connected",
  "deploy disabled",
  "real write disabled",
] as const;

export function MobileFrame({
  title,
  subtitle = "DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER",
  children,
  backHref,
  bottomCurrent = "overview",
}: Props) {
  return (
    <div className="oa-mobile-host">
      <div className="oa-mobile-frame" data-artboard="390">
        <header className="oa-m-header">
          {backHref ? (
            <Link className="oa-m-back" href={backHref}>
              ← Overview · 经营总览
            </Link>
          ) : null}
          <h1>{title}</h1>
          <p className="oa-m-sub">{subtitle}</p>
          <div className="oa-m-status-row" aria-label="OA mobile status">
            {STATUS_PILLS.map((pill) => (
              <span key={pill} className={pill.includes("disabled") || pill === "not_connected" ? "oa-m-pill is-warn" : "oa-m-pill"}>
                {pill}
              </span>
            ))}
          </div>
        </header>
        <div className="oa-m-body">{children}</div>
        <nav className="oa-m-bottom" aria-label="OA mobile navigation">
          <Link href="/admin/oa/m/overview" aria-current={bottomCurrent === "overview" ? "page" : undefined}>
            Overview
          </Link>
          <Link href="/admin/oa/m/channel" aria-current={bottomCurrent === "channel" ? "page" : undefined}>
            Channel
          </Link>
          <Link href="/admin/oa/m/product-ranking" aria-current={bottomCurrent === "ranking" ? "page" : undefined}>
            Ranking
          </Link>
          <Link href="/admin/oa/m/risk-todo" aria-current={bottomCurrent === "risk" ? "page" : undefined}>
            Risk
          </Link>
        </nav>
      </div>
    </div>
  );
}
