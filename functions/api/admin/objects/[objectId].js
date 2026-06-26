import { createAuditLog, json, nowIso, updateStore } from "../../../_object-intake.js";

const allowedStatuses = new Set(["published", "archived"]);

export async function onRequestPatch(context) {
  const { objectId } = context.params;
  const payload = await context.request.json().catch(() => ({}));
  let updated = null;
  let missing = false;
  let invalid = "";

  await updateStore(context.env, (store) => {
    const object = store.objects.find((item) => item.object_id === objectId || item.id === objectId || item.slug === objectId);
    if (!object) {
      missing = true;
      return store;
    }

    const nextStatus = payload.status === undefined ? object.status || "published" : String(payload.status);
    if (!allowedStatuses.has(nextStatus)) {
      invalid = "Object status must be published or archived.";
      return store;
    }

    const nextInventory = payload.inventory === undefined ? object.inventory : Number.parseInt(String(payload.inventory), 10);
    if (!Number.isFinite(nextInventory) || nextInventory < 0) {
      invalid = "Inventory must be a non-negative number.";
      return store;
    }

    const before = { ...object };
    updated = {
      ...object,
      status: nextStatus,
      price: payload.price === undefined ? object.price : String(payload.price || object.price || ""),
      inventory: nextInventory,
      updated_at: nowIso(),
    };

    return {
      ...store,
      objects: store.objects.map((item) => (item.object_id === object.object_id ? updated : item)),
      adminAuditLogs: [
        createAuditLog("updated_object", "object", object.object_id, before, updated, payload.admin_note || `Object updated to ${nextStatus}.`),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Object not found." }, 404);
  if (invalid) return json({ error: invalid }, 400);
  return json({ object: updated });
}
