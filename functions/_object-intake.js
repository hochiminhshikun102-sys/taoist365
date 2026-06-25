const STORE_KEY = "vl-object-intake-store-v1";

const emptyStore = {
  objectIntakes: [],
  objectMedia: [],
  objectAiDrafts: [],
  objectReviewQueue: [],
  objects: [],
  buyerProfiles: [],
  adminAuditLogs: [],
};

export const intakeStatuses = {
  DRAFT: "draft",
  UPLOADED: "uploaded",
  AI_DRAFT_PENDING: "ai_draft_pending",
  AI_DRAFT_READY: "ai_draft_ready",
  REVIEW_PENDING: "review_pending",
  REVISION_REQUIRED: "revision_required",
  APPROVED: "approved",
  REJECTED: "rejected",
  PUBLISHED: "published",
};

export const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

export function nowIso() {
  return new Date().toISOString();
}

export function makeId(prefix) {
  const stamp = Date.now().toString(36);
  const tail = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${stamp}_${tail}`;
}

export function slugify(value) {
  return String(value || "quiet-object")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "quiet-object";
}

function cloneStore(value) {
  return {
    ...emptyStore,
    ...(value || {}),
    objectIntakes: Array.isArray(value?.objectIntakes) ? value.objectIntakes : [],
    objectMedia: Array.isArray(value?.objectMedia) ? value.objectMedia : [],
    objectAiDrafts: Array.isArray(value?.objectAiDrafts) ? value.objectAiDrafts : [],
    objectReviewQueue: Array.isArray(value?.objectReviewQueue) ? value.objectReviewQueue : [],
    objects: Array.isArray(value?.objects) ? value.objects : [],
    buyerProfiles: Array.isArray(value?.buyerProfiles) ? value.buyerProfiles : [],
    adminAuditLogs: Array.isArray(value?.adminAuditLogs) ? value.adminAuditLogs : [],
  };
}

let memoryStore = cloneStore(emptyStore);

export async function readStore(env = {}) {
  if (env.OBJECT_INTAKE_KV) {
    const raw = await env.OBJECT_INTAKE_KV.get(STORE_KEY);
    return cloneStore(raw ? JSON.parse(raw) : emptyStore);
  }

  return cloneStore(memoryStore);
}

export async function writeStore(env = {}, store) {
  const next = cloneStore(store);
  if (env.OBJECT_INTAKE_KV) {
    await env.OBJECT_INTAKE_KV.put(STORE_KEY, JSON.stringify(next));
  } else {
    memoryStore = next;
  }
  return next;
}

export async function updateStore(env, updater) {
  const current = await readStore(env);
  const next = await updater(current);
  return writeStore(env, next);
}

export function publicUrlForMedia(media) {
  return media?.file_url || media?.data_url || "/homepage-hero/windkeep-lantern-sea.png";
}

export function latestAiDraft(store, intakeId) {
  return [...store.objectAiDrafts].reverse().find((draft) => draft.intake_id === intakeId) || null;
}

export function mediaForIntake(store, intakeId) {
  return store.objectMedia
    .filter((media) => media.intake_id === intakeId)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

export function createAuditLog(action, targetType, targetId, beforeValue, afterValue, note, actorId = "admin-os") {
  return {
    id: makeId("audit"),
    actor_id: actorId,
    action,
    target_type: targetType,
    target_id: targetId,
    before_json: beforeValue ?? null,
    after_json: afterValue ?? null,
    note: note || "",
    created_at: nowIso(),
  };
}

export function makeProductDraft(input = {}) {
  const title = cleanTitle(input.original_title || input.category_hint || input.source_platform || "Quiet room object");
  const priceNumber = Number.parseFloat(String(input.original_price || "").replace(/[^0-9.]/g, ""));
  const price = Number.isFinite(priceNumber) && priceNumber > 0 ? priceNumber : 48;
  const category = normalizeCategory(input.category_hint);
  const tags = Array.from(new Set([category, "browser-air", "quiet-object", "object-intake"].filter(Boolean)));

  return {
    draft_title: title,
    draft_subtitle: `${title} for a quiet room.`,
    draft_description: input.original_description || `${title} is prepared as a clear VL object draft with room, material, and use kept plain.`,
    material: "Material to confirm after human review.",
    size_text: "Size to confirm after measuring.",
    category,
    tags,
    seo_title: `${title} - Reverent Inquiry`,
    seo_description: `${title} prepared through the VL object intake pipeline with quiet material presence.`,
    geo_summary: `${title} is a VL object candidate with source, media, review, and publication state attached to one object_id.`,
    product_story: input.original_description || "It looked useful before it looked special. The final story should stay close to ordinary life.",
    placement_suggestion: "Desk, shelf, window, table, or fabric surface with enough negative space.",
    price_suggestion: `$${price.toFixed(2)}`,
    shipping_note: "Shipping method and packaging to be confirmed before publication.",
    risk_notes: "Manual source, material, price, image, and compliance review required before publication.",
    confidence_score: 0.72,
  };
}

function cleanTitle(value) {
  return String(value || "Quiet room object")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 96) || "Quiet room object";
}

function normalizeCategory(value) {
  const lowered = String(value || "").toLowerCase();
  if (/ritual|cup|tea|incense|bowl|ceramic/.test(lowered)) return "ritual-objects";
  if (/season|gift|limited|soft|plush/.test(lowered)) return "seasonal-collections";
  if (/desk|paper|tray|stationery|work/.test(lowered)) return "quiet-desk";
  return "wind-objects";
}
