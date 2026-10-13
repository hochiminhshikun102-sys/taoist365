import Link from "next/link";
import {
  CO_SECONDARY_CAPABILITY,
  capabilityLabel,
  type OaCapabilityRecord,
} from "./capabilityGate";

type Props = {
  workbenchId: keyof typeof CO_SECONDARY_CAPABILITY;
};

const LEGACY_LINKS: Record<string, { href: string; label: string }[]> = {
  intake: [
    { href: "/admin/product-intake", label: "Open Product Intake · 打开宝贝入库" },
    { href: "/admin/co/publish", label: "Open CO Publish UI · 打开发布 UI" },
    { href: "/admin/publish-review", label: "Open Publish Review · 打开审核发布" },
  ],
  objects: [{ href: "/admin/objects", label: "Open Objects Runtime · 打开商品系统" }],
  media: [{ href: "/admin/product-media", label: "Open Product Media · 打开商品素材" }],
  orders: [],
  payments: [],
  shipping: [],
};

export function CoSecondaryWorkbench({ workbenchId }: Props) {
  const entry: OaCapabilityRecord = CO_SECONDARY_CAPABILITY[workbenchId];
  const legacy = LEGACY_LINKS[workbenchId] || [];

  return (
    <section className="oa-page oa-skeleton-page" data-oa-co-workbench={entry.id}>
      <div className="oa-fixture-banner">
        WAVE0_STRUCTURE_GATE · DATA_SOURCE=TEST_ONLY_UI_FIXTURE · NOT_FORMAL_PROVIDER · ADDITIVE_ONLY ·
        capability={entry.status}
      </div>

      <div className="oa-capability-row">
        <span className={`oa-capability-pill is-${entry.status}`}>{capabilityLabel(entry.status)}</span>
        <span className="oa-capability-owner">Owner · 02 CO</span>
      </div>

      <h1 className="oa-page-title">
        {entry.labelEn} · {entry.labelZh}
      </h1>
      <p className="oa-skeleton-lead">
        {entry.noteEn} {entry.noteZh}
      </p>

      <div className="oa-skeleton-status-grid">
        <article className="oa-card oa-skeleton-card">
          <h3>Capability · 能力状态</h3>
          <p>{capabilityLabel(entry.status)}</p>
          <p className="oa-skeleton-meta">UI gate ≠ server auth</p>
        </article>
        <article className="oa-card oa-skeleton-card">
          <h3>Write gate · 写入门禁</h3>
          <p>Real order / payment / fulfillment writes blocked</p>
          <p className="oa-skeleton-meta">ORDERS_BUSINESS_WRITE=FALSE</p>
        </article>
        <article className="oa-card oa-skeleton-card">
          <h3>Next wave · 下一波</h3>
          <p>{workbenchId === "orders" || workbenchId === "payments" || workbenchId === "shipping" ? "Wave 1B Orders Core" : "Keep existing · IA rebuild deferred"}</p>
          <p className="oa-skeleton-meta">Structure gate only this round</p>
        </article>
      </div>

      {legacy.length > 0 ? (
        <div className="oa-skeleton-actions">
          {legacy.map((item) => (
            <Link key={item.href} className="oa-btn" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      ) : (
        <div className="oa-skeleton-actions">
          <button className="oa-btn" type="button" disabled title="Wave 1B pending">
            Business restore pending · 业务恢复待 Wave 1B
          </button>
        </div>
      )}

      {workbenchId === "intake" ? (
        <article className="oa-card" style={{ marginTop: 14 }}>
          <h3>R47 cross-links · 交叉链接（无 IA 重构）</h3>
          <p className="oa-skeleton-meta">
            Product Intake keeps legacy links above. Cross-workbench jumps only — no intake IA rebuild.
          </p>
          <div className="oa-skeleton-actions">
            <Link className="oa-btn secondary" href="/admin/oa/co/objects">
              Objects Runtime · 商品系统
            </Link>
            <Link className="oa-btn secondary" href="/admin/oa/co/media">
              Product Media · 商品素材
            </Link>
            <Link className="oa-btn secondary" href="/admin/oa/co/orders">
              Orders Runtime · 订单系统
            </Link>
          </div>
        </article>
      ) : null}

      <div className="oa-skeleton-actions" style={{ marginTop: 12 }}>
        <Link className="oa-btn secondary" href="/admin/oa/commerce">
          Back to CO hub · 返回商品与订单
        </Link>
        <Link className="oa-btn secondary" href="/admin/oa/overview">
          Back to Overview · 返回总览
        </Link>
      </div>
    </section>
  );
}
