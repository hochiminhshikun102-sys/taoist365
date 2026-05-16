const STRIPE_API_VERSION = "2026-04-22.dahlia";

const PRODUCT_CATALOG = {
  "VEL-WD-001": { name: "Flow Soft", price: 34 },
  "VEL-WD-002": { name: "Night Ease", price: 34 },
  "VEL-WD-003": { name: "Cycle Calm", price: 34 },
  "VEL-WD-004": { name: "Belly Light", price: 34 },
  "VEL-WD-005": { name: "Mind Unfold", price: 34 },
  "VEL-WD-006": { name: "Fresh Unwind", price: 34 },
  "VEL-FR-001": { name: "Warm Rise", price: 34 },
  "VEL-FR-002": { name: "Body Gentle Warm", price: 34 },
  "VEL-FR-003": { name: "Mood Bright", price: 34 },
  "VEL-FR-004": { name: "Focus Glow", price: 34 },
  "VEL-FR-005": { name: "Daily Spark", price: 34 },
  "VEL-FR-006": { name: "Heart Light", price: 34 },
  "VEL-ER-001": { name: "Core Nourish", price: 34 },
  "VEL-ER-002": { name: "Light Digest", price: 34 },
  "VEL-ER-003": { name: "Stable Mind", price: 34 },
  "VEL-ER-004": { name: "Body Ground", price: 34 },
  "VEL-ER-005": { name: "Soft Restore", price: 34 },
  "VEL-ER-006": { name: "Daily Balance", price: 34 },
  "VEL-MT-001": { name: "Pure Breath", price: 34 },
  "VEL-MT-002": { name: "Skin Soft Calm", price: 34 },
  "VEL-MT-003": { name: "Boundary Peace", price: 34 },
  "VEL-MT-004": { name: "Clear Sense", price: 34 },
  "VEL-MT-005": { name: "Mild Purify", price: 34 },
  "VEL-MT-006": { name: "Fresh Shield", price: 34 },
  "VEL-WT-001": { name: "Deep Quiet", price: 34 },
  "VEL-WT-002": { name: "Night Deep Rest", price: 34 },
  "VEL-WT-003": { name: "Pressure Ease", price: 34 },
  "VEL-WT-004": { name: "Inner Soft", price: 34 },
  "VEL-WT-005": { name: "Slow Restore", price: 34 },
  "VEL-WT-006": { name: "Hormone Soft Balance", price: 34 },
  "VEL-OB-001": { name: "Window Crystal Garden", price: 48 },
  "VEL-OB-002": { name: "Clear Star Window Chime", price: 28 },
  "VEL-OB-003": { name: "Ceramic Lotus Glow Lamp", price: 42 },
  "VEL-OB-004": { name: "Arc Brass Incense Stand", price: 36 },
  "VEL-OB-005": { name: "Color Glass Table Lamp", price: 62 },
  "VEL-OB-006": { name: "Walnut Pocket Case", price: 24 },
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

function normalizeCart(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("Cart is empty.");
  }

  return cart.map((item) => {
    const sku = String(item?.sku || "").trim();
    const catalogItem = PRODUCT_CATALOG[sku];
    const qty = Math.max(1, Math.min(12, Number.parseInt(item?.qty, 10) || 1));

    if (!catalogItem) {
      throw new Error(`Unsupported item: ${sku}`);
    }

    return { sku, qty, ...catalogItem };
  });
}

export async function onRequestPost(context) {
  const secretKey = context.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return json({ error: "Stripe secret key is not configured." }, 500);
  }

  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid checkout request." }, 400);
  }

  let cart;
  try {
    cart = normalizeCart(payload.cart);
  } catch (error) {
    return json({ error: error.message }, 400);
  }

  const origin = new URL(context.request.url).origin;
  const form = new URLSearchParams();
  form.set("ui_mode", "elements");
  form.set("mode", "payment");
  form.set("return_url", `${origin}/store/checkout?session_id={CHECKOUT_SESSION_ID}`);
  form.set("billing_address_collection", "required");
  form.set("phone_number_collection[enabled]", "true");
  form.set("shipping_address_collection[allowed_countries][0]", "US");
  form.set("metadata[source]", "velune_storefront");
  form.set("metadata[cart_skus]", cart.map((item) => `${item.sku}x${item.qty}`).join(","));

  cart.forEach((item, index) => {
    form.set(`line_items[${index}][price_data][currency]`, "usd");
    form.set(`line_items[${index}][price_data][unit_amount]`, String(item.price * 100));
    form.set(`line_items[${index}][price_data][product_data][name]`, item.name);
    form.set(`line_items[${index}][price_data][product_data][metadata][sku]`, item.sku);
    form.set(`line_items[${index}][quantity]`, String(item.qty));
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${secretKey}`,
      "content-type": "application/x-www-form-urlencoded",
      "stripe-version": STRIPE_API_VERSION,
    },
    body: form,
  });

  const session = await response.json();
  if (!response.ok) {
    return json({ error: session?.error?.message || "Unable to create Stripe checkout session." }, response.status);
  }

  return json({ clientSecret: session.client_secret, id: session.id });
}
