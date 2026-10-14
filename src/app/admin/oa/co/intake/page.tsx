"use client";

import Link from "next/link";
import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import Publish from "@/components/oa-publish/Publish";
import { useOaDesktopLocale } from "@/components/oa-overview/useOaDesktopLocale";

export default function OaCoIntakePage() {
  const { t } = useOaDesktopLocale();

  return (
    <OaSharedShell activeKey="co">
      <section className="oa-page" data-oa-co-workbench="intake" data-oa-r85-entry="publish">
        <div className="oa-capability-row">
          <span className="oa-capability-pill is-available">available</span>
          <span className="oa-capability-pill is-not_connected">read_only_preview</span>
          <span className="oa-capability-pill is-not_connected">real_write_false</span>
        </div>
        <nav className="oa-skeleton-actions" aria-label={t("商品发布返回路径", "CO publish return paths")}>
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            {t("返回商品与订单", "Back to CO hub")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/overview">
            {t("返回总览", "Back to Overview")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            {t("商品系统", "Objects Runtime")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/media">
            {t("商品素材", "Product Media")}
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            {t("订单系统", "Orders Runtime")}
          </Link>
        </nav>
        <Publish embedded />
      </section>
    </OaSharedShell>
  );
}
