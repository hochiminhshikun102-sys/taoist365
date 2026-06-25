import {
  createAuditLog,
  intakeStatuses,
  json,
  latestAiDraft,
  mediaForIntake,
  nowIso,
  publicUrlForMedia,
  slugify,
  updateStore,
} from "../../../../_object-intake.js";

export async function onRequestPost(context) {
  const { intakeId } = context.params;
  let published = null;
  let missing = false;
  let invalid = "";

  await updateStore(context.env, (store) => {
    const intake = store.objectIntakes.find((item) => item.id === intakeId);
    if (!intake) {
      missing = true;
      return store;
    }
    if (intake.status !== intakeStatuses.APPROVED && intake.status !== intakeStatuses.PUBLISHED) {
      invalid = "Only approved intakes can be published.";
      return store;
    }

    const now = nowIso();
    const draft = latestAiDraft(store, intakeId);
    const media = mediaForIntake(store, intakeId);
    const primary = media.find((item) => item.media_type === "main") || media[0] || null;
    const objectId = intake.object_id || `VL-OBJ-${Date.now().toString().slice(-7)}`;
    const title = draft?.draft_title || intake.original_title || "Quiet room object";
    const object = {
      id: objectId,
      object_id: objectId,
      intake_id: intakeId,
      slug: `${slugify(title)}-${objectId.toLowerCase()}`,
      title,
      subtitle: draft?.draft_subtitle || "",
      description: draft?.draft_description || intake.original_description || "",
      price: intake.original_price || draft?.price_suggestion || "$48.00",
      currency: intake.currency || "USD",
      inventory: intake.inventory || 1,
      category: draft?.category || intake.category_hint || "wind-objects",
      collection: draft?.category || "wind-objects",
      tags: draft?.tags || [],
      buyer_id: intake.buyer_id || "",
      primary_image_url: publicUrlForMedia(primary),
      media_ids: media.map((item) => item.id),
      status: "published",
      published_at: now,
      created_at: now,
      updated_at: now,
    };

    const before = { ...intake };
    const after = { ...intake, object_id: objectId, status: intakeStatuses.PUBLISHED, updated_at: now };
    published = object;

    return {
      ...store,
      objectIntakes: store.objectIntakes.map((item) => (item.id === intakeId ? after : item)),
      objectMedia: store.objectMedia.map((item) => (item.intake_id === intakeId ? { ...item, object_id: objectId } : item)),
      objects: [object, ...store.objects.filter((item) => item.intake_id !== intakeId && item.object_id !== objectId)],
      adminAuditLogs: [
        createAuditLog("published_object", "object_intake", intakeId, before, after, `Published ${objectId}.`),
        ...store.adminAuditLogs,
      ],
    };
  });

  if (missing) return json({ error: "Intake not found." }, 404);
  if (invalid) return json({ error: invalid }, 400);
  return json({ object: published, object_id: published.object_id, path: `/objects/${published.object_id}` }, 201);
}
