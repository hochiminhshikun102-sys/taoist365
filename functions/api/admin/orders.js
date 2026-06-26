import { json, readStore } from "../../_object-intake.js";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get("status");
  const query = String(url.searchParams.get("q") || "").toLowerCase();
  const store = await readStore(context.env);

  let rows = [...store.commerceOrders].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  if (status && status !== "all") rows = rows.filter((order) => order.status === status);
  if (query) {
    rows = rows.filter((order) =>
      [
        order.id,
        order.order_id,
        order.status,
        order.contact?.name,
        order.contact?.email,
        ...(order.items || []).map((item) => `${item.object_id} ${item.title}`),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  return json({
    rows,
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  });
}
