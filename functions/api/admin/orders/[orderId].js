import { createAuditLog, json, nowIso, updateStore } from "../../../_object-intake.js";

const allowedStatuses = new Set(["request_received", "confirmed", "payment_pending", "paid", "packing", "shipped", "completed", "cancelled"]);

export async function onRequestPatch(context) {
  const { orderId } = context.params;
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid order update." }, 400);
  }

  const nextStatus = String(payload.status || "");
  if (nextStatus && !allowedStatuses.has(nextStatus)) return json({ error: "Invalid order status." }, 400);

  let updated = null;
  let missing = false;
  await updateStore(context.env, async (store) => {
    const order = store.commerceOrders.find((item) => item.order_id === orderId || item.id === orderId);
    if (!order) {
      missing = true;
      return store;
    }

    const now = nowIso();
    const before = { ...order };
    updated = {
      ...order,
      status: nextStatus || order.status,
      payment_status: payload.payment_status ? String(payload.payment_status) : order.payment_status,
      fulfillment_status: payload.fulfillment_status ? String(payload.fulfillment_status) : order.fulfillment_status,
      tracking: payload.tracking ? String(payload.tracking).slice(0, 240) : order.tracking || "",
      admin_note: payload.admin_note ? String(payload.admin_note).slice(0, 1000) : order.admin_note || "",
      audit_notes: [
        {
          at: now,
          status: nextStatus || order.status,
          note: String(payload.admin_note || "Admin order update.").slice(0, 1000),
        },
        ...(order.audit_notes || []),
      ].slice(0, 40),
      updated_at: now,
    };

    return {
      ...store,
      commerceOrders: store.commerceOrders.map((item) => (item.order_id === order.order_id ? updated : item)),
      adminAuditLogs: [
        createAuditLog("order_updated", "commerce_order", order.order_id, before, updated, payload.admin_note || `Order ${order.id} updated.`),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Order not found." }, 404);
  return json({ order: updated });
}
