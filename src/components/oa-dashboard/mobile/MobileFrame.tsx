import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  children: ReactNode;
  backHref?: string;
  bottomCurrent?: "overview" | "risk";
};

export function MobileFrame({ title, children, backHref, bottomCurrent = "overview" }: Props) {
  return (
    <div className="oa-mobile-host">
      <div className="oa-mobile-frame" data-artboard="390">
        <header className="oa-m-header">
          {backHref ? (
            <Link className="oa-m-back" href={backHref}>
              ← Operations Overview Board · 经营总览看板
            </Link>
          ) : null}
          <h1>{title}</h1>
          <p>DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER</p>
        </header>
        <div className="oa-m-body">{children}</div>
        <nav className="oa-m-bottom" aria-label="Mobile bottom placeholder">
          <span aria-current={bottomCurrent === "overview" ? "page" : undefined}>Overview · 总览</span>
          <span>Orders · 订单</span>
          <span aria-current={bottomCurrent === "risk" ? "page" : undefined}>Risk · 风控</span>
          <span>More · 更多</span>
        </nav>
      </div>
    </div>
  );
}
