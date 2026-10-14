import { projectPublicObject, onRequestGet } from "../functions/api/public/objects.js";

const IMG = "data:image/png;base64,aGVsbG8=";
const PRIVATE_DATA = "data:image/png;base64,U0VDUkVUX09SSUdJTkFM";
const published = {
  id: "DH-OBJ-10",
  object_id: "DH-OBJ-10",
  slug: "demo-product",
  title: "Quiet gallery",
  subtitle: "One published item",
  category: "Home",
  price: "$24.00",
  currency: "USD",
  inventory: 3,
  status: "published",
  commerce_channel: "commerce_new",
  intake_id: "private-intake-id",
  buyer_id: "private-buyer-id",
  identity_scope: "private",
  risk_notes: "private-risk-notes",
  source_snapshot: { token: "private-token" },
  primary_media_url: PRIVATE_DATA,
  primary_image_url: "/api/object-media/main-1",
  media_ids: ["raw-1", "main-1", "rights-1", "motion-1"],
  media: [
    { id: "raw-1", type: "original", url: PRIVATE_DATA, storage_key: "original/private-intake-id/raw-image" },
    { id: "rights-1", type: "rights", url: "data:image/png;base64,UklHSFRT", storage_key: "rights/private" },
    { id: "main-1", type: "main", url: "/api/object-media/main-1", mime_type: "image/png", storage_key: "main/internal-s3-key" },
    { id: "motion-1", type: "motion", url: "/api/object-media/motion-1", mime_type: "video/mp4", storage_key: "video/internal-s3-key" },
    { id: "brand-prompt-1", type: "brand_prompt", url: IMG, mime_type: "image/png" },
  ],
  detail_modules: [
    { id: "gallery", title: "Product gallery", note: "Approved picture", media_types: ["main", "original"], media: [
      { id: "raw-1", type: "original", url: PRIVATE_DATA },
      { id: "main-1", type: "main", url: "/api/object-media/main-1", mime_type: "image/png", storage_key: "hidden-main-key" },
      { id: "other-image", type: "detail", url: "/api/object-media/other-image" },
    ] },
  ],
};
const legacy = {
  object_id: "DH-OBJ-LEGACY",
  title: "Legacy static product",
  status: "published",
  commerce_channel: "commerce_new",
  price: "$12.00",
  primary_image_url: "/objects-derived/1-hero.webp",
  media: [],
};
const unpublished = { object_id: "DH-OBJ-DRAFT", title: "draft", status: "draft", commerce_channel: "commerce_new" };
let reads = 0;
let writes = 0;
const env = {
  OBJECT_INTAKE_KV: {
    async get() { reads += 1; return JSON.stringify({ objects: [published, legacy, unpublished] }); },
    async put() { writes += 1; throw new Error("zero writes allowed"); },
  },
};
let total = 0, passed = 0;
function check(name, condition) {
  total += 1;
  if (condition) passed += 1;
  else console.error("FAIL " + name);
}
const projected = projectPublicObject(published);
const serialized = JSON.stringify(projected);
check("published object identity/price preserved", projected.object_id === "DH-OBJ-10" && projected.price === "$24.00");
check("main image retained", projected.primary_image_url === "/api/object-media/main-1");
check("approved video retained", projected.media.some((item) => item.type === "motion" && item.url === "/api/object-media/motion-1"));
check("internal original stripped", !serialized.includes("raw-1") && !serialized.includes("private-intake-id"));
check("rights evidence stripped", !serialized.includes("rights-1") && !serialized.includes("UklHSFRT"));
check("raw data URL stripped", !serialized.includes(PRIVATE_DATA));
check("media storage keys stripped", !serialized.includes("storage_key") && !serialized.includes("s3-key"));
check("internal buyer ID stripped", !serialized.includes("private-buyer-id"));
check("source snapshot stripped", !serialized.includes("source_snapshot") && !serialized.includes("private-token"));
check("private risk notes stripped", !serialized.includes("private-risk-notes"));
check("unmapped brand prompt stripped", !serialized.includes("brand-prompt-1"));
check("detail gallery filters originals and nonpublished detail", projected.detail_modules[0].media.length === 1 && projected.detail_modules[0].media[0].type === "main");
check("legacy static product image preserved", projectPublicObject(legacy).primary_image_url === "/objects-derived/1-hero.webp");

const detailResp = await onRequestGet({ request: new Request("http://localhost/api/public/objects?object_id=DH-OBJ-10"), env });
const detailPayload = await detailResp.json();
check("detail endpoint retains public media", detailResp.status === 200 && detailPayload.object.media.length === 2);
check("detail endpoint removes private fields", !JSON.stringify(detailPayload).includes("private-buyer-id") && !JSON.stringify(detailPayload).includes(PRIVATE_DATA));
const listResp = await onRequestGet({ request: new Request("http://localhost/api/public/objects"), env });
const listPayload = await listResp.json();
check("list only published", listResp.status === 200 && listPayload.rows.length === 2);
check("list retains object refs", listPayload.rows.some((row) => row.object_id === "DH-OBJ-10") && listPayload.rows.some((row) => row.object_id === "DH-OBJ-LEGACY"));
check("list does not expose private bytes", !JSON.stringify(listPayload).includes(PRIVATE_DATA) && !JSON.stringify(listPayload).includes("storage_key"));
const missing = await onRequestGet({ request: new Request("http://localhost/api/public/objects?object_id=not-found"), env });
check("unknown object remains 404", missing.status === 404);
check("zero writes", writes === 0 && reads >= 3);
console.log(JSON.stringify({ batch: "R90_PUBLIC_PRODUCT_PROJECTION", passed, total, failed: total-passed },null,2));
if (passed !== total) process.exit(1);
