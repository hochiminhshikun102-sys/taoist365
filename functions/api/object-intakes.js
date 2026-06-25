import { intakeStatuses, json, makeId, nowIso, readStore, updateStore } from "../_object-intake.js";

const sourceTypes = new Set(["admin_upload", "buyer_upload", "boss_upload", "supplier_batch", "external_link"]);
const sourcePlatforms = new Set(["manual", "taobao", "tmall", "1688", "shopify", "etsy", "other"]);

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const status = url.searchParams.get("status");
  const submittedBy = url.searchParams.get("submitted_by");
  const store = await readStore(context.env);
  let rows = [...store.objectIntakes].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));

  if (status) rows = rows.filter((row) => row.status === status);
  if (submittedBy) rows = rows.filter((row) => row.submitted_by === submittedBy);

  return json({
    rows,
    storage: context.env.OBJECT_INTAKE_KV ? "OBJECT_INTAKE_KV" : "memory-preview",
  });
}

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid intake payload." }, 400);
  }

  const now = nowIso();
  const id = makeId("intake");
  const intakeNo = `OI-${Date.now().toString().slice(-8)}`;
  const sourceType = sourceTypes.has(payload.source_type) ? payload.source_type : "admin_upload";
  const sourcePlatform = sourcePlatforms.has(payload.source_platform) ? payload.source_platform : "manual";

  const intake = {
    id,
    intake_no: intakeNo,
    source_type: sourceType,
    source_platform: sourcePlatform,
    source_url: String(payload.source_url || "").trim(),
    source_snapshot: payload.source_snapshot || null,
    submitted_by: String(payload.submitted_by || "admin-os").trim(),
    buyer_id: String(payload.buyer_id || "").trim(),
    country: String(payload.country || "").trim(),
    original_title: String(payload.original_title || "").trim(),
    original_description: String(payload.original_description || "").trim(),
    original_price: String(payload.original_price || "").trim(),
    currency: String(payload.currency || "USD").trim().toUpperCase(),
    category_hint: String(payload.category_hint || "").trim(),
    supplier: String(payload.supplier || "").trim(),
    location: String(payload.location || "").trim(),
    logistics_method: String(payload.logistics_method || "").trim(),
    inventory: Number.parseInt(payload.inventory, 10) || 1,
    is_one_of_one: Boolean(payload.is_one_of_one),
    air_engine_status: "not_started",
    status: intakeStatuses.DRAFT,
    created_at: now,
    updated_at: now,
  };

  await updateStore(context.env, (store) => ({
    ...store,
    objectIntakes: [intake, ...store.objectIntakes],
  }));

  return json({ intake_id: id, intake_no: intakeNo, status: intake.status, intake }, 201);
}
