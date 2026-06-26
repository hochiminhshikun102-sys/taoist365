import { json, readStore } from "../../_object-intake.js";

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get("status") || "all";
  const commerceChannel = url.searchParams.get("commerce_channel");
  const goodsCondition = url.searchParams.get("goods_condition");
  const query = String(url.searchParams.get("q") || "").toLowerCase();
  const store = await readStore(context.env);

  let rows = [...store.objects].sort((a, b) => String(b.updated_at || b.published_at || "").localeCompare(String(a.updated_at || a.published_at || "")));
  if (status !== "all") rows = rows.filter((object) => (object.status || "published") === status);
  if (commerceChannel) rows = rows.filter((object) => (object.commerce_channel || "commerce_new") === commerceChannel);
  if (goodsCondition) rows = rows.filter((object) => (object.goods_condition || "new") === goodsCondition);
  if (query) {
    rows = rows.filter((object) =>
      [
        object.object_id,
        object.slug,
        object.title,
        object.category,
        object.collection,
        object.status,
        object.buyer_id,
        ...(object.tags || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  return json({
    rows,
    counts: {
      all: store.objects.length,
      published: store.objects.filter((object) => (object.status || "published") === "published").length,
      archived: store.objects.filter((object) => object.status === "archived").length,
    },
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  });
}
