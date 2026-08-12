"use client";

import { useEffect, useState } from "react";

const A = "/dh/account/shared/commerce-tail-v1";
const I = `${A}/runtime-icons`;
const CHEV = `${I}/chevron_right_leaf.png`;

const HELP = [
  { icon: "help.png", title: "Order FAQ", body: "Quick answers about orders.", href: "/account/support?topic=orders", ready: false },
  { icon: "02_shipping_returns.png", title: "Shipping & Delivery", body: "Delivery times and tracking.", href: "/account/policies/shipping-returns", ready: false },
  { icon: "return.png", title: "Returns & Aftersales", body: "Returns, refunds and support.", href: "/account/aftersales", ready: true },
  { icon: "support.png", title: "Support Center", body: "Contact our support team.", href: "/account/support", ready: false },
] as const;

const PRODUCTS = [
  ["Blue Garden Porcelain Vase", "$128.00", "Member Pick"],
  ["Quiet Ember Scented Candle", "$48.00", "Bestseller"],
  ["Dohara Blue Tea Service", "$156.00", "New"],
  ["Linen Reflection Journal", "$32.00", "New"],
  ["Clear Wind Incense Holder", "$42.00", "Quiet Living"],
  ["Mist Blue Ceramic Bowl", "$58.00", "Member Pick"],
  ["Silk Rest Eye Mask", "$36.00", "Bestseller"],
  ["Soft Light Table Lamp", "$118.00", "New"],
  ["Botanical Air Diffuser", "$54.00", "Bestseller"],
  ["Hand-thrown Morning Mug", "$38.00", "Quiet Living"],
  ["Petal Jewelry Dish", "$46.00", "Member Pick"],
  ["Woven Calm Storage Basket", "$72.00", "New"],
  ["Wind Blue Table Clock", "$86.00", "Member Pick"],
  ["Blue Garden Porcelain Tray", "$68.00", "Bestseller"],
  ["Cloud Weave Throw", "$96.00", "Quiet Living"],
  ["Sculptural Bloom Vessel", "$108.00", "New"],
] as const;

function DhIcon({ src, tray }: { src: string; tray?: "chevron" }) {
  return (
    <span className={tray === "chevron" ? "dh-icon-tray dh-icon-tray--chevron" : "dh-icon-tray"} aria-hidden="true">
      <img src={src} alt="" />
    </span>
  );
}

export function CommerceTail() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem("dh_account_recommendation_wishlist") || "[]");
      if (Array.isArray(parsed)) setSaved(parsed);
    } catch {
      setSaved([]);
    }
  }, []);

  function toggleSave(objectId: string) {
    setSaved((current) => {
      const next = current.includes(objectId) ? current.filter((id) => id !== objectId) : [...current, objectId];
      window.localStorage.setItem("dh_account_recommendation_wishlist", JSON.stringify(next));
      return next;
    });
  }

  return (
    <>
      <section className="compact-help" aria-labelledby="help-title" data-tail-section="compact-help">
        <div className="section-heading">
          <span />
          <div>
            <p>Order assistance</p>
            <h2 id="help-title">Need Help?</h2>
          </div>
          <span />
        </div>
        <div className="help-grid" id="help-grid">
          {HELP.map((item) => {
            const inner = (
              <>
                <DhIcon src={`${I}/${item.icon}`} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                </span>
                <DhIcon src={CHEV} tray="chevron" />
              </>
            );
            return item.ready ? (
              <a key={item.title} className="help-card" href={item.href}>{inner}</a>
            ) : (
              <span key={item.title} className="help-card" role="link" aria-disabled="true" data-route-status="DISABLED_UNTIL_READY" data-href={item.href}>{inner}</span>
            );
          })}
        </div>
      </section>

      <section className="recommendations" aria-labelledby="recommend-title" data-tail-section="recommendations">
        <header className="recommend-header">
          <div>
            <p>Selected for your journey</p>
            <h2 id="recommend-title">Recommended for You</h2>
            <small>Inspired by your recent orders, saved objects and quiet-living interests.</small>
          </div>
          <a href="/objects">Explore All Products <span>→</span></a>
        </header>
        <div className="product-grid" id="product-grid">
          {PRODUCTS.map(([title, price, badge], index) => {
            const number = String(index + 1).padStart(2, "0");
            const objectId = `VISUAL-REFERENCE-${number}`;
            const isSaved = saved.includes(objectId);
            return (
              <article key={objectId} className="product-card" data-product-id={objectId}>
                <div className="product-image">
                  <a href="/objects" aria-label={title}>
                    <img src={`${A}/recommendations/product_${number}.png`} alt={title} />
                  </a>
                  <span>{badge}</span>
                  <button type="button" aria-label={isSaved ? `Unsave ${title}` : `Save ${title}`} aria-pressed={isSaved} data-save-control="true" onClick={() => toggleSave(objectId)}>
                    {isSaved ? "♥" : "♡"}
                  </button>
                </div>
                <a href="/objects">
                  <div className="product-copy">
                    <h3>{title}</h3>
                    <p>{price}</p>
                    <small>Free delivery on eligible orders</small>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
        <div className="feed-more">
          <a href="/objects">View More Products <span>→</span></a>
          <small>More recommendations will load as you continue browsing.</small>
        </div>
      </section>
    </>
  );
}
