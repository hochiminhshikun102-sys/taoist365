import { json } from "../../_object-intake.js";

const supportedPlatforms = new Set(["1688", "taobao", "tmall", "pinduoduo", "xianyu", "tiktok", "temu", "amazon", "etsy", "shopify", "jd", "unknown"]);

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ ok: false, code: "INVALID_JSON", error: "Invalid parse-link payload." }, 400);
  }

  const rawUrl = String(payload.url || payload.source_url || "").trim();
  if (!rawUrl) {
    return json({ ok: false, code: "SOURCE_URL_REQUIRED", error: "Product link is required." }, 400);
  }

  const normalized = normalizeUrl(rawUrl);
  if (!normalized.ok) {
    return json({ ok: false, code: "INVALID_SOURCE_URL", error: "Use a valid http or https product link." }, 400);
  }

  const platform = detectPlatform(normalized.url);
  const sourceMeta = parseSourceMeta(normalized.url, platform);
  const draft = makeFallbackDraft({ platform, sourceProductId: sourceMeta.source_product_id, sourceUrl: normalized.url });

  return json({
    ok: true,
    source_url: rawUrl,
    normalized_url: normalized.url,
    platform: supportedPlatforms.has(platform) ? platform : "unknown",
    source_product_id: sourceMeta.source_product_id || null,
    draft,
    media: {
      external_media_found: false,
      media_usage: "reference_only",
      requires_rebuild: true,
      can_publish_directly: false,
    },
    risk: {
      copyright_risk: "medium",
      counterfeit_risk: "unknown",
      prohibited_risk: "unknown",
      needs_manual_review: true,
      risk_notes: [
        "External marketplace media must be treated as reference only.",
        "Images must be rebuilt or manually uploaded before publishing.",
      ],
    },
    source_snapshot: {
      import_mode: "single_intake",
      source_usage_policy: "reference_only",
      publish_policy: "source media must be licensed, re-shot, rebuilt, or replaced before publication",
      detected_platform: platform,
      source_item_id: sourceMeta.source_product_id || "",
      canonical_source_url: sourceMeta.canonical_source_url,
      source_parse_status: sourceMeta.source_parse_status,
      parser_version: sourceMeta.parser_version,
      rights_review_required: true,
      source_capture_status: "metadata_pending",
      legal_note: "External marketplace images are source references only and must not be published directly.",
    },
    next_required_actions: [
      "Confirm title, price, category and inventory.",
      "Upload owned product images or run Air Engine rebuild.",
      "Submit for review.",
    ],
  });
}

function normalizeUrl(value) {
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(withProtocol);
    if (!["http:", "https:"].includes(url.protocol)) return { ok: false, url: value };
    return { ok: true, url: url.toString() };
  } catch {
    return { ok: false, url: value };
  }
}

function detectPlatform(url) {
  const value = String(url || "").toLowerCase();
  if (/1688\.com|alibaba\.com/.test(value)) return "1688";
  if (/goofish\.com|xianyu|2\.taobao\.com/.test(value)) return "xianyu";
  if (/tmall\.com|detail\.tmall/.test(value)) return "tmall";
  if (/taobao\.com|item\.taobao/.test(value)) return "taobao";
  if (/pinduoduo\.com|yangkeduo\.com|pdd/.test(value)) return "pinduoduo";
  if (/shop\.tiktok\.com|tiktok\.com/.test(value)) return "tiktok";
  if (/temu\.com/.test(value)) return "temu";
  if (/amazon\.(com|co\.uk|de|fr|it|es|co\.jp)|amzn\.to/.test(value)) return "amazon";
  if (/etsy\.com/.test(value)) return "etsy";
  if (/jd\.com|360buy/.test(value)) return "jd";
  if (/myshopify\.com|\/products\//.test(value)) return "shopify";
  return "unknown";
}

function parseSourceMeta(sourceUrl, platform) {
  try {
    const parsed = new URL(sourceUrl);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    const path = parsed.pathname;
    const search = parsed.searchParams;
    const sourceProductId =
      search.get("id") ||
      search.get("itemId") ||
      search.get("item_id") ||
      search.get("goods_id") ||
      search.get("goodsId") ||
      search.get("offerId") ||
      search.get("offer_id") ||
      search.get("sku") ||
      matchPath(path, /\/listing\/(\d+)/) ||
      matchPath(path, /\/dp\/([A-Z0-9]{10})/i) ||
      matchPath(path, /\/gp\/product\/([A-Z0-9]{10})/i) ||
      matchPath(path, /\/offer\/(\d+)/) ||
      matchPath(path, /\/item\/(\d+)/) ||
      matchPath(path, /\/products\/([^/?#]+)/) ||
      "";

    return {
      source_product_id: sourceProductId,
      canonical_source_url: `${parsed.protocol}//${host}${path}${sourceProductId ? `?source_id=${encodeURIComponent(sourceProductId)}` : ""}`,
      source_parse_status: sourceProductId ? "parsed" : "url_only",
      parser_version: `parse-link-v1:${platform}`,
    };
  } catch {
    return {
      source_product_id: "",
      canonical_source_url: sourceUrl,
      source_parse_status: "url_only",
      parser_version: `parse-link-v1:${platform}`,
    };
  }
}

function makeFallbackDraft({ platform, sourceProductId, sourceUrl }) {
  const platformLabel = platform === "unknown" ? "Marketplace" : platform.toUpperCase();
  const idText = sourceProductId ? ` ${sourceProductId}` : "";
  const title = `${platformLabel} source item${idText}`;
  return {
    title,
    description: `External source link analyzed for Dohara intake. Confirm product facts, replace or rebuild marketplace media, and prepare publish-ready assets before review. Source: ${sourceUrl}`,
    category: platform === "xianyu" ? "windkeep-reference" : "wind-objects",
    tags: [platform === "unknown" ? "external-source" : platform, "reference-only", "air-engine-rebuild"],
    suggested_price: null,
    currency: "USD",
    origin_country: null,
    material: null,
    style: null,
    seo_title: `${title} - Dohara intake draft`,
    geo_summary: `${title} is an external-source product candidate. The link can guide title, category, and sourcing work, but final Dohara media must be owned, rebuilt, or approved before publishing.`,
  };
}

function matchPath(path, pattern) {
  const match = String(path || "").match(pattern);
  return match ? decodeURIComponent(match[1]) : "";
}
