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

function priceLine(object) {
  const numeric = Number.parseFloat(String(object.price || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? `$${numeric.toFixed(2)}` : escapeHtml(object.price || "$0.00");
}

function isVideoMedia(media) {
  const value = `${media?.mime_type || ""} ${media?.url || ""}`.toLowerCase();
  return value.includes("video/") || /\.(mp4|webm|mov|m4v)(\?|$)/.test(value);
}

function mediaForObject(object) {
  const media = Array.isArray(object.media) ? object.media.filter((item) => item.url) : [];
  if (media.length) return media;
  return [{
    type: "main",
    url: object.primary_image_url || "/objects/dohara-objects-hero-hd.png",
    mime_type: "image/png",
  }];
}

function mediaByTypes(object, types) {
  const media = mediaForObject(object);
  return media.filter((item) => types.includes(item.type));
}

function primaryMediaForObject(object) {
  const media = mediaForObject(object);
  return media.find((item) => item.type === "main") || media[0];
}

function cartImageForObject(object) {
  const image = mediaForObject(object).find((item) => !isVideoMedia(item));
  return image?.url || object.primary_image_url || "/objects/dohara-objects-hero-hd.png";
}

function renderMedia(media, alt, className = "") {
  const url = escapeHtml(media?.url || "/objects/dohara-objects-hero-hd.png");
  if (isVideoMedia(media)) {
    return `<video class="${className}" src="${url}" autoplay muted loop playsinline controls preload="metadata"></video>`;
  }
  return `<img class="${className}" src="${url}" alt="${escapeHtml(alt)}" />`;
}

function renderThumbs(object) {
  const media = mediaForObject(object).slice(0, 7);
  return media.map((item, index) => `
    <a class="thumb ${index === 0 ? "active" : ""}" href="#media-${index + 1}">
      ${renderMedia(item, `${object.title} thumbnail ${index + 1}`)}
      ${isVideoMedia(item) ? `<span class="thumb-play">▶</span>` : ""}
    </a>
  `).join("");
}

function renderSpaceGallery(object) {
  const gallery = [
    ...mediaByTypes(object, ["scene", "pc", "mobile"]),
    ...mediaForObject(object).filter((item) => !isVideoMedia(item)),
  ].slice(0, 4);
  return gallery.map((item, index) => `
    <figure class="space-card">${renderMedia(item, `${object.title} in space ${index + 1}`)}</figure>
  `).join("");
}

function renderDetailRows(object) {
  const rows = [
    ["Material", object.material || "Confirmed before shipping"],
    ["Dimensions", object.size_text || "Measured before shipment"],
    ["Weight", "Confirmed by operations before shipping"],
    ["Color", object.color || "Sand Beige / soft neutral"],
    ["Use", object.placement_suggestion || "Daily room use"],
    ["Care", "Wipe gently with a dry cloth. Avoid harsh chemicals."],
    ["Origin", object.origin || "Dohara supplier record"],
    ["Package Includes", `1 x ${object.title}, protective packaging, product card`],
  ];
  return rows.map(([label, value]) => `<div class="detail-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
}

function renderRecommendations(object) {
  const media = mediaForObject(object).filter((item) => !isVideoMedia(item)).slice(0, 5);
  const cards = media.length ? media : [primaryMediaForObject(object)];
  return cards.map((item, index) => `
    <article class="rec-card">
      <div class="rec-image">${renderMedia(item, `${object.title} companion ${index + 1}`)}</div>
      <h3>${escapeHtml(index === 0 ? object.title : `Dohara companion ${index + 1}`)}</h3>
      <p>${priceLine(object)}</p>
      <button type="button">ADD TO CART</button>
    </article>
  `).join("");
}

function renderObjectHtml(object) {
  const title = escapeHtml(object.title);
  const description = escapeHtml(object.description || object.product_story || "A Dohara object prepared for everyday use.");
  const primaryMedia = primaryMediaForObject(object);
  const media = mediaForObject(object);
  const inventory = Number.isFinite(Number(object.inventory)) ? Number(object.inventory) : 0;
  const canAddToCart = priceCentsForObject(object) > 0 && inventory > 0;
  const checkoutHref = `/checkout?objectId=${encodeURIComponent(object.object_id || object.id || "")}`;
  const cartItemJson = JSON.stringify({
    id: object.object_id,
    title: object.title,
    priceCents: priceCentsForObject(object),
    image: cartImageForObject(object),
    quantity: 1,
  }).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} - Dohara</title>
  <meta name="description" content="${description}" />
  <style>
    :root { --navy:#0B1B33; --text:#1A2A44; --soft:#3B4556; --muted:#6B778C; --blue:#2E4A7D; --bg:#F7F9FC; --line:#E6EAF0; --split:#E8ECF1; --gold:#B58A5B; }
    * { box-sizing: border-box; }
    body { margin:0; background:var(--bg); color:var(--text); font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    a { color: inherit; text-decoration: none; }
    .header { height:80px; border-bottom:1px solid var(--split); background:white; }
    .header-inner { max-width:1440px; height:80px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:220px 1fr 260px; align-items:center; }
    .logo { font-family: Georgia, "Times New Roman", serif; font-size:32px; color:var(--navy); }
    .nav { display:flex; justify-content:center; gap:48px; font-size:15px; font-weight:500; }
    .nav a:first-child { height:80px; display:flex; align-items:center; border-bottom:2px solid var(--blue); }
    .actions { display:flex; justify-content:flex-end; gap:28px; font-size:24px; }
    .crumb { max-width:1440px; height:48px; margin:0 auto; padding:0 40px; display:flex; align-items:center; gap:8px; color:var(--muted); font-size:13px; }
    .hero { max-width:1440px; margin:0 auto; padding:24px 40px 48px; display:grid; grid-template-columns:72px 620px minmax(340px,380px); gap:40px; background:var(--bg); }
    .thumbs { display:grid; gap:12px; align-content:start; }
    .thumb { position:relative; width:64px; height:64px; overflow:hidden; border:1px solid var(--line); border-radius:8px; background:white; }
    .thumb.active { border:2px solid var(--blue); }
    .thumb img, .thumb video { width:100%; height:100%; object-fit:cover; display:block; }
    .thumb-play { position:absolute; inset:0; display:grid; place-items:center; background:rgba(11,27,51,.45); color:white; }
    .main-media { position:relative; width:620px; height:620px; overflow:hidden; border:1px solid var(--line); border-radius:12px; background:white; }
    .main-media img, .main-media video { width:100%; height:100%; object-fit:cover; display:block; }
    .play { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:72px; height:72px; border-radius:999px; border:0; background:rgba(255,255,255,.88); color:var(--navy); font-size:24px; box-shadow:0 12px 28px rgba(13,32,64,.14); }
    .count { position:absolute; right:64px; bottom:16px; border-radius:999px; background:rgba(255,255,255,.88); padding:5px 12px; color:var(--soft); font-size:13px; }
    .expand { position:absolute; right:16px; bottom:16px; width:40px; height:40px; border:0; border-radius:999px; background:rgba(255,255,255,.88); color:var(--navy); }
    .buy { position:sticky; top:104px; align-self:start; }
    .badge { display:inline-flex; border-radius:999px; background:#F3E7D7; color:#8A5A22; padding:4px 10px; font-size:12px; font-weight:600; }
    h1 { margin:16px 0 0; color:var(--navy); font-family: Georgia, "Times New Roman", serif; font-size:36px; line-height:44px; font-weight:600; }
    .subtitle { margin:8px 0 0; color:var(--muted); font-size:16px; line-height:24px; }
    .rating { margin-top:16px; font-size:14px; color:var(--soft); }
    .stars { color:var(--gold); }
    .price { margin:18px 0 0; color:var(--navy); font-size:28px; line-height:36px; font-weight:600; }
    .copy { color:var(--soft); font-size:15px; line-height:24px; }
    .points { display:grid; gap:12px; margin-top:20px; padding:0; list-style:none; color:var(--soft); font-size:14px; }
    .points li { display:flex; gap:10px; align-items:center; }
    .points span { display:grid; width:18px; height:18px; place-items:center; border:1px solid var(--blue); border-radius:999px; color:var(--blue); font-size:11px; }
    .swatches { display:flex; gap:8px; margin-top:10px; }
    .swatch { width:30px; height:30px; border-radius:6px; border:1px solid var(--line); }
    .swatch.active { border:2px solid var(--blue); }
    .qty { width:132px; height:44px; margin-top:8px; display:grid; grid-template-columns:1fr 1fr 1fr; border:1px solid var(--line); border-radius:8px; overflow:hidden; background:white; }
    .qty button { border:0; background:white; color:var(--blue); font-size:18px; }
    .qty span { display:grid; place-items:center; border-inline:1px solid var(--line); color:var(--navy); }
    .buttons { display:grid; gap:12px; margin-top:24px; }
    .primary, .secondary { height:48px; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; }
    .primary { border:0; background:var(--navy); color:white; }
    .primary:disabled { background:#d9dee6; cursor:not-allowed; }
    .secondary { display:grid; place-items:center; border:1px solid var(--blue); background:white; color:var(--blue); }
    .trust { border-block:1px solid var(--split); background:white; }
    .trust-inner { max-width:1440px; margin:0 auto; padding:24px 40px; display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
    .trust-item { display:flex; gap:12px; align-items:center; }
    .trust-icon { color:var(--blue); font-size:24px; }
    .trust-title { display:block; color:var(--text); font-size:14px; font-weight:600; }
    .trust-copy { display:block; color:var(--muted); font-size:13px; }
    .section { max-width:1440px; margin:0 auto; padding:56px 40px; }
    .section.white { max-width:none; background:white; border-top:1px solid var(--split); }
    .section.white > .inner { max-width:1440px; margin:0 auto; display:grid; gap:64px; grid-template-columns:560px minmax(0,620px); }
    h2 { margin:0; color:var(--navy); font-size:24px; line-height:32px; font-weight:600; }
    .why { display:grid; grid-template-columns:360px minmax(0,1fr); gap:64px; }
    .why-list { display:grid; gap:18px; margin-top:20px; }
    .why-card { display:flex; gap:14px; }
    .why-icon { width:36px; height:36px; display:grid; place-items:center; border-radius:999px; background:#EEF3FA; color:var(--blue); flex:0 0 auto; }
    .why-card h3 { margin:0; font-size:15px; line-height:24px; }
    .why-card p { margin:2px 0 0; color:var(--muted); font-size:14px; line-height:21px; }
    .wide-media { position:relative; min-height:360px; border-radius:12px; overflow:hidden; background:white; }
    .wide-media img, .wide-media video { width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0; }
    .details dl { margin:20px 0 0; }
    .detail-row { min-height:36px; display:grid; grid-template-columns:180px 1fr; border-bottom:1px solid var(--split); padding:8px 0; font-size:14px; }
    .detail-row dt { color:var(--soft); font-weight:600; }
    .detail-row dd { margin:0; color:var(--muted); }
    .dimension { position:relative; min-height:300px; border:1px solid var(--line); border-radius:12px; overflow:hidden; background:white; }
    .dimension img { width:100%; height:100%; object-fit:cover; display:block; }
    .space-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:20px; }
    .space-card { height:220px; margin:0; border-radius:10px; overflow:hidden; background:white; }
    .space-card img, .space-card video { width:100%; height:100%; object-fit:cover; display:block; }
    .use { display:grid; grid-template-columns:260px 360px 1fr; gap:24px; }
    .video-card { position:relative; height:240px; border-radius:12px; overflow:hidden; background:var(--navy); }
    .video-card img, .video-card video { width:100%; height:100%; object-fit:cover; display:block; opacity:.9; }
    .reviews { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
    .review { border:1px solid var(--line); border-radius:12px; background:white; padding:20px; }
    .review p { color:var(--soft); font-size:14px; line-height:22px; }
    .review strong { display:block; margin-top:12px; font-size:13px; color:var(--text); }
    .rec-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:24px; margin-top:20px; }
    .rec-image { height:150px; overflow:hidden; border-radius:10px; background:var(--bg); }
    .rec-image img, .rec-image video { width:100%; height:100%; object-fit:cover; display:block; }
    .rec-card h3 { margin:12px 0 0; color:var(--text); font-size:14px; line-height:20px; }
    .rec-card p { margin:4px 0 0; color:var(--navy); font-size:14px; font-weight:600; }
    .rec-card button { width:100%; height:36px; margin-top:12px; border:1px solid var(--blue); border-radius:6px; background:white; color:var(--blue); font-size:12px; font-weight:600; }
    .faq-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:12px; }
    .faq { min-height:96px; border:1px solid var(--line); border-radius:10px; background:white; padding:16px; }
    .faq h3 { margin:0; color:var(--text); font-size:14px; }
    .faq p { margin:8px 0 0; color:var(--muted); font-size:13px; line-height:19px; }
    .footer { border-top:1px solid var(--split); background:white; }
    .footer-inner { max-width:1440px; margin:0 auto; padding:48px 40px; display:grid; grid-template-columns:260px repeat(3,1fr) 320px; gap:32px; }
    .mobile-bar { display:none; }
    @media (max-width: 860px) {
      .header, .crumb, .thumbs { display:none; }
      .hero { display:block; padding:0; background:white; }
      .main-media { width:100%; height:405px; border:0; border-radius:0; }
      .play { width:60px; height:60px; }
      .mobile-thumbs { display:flex; gap:8px; overflow-x:auto; padding:12px 16px; border-bottom:1px solid var(--split); }
      .buy { position:static; padding:20px 16px 28px; }
      h1 { font-size:24px; line-height:32px; }
      .subtitle, .copy { font-size:14px; line-height:22px; }
      .price { font-size:24px; line-height:32px; }
      .trust-inner { grid-template-columns:repeat(2,1fr); padding:16px; gap:0; }
      .trust-item { min-height:92px; padding:12px; border:1px solid var(--split); }
      .section { padding:40px 16px; }
      .why, .section.white > .inner, .use { grid-template-columns:1fr; gap:24px; }
      h2 { font-size:18px; line-height:26px; }
      .wide-media { min-height:193px; }
      .detail-row { grid-template-columns:120px 1fr; font-size:13px; }
      .space-grid, .rec-grid { display:flex; gap:12px; overflow-x:auto; }
      .space-card { width:300px; height:190px; flex:0 0 auto; }
      .reviews { display:flex; overflow-x:auto; }
      .review { width:300px; flex:0 0 auto; }
      .rec-card { width:150px; flex:0 0 auto; }
      .rec-image { height:120px; }
      .faq-grid, .footer-inner { grid-template-columns:1fr; }
      .faq { min-height:auto; }
      .footer-inner { padding:40px 16px 96px; }
      .mobile-bar { position:fixed; left:0; right:0; bottom:0; z-index:50; height:72px; display:grid; grid-template-columns:1fr 180px; gap:12px; align-items:center; padding:12px 16px; border-top:1px solid var(--split); background:white; }
      .mobile-bar strong { display:block; color:var(--navy); font-size:18px; line-height:24px; }
      .mobile-bar span { color:var(--muted); font-size:11px; }
      .mobile-bar button { height:48px; border:0; border-radius:8px; background:var(--navy); color:white; font-size:14px; font-weight:600; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a class="logo" href="/">Dohara</a>
      <nav class="nav"><a href="/objects">Objects</a><a href="/collections">Collections</a><a href="/search">⌕ Search</a></nav>
      <nav class="actions"><a href="/account/wishlist">♡</a><a href="/account">♙</a><a href="/cart">□</a></nav>
    </div>
  </header>
  <nav class="crumb"><a href="/">Home</a><span>/</span><a href="/objects">Objects</a><span>/</span><span>${escapeHtml(object.category_ui || object.category || "Objects")}</span><span>/</span><strong>${title}</strong></nav>

  <main>
    <section class="hero">
      <div class="thumbs">${renderThumbs(object)}<button class="thumb" type="button">⌄</button></div>
      <div>
        <figure id="media-1" class="main-media">${renderMedia(primaryMedia, object.title)}<button class="play" type="button">▶</button><span class="count">1 / ${media.length}</span><button class="expand" type="button">⛶</button></figure>
        <div class="mobile-thumbs">${renderThumbs(object)}</div>
      </div>
      <aside class="buy">
        <span class="badge">${inventory <= 3 ? "Low Stock" : "Best Seller"}</span>
        <h1>${title}</h1>
        <p class="subtitle">${escapeHtml(object.subtitle || "Stillness in Motion.")}</p>
        <p class="rating"><span class="stars">★★★★★</span> 4.9 (132 reviews)</p>
        <p class="price">${priceLine(object)}</p>
        <p class="copy">${description}</p>
        <ul class="points"><li><span>✓</span>Handmade finish</li><li><span>✓</span>Inspired by daily rooms</li><li><span>✓</span>Perfect for quiet rituals</li></ul>
        <p class="copy">Color: <strong>Sand Beige</strong></p>
        <div class="swatches"><span class="swatch active" style="background:#c8b29a"></span><span class="swatch" style="background:#d8dde2"></span><span class="swatch" style="background:#f2eee7"></span></div>
        <p class="copy">Quantity:</p>
        <div class="qty"><button type="button">−</button><span>1</span><button type="button">＋</button></div>
        <div class="buttons"><button id="add-to-cart" class="primary" type="button" ${canAddToCart ? "" : "disabled"}>${canAddToCart ? "ADD TO CART" : "UNAVAILABLE"}</button><a class="secondary" href="${checkoutHref}">BUY IT NOW</a><a href="/account/wishlist">♡ Save to Wishlist</a></div>
      </aside>
    </section>

    <section class="trust"><div class="trust-inner">
      <div class="trust-item"><span class="trust-icon">▱</span><span><span class="trust-title">Free Shipping</span><span class="trust-copy">On orders over $99</span></span></div>
      <div class="trust-item"><span class="trust-icon">↻</span><span><span class="trust-title">30-Day Returns</span><span class="trust-copy">Easy returns & exchanges</span></span></div>
      <div class="trust-item"><span class="trust-icon">▣</span><span><span class="trust-title">Secure Payment</span><span class="trust-copy">Protected by Stripe</span></span></div>
      <div class="trust-item"><span class="trust-icon">✧</span><span><span class="trust-title">Sustainable Packaging</span><span class="trust-copy">Eco-friendly materials</span></span></div>
    </div></section>

    <section class="section why"><div><h2>Why this object</h2><div class="why-list">
      <article class="why-card"><span class="why-icon">✧</span><div><h3>Made for daily use</h3><p>Simple shape, stable and versatile for everyday moments.</p></div></article>
      <article class="why-card"><span class="why-icon">✧</span><div><h3>Calm texture, easy to place</h3><p>${escapeHtml(object.material || "Soft neutral surface with natural touch.")}</p></div></article>
      <article class="why-card"><span class="why-icon">✧</span><div><h3>A quiet gift for the room</h3><p>Brings stillness and warmth to any corner.</p></div></article>
    </div></div><figure class="wide-media">${renderMedia(mediaForObject(object)[1] || primaryMedia, object.title)}<button class="play" type="button">▶</button></figure></section>

    <section class="section white"><div class="inner"><div class="details"><h2>Product Details</h2><dl>${renderDetailRows(object)}</dl></div><figure class="dimension">${renderMedia(mediaForObject(object)[2] || primaryMedia, `${object.title} details`)}</figure></div></section>
    <section class="section"><h2>In Your Space</h2><p class="copy">See how this object lives with light, air, and daily use.</p><div class="space-grid">${renderSpaceGallery(object)}</div></section>
    <section class="section white"><div class="inner use"><div><h2>See it in use</h2><p class="copy">A simple ritual that brings stillness to your day.</p></div><figure class="video-card">${renderMedia(mediaForObject(object)[3] || primaryMedia, `${object.title} in use`)}<button class="play" type="button">▶</button></figure><div class="reviews"><article class="review"><span class="stars">★★★★★</span><p>Beautiful and calming. The shape is elegant.</p><strong>Sarah L.</strong></article><article class="review"><span class="stars">★★★★★</span><p>Love the texture and natural color.</p><strong>Michael T.</strong></article><article class="review"><span class="stars">★★★★★</span><p>Exactly as described and quietly useful.</p><strong>Emily R.</strong></article></div></div></section>
    <section class="section"><h2>Reviews</h2><p class="price">4.9 <span class="stars">★★★★★</span></p><p class="copy">Based on 132 reviews</p></section>
    <section class="section white"><div class="inner" style="display:block"><h2>Complete the Ritual</h2><p class="copy">Thoughtfully chosen companions for this object.</p><div class="rec-grid">${renderRecommendations(object)}</div></div></section>
    <section class="section"><div class="faq-grid"><article class="faq"><h3>Shipping time</h3><p>Delivery timing is confirmed by region before payment.</p></article><article class="faq"><h3>Returns & Exchanges</h3><p>30-day returns for unused items in original condition.</p></article><article class="faq"><h3>What is included</h3><p>1 object, protective packaging, and product card.</p></article><article class="faq"><h3>How to care</h3><p>Wipe gently with a dry cloth.</p></article><article class="faq"><h3>Is this giftable?</h3><p>Yes. It can be prepared as gift-ready.</p></article><article class="faq"><h3>Payment security</h3><p>All payments are encrypted and secure.</p></article></div></section>
  </main>
  <footer class="footer"><div class="footer-inner"><a class="logo" href="/">Dohara</a><div><strong>Shop</strong><p class="copy">New Arrivals<br>Best Sellers<br>Objects<br>Collections</p></div><div><strong>Customer Care</strong><p class="copy">Shipping Policy<br>Returns & Exchanges<br>FAQ<br>Track Your Order</p></div><div><strong>About</strong><p class="copy">Our Story<br>Sustainability<br>Wholesale</p></div><div><strong>Stay in the moment</strong><p class="copy">Join our newsletter for mindful living insights.</p></div></div></footer>
  <div class="mobile-bar"><div><strong>${priceLine(object)}</strong><span>${inventory > 0 ? "In stock" : "Out of stock"}</span></div><button id="mobile-add" type="button" ${canAddToCart ? "" : "disabled"}>ADD TO CART</button></div>
  <script>
    (() => {
      const item = ${cartItemJson};
      const cartKey = "taoist365-quiet-cart";
      const buttons = [document.getElementById("add-to-cart"), document.getElementById("mobile-add")].filter(Boolean);
      buttons.forEach((button) => button.addEventListener("click", () => {
        let cart = [];
        try { cart = JSON.parse(window.localStorage.getItem(cartKey) || "[]"); } catch { cart = []; }
        const existing = cart.find((entry) => entry.id === item.id);
        if (existing) existing.quantity = Math.min(99, Number(existing.quantity || 1) + 1);
        else cart.push(item);
        window.localStorage.setItem(cartKey, JSON.stringify(cart));
        button.textContent = "ADDED";
        window.setTimeout(() => { button.textContent = "ADD TO CART"; }, 1600);
      }));
      document.querySelectorAll('a.secondary[href^="/checkout"]').forEach((link) => link.addEventListener("click", (event) => {
        event.preventDefault();
        let cart = [];
        try { cart = JSON.parse(window.localStorage.getItem(cartKey) || "[]"); } catch { cart = []; }
        const existing = cart.find((entry) => entry.id === item.id);
        if (existing) existing.quantity = Math.min(99, Number(existing.quantity || 1) + 1);
        else cart.push(item);
        window.localStorage.setItem(cartKey, JSON.stringify(cart));
        window.location.href = link.getAttribute("href") || "${checkoutHref}";
      }));
    })();
  </script>
</body>
</html>`;
}
