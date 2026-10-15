import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { asFiniteInt, mapCommercePayment, mapCommercePaymentRows } from "../src/lib/oa-payments/trustedReadAdapter.ts";
import {
  hasExplicitShipReadyGrant,
  mapCommerceShipmentRows,
  mapCommerceShipmentRowsFromOrder,
  paidDoesNotImplyShipped,
} from "../src/lib/oa-shipping/trustedReadAdapter.ts";

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

const cartOrder = {
  id: "DH-ORD-1",
  order_id: "order_abc",
  status: "request_received",
  payment_status: "pending_manual_confirmation",
  fulfillment_status: "not_started",
  items: [{ object_id: "OBJ-1", title: "Tray", quantity: 1, price_cents: 4800 }],
  subtotal_cents: 4800,
  currency: "USD",
  source: "frontstage_cart",
  created_at: "2026-10-15T00:00:00.000Z",
};

const payCart = mapCommercePayment(cartOrder);
record("pay_no_invented_intent", payCart.intent_known === false && payCart.payment_intent_ref === "");
record("pay_provider_not_connected", payCart.provider_known === false && payCart.payment_provider === "not_connected");
record("pay_subtotal_not_payable", payCart.amount_known === false && payCart.amount_minor === 0);
record("pay_unmapped_status_unknown", payCart.payment_status === "unknown" && payCart.source_payment_status === "pending_manual_confirmation");
record("pay_refund_unknown_not_zero_claim", payCart.refund_status === "unknown" && payCart.refund_amount_known === false);
record("pay_settlement_risk_unknown", payCart.settlement_known === false && payCart.risk_known === false);
record("pay_awaiting_from_source_not_settling", payCart.queue_tags.includes("awaiting_capture") && !payCart.queue_tags.includes("settling"));

const payTotal = mapCommercePayment({ ...cartOrder, total_cents: 5200, payment_status: "paid" });
record("pay_total_cents_only", payTotal.amount_known === true && payTotal.amount_minor === 5200);
record("pay_paid_not_settling_without_settlement", !payTotal.queue_tags.includes("settling") && payTotal.settlement_known === false);

const payIntent = mapCommercePayment({
  order_id: "order_pi",
  payment_intent_id: "pi_live_9",
  payment_provider: "stripe",
  total_cents: 1000,
  currency: "USD",
  payment_status: "paid",
  refund_status: "pending",
  refund_cents: 200,
  settlement_status: "pending",
  risk_status: "hold",
});
record(
  "pay_explicit_fields_pass_through",
  payIntent.intent_known &&
    payIntent.payment_intent_ref === "pi_live_9" &&
    payIntent.provider_known &&
    payIntent.refund_amount_known &&
    payIntent.refund_amount_minor === 200 &&
    payIntent.queue_tags.includes("refund_queue") &&
    payIntent.queue_tags.includes("settling") &&
    payIntent.queue_tags.includes("risk_hold"),
);

record("asFiniteInt_accepts_safe_int", asFiniteInt(5200) === 5200 && asFiniteInt("200") === 200 && asFiniteInt(-3) === -3);
record("asFiniteInt_rejects_decimal", asFiniteInt(12.5) === null && asFiniteInt("12.5") === null);
record("asFiniteInt_rejects_non_finite", asFiniteInt(Number.NaN) === null && asFiniteInt(Number.POSITIVE_INFINITY) === null);
record("asFiniteInt_rejects_unsafe_int", asFiniteInt(Number.MAX_SAFE_INTEGER + 1) === null && asFiniteInt("9007199254740992") === null);
const payDecimal = mapCommercePayment({ ...cartOrder, total_cents: 12.9, refund_cents: "9.1" });
record("pay_abnormal_amount_unknown", payDecimal.amount_known === false && payDecimal.refund_amount_known === false);

record("pay_html_json_not_rows", mapCommercePaymentRows({ rows: [] }).length === 0);
record("pay_empty_array", mapCommercePaymentRows([]).length === 0);

const shipCart = mapCommerceShipmentRowsFromOrder(cartOrder);
record("ship_one_row_no_fake_package", shipCart.length === 1 && shipCart[0].shipment_known === false && shipCart[0].shipment_id === "");
record("ship_not_started_not_ready_to_ship", !shipCart[0].queue_tags.includes("ready_to_ship") && !shipCart[0].queue_tags.includes("in_transit"));
record("ship_not_started_eligibility_pending", shipCart[0].ship_eligibility === "pending");
record("ship_no_carrier_warehouse", shipCart[0].carrier_known === false && shipCart[0].warehouse_known === false);
record("ship_frontstage_not_fulfillment_source", shipCart[0].fulfillment_source === "unknown");
record("ship_tracking_unknown", shipCart[0].tracking_known === false);

const paidUnshipped = {
  order_id: "order_paid",
  payment_status: "paid",
  fulfillment_status: "not_started",
};
record("paid_does_not_imply_shipped", paidDoesNotImplyShipped(paidUnshipped) === true);
const paidShip = mapCommerceShipmentRowsFromOrder(paidUnshipped);
record("paid_not_started_not_ready_to_ship", !paidShip[0].queue_tags.includes("ready_to_ship") && paidShip[0].ship_eligibility === "pending");
record("paid_shipment_status_unknown", paidShip[0].shipment_status === "unknown");

const withPkg = mapCommerceShipmentRowsFromOrder({
  order_id: "order_pkg",
  id: "DH-ORD-PKG",
  fulfillment_status: "shipped",
  packages: [{ shipment_id: "shp_1", carrier: "UPS", tracking_ref: "1Z", shipment_status: "in_transit" }],
});
record(
  "package_fields_pass_through",
  withPkg.length === 1 &&
    withPkg[0].shipment_id === "shp_1" &&
    withPkg[0].tracking_known &&
    withPkg[0].carrier_known &&
    withPkg[0].queue_tags.includes("in_transit"),
);

const trackingOnly = mapCommerceShipmentRowsFromOrder({
  order_id: "order_trk",
  fulfillment_status: "not_started",
  tracking: "TRK-SOURCE",
});
record("tracking_field_without_invented_shipment", trackingOnly[0].tracking_ref === "TRK-SOURCE" && trackingOnly[0].shipment_known === false);
record(
  "explicit_ship_ready_only",
  hasExplicitShipReadyGrant({ ready_to_ship: true }) === true &&
    hasExplicitShipReadyGrant({ fulfillment_status: "not_started" }) === false &&
    hasExplicitShipReadyGrant({ payment_status: "paid", fulfillment_status: "not_started" }) === false,
);
const explicitReady = mapCommerceShipmentRowsFromOrder({
  order_id: "order_ready",
  fulfillment_status: "not_started",
  ready_to_ship: true,
});
record("explicit_grant_tags_ready_to_ship", explicitReady[0].queue_tags.includes("ready_to_ship") && explicitReady[0].ship_eligibility === "eligible");
record(
  "reverse_false_string_not_return_queue",
  !mapCommerceShipmentRowsFromOrder({ order_id: "r1", reverse_shipment: "false" })[0].queue_tags.includes("return_logistics"),
);
record(
  "reverse_empty_object_not_return_queue",
  !mapCommerceShipmentRowsFromOrder({ order_id: "r2", reverse_shipment: {} })[0].queue_tags.includes("return_logistics"),
);
record(
  "reverse_true_tags_return_queue",
  mapCommerceShipmentRowsFromOrder({ order_id: "r3", reverse_shipment: true })[0].queue_tags.includes("return_logistics"),
);

record("ship_rows_flat", mapCommerceShipmentRows([cartOrder, { order_id: "b", packages: [{ shipment_id: "s1" }, { shipment_id: "s2" }] }]).length === 3);

const payUi = read("src/components/oa-payments/PaymentsRuntimeWorkbench.tsx");
const shipUi = read("src/components/oa-shipping/ShippingRuntimeWorkbench.tsx");
record("pay_uses_orders_private_get", payUi.includes('oaPrivateGetJson<{ rows?: unknown; storage?: string }>("/api/admin/orders"'));
record("ship_uses_orders_private_get", shipUi.includes('oaPrivateGetJson<{ rows?: unknown; storage?: string }>("/api/admin/orders"'));
record("pay_auth_epoch", payUi.includes("subscribeOaAuthEpoch") && payUi.includes("ctl.clear()"));
record("ship_auth_epoch", shipUi.includes("subscribeOaAuthEpoch") && shipUi.includes("ctl.clear()"));
record("pay_401_403_timeout_states", payUi.includes("auth_required") && payUi.includes("permission_denied") && payUi.includes("provider_unavailable"));
record("ship_401_403_timeout_states", shipUi.includes("auth_required") && shipUi.includes("permission_denied") && shipUi.includes("provider_unavailable"));
record("pay_no_write_actions", payUi.includes("Capture · 扣款 · Blocked") && payUi.includes("Refund execute · 执行退款 · Blocked"));
record("ship_no_write_actions", shipUi.includes("Create label · 面单 · Blocked") && shipUi.includes("Confirm ship · 确认发货 · Blocked"));
record("pay_demo_not_mixed", payUi.includes("DEMO_LIVE_MIX=FALSE") && payUi.includes("TEST_ONLY DEMO"));
record("ship_demo_not_mixed", shipUi.includes("DEMO_LIVE_MIX=FALSE"));
record("pay_layout_kept", payUi.includes("oa-ps-page") && payUi.includes("Payment ledger skeleton") && payUi.includes("/admin/oa/finance"));
record("ship_layout_kept", shipUi.includes("oa-ps-page") && shipUi.includes("Package list skeleton") && shipUi.includes("/admin/oa/logistics"));
record("ship_ui_shows_eligibility_unknown", shipUi.includes("资格未知") && shipUi.includes("not_started is pending"));
record("no_stripe_session_status", !payUi.includes("/api/session-status") && !payUi.includes("create-checkout-session"));
record("client_path_union_unchanged", read("src/lib/oa-auth/oaPrivateReadClient.ts").includes('path: "/api/admin/orders" | "/api/admin/objects" | "/api/admin/assets"'));
record("r90_public_objects_untouched", !read("functions/api/public/objects.js").includes("mapCommercePayment"));
record("r91_media_untouched", !read("src/components/oa-media/MediaRuntimeWorkbench.tsx").includes("mapCommercePayment"));
record("finance_workbench_untouched", !read("src/components/oa-finance/FinanceProjectionWorkbench.tsx").includes("oaPrivateGetJson"));
record("logistics_workbench_untouched", !read("src/components/oa-logistics/LogisticsProjectionWorkbench.tsx").includes("oaPrivateGetJson"));
record("supply_workbench_untouched", !read("src/components/oa-supply-chain/SupplyChainProjectionWorkbench.tsx").includes("oaPrivateGetJson"));
record("pages_still_mount_workbenches", read("src/app/admin/oa/co/payments/page.tsx").includes("PaymentsRuntimeWorkbench") && read("src/app/admin/oa/co/shipping/page.tsx").includes("ShippingRuntimeWorkbench"));

const failed = results.filter((item) => !item.pass);
console.log(`R92_SMOKE ${results.filter((i) => i.pass).length}/${results.length}`);
if (failed.length) process.exit(1);
