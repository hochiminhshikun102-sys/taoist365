import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import fixture from "@/lib/order-detail/reference-fixture.json";
import copy from "@/lib/order-detail/copy-lock.json";
import OrderIdCopyButton from "./OrderIdCopyButton";
import "./order-detail.css";

export const metadata: Metadata = {
  title: "Order Detail | DOHARA",
  robots: { index: false, follow: false },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ orderId: fixture.order_id }];
}

const A = "/dh/account/orders/detail/assets";

const icons = {
  parcel: `${A}/dh_icons/status/parcel.png`,
  payment: `${A}/dh_icons/status/payment_card.png`,
  truck: `${A}/dh_icons/status/delivery_truck.png`,
  delivered: `${A}/dh_icons/status/delivered.png`,
  tracking: `${A}/dh_icons/status/tracking_route.png`,
  invoice: `${A}/dh_icons/status/invoice.png`,
  return: `${A}/dh_icons/status/return.png`,
  info: `${A}/dh_icons/status/information.png`,
  refund: `${A}/dh_icons/status/refund.png`,
  warning: `${A}/dh_icons/status/warning.png`,
  address: `${A}/dh_icons/business/address.png`,
  order: `${A}/dh_icons/business/order_parcel.png`,
  support: `${A}/dh_icons/actions/support.png`,
  help: `${A}/dh_icons/actions/help.png`,
  chevron: `${A}/dh_icons/actions/chevron_right.png`,
};

function Icon({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return <Image className={`od-icon ${className}`} src={src} width={256} height={256} alt={alt} />;
}

function DisabledButton({ children, primary = false, icon }: { children: React.ReactNode; primary?: boolean; icon?: string }) {
  return (
    <button className={`od-button${primary ? " primary" : ""}`} type="button" disabled aria-disabled="true">
      {icon ? <Icon src={icon} /> : null}<span>{children}</span>
    </button>
  );
}

function Header() {
  return (
    <header className="od-header" data-layer="header">
      <div className="od-mobile-menu"><Icon src={`${A}/header/header-menu.png`} /></div>
      <Image className="od-wordmark" src={`${A}/header/header_dohara_wordmark_only.png`} width={1024} height={512} alt="Dohara" priority />
      <nav className="od-index" aria-label="Breadcrumb">
        <Link href="/account">Account Center</Link><span>/</span><Link href="/account/orders">My Orders</Link><span>/</span><Link href="/account/orders/list">Order List</Link><span>/</span><strong>Order Detail</strong>
      </nav>
      <div className="od-user-area">
        <button type="button" disabled><Icon src={`${A}/header/header-notification.png`} /><span>Notifications</span></button>
        <button type="button" disabled><Icon src={`${A}/header/header-support.png`} /><span>Support</span></button>
        <Image className="od-avatar" src={`${A}/header/header_avatar_lena.png`} width={256} height={256} alt="Lena" />
        <span className="od-lena">Lena</span><span className="od-down" aria-hidden="true" />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="od-hero" data-layer="hero">
      <picture>
        <source media="(max-width: 600px)" srcSet={`${A}/hero/order_detail_hero_mobile_indoor_runtime_v1_2_390x280.png`} />
        <img src={`${A}/hero/order_detail_hero_pc_indoor_runtime_v1_2_1440x420.png`} alt="" />
      </picture>
      <div className="od-hero-copy">
        <h1>{copy.hero.title}</h1><i /><p>{copy.hero.subtitle}</p>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section className="od-card od-overview" data-section="order-overview">
      <h2 className="pc-title">{copy.overview.title}</h2><h2 className="mobile-title">Order Summary</h2>
      <div className="overview-grid">
        <div><span>{copy.overview.order_id}</span><strong>{fixture.order_id}</strong><OrderIdCopyButton value={fixture.order_id} /></div>
        <div><span>{copy.overview.order_date}</span><strong>May 16, 2024 · 10:24 AM</strong></div>
        <div><span>{copy.overview.fulfillment_channel}</span><strong><Icon src={icons.truck} />CN Cross-border Shipment</strong></div>
        <div><span>{copy.overview.order_status}</span><strong className="blue"><Icon src={icons.tracking} />In Transit</strong></div>
        <div><span>{copy.overview.payment_status}</span><strong className="green"><Icon src={icons.payment} />Paid</strong></div>
        <div><span>{copy.overview.invoice_status}</span><strong className="green"><Icon src={icons.invoice} />Issued</strong></div>
      </div>
    </section>
  );
}

const progressIcons = [icons.parcel, icons.payment, icons.parcel, icons.tracking, icons.truck, icons.delivered];

function Progress() {
  return (
    <section className="od-card od-progress" data-section="shipment-progress">
      <h2>{copy.progress.title}</h2>
      <div className="progress-track">
        {fixture.shipment_progress.map((step, index) => (
          <div className={`progress-step ${step.state}`} key={step.key}>
            <div className="progress-icon"><Icon src={progressIcons[index]} /></div>
            <strong>{step.label}</strong><span>{step.display_date}</span>
          </div>
        ))}
      </div>
      <div className="od-note"><Icon src={icons.info} /><div><strong>In Transit</strong><p>Returns unlock after delivery.</p></div></div>
    </section>
  );
}

function OrderItem() {
  return (
    <section className="od-card od-item" data-section="order-item">
      <h2>{copy.item.title}</h2>
      <div className="item-main">
        <Image src={`${A}/product_fixture/dohara_serenity_porcelain_vase.png`} width={600} height={600} alt={fixture.product.title} />
        <div className="item-copy"><h3>{fixture.product.title}</h3><p>Qty: 1 <b /> Items: 1</p><div className="item-facts pc-only"><p><span>SKU</span><strong>{fixture.product.sku}</strong></p><p><span>Unit Price</span><strong>USD $128.00</strong></p><p><span>Category</span><strong>Home Decor · Vases</strong></p></div><span>{copy.item.item_total}</span><strong>USD $128.00</strong></div>
      </div>
      <div className="od-note return-note"><Icon src={icons.return} /><div><strong>{copy.item.pre_delivery_return}</strong><p>{copy.item.pre_delivery_return_hint}</p></div></div>
    </section>
  );
}

function Shipping() {
  return (
    <section className="od-card od-shipping" data-section="shipping-information">
      <h2>{copy.shipping.title}</h2>
      <div className="ship-details">
        <div className="ship-method"><strong><Icon src={icons.truck} />CN Cross-border Shipment</strong><p>Carrier: DHL Express</p><p className="mobile-tracking">Tracking: DOH202405160001CN</p><p className="pc-only">Est. Delivery: May 22 – May 29, 2024</p></div>
        <div className="ship-track"><strong>Tracking Number</strong><p>DOH202405160001CN</p><DisabledButton icon={icons.truck}>{copy.shipping.track}</DisabledButton></div>
        <div className="address"><strong>{copy.shipping.shipping_address}</strong><p>Lena Dohara</p><p>123 Serenity Lane</p><p>San Francisco, CA 94107</p><p>United States</p></div>
      </div>
      <div className="od-note customs-note"><Icon src={icons.info} /><div><strong>{copy.shipping.customs_title}</strong><p>{copy.shipping.customs_body}</p><span>{copy.shipping.customs_cta}</span></div><Icon src={icons.chevron} className="chevron" /></div>
    </section>
  );
}

function Billing() {
  return (
    <section className="od-card od-billing" data-section="billing-payment">
      <h2>{copy.billing.title}</h2>
      <dl><div><dt>Item Total</dt><dd>USD $128.00</dd></div><div><dt>Shipping</dt><dd>USD $18.00</dd></div><div><dt>Tax / Import Duty</dt><dd>USD $28.40</dd></div><div className="total"><dt>Total Paid</dt><dd>USD $174.40</dd></div></dl>
      <div className="payment-line"><Icon src={icons.payment} /><strong>VISA •••• 4242</strong></div><p>Payment ID: PAY202405160001</p>
      <div className="od-note refund-note"><Icon src={icons.refund} /><div><span>Refund Status: No refund requested</span></div></div>
    </section>
  );
}

function Invoice() {
  const policyIcons = [icons.truck, icons.return, icons.info, icons.invoice, icons.warning, icons.address];
  return (
    <section className="od-card od-invoice" data-section="invoice-documents">
      <h2>{copy.invoice.title}</h2>
      <div><span><Icon src={icons.invoice} />Invoice #INV202405160001</span><DisabledButton icon={icons.invoice}>{copy.invoice.view_invoice}</DisabledButton></div>
      <p className="pc-only"><span>Status</span><strong>Issued</strong></p>
      <div className="invoice-policies pc-only"><h3>Order Policies</h3><div>{copy.policies.map((policy, i) => <span key={policy}><Icon src={policyIcons[i]} />{policy}<Icon src={icons.chevron} className="chevron" /></span>)}</div></div>
    </section>
  );
}

function Actions() {
  const policies = [icons.truck, icons.return, icons.info, icons.invoice, icons.warning, icons.address];
  return (
    <section className="od-card od-actions" data-section="actions-after-sales">
      <h2>{copy.actions.title}</h2>
      <div className="od-note action-note"><Icon src={icons.truck} /><div><strong>In Transit · report delivery issues now</strong><p className="pc-only">Return / refund / exchange actions unlock after delivery.</p></div></div>
      <div className="action-grid"><DisabledButton primary icon={icons.truck}>{copy.actions.track}</DisabledButton><DisabledButton icon={icons.warning}>{copy.actions.report_delivery_issue}</DisabledButton><DisabledButton icon={icons.invoice}>{copy.actions.view_invoice}</DisabledButton><DisabledButton icon={icons.support}>{copy.actions.contact_support}</DisabledButton></div>
      <div className="policy-grid mobile-policy">{copy.policies.map((policy, i) => <span key={policy}><Icon src={policies[i]} />{policy.replace(" Policy", "").replace(" Rule", "")}</span>)}</div>
    </section>
  );
}

function Help() {
  const helpIcons = [icons.help, icons.truck, icons.return, icons.support];
  return (
    <section className="od-help" data-section="compact-help">
      <p className="eyebrow">{copy.help.eyebrow}</p><h2>{copy.help.title}</h2>
      <div>{copy.help.items.map((item, i) => <article key={item[0]}><Icon src={helpIcons[i]} /><span><strong>{item[0]}</strong><small className="pc-only">{item[1]}</small></span><Icon src={icons.chevron} className="chevron" /></article>)}</div>
    </section>
  );
}

function Recommendations() {
  return (
    <section className="od-recommendations" data-section="recommendations">
      <p className="eyebrow pc-only">{copy.recommendation.eyebrow}</p><div className="rec-title"><h2>{copy.recommendation.title}</h2><span className="mobile-title">View More</span></div><p className="rec-sub pc-only">{copy.recommendation.subtitle}</p>
      <div className="product-grid">{fixture.recommendations.map((p, i) => <article key={p.object_id}><div className="product-image"><Image src={`${A}/recommendations/product_${String(i + 1).padStart(2, "0")}.png`} width={600} height={600} alt={p.title} /><small>{p.badge}</small><span>♡</span></div><h3>{p.title}</h3><strong>${p.price.toFixed(2)}</strong></article>)}</div>
      <Link className="view-more" href="/objects">{copy.recommendation.view_more}</Link>
    </section>
  );
}

function Footer() {
  const footerIcons = [icons.support, icons.truck, `${A}/dh_icons/business/security.png`, icons.info];
  return (
    <footer className="od-footer" data-layer="end">
      <div className="utility-grid">{copy.footer.items.map((item, i) => <article key={item[0]}><Icon src={footerIcons[i]} /><span><strong>{item[0]}</strong><small className="pc-only">{item[1]}</small></span></article>)}</div>
      <div className="legal"><span>{copy.footer.legal.join("  |  ")}</span><span>{copy.footer.copyright}</span><a href="#top">↑ {copy.footer.back_to_top}</a></div>
    </footer>
  );
}

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  if (orderId !== fixture.order_id) notFound();
  return (
    <main id="top" className="order-detail-page" data-page="order-detail" data-reference-fixture={fixture.order_id}>
      <Header /><Hero />
      <div className="od-content" data-layer="content">
        <Link className="back-link" href="/account/orders/list">‹ Back to Order List</Link>
        <Overview /><Progress />
        <div className="details-grid"><OrderItem /><Billing /><Shipping /><Invoice /></div>
        <Actions /><Help /><Recommendations />
      </div>
      <Footer />
    </main>
  );
}
