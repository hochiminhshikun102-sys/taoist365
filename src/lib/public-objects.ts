export type PublicObjectMedia = {
  id: string;
  type: string;
  url: string;
  mime_type?: string;
  storage_key?: string;
  sort_order?: number;
};

export type PublicObject = {
  object_id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description?: string;
  product_story?: string;
  price: string;
  currency: string;
  inventory: number;
  category?: string;
  collection?: string;
  tags?: string[];
  primary_media_url?: string;
  primary_media_type?: string;
  primary_image_url?: string;
  media?: PublicObjectMedia[];
  detail_modules?: Array<{
    id: string;
    title: string;
    note?: string;
    media?: PublicObjectMedia[];
  }>;
  status: string;
  published_at?: string;
};

export function publicObjectPath(object: PublicObject) {
  return `/objects/${encodeURIComponent(object.object_id)}`;
}

export function publicObjectImage(object: PublicObject) {
  return object.primary_image_url || object.primary_media_url || object.media?.find((item) => !isVideoMedia(item))?.url || "/homepage-hero/windkeep-lantern-sea.png";
}

export function publicObjectPriceCents(object: PublicObject) {
  const numeric = Number.parseFloat(String(object.price || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? Math.round(numeric * 100) : 0;
}

export function publicObjectPriceLine(object: PublicObject) {
  const numeric = Number.parseFloat(String(object.price || "").replace(/[^0-9.]/g, ""));
  if (Number.isFinite(numeric)) return `${object.currency || "USD"} $${numeric.toFixed(2)}`;
  return object.price || "Price pending";
}

export function publicObjectInventoryLabel(object: PublicObject) {
  const stock = Number(object.inventory || 0);
  if (stock <= 0) return "Out of stock";
  if (stock <= 3) return "Low stock";
  return "In stock";
}

export function isVideoMedia(media?: Pick<PublicObjectMedia, "url" | "mime_type" | "storage_key"> | null) {
  const value = `${media?.mime_type || ""} ${media?.storage_key || ""} ${media?.url || ""}`.toLowerCase();
  return value.includes("video/") || /\.(mp4|webm|mov|m4v)(\?|$)/.test(value);
}
