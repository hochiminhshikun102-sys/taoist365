import { projectPublicObject, onRequestGet } from "../functions/api/public/objects.js";
import { resolvePublishedCommerceChannel } from "../functions/_object-intake.js";

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
const windkeepPublished = {
  object_id: "DH-OBJ-WK",
  title: "WindKeep chair",
  status: "published",
  commerce_channel: "windkeep_secondhand",
  source_type: "windkeep_member",
  supply_program: "windkeep",
  price: "$9.00",
  inventory: 1,
  media: [{ id: "wk-main", type: "main", url: "/api/object-media/wk-main", mime_type: "image/png" }],
};
const windkeepMissingChannel = {
  object_id: "DH-OBJ-WK-GAP",
  title: "WK missing channel",
  status: "published",
  source_type: "windkeep_member",
  supply_program: "windkeep",
  price: "$8.00",
};
const untrustedMissingChannel = {
  object_id: "DH-OBJ-ORPHAN",
  title: "Orphan published",
  status: "published",
  price: "$7.00",
};
const trustedMallMissingChannel = {
  object_id: "DH-OBJ-TRUSTED-GAP",
  title: "Trusted mall missing channel",
  status: "published",
  source_type: "admin_upload",
  price: "$6.00",
  primary_image_url: "/objects-derived/1-hero.webp",
};
let reads = 0;
let writes = 0;
const env = {
  OBJECT_INTAKE_KV: {
    async get() {
      reads += 1;
      return JSON.stringify({
        objects: [
          published,
          legacy,
          unpublished,
          windkeepPublished,
          windkeepMissingChannel,
          untrustedMissingChannel,
          trustedMallMissingChannel,
        ],
      });
    },
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
check(
  "list only published mall",
  listResp.status === 200 &&
    listPayload.rows.length === 3 &&
    listPayload.rows.every((row) => ["DH-OBJ-10", "DH-OBJ-LEGACY", "DH-OBJ-TRUSTED-GAP"].includes(row.object_id)),
);
check("list retains object refs", listPayload.rows.some((row) => row.object_id === "DH-OBJ-10") && listPayload.rows.some((row) => row.object_id === "DH-OBJ-LEGACY"));
check("list excludes windkeep objects", !JSON.stringify(listPayload).includes("DH-OBJ-WK"));
check("list does not expose private bytes", !JSON.stringify(listPayload).includes(PRIVATE_DATA) && !JSON.stringify(listPayload).includes("storage_key"));
const missing = await onRequestGet({ request: new Request("http://localhost/api/public/objects?object_id=not-found"), env });
check("unknown object remains 404", missing.status === 404);
check("zero writes", writes === 0 && reads >= 3);

const inlineMain = projectPublicObject({
  object_id: "DH-OBJ-INLINE",
  status: "published",
  price: "$1.00",
  inventory: 1,
  primary_media_url: IMG,
  primary_image_url: IMG,
  media: [{ id: "inline-main", type: "main", url: IMG, mime_type: "image/png" }],
});
const inlineJson = JSON.stringify(inlineMain);
check(
  "neg: public-typed base64 bytes never serialized",
  !inlineJson.includes("data:") &&
    !inlineJson.includes("base64") &&
    inlineMain.media.length === 0 &&
    inlineMain.primary_image_url === "/homepage-hero/windkeep-lantern-sea.png",
);

const remoteSigned = projectPublicObject({
  object_id: "DH-OBJ-REMOTE",
  status: "published",
  price: "$1.00",
  inventory: 1,
  media: [
    { id: "https-main", type: "main", url: "https://evil.example/private.jpg?X-Amz-Signature=abc", mime_type: "image/jpeg" },
    { id: "signed-path", type: "detail", url: "/api/object-media/main-1?token=signed", mime_type: "image/png" },
    { id: "protocol-relative", type: "scene", url: "//cdn.unapproved.example/x.png", mime_type: "image/png" },
    { id: "ok-main", type: "main", url: "/api/object-media/ok-main", mime_type: "image/png" },
  ],
});
const remoteJson = JSON.stringify(remoteSigned);
check(
  "neg: unauthorized https and signed media urls rejected",
  remoteSigned.media.length === 1 &&
    remoteSigned.media[0].url === "/api/object-media/ok-main" &&
    !remoteJson.includes("evil.example") &&
    !remoteJson.includes("X-Amz-Signature") &&
    !remoteJson.includes("token=signed") &&
    !remoteJson.includes("cdn.unapproved"),
);

const sourced = projectPublicObject({
  ...published,
  source: "buyer_intake",
  source_type: "external_url",
  identity_scope: "buyer",
});
const sourcedJson = JSON.stringify(sourced);
check(
  "neg: provenance source fields stay off public DTO",
  !Object.prototype.hasOwnProperty.call(sourced, "source") &&
    !sourcedJson.includes("buyer_intake") &&
    !sourcedJson.includes("external_url") &&
    sourced.object_id === "DH-OBJ-10" &&
    sourced.primary_image_url === "/api/object-media/main-1",
);

check("channel: windkeep source stays windkeep", resolvePublishedCommerceChannel({ source_type: "windkeep_member" }) === "windkeep_secondhand");
check("channel: missing channel does not wash to mall", resolvePublishedCommerceChannel({ status: "published" }) === "");
check("channel: trusted admin_upload may remain mall", resolvePublishedCommerceChannel({ source_type: "admin_upload" }) === "commerce_new");
check("channel: bind windkeep_external_link", resolvePublishedCommerceChannel({ source_type: "windkeep_external_link" }) === "windkeep_secondhand");

const wkQuery = await onRequestGet({ request: new Request("http://localhost/api/public/objects?commerce_channel=windkeep_secondhand"), env });
const wkQueryBody = await wkQuery.json();
check("anon cannot switch public catalog to windkeep", wkQuery.status === 404 && !wkQueryBody.rows);
const wkDetail = await onRequestGet({ request: new Request("http://localhost/api/public/objects?object_id=DH-OBJ-WK"), env });
check("windkeep object_id is not mall-public", wkDetail.status === 404);
const trustedGap = await onRequestGet({ request: new Request("http://localhost/api/public/objects?object_id=DH-OBJ-TRUSTED-GAP"), env });
const trustedGapBody = await trustedGap.json();
check("trusted mall source without channel remains purchasable", trustedGap.status === 200 && trustedGapBody.object.primary_image_url === "/objects-derived/1-hero.webp");
const orphan = await onRequestGet({ request: new Request("http://localhost/api/public/objects?object_id=DH-OBJ-ORPHAN"), env });
check("untrusted missing channel stays off mall", orphan.status === 404);
const mallDetail = await onRequestGet({ request: new Request("http://localhost/api/public/objects?object_id=DH-OBJ-10"), env });
const mallBody = await mallDetail.json();
check(
  "mall product media and price still public",
  mallDetail.status === 200 &&
    mallBody.object.price === "$24.00" &&
    mallBody.object.inventory === 3 &&
    mallBody.object.media.some((item) => item.type === "main") &&
    mallBody.object.media.some((item) => item.type === "motion"),
);

console.log(JSON.stringify({ batch: "R90_PUBLIC_PRODUCT_PROJECTION", passed, total, failed: total-passed },null,2));
if (passed !== total) process.exit(1);
