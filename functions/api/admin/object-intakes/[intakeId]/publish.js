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
  let invalidReasons = [];

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
    const gateReasons = validatePublishGate(intake, draft, media);
    if (gateReasons.length > 0) {
      invalid = "Publish blocked.";
      invalidReasons = gateReasons;
      return store;
    }

    const primary = media.find((item) => item.media_type === "main") || media[0] || null;
    const primaryImage = media.find((item) => !isVideoMedia(item) && item.media_type === "main") || media.find((item) => !isVideoMedia(item)) || primary;
    const publishedMedia = media.map((item) => ({
      id: item.id,
      type: item.media_type,
      url: publicUrlForMedia(item),
      mime_type: item.mime_type,
      storage_key: item.storage_key,
      sort_order: item.sort_order || 0,
    }));
    const objectId = intake.object_id || `DH-OBJ-${Date.now().toString().slice(-7)}`;
    const title = draft?.draft_title || intake.original_title || "Quiet room object";
    const object = {
      id: objectId,
      object_id: objectId,
      intake_id: intakeId,
      source_type: intake.source_type || "",
      identity_scope: intake.identity_scope || "",
      entry_surface: intake.entry_surface || "",
      supply_program: intake.supply_program || "",
      commerce_channel: intake.commerce_channel || "commerce_new",
      goods_condition: intake.goods_condition || "new",
      slug: `${slugify(title)}-${objectId.toLowerCase()}`,
      title,
      subtitle: draft?.draft_subtitle || "",
      description: draft?.draft_description || intake.original_description || "",
      product_story: draft?.product_story || intake.original_description || "",
      material: draft?.material || "",
      size_text: draft?.size_text || "",
      placement_suggestion: draft?.placement_suggestion || "",
      shipping_note: draft?.shipping_note || "",
      risk_notes: draft?.risk_notes || "",
      price: intake.original_price || draft?.price_suggestion || "$48.00",
      currency: intake.currency || "USD",
      inventory: intake.inventory || 1,
      category: draft?.category || intake.category_hint || "wind-objects",
      collection: draft?.category || "wind-objects",
      tags: draft?.tags || [],
      buyer_id: intake.buyer_id || "",
      primary_media_url: publicUrlForMedia(primary),
      primary_media_type: primary?.mime_type || "",
      primary_image_url: publicUrlForMedia(primaryImage),
      media_ids: media.map((item) => item.id),
      media: publishedMedia,
      detail_modules: makeDetailModules(intake, draft, publishedMedia),
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
  if (invalid) return json({ ok: false, code: "PUBLISH_BLOCKED", error: invalid, reasons: invalidReasons }, 400);
  return json({ object: published, object_id: published.object_id, path: `/objects/${published.object_id}` }, 201);
}

function makeDetailModules(intake, draft, media) {
  return [
    {
      id: "gallery",
      title: "Product gallery",
      media_types: ["main", "original"],
      note: "Main listing images and source traces.",
    },
    {
      id: "detail",
      title: "Material and detail",
      media_types: ["detail"],
      note: draft?.material || "Material, closeups, condition, and handmade details.",
    },
    {
      id: "scene",
      title: "Placed in life",
      media_types: ["scene", "pc", "mobile"],
      note: draft?.placement_suggestion || "Room, desk, shelf, window, or use scene.",
    },
    {
      id: "shipping",
      title: "Shipping and after-sales",
      media_types: ["social", "motion"],
      note: intake.logistics_method || "Packaging, route, video proof, and after-sales evidence slots.",
    },
  ].map((module) => ({
    ...module,
    media: media.filter((item) => module.media_types.includes(item.type)),
  }));
}

function isVideoMedia(media) {
  const value = `${media?.mime_type || ""} ${media?.storage_key || ""}`.toLowerCase();
  return value.includes("video/") || /\.(mp4|webm|mov|m4v)(\?|$)/.test(value);
}

function validatePublishGate(intake, draft, media) {
  const reasons = [];
  const title = String(draft?.draft_title || intake.original_title || "").trim();
  const description = String(draft?.draft_description || intake.original_description || "").trim();
  const category = String(draft?.category || intake.category_hint || "").trim();
  const price = priceNumber(intake.original_price || draft?.price_suggestion || "");
  const inventory = Number.parseInt(intake.inventory, 10) || 0;
  const mainStillImage = media.find((item) => item.media_type === "main" && !isVideoMedia(item) && publicUrlForMedia(item) && isPublishReadyMedia(item));
  const publishableMedia = media.filter((item) => item.media_type !== "original" && publicUrlForMedia(item));
  const isExternalReference = Boolean(intake.source_url) || intake.media_rights_status === "reference_only" || intake.media_transform_required;
  const hasReferenceOnlyMedia = media.some((item) => ["reference_only", "legacy_reference", "blocked_reference_only"].includes(String(item.status || "")));
  const highRisk = [
    intake.risk_level,
    intake.risk_flags,
    intake.compliance_flags,
    draft?.risk_level,
    draft?.risk_flags,
  ].some((value) => String(Array.isArray(value) ? value.join(",") : value || "").toLowerCase().includes("high"));

  if (!title) reasons.push({ field: "title", message: "Title is required." });
  if (!description) reasons.push({ field: "description", message: "Description is required." });
  if (!category) reasons.push({ field: "category", message: "Category is required." });
  if (!Number.isFinite(price) || price <= 0) reasons.push({ field: "price", message: "Valid price is required." });
  if (inventory <= 0) reasons.push({ field: "inventory", message: "Inventory must be greater than 0." });
  if (!mainStillImage) reasons.push({ field: "main_image", message: "Main image is not ready." });
  if (publishableMedia.length === 0) reasons.push({ field: "media", message: "At least one publishable product media asset is required." });
  if (hasReferenceOnlyMedia) reasons.push({ field: "media_usage", message: "Reference-only media cannot be published directly." });
  if (isExternalReference && intake.air_engine_status !== "ready") {
    reasons.push({ field: "air_engine", message: "External marketplace media is reference only and must be rebuilt before publishing." });
  }
  if (highRisk) reasons.push({ field: "risk_flags", message: "High risk flags must be resolved before publishing." });

  return reasons;
}

function priceNumber(value) {
  const numeric = Number.parseFloat(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function isPublishReadyMedia(media) {
  const status = String(media?.status || "");
  return ["uploaded", "air_engine_uploaded", "air_engine_ready", "publish_ready"].includes(status);
}
