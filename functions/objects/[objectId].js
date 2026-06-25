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

function renderObjectHtml(object) {
  const title = escapeHtml(object.title);
  const description = escapeHtml(object.description);
  const image = escapeHtml(object.primary_image_url || "/homepage-hero/windkeep-lantern-sea.png");
  const tags = (object.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");

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
    .image img { width: 100%; height: 100%; min-height: 520px; object-fit: cover; opacity: .9; display: block; }
    .eyebrow { color: #7b8990; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; }
    h1 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(44px, 6vw, 76px); line-height: 1.04; font-weight: 400; margin: 18px 0; }
    .copy { color: #61727d; font-size: 15px; line-height: 2; }
    .price { font-size: 26px; margin-top: 28px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
    .tags span { border: 1px solid rgba(215,229,234,.8); border-radius: 999px; background: rgba(255,255,255,.62); padding: 7px 12px; color: #6f7f88; font-size: 12px; }
    .panel { border-top: 1px solid rgba(215,229,234,.72); margin-top: 48px; padding-top: 32px; display: grid; grid-template-columns: .36fr .64fr; gap: 28px; }
    @media (max-width: 860px) { .hero, .panel { grid-template-columns: 1fr; } .image, .image img { min-height: 360px; } }
  </style>
</head>
<body>
  <main>
    <a class="back" href="/objects">Reverent Inquiry / Objects</a>
    <section class="hero">
      <figure class="image"><img src="${image}" alt="${title}" /></figure>
      <aside>
        <p class="eyebrow">${escapeHtml(object.object_id)}</p>
        <h1>${title}</h1>
        <p class="copy">${description}</p>
        <p class="price">${escapeHtml(object.price)} ${escapeHtml(object.currency)}</p>
        <div class="tags">${tags}</div>
      </aside>
    </section>
    <section class="panel">
      <div>
        <p class="eyebrow">Object Intake</p>
        <h2>Published through the VL object pipeline.</h2>
      </div>
      <p class="copy">This object was uploaded, reviewed, and published as a standard object_id. Air Engine media generation is reserved at the object runtime level.</p>
    </section>
  </main>
</body>
</html>`;
}
