import Link from "next/link";
import { OaSharedShell } from "@/components/oa-shell/OaSharedShell";
import Publish from "@/components/oa-publish/Publish";

export default function OaCoIntakePage() {
  return (
    <OaSharedShell activeKey="co">
      <section className="oa-page" data-oa-co-workbench="intake" data-oa-r85-entry="publish">
        <div className="oa-capability-row">
          <span className="oa-capability-pill is-available">available</span>
          <span className="oa-capability-pill is-not_connected">read_only_preview</span>
          <span className="oa-capability-pill is-not_connected">real_write_false</span>
        </div>
        <nav className="oa-skeleton-actions" aria-label="CO publish return paths">
          <Link className="oa-btn secondary" href="/admin/oa/commerce">
            Back to CO hub · 返回商品与订单
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/overview">
            Back to Overview · 返回总览
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/objects">
            Objects Runtime · 商品系统
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/media">
            Product Media · 商品素材
          </Link>
          <Link className="oa-btn secondary" href="/admin/oa/co/orders">
            Orders Runtime · 订单系统
          </Link>
        </nav>
        <Publish embedded />
      </section>
    </OaSharedShell>
  );
}
