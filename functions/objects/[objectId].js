import { readStore } from "../_object-intake.js";

export async function onRequestGet(context) {
  const { objectId } = context.params;
  const store = await readStore(context.env);
  const object = store.objects.find((item) => item.status === "published" && (item.object_id === objectId || item.slug === objectId));

  if (!object) {
    return context.next();
  }

  return new Response(renderObjectHtml(object), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function priceCentsForObject(object) {
  const numeric = Number.parseFloat(String(object.price || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric * 100) : 0;
}

function isVideoMedia(media) {
  const value = `${media?.mime_type || ""} ${media?.url || ""}`.toLowerCase();
  return value.includes("video/") || /\.(mp4|webm|mov|m4v)(\?|$)/.test(value);
}

function primaryMediaForObject(object) {
  const media = Array.isArray(object.media) ? object.media : [];
  return media.find((item) => item.type === "main") || media[0] || {
    type: "main",
    url: object.primary_image_url || "/homepage-hero/windkeep-lantern-sea.png",
    mime_type: "image/png",
  };
}

function cartImageForObject(object) {
  const media = Array.isArray(object.media) ? object.media : [];
  const image = media.find((item) => !isVideoMedia(item) && item.url) || null;
  return image?.url || object.primary_image_url || "/homepage-hero/windkeep-lantern-sea.png";
}

function renderMedia(media, alt, className = "") {
  const url = escapeHtml(media?.url || "/homepage-hero/windkeep-lantern-sea.png");
  if (isVideoMedia(media)) {
    return `<video class="${className}" src="${url}" autoplay muted loop playsinline controls preload="metadata"></video>`;
  }
  return `<img class="${className}" src="${url}" alt="${escapeHtml(alt)}" />`;
}

function mediaByTypes(object, types) {
  const media = Array.isArray(object.media) ? object.media : [];
  return media.filter((item) => types.includes(item.type));
}

function renderMediaGrid(items, title) {
  if (!items.length) return `<p class="empty">No ${escapeHtml(title.toLowerCase())} media uploaded yet.</p>`;
  return items.map((item) => `<figure class="media-card">${renderMedia(item, title)}<figcaption>${escapeHtml(item.type || "media")}</figcaption></figure>`).join("");
}

function renderMediaStrip(object) {
  const media = Array.isArray(object.media) ? object.media.slice(0, 8) : [];
  if (!media.length) return "";
  return `<div class="media-strip">${media.map((item) => `
    <figure>
      ${renderMedia(item, object.title)}
      <figcaption>${escapeHtml(item.type || "media")}</figcaption>
    </figure>
  `).join("")}</div>`;
}

function renderDetailModules(object) {
  const modules = [
    ["Gallery", "White object image, source traces, and first-screen media.", mediaByTypes(object, ["main", "original"])],
    ["Material details", object.material || "Texture, condition, closeups, defects, scale, and handmade evidence.", mediaByTypes(object, ["detail"])],
    ["Placed in life", object.placement_suggestion || "Room, desk, shelf, PC detail, and mobile detail scenes.", mediaByTypes(object, ["scene", "pc", "mobile"])],
    ["Video / social / proof", "Motion, social exports, packaging proof, and after-sales evidence slots.", mediaByTypes(object, ["motion", "social"])],
  ];

  return modules.map(([title, note, items]) => `
    <section class="detail-module">
      <div>
        <p class="eyebrow">${escapeHtml(title)}</p>
        <h2>${escapeHtml(title)}</h2>
        <p class="copy">${escapeHtml(note)}</p>
      </div>
      <div class="media-grid">${renderMediaGrid(items, title)}</div>
    </section>
  `).join("");
}

function renderObjectHtml(object) {
  const title = escapeHtml(object.title);
  const description = escapeHtml(object.description);
  const productStory = escapeHtml(object.product_story || object.description || "The story is confirmed during human review.");
  const material = escapeHtml(object.material || "Material to confirm after human review.");
  const sizeText = escapeHtml(object.size_text || "Size to confirm after measuring.");
  const shippingNote = escapeHtml(object.shipping_note || "Shipping method, packaging, and region are confirmed before payment.");
  const riskNotes = escapeHtml(object.risk_notes || "Final purchase is reviewed by a human before payment.");
  const primaryMedia = primaryMediaForObject(object);
  const priceCents = priceCentsForObject(object);
  const inventory = Number.isFinite(Number(object.inventory)) ? Number(object.inventory) : 0;
  const canAddToCart = priceCents > 0 && inventory > 0;
  const tags = (object.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const cartItemJson = JSON.stringify({
    id: object.object_id,
    title: object.title,
    priceCents,
    image: cartImageForObject(object),
    quantity: 1,
  }).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} - Reverent Inquiry</title>
  <meta name="description" content="${description}" />
  <style>
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #24313a; background: linear-gradient(180deg,#f3fbff,#fffefb 48%,#f7faf8); }
    main { max-width: 1180px; margin: 0 auto; padding: 44px 24px 72px; }
    a { color: inherit; text-decoration: none; }
    .back { color: #6f7f88; font-size: 14px; }
    .hero { display: grid; grid-template-columns: minmax(0, 1.02fr) minmax(340px, .8fr); gap: 34px; align-items: start; margin-top: 38px; }
    .gallery-stack { display: grid; gap: 14px; }
    .image { min-height: 560px; border: 1px solid rgba(199,215,223,.5); border-radius: 18px; overflow: hidden; background: rgba(255,255,255,.72); box-shadow: 0 24px 70px rgba(38,61,78,.055); }
    .image img, .image video { width: 100%; height: 100%; min-height: 560px; object-fit: cover; opacity: .92; display: block; }
    .image video { background: #111; }
    .media-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
    .media-strip figure { margin: 0; overflow: hidden; border: 1px solid rgba(199,215,223,.48); border-radius: 12px; background: rgba(255,255,255,.64); }
    .media-strip img, .media-strip video { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; background: #111; }
    .media-strip figcaption { padding: 7px 8px; color: #7b8990; font-size: 11px; }
    .buy-box { position: sticky; top: 20px; border: 1px solid rgba(199,215,223,.56); border-radius: 18px; background: rgba(255,255,255,.72); padding: 24px; box-shadow: 0 20px 60px rgba(38,61,78,.05); }
    .eyebrow { color: #7b8990; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; }
    h1 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(44px, 6vw, 76px); line-height: 1.04; font-weight: 400; margin: 18px 0; }
    h2 { font-family: Georgia, "Times New Roman", serif; font-size: 32px; line-height: 1.18; font-weight: 400; margin: 10px 0 0; }
    .copy { color: #61727d; font-size: 15px; line-height: 2; }
    .price { font-size: 26px; margin-top: 28px; }
    .commerce { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 28px; }
    button, .cart-link { border-radius: 10px; border: 1px solid rgba(36,49,58,.14); padding: 13px 18px; font-size: 14px; cursor: pointer; }
    button { background: #24313a; color: white; }
    button:disabled { cursor: not-allowed; background: rgba(255,255,255,.64); color: #7b8990; }
    .cart-link { background: rgba(255,255,255,.72); color: #24313a; }
    .state { width: 100%; color: #6f7f88; font-size: 12px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
    .tags span { border: 1px solid rgba(215,229,234,.8); border-radius: 999px; background: rgba(255,255,255,.62); padding: 7px 12px; color: #6f7f88; font-size: 12px; }
    .buy-facts { display: grid; gap: 10px; margin-top: 24px; }
    .buy-fact { display: flex; justify-content: space-between; gap: 16px; border-top: 1px solid rgba(215,229,234,.58); padding-top: 10px; color: #61727d; font-size: 13px; }
    .buy-fact strong { color: #24313a; font-weight: 500; text-align: right; }
    .panel { border-top: 1px solid rgba(215,229,234,.72); margin-top: 48px; padding-top: 32px; display: grid; grid-template-columns: .36fr .64fr; gap: 28px; }
    .story-section { border-top: 1px solid rgba(215,229,234,.72); margin-top: 44px; padding-top: 34px; display: grid; grid-template-columns: .32fr .68fr; gap: 32px; }
    .story-copy { display: grid; gap: 16px; }
    .info-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 44px; }
    .info-card { border: 1px solid rgba(199,215,223,.46); border-radius: 14px; background: rgba(255,255,255,.62); padding: 18px; }
    .info-card h3 { margin: 0; font-size: 15px; color: #24313a; }
    .info-card p { margin: 12px 0 0; color: #61727d; font-size: 13px; line-height: 1.8; }
    .detail-module { border-top: 1px solid rgba(215,229,234,.72); margin-top: 44px; padding-top: 32px; display: grid; grid-template-columns: .34fr .66fr; gap: 28px; }
    .media-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .media-card { margin: 0; overflow: hidden; border: 1px solid rgba(199,215,223,.46); border-radius: 14px; background: rgba(255,255,255,.72); }
    .media-card img, .media-card video { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; background: #111; }
    .media-card figcaption { padding: 10px 12px; color: #7b8990; font-size: 12px; }
    .empty { margin: 0; border: 1px dashed rgba(199,215,223,.72); border-radius: 14px; padding: 24px; color: #7b8990; background: rgba(255,255,255,.48); }
    .specs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-top: 44px; }
    .spec { border: 1px solid rgba(199,215,223,.46); border-radius: 14px; background: rgba(255,255,255,.58); padding: 16px; }
    .spec dt { color: #7b8990; font-size: 12px; }
    .spec dd { margin: 8px 0 0; color: #24313a; font-size: 14px; line-height: 1.7; }
    @media (max-width: 860px) { .hero, .panel, .detail-module, .story-section { grid-template-columns: 1fr; } .buy-box { position: static; } .image, .image img, .image video { min-height: 360px; } .media-grid, .specs, .info-grid { grid-template-columns: 1fr; } .media-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  </style>
</head>
<body>
  <main>
    <a class="back" href="/objects">Reverent Inquiry / Objects</a>
    <section class="hero">
      <div class="gallery-stack">
        <figure class="image">${renderMedia(primaryMedia, object.title)}</figure>
        ${renderMediaStrip(object)}
      </div>
      <aside class="buy-box">
        <p class="eyebrow">${escapeHtml(object.object_id)}</p>
        <h1>${title}</h1>
        <p class="copy">${description}</p>
        <p class="price">${escapeHtml(object.price)} ${escapeHtml(object.currency)}</p>
        <div class="commerce">
          <button id="add-to-cart" type="button" ${canAddToCart ? "" : "disabled"}>${canAddToCart ? "Keep Nearby" : "Unavailable"}</button>
          <a class="cart-link" href="/cart">Cart</a>
          <p id="cart-state" class="state">${inventory > 0 ? `${inventory} available. Order request is reviewed by a human before payment.` : "Inventory unavailable."}</p>
        </div>
        <div class="tags">${tags}</div>
        <div class="buy-facts">
          <div class="buy-fact"><span>Status</span><strong>${inventory > 0 ? "Available" : "Unavailable"}</strong></div>
          <div class="buy-fact"><span>Inventory</span><strong>${escapeHtml(inventory)}</strong></div>
          <div class="buy-fact"><span>Category</span><strong>${escapeHtml(object.category || object.collection || "wind-objects")}</strong></div>
          <div class="buy-fact"><span>Human review</span><strong>Before payment</strong></div>
        </div>
      </aside>
    </section>

    <section class="panel">
      <div>
        <p class="eyebrow">Product Detail Runtime</p>
        <h2>One object_id, one operational product page.</h2>
      </div>
      <p class="copy">This object was uploaded, reviewed, and published as a standard object_id. The page separates first-screen media, purchase facts, story, material truth, scene evidence, shipping, after-sales, and media proof so operations can keep selling details clear.</p>
    </section>

    <dl class="specs">
      <div class="spec"><dt>Source</dt><dd>${escapeHtml(object.intake_id || "object-intake")}</dd></div>
      <div class="spec"><dt>Category</dt><dd>${escapeHtml(object.category || object.collection || "wind-objects")}</dd></div>
      <div class="spec"><dt>Inventory</dt><dd>${escapeHtml(object.inventory || 0)}</dd></div>
      <div class="spec"><dt>Shipping</dt><dd>Confirmed before payment.</dd></div>
    </dl>

    <section class="story-section">
      <div>
        <p class="eyebrow">Object Story</p>
        <h2>Why this object is here.</h2>
      </div>
      <div class="story-copy">
        <p class="copy">${productStory}</p>
        <p class="copy">${escapeHtml(object.placement_suggestion || "Placement is reviewed against real room use, not only product photography.")}</p>
      </div>
    </section>

    <section class="info-grid" aria-label="Product facts">
      <article class="info-card"><h3>Material & condition</h3><p>${material}</p></article>
      <article class="info-card"><h3>Size & scale</h3><p>${sizeText}</p></article>
      <article class="info-card"><h3>Shipping & after-sales</h3><p>${shippingNote}</p></article>
      <article class="info-card"><h3>Purchase review</h3><p>${riskNotes}</p></article>
      <article class="info-card"><h3>Media standard</h3><p>White object image uses the RI 2400 x 2400 base when available. Video can lead the page, but image fallback remains required.</p></article>
      <article class="info-card"><h3>Order flow</h3><p>Add to cart creates an order request first. Payment, address, stock, packaging, and shipping are confirmed by operations.</p></article>
    </section>

    ${renderDetailModules(object)}
  </main>
  <script>
    (() => {
      const button = document.getElementById("add-to-cart");
      const state = document.getElementById("cart-state");
      if (!button || button.disabled) return;
      const item = ${cartItemJson};
      const cartKey = "taoist365-quiet-cart";
      button.addEventListener("click", () => {
        let cart = [];
        try {
          cart = JSON.parse(window.localStorage.getItem(cartKey) || "[]");
        } catch {
          cart = [];
        }
        const existing = cart.find((entry) => entry.id === item.id);
        const next = existing
          ? cart.map((entry) => entry.id === item.id ? { ...entry, quantity: Math.min((entry.quantity || 1) + 1, 9) } : entry)
          : [...cart, item];
        window.localStorage.setItem(cartKey, JSON.stringify(next));
        window.dispatchEvent(new Event("quiet-cart-change"));
        button.textContent = "Kept Nearby";
        state.textContent = "Added to cart. You can review it before creating an order request.";
        window.setTimeout(() => {
          button.textContent = "Keep Nearby";
        }, 1800);
      });
    })();
  </script>
</body>
</html>`;
}
