/**
 * Seed one redacted intake into Preview KV via local Functions.
 * Does not touch Production. Does not include source_url or real PII.
 */
const base = process.env.P0_01A_PREVIEW_BASE || "http://127.0.0.1:8788";

const payload = {
  source_type: "buyer_upload",
  source_platform: "manual",
  original_title: "Preview Buyer Quiet Lamp",
  original_description: "Redacted fixture. Not production data.",
  original_price: "$48.00",
  currency: "USD",
  category_hint: "wind-objects",
  inventory: 1,
  submitted_by: "preview-buyer",
  buyer_id: "preview-buyer",
};

const response = await fetch(`${base}/api/object-intakes`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
});
const text = await response.text();
let data = null;
try {
  data = JSON.parse(text);
} catch {
  data = { parse: "not-json", chars: text.length };
}

const report = {
  batch: "P0-01A",
  status: response.status,
  intake_id: data?.intake_id || null,
  intake_no: data?.intake_no || null,
  storageHint: "write went to Preview Functions local KV if status is 201",
};
console.log(JSON.stringify(report, null, 2));
if (!response.ok) process.exit(1);
