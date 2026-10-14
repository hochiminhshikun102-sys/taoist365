import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyObjectMediaAccess, onRequestGet as objectMediaGet } from "../functions/api/object-media/[mediaId].js";
import { onRequestGet as assetByteGet } from "../functions/api/assets/[assetId].js";
import { mapCommerceOrder, maskPersonName } from "../src/lib/oa-orders/trustedReadAdapter.ts";
import { mapAdminObject } from "../src/lib/oa-objects/trustedReadAdapter.ts";
import { mapAdminAsset } from "../src/lib/oa-media/trustedReadAdapter.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const results = [];

function record(name, pass, detail = "") {
  results.push({ name, pass, detail });
  if (!pass) console.error(`FAIL ${name}${detail ? ` :: ${detail}` : ""}`);
  else console.log(`PASS ${name}`);
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

const orderMapped = mapCommerceOrder(
  {
    id: "DH-ORD-1",
    order_id: "order_abc",
    status: "request_received",
    payment_status: "pending_manual_confirmation",
    fulfillment_status: "not_started",
    contact: { name: "Alice Wei", email: "alice@example.invalid", address: "1 Secret Road" },
    items: [{ object_id: "OBJ-1", title: "Tray", quantity: 1, price_cents: 4800 }],
    subtotal_cents: 4800,
    currency: "USD",
    source: "frontstage_cart",
    created_at: "2026-10-15T00:00:00.000Z",
  },
  "2026-10-15T01:00:00.000Z",
);

record(
  "order_masks_name_no_email_address",
  orderMapped.customer_display_masked === "A***" &&
    !JSON.stringify(orderMapped).includes("alice@") &&
    !JSON.stringify(orderMapped).includes("Secret Road") &&
    orderMapped.customer_ref === "redacted",
  JSON.stringify({ masked: orderMapped.customer_display_masked, ref: orderMapped.customer_ref }),
);
record("order_status_not_false_mapped", orderMapped.order_status === "unknown" && orderMapped.source_order_status === "request_received");
record("order_payment_not_inferred_paid", orderMapped.payment_status === "unknown" && orderMapped.source_payment_status === "pending_manual_confirmation");
record("order_subtotal_does_not_claim_payable_total", orderMapped.amount_known === false && orderMapped.subtotal_minor === 4800);
record("order_total_missing_is_not_fabricated", orderMapped.total_minor === 0 && orderMapped.amount_known === false);
const orderWithTotal = mapCommerceOrder(
  { id: "DH-ORD-TOTAL", subtotal_cents: 4800, total_cents: 5200, currency: "USD" },
  "2026-10-15T01:00:00.000Z",
);
record("order_payable_total_only_when_explicit", orderWithTotal.amount_known === true && orderWithTotal.total_minor === 5200);
record("order_no_packages_invented", orderMapped.packages.length === 0);
record("order_queue_awaiting_from_source_only", orderMapped.queue_tags.includes("awaiting_action") && !orderMapped.queue_tags.includes("aftersales"));
record("mask_empty", maskPersonName("") === "—");

const objectMapped = mapAdminObject(
  {
    object_id: "DH-OBJ-1",
    title: "Quiet tray",
    status: "published",
    price: "$48.00",
    currency: "USD",
    inventory: 3,
    intake_id: "intake-1",
    media_ids: ["media-main"],
  },
  "2026-10-15T01:00:00.000Z",
);
record("object_sku_unknown_not_invented", objectMapped.sku === "unknown");
record("object_sale_unknown", objectMapped.sale_status === "unknown" && !objectMapped.queue_tags.includes("on_sale"));
record("object_price_minor_not_parsed_from_dollar_string", objectMapped.price_known === false && objectMapped.source_price_text === "$48.00");
record("object_inventory_projection_not_invented", objectMapped.inventory_projection_status === "unknown" && objectMapped.source_inventory === 3);
record("object_publish_from_status", objectMapped.publish_status === "published");
record("object_order_line_hits_not_invented", objectMapped.order_line_hits_known === false);

const mediaMapped = mapAdminAsset(
  {
    id: "asset-1",
    file_name: "hero.png",
    scope: "product_media",
    status: "published",
    public_url: "/api/assets/asset-1",
    object_id: "DH-OBJ-1",
    usage: "main",
  },
  "2026-10-15T01:00:00.000Z",
);
record("media_rights_not_invented_from_published_scope", mediaMapped.rights_status === "unknown" && mediaMapped.review_status === "unknown");
record("media_not_public_asset_from_asset_registry", mediaMapped.is_public_asset === false);
record("media_sku_unknown", mediaMapped.object_sku === "unknown");
record("media_preview_href_blocked", mediaMapped.preview_href_blocked === true);

const store = {
  objects: [{ status: "published", media_ids: ["media-motion-pub", "media-public-main"] }],
  objectMedia: [],
};
record(
  "motion_published_binding_is_public",
  classifyObjectMediaAccess(store, { id: "media-motion-pub", media_type: "motion" }) === "public",
);
record(
  "motion_unpublished_is_private",
  classifyObjectMediaAccess({ objects: [{ status: "draft", media_ids: ["media-motion-draft"] }] }, { id: "media-motion-draft", media_type: "motion" }) ===
    "private",
);
record(
  "unmapped_type_stays_unmapped_open_contract",
  classifyObjectMediaAccess(store, { id: "media-weird", media_type: "brand_prompt" }) === "unmapped",
);
record(
  "published_main_still_public",
  classifyObjectMediaAccess(store, { id: "media-public-main", media_type: "main" }) === "public",
);
record(
  "original_still_private",
  classifyObjectMediaAccess(store, { id: "media-original", media_type: "original" }) === "private",
);

function kvEnv(mediaRows, objects, assets = []) {
  const payload = JSON.stringify({
    objectIntakes: [],
    objectMedia: mediaRows,
    objectAiDrafts: [],
    objectReviewQueue: [],
    airEngineJobs: [],
    objects,
    assetRegistry: assets,
    commerceOrders: [],
    buyerProfiles: [],
    adminAuditLogs: [],
  });
  return {
    OBJECT_INTAKE_KV: {
      async get() {
        return payload;
      },
      async put() {
        throw new Error("isolated test blocked write");
      },
    },
  };
}

function ctx(env, url, { token, params } = {}) {
  const headers = {};
  if (token) headers.authorization = `Bearer ${token}`;
  return { request: new Request(url, { headers }), env, params };
}

const mediaEnv = kvEnv(
  [
    { id: "media-motion-pub", media_type: "motion", data_url: PIXEL, mime_type: "video/mp4" },
    { id: "media-motion-draft", media_type: "motion", data_url: PIXEL, mime_type: "video/mp4" },
    { id: "media-unmapped", media_type: "brand_prompt", data_url: PIXEL, mime_type: "image/png" },
    { id: "media-public-main", media_type: "main", data_url: PIXEL, mime_type: "image/png" },
    { id: "media-original", media_type: "original", data_url: PIXEL, mime_type: "image/png" },
  ],
  [
    { status: "published", media_ids: ["media-motion-pub", "media-public-main"] },
    { status: "draft", media_ids: ["media-motion-draft"] },
  ],
);

const motionPub = await objectMediaGet(
  ctx(mediaEnv, "http://127.0.0.1/api/object-media/media-motion-pub", { params: { mediaId: "media-motion-pub" } }),
);
record("object_media_published_motion_anonymous_200", motionPub.status === 200, String(motionPub.status));

const motionDraft = await objectMediaGet(
  ctx(mediaEnv, "http://127.0.0.1/api/object-media/media-motion-draft", { params: { mediaId: "media-motion-draft" } }),
);
record("object_media_unpublished_motion_401", motionDraft.status === 401, String(motionDraft.status));

const unmappedOpen = await objectMediaGet(
  ctx(mediaEnv, "http://127.0.0.1/api/object-media/media-unmapped", { params: { mediaId: "media-unmapped" } }),
);
record("object_media_unmapped_remains_open", unmappedOpen.status === 200, String(unmappedOpen.status));

const mainPub = await objectMediaGet(
  ctx(mediaEnv, "http://127.0.0.1/api/object-media/media-public-main", { params: { mediaId: "media-public-main" } }),
);
record("object_media_published_main_anonymous_200", mainPub.status === 200, String(mainPub.status));

const originalDenied = await objectMediaGet(
  ctx(mediaEnv, "http://127.0.0.1/api/object-media/media-original", { params: { mediaId: "media-original" } }),
);
record("object_media_original_401", originalDenied.status === 401, String(originalDenied.status));

const assetSource = read("functions/api/assets/[assetId].js");
record("asset_byte_get_unchanged_no_auth_gate", !assetSource.includes("requireOaPrivateRead") && assetSource.includes("cache-control"));

const assetEnv = kvEnv([], [], [{ id: "asset-secret", data_url: PIXEL, mime_type: "image/png", scope: "prompt_pack" }]);
const assetAnon = await assetByteGet(
  ctx(assetEnv, "http://127.0.0.1/api/assets/asset-secret", { params: { assetId: "asset-secret" } }),
);
record(
  "asset_byte_get_still_serves_until_owner_contract",
  assetAnon.status === 200,
  String(assetAnon.status),
);

const ordersUi = read("src/components/oa-orders/OrdersRuntimeWorkbench.tsx");
const objectsUi = read("src/components/oa-objects/ObjectsRuntimeWorkbench.tsx");
const mediaUi = read("src/components/oa-media/MediaRuntimeWorkbench.tsx");
record("orders_uses_private_get", ordersUi.includes('oaPrivateGetJson<{ rows?: unknown; storage?: string }>("/api/admin/orders"'));
record("objects_uses_private_get", objectsUi.includes('"/api/admin/objects"'));
record("media_uses_private_get", mediaUi.includes('"/api/admin/assets"'));
record("demo_live_separated", ordersUi.includes("DEMO_LIVE_MIX=FALSE") && objectsUi.includes("DEMO_LIVE_MIX=FALSE") && mediaUi.includes("DEMO_LIVE_MIX=FALSE"));
record(
  "media_ui_no_asset_img_src",
  !/<img[\s\S]*\/api\/assets\//.test(mediaUi) && !mediaUi.includes("src={`/api/assets") && !mediaUi.includes("data_url"),
);
record("write_buttons_remain_disabled", ordersUi.includes("Edit status · 改状态 · Blocked") && objectsUi.includes("Publish · 发布 · Blocked") && mediaUi.includes("Upload · 上传 · Blocked"));
record("r84_session_untouched", read("functions/api/oa/session.js").includes("onRequestGet"));
record("r87_helper_untouched", read("functions/_auth/require-oa-private-read.js").includes("oa_admin"));

const clientSrc = read("src/lib/oa-auth/oaPrivateReadClient.ts");
record(
  "credential_retrieval_errors_are_caught",
  clientSrc.indexOf("try {", clientSrc.indexOf("resolvePrivateReadAccess")) <
    clientSrc.indexOf("await readAccessToken()", clientSrc.indexOf("resolvePrivateReadAccess")),
);
record(
  "malformed_read_collection_is_not_reported_as_empty",
  clientSrc.includes('!Array.isArray((payload as { rows?: unknown }).rows)') &&
    clientSrc.includes('status: 200, code: "provider_unavailable"'),
);
record("client_reuses_privateFetch", clientSrc.includes("privateFetch") && clientSrc.includes("fetchTrustedOaSession"));
record("client_viewer_no_private_list", clientSrc.includes("OA_PRIVATE_READ_ROLES") && clientSrc.includes('code: "permission_denied"') && clientSrc.includes("if (!token)"));
record("client_maps_401_403_network", clientSrc.includes("auth_required") && clientSrc.includes("permission_denied") && clientSrc.includes("provider_unavailable"));
record("client_epoch_abort", clientSrc.includes("generation +=") && clientSrc.includes("controller?.abort") && clientSrc.includes("revokeObjectURL"));
record("no_new_auth_singleton", !clientSrc.includes("createClient("));

const failed = results.filter((item) => !item.pass);
console.log(`R88_SMOKE ${results.filter((i) => i.pass).length}/${results.length}`);
if (failed.length) process.exit(1);
