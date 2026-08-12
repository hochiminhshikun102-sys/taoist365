"use client";

import { useEffect, useState } from "react";

const ASSET_BASE = "/dh/account/shared/commerce-tail-v1";
const ICON_BASE = `${ASSET_BASE}/runtime-icons`;
const CHEVRON = `${ICON_BASE}/chevron_right_leaf.png`;

const HELP = [
  {
    icon: "support.png",
    title: "Help & Support",
    body: "Account, order and service assistance.",
    href: "/account/support",
  },
  {
    icon: "02_shipping_returns.png",
    title: "Shipping & Returns",
    body: "Delivery, tracking and return support.",
    href: "/account/policies/shipping-returns",
  },
  {
    icon: "help.png",
    title: "Privacy & Security",
    body: "Privacy, sign-in and data controls.",
    href: "/account/settings/privacy-security",
  },
  {
    icon: "return.png",
    title: "Policies & Guidelines",
    body: "Service rules and community standards.",
    href: "/account/policies",
  },
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

function TailIcon({ src, chevron = false }: { src: string; chevron?: boolean }) {
  return (
    <span className={chevron ? "tail-icon-tray tail-icon-tray--chevron" : "tail-icon-tray"} aria-hidden="true">
      <img src={src} alt="" />
    </span>
  );
}

export function AccountCommerceTail() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem("dh_account_recommendation_wishlist") || "[]");
      if (Array.isArray(stored)) setSaved(stored);
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
      <section className="compact-help" aria-labelledby="overview-help-title" data-tail-section="compact-help">
        <div className="tail-section-heading">
          <span />
          <div>
            <p>Account assistance</p>
            <h2 id="overview-help-title">Need Help?</h2>
          </div>
          <span />
        </div>
        <div className="tail-help-grid">
          {HELP.map((item) => (
            <a key={item.title} className="tail-help-card" href={item.href}>
              <TailIcon src={`${ICON_BASE}/${item.icon}`} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.body}</small>
              </span>
              <TailIcon src={CHEVRON} chevron />
            </a>
          ))}
        </div>
      </section>

      <section className="recommendations" aria-labelledby="overview-recommend-title" data-tail-section="recommendations">
        <header className="recommend-header">
          <div>
            <p>Selected for your journey</p>
            <h2 id="overview-recommend-title">Recommended for You</h2>
            <small>Inspired by your recent orders, saved objects and quiet-living interests.</small>
          </div>
          <a href="/objects">Explore All Products <span>→</span></a>
        </header>
        <div className="product-grid">
          {PRODUCTS.map(([title, price, badge], index) => {
            const number = String(index + 1).padStart(2, "0");
            const objectId = `VISUAL-REFERENCE-${number}`;
            const isSaved = saved.includes(objectId);
            return (
              <article key={objectId} className="product-card" data-product-id={objectId}>
                <div className="product-image">
                  <a href="/objects" aria-label={title}>
                    <img src={`${ASSET_BASE}/recommendations/product_${number}.png`} alt={title} />
                  </a>
                  <span>{badge}</span>
                  <button
                    type="button"
                    aria-label={isSaved ? `Unsave ${title}` : `Save ${title}`}
                    aria-pressed={isSaved}
                    data-save-control="true"
                    onClick={() => toggleSave(objectId)}
                  >
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
