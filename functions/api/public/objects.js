import { json, readStore } from "../../_object-intake.js";

// Public storefront DTO: admin-source metadata and non-public media may never
// be serialized from a published intake's raw Store record.
const PUBLIC_MEDIA_TYPES = new Set(["main", "detail", "scene", "pc", "mobile", "social", "motion"]);
const FALLBACK_IMAGE = "/homepage-hero/windkeep-lantern-sea.png";

function safePublicUrl(value) {
  if (typeof value !== "string") return false;
  const url = value.trim();
  if (!url || url.includes("\\") || /[\r\n]/.test(url)) return false;
  if (/^\/api\/(?:object-media|assets)\/[A-Za-z0-9._-]+$/.test(url)) return true;
  // Legacy public static assets, but never private/admin API routes.
  if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/api/") && !url.includes("..")) return true;
  // When an isolated Preview has no R2, legitimate published image/video media
  // can be inlined. Original/rights types are excluded before this check.
  if (/^data:(?:image|video)\/[A-Za-z0-9.+-]+;base64,[A-Za-z0-9+/=]+$/i.test(url)) return true;
  if (/^https:\/\//i.test(url)) return true;
  return false;
}

function publicMediaRecord(input) {
  if (!input || typeof input !== "object") return null;
  const type = String(input.type || "");
  const url = input.url;
  if (!PUBLIC_MEDIA_TYPES.has(type) || !safePublicUrl(url)) return null;
  return {
    id: String(input.id || ""),
    type,
    url: url.trim(),
    mime_type: typeof input.mime_type === "string" ? input.mime_type : "",
    sort_order: Number.isFinite(input.sort_order) ? input.sort_order : 0,
  };
}

function staticLegacyImage(value) {
  if (typeof value !== "string") return "";
  const url = value.trim();
  if (!url.startsWith("/") || url.startsWith("/api/") || !safePublicUrl(url)) return "";
  return url;
}

/**
 * Strictly project the storefront contract. In particular, never forward
 * object.media's original/rights items, storage_key, buyer_id, intake_id,
 * source_snapshot, unpublished media IDs, or other back-office fields.
 */
export function projectPublicObject(source) {
  const object = source && typeof source === "object" ? source : {};
  const media = (Array.isArray(object.media) ? object.media : [])
    .map(publicMediaRecord)
    .filter(Boolean);
  const byId = new Map(media.filter((m) => m.id).map((m) => [m.id, m]));
  const byUrl = new Map(media.map((m) => [m.url, m]));

  const detailModules = (Array.isArray(object.detail_modules) ? object.detail_modules : []).map((section) => {
    const entries = Array.isArray(section?.media) ? section.media : [];
    const safe = entries.map((entry) => {
      const candidate = publicMediaRecord(entry);
      if (!candidate) return null;
      const match = (candidate.id && byId.get(candidate.id)) || byUrl.get(candidate.url);
      return match && match.type === candidate.type && match.url === candidate.url ? match : null;
    }).filter(Boolean);
    return {
      id: String(section?.id || ""),
      title: String(section?.title || ""),
      note: String(section?.note || ""),
      media: safe,
    };
  });

  const primaryByUrl = media.find((item) => item.url === object.primary_media_url);
  const primary = primaryByUrl || media.find((item) => item.type === "main") || media[0];
  const primaryImageByUrl = media.find((item) => item.url === object.primary_image_url && item.type !== "motion" && !item.mime_type.startsWith("video/"));
  const primaryImage = primaryImageByUrl || media.find((item) => item.type !== "motion" && !item.mime_type.startsWith("video/"));
  const legacyImage = media.length === 0 ? staticLegacyImage(object.primary_image_url) : "";
  const legacyPrimary = media.length === 0 ? staticLegacyImage(object.primary_media_url) : "";

  const projected = {
    object_id: String(object.object_id || object.id || ""),
    slug: typeof object.slug === "string" ? object.slug : "",
    title: String(object.title || ""),
    subtitle: String(object.subtitle || ""),
    description: String(object.description || ""),
    product_story: String(object.product_story || ""),
    material: String(object.material || ""),
    size_text: String(object.size_text || ""),
    placement_suggestion: String(object.placement_suggestion || ""),
    shipping_note: String(object.shipping_note || ""),
    price: String(object.price || ""),
    currency: String(object.currency || "USD"),
    inventory: Number.isFinite(Number(object.inventory)) ? Number(object.inventory) : 0,
    category: String(object.category || ""),
    collection: String(object.collection || ""),
    tags: Array.isArray(object.tags) ? object.tags.filter((tag) => typeof tag === "string") : [],
    status: "published",
    published_at: String(object.published_at || ""),
    primary_media_url: primary?.url || legacyPrimary || legacyImage || FALLBACK_IMAGE,
    primary_media_type: primary?.mime_type || "",
    primary_image_url: primaryImage?.url || legacyImage || FALLBACK_IMAGE,
    media,
    detail_modules: detailModules,
  };
  // Retain optional public-only fields consumed by the legacy published list.
  if (typeof object.source === "string") projected.source = object.source;
  if (typeof object.category_ui === "string") projected.category_ui = object.category_ui;
  if (typeof object.sku === "string") projected.sku = object.sku;
  if (Number.isFinite(Number(object.stock))) projected.stock = Number(object.stock);
  return projected;
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const objectId = url.searchParams.get("object_id");
  const includeTests = url.searchParams.get("include_tests") === "1";
  const commerceChannel = url.searchParams.get("commerce_channel") || "commerce_new";
  const store = await readStore(context.env);
  const published = store.objects.filter((item) => item.status === "published" && (item.commerce_channel || "commerce_new") === commerceChannel);

  if (objectId) {
    const object = published.find((item) => item.object_id === objectId || item.slug === objectId);
    if (!object) return json({ error: "Object not found." }, 404);
    return json({ object: projectPublicObject(object) });
  }

  const rows = includeTests ? published : published.filter((item) => !isSmokeTestObject(item));
  return json({ rows: rows.map(projectPublicObject) });
}

function isSmokeTestObject(object) {
  const title = String(object.title || "");
  return /^test\s*-/i.test(title) || /^测试\s*-/i.test(title) || /^codex-.*smoke/i.test(String(object.intake_id || ""));
}
