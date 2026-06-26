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

function renderDetailModules(object) {
  const modules = [
    ["Gallery", "Main listing images and source traces.", mediaByTypes(object, ["main", "original"])],
    ["Material details", "Texture, condition, closeups, defects, scale, and handmade evidence.", mediaByTypes(object, ["detail"])],
    ["Placed in life", "Room, desk, shelf, PC detail, and mobile detail scenes.", mediaByTypes(object, ["scene", "pc", "mobile"])],
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
    main { max-width: 1120px; margin: 0 auto; padding: 44px 24px 72px; }
    a { color: inherit; text-decoration: none; }
    .back { color: #6f7f88; font-size: 14px; }
    .hero { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(320px, .82fr); gap: 40px; align-items: center; margin-top: 38px; }
    .image { min-height: 520px; border: 1px solid rgba(199,215,223,.5); border-radius: 18px; overflow: hidden; background: rgba(255,255,255,.72); box-shadow: 0 24px 70px rgba(38,61,78,.055); }
    .image img, .image video { width: 100%; height: 100%; min-height: 520px; object-fit: cover; opacity: .92; display: block; }
    .image video { background: #111; }
    .eyebrow { color: #7b8990; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; }
    h1 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(44px, 6vw, 76px); line-height: 1.04; font-weight: 400; margin: 18px 0; }
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
    .panel { border-top: 1px solid rgba(215,229,234,.72); margin-top: 48px; padding-top: 32px; display: grid; grid-template-columns: .36fr .64fr; gap: 28px; }
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
    @media (max-width: 860px) { .hero, .panel, .detail-module { grid-template-columns: 1fr; } .image, .image img, .image video { min-height: 360px; } .media-grid, .specs { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <a class="back" href="/objects">Reverent Inquiry / Objects</a>
    <section class="hero">
      <figure class="image">${renderMedia(primaryMedia, object.title)}</figure>
      <aside>
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
      </aside>
    </section>
    <section class="panel">
      <div>
        <p class="eyebrow">Object Intake</p>
        <h2>Published through the VL object pipeline.</h2>
      </div>
      <p class="copy">This object was uploaded, reviewed, and published as a standard object_id. Main media supports either image or video. Air Engine media generation is reserved at the object runtime level.</p>
    </section>
    <dl class="specs">
      <div class="spec"><dt>Source</dt><dd>${escapeHtml(object.intake_id || "object-intake")}</dd></div>
      <div class="spec"><dt>Category</dt><dd>${escapeHtml(object.category || object.collection || "wind-objects")}</dd></div>
      <div class="spec"><dt>Inventory</dt><dd>${escapeHtml(object.inventory || 0)}</dd></div>
      <div class="spec"><dt>Shipping</dt><dd>Confirmed before payment.</dd></div>
    </dl>
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
