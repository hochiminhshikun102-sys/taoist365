import { createAuditLog, json, nowIso, readStore, updateStore } from "../../../_object-intake.js";
import { denyResponse, enforceOfficialAction } from "../../../_publish-policy.js";

const allowedStatuses = new Set(["published", "archived"]);

export async function onRequestPatch(context) {
  const authz = enforceOfficialAction(context, "object_patch");
  if (authz.denied) return authz.denied;

  const payload = await context.request.json().catch(() => ({}));
  const { objectId } = context.params;
  const snapshot = await readStore(context.env);
  const current = snapshot.objects.find((item) => item.object_id === objectId || item.id === objectId || item.slug === objectId);
  if (!current) return json({ error: "Object not found." }, 404);

  const requestedStatus = payload.status === undefined ? undefined : String(payload.status);
  const isPublishTransition = requestedStatus === "published" && String(current.status || "") !== "published";
  if (isPublishTransition) {
    return denyResponse({
      ok: false,
      httpStatus: 403,
      code: "PUBLISH_GATE_REQUIRED",
      message: "Object PATCH cannot transition status to published. Use the authoritative publish handler.",
      write: false,
    });
  }

  let updated = null;
  let missing = false;
  let invalid = "";

  await updateStore(context.env, (store) => {
    const object = store.objects.find((item) => item.object_id === objectId || item.id === objectId || item.slug === objectId);
    if (!object) {
      missing = true;
      return store;
    }

    const nextStatus = requestedStatus === undefined ? object.status || "archived" : requestedStatus;
    if (!allowedStatuses.has(nextStatus)) {
      invalid = "Object status must be published or archived.";
      return store;
    }
    if (nextStatus === "published" && String(object.status || "") !== "published") {
      invalid = "Publish transition is blocked on object PATCH.";
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
        createAuditLog(
          "updated_object",
          "object",
          object.object_id,
          before,
          updated,
          payload.admin_note || `Object updated to ${nextStatus}.`,
          authz.identity.sub || "DEFERRED_NO_TRUSTED_SUB",
        ),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Object not found." }, 404);
  if (invalid) return json({ error: invalid }, 400);
  return json({ object: updated });
}
