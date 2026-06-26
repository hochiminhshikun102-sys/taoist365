import { createAuditLog, json, makeId, nowIso, updateStore } from "../_object-intake.js";

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid order payload." }, 400);
  }

  const items = Array.isArray(payload?.items) ? payload.items.map(normalizeItem).filter(Boolean) : [];
  const contact = normalizeContact(payload?.contact || {});
  if (items.length === 0) return json({ error: "Order needs at least one item." }, 400);
  if (!contact.name || !contact.email || !contact.address) return json({ error: "Name, email, and shipping address are required." }, 400);

  const now = nowIso();
  const subtotal_cents = items.reduce((total, item) => total + item.price_cents * item.quantity, 0);
  const order = {
    id: makeOrderNo(),
    order_id: makeId("order"),
    status: "request_received",
    payment_status: "pending_manual_confirmation",
    fulfillment_status: "not_started",
    contact,
    items,
    subtotal_cents,
    currency: "USD",
    note: String(payload?.note || contact.note || ""),
    source: "frontstage_cart",
    audit_notes: [],
    created_at: now,
    updated_at: now,
  };

  await updateStore(context.env, async (store) => ({
    ...store,
    commerceOrders: [order, ...store.commerceOrders],
    adminAuditLogs: [
      createAuditLog("order_request_created", "commerce_order", order.order_id, null, order, `Order request ${order.id} created.`, "frontstage"),
      ...store.adminAuditLogs,
    ],
  }));

  return json({ order, order_no: order.id }, 201);
}

function normalizeContact(value) {
  return {
    name: String(value.name || "").trim().slice(0, 120),
    email: String(value.email || "").trim().slice(0, 180),
    address: String(value.address || "").trim().slice(0, 1000),
    note: String(value.note || "").trim().slice(0, 1000),
  };
}

function normalizeItem(value) {
  const id = String(value?.id || "").trim();
  const title = String(value?.title || "").trim();
  const quantity = Math.max(1, Math.min(99, Number.parseInt(String(value?.quantity || "1"), 10) || 1));
  const price_cents = Math.max(0, Number.parseInt(String(value?.priceCents ?? value?.price_cents ?? "0"), 10) || 0);
  if (!id || !title || price_cents <= 0) return null;
  return {
    object_id: id,
    title,
    quantity,
    price_cents,
    image: String(value?.image || "").slice(0, 1000),
  };
}

function makeOrderNo() {
  return `DH-ORD-${Date.now().toString().slice(-7)}`;
}
