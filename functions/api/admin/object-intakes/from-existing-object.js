import {
  createAuditLog,
  intakeStatuses,
  json,
  makeId,
  makeProductDraft,
  nowIso,
  resolveObjectIntakeSource,
  updateStore,
} from "../../../_object-intake.js";

const requestedOutputs = ["main", "detail", "scene", "pc", "mobile", "social", "motion"];

const outputSpecs = {
  main: { label: "White product image", dimensions: "2400x2400", ratio: "1:1", publishable: true, required: true },
  detail: { label: "Detail image", dimensions: "1800x2400", ratio: "3:4", publishable: true, required: false },
  scene: { label: "Room scene image", dimensions: "2400x1600", ratio: "3:2", publishable: true, required: false },
  pc: { label: "Desktop hero image", dimensions: "3200x1800", ratio: "16:9", publishable: true, required: false },
  mobile: { label: "Mobile atmosphere image", dimensions: "1600x2400", ratio: "2:3", publishable: true, required: false },
  social: { label: "Social image", dimensions: "2400x1600", ratio: "3:2", publishable: true, required: false },
  motion: { label: "Loop video", dimensions: "1920x1080", ratio: "16:9", publishable: true, required: false },
};

const legacyProductSamples = [
  {
    id: "lavender-jellyfish-front-129",
    title: "Lavender Jellyfish",
    subtitle: "Lavender plush jellyfish with rounded front.",
    description: "A soft color object that stays light enough for a quiet room.",
    priceCents: 4800,
    inventory: 8,
    category: "seasonal-collections",
    materials: "Lavender plush textile, embroidered face, filled legs",
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Bedside surface, shelf, child room, or soft chair.",
    media: {
      original: "/objects-derived/129-hero.webp",
      detail: "/objects-derived/129-detail.webp",
      scene: "/objects-derived/129-placement.webp",
    },
  },
  {
    id: "line-octopus-104",
    title: "Line Octopus",
    subtitle: "Cream octopus figure with drawn line details.",
    description: "A small sea-form object with enough linework to feel handmade, not decorative loud.",
    priceCents: 5200,
    inventory: 5,
    category: "wind-objects",
    materials: "Plush textile, stitched line detail, filled base",
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Desk shelf, side table, child room surface, or beside a stack of books.",
    media: {
      original: "/objects-derived/104-hero.webp",
      detail: "/objects-derived/104-detail.webp",
      scene: "/objects-derived/104-placement.webp",
    },
  },
  {
    id: "listening-moon-figure-105",
    title: "Listening Moon Figure",
    subtitle: "Small plush figure with headset-like ear forms.",
    description: "A quiet desk companion for rooms where work should not become performance.",
    priceCents: 5200,
    inventory: 6,
    category: "quiet-desk",
    materials: "Plush textile, embroidered details, filled body",
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Monitor side, notebook corner, studio shelf, or night table.",
    media: {
      original: "/objects-derived/105-hero.webp",
      detail: "/objects-derived/105-detail.webp",
      scene: "/objects-derived/105-placement.webp",
    },
  },
  {
    id: "gray-room-companion-front-108-1",
    title: "Gray Room Companion",
    subtitle: "Round gray plush figure with simple stitched front.",
    description: "A gray soft object for rooms that need one grounded shape.",
    priceCents: 5600,
    inventory: 6,
    category: "quiet-desk",
    materials: "Gray plush textile, embroidered face, soft filling",
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Desk shelf, sofa corner, studio cabinet, or entry bench.",
    media: {
      original: "/objects-derived/108-1-hero.webp",
      detail: "/objects-derived/108-1-detail.webp",
      scene: "/objects-derived/108-1-placement.webp",
    },
  },
  {
    id: "long-ear-jellyfish-103",
    title: "Long Ear Jellyfish",
    subtitle: "Plush jellyfish-rabbit form with soft hanging legs.",
    description: "A gentle object that reads between toy, room companion, and soft sculpture.",
    priceCents: 5200,
    inventory: 7,
    category: "wind-objects",
    materials: "Plush textile, embroidered face, soft filling",
    dimensions: "Approx. 10 in tall / final measurement confirmed before shipping",
    placement: "Shelf edge, bed rail, low cabinet, or a chair that can hold one quiet object.",
    media: {
      original: "/objects-derived/103-hero.webp",
      detail: "/objects-derived/103-detail.webp",
      scene: "/objects-derived/103-placement.webp",
    },
  },
];

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Invalid legacy product sample payload." }, 400);
  }

  const sourceObjectId = String(payload.source_object_id || payload.product_id || "").trim();
  const sample = legacyProductSamples.find((item) => item.id === sourceObjectId);
  if (!sample) return json({ error: "Legacy product sample not found." }, 404);

  const now = nowIso();
  const id = makeId("intake");
  const intakeNo = `OI-LEGACY-${Date.now().toString().slice(-7)}`;
  const source = resolveObjectIntakeSource("legacy_product_sample");
  const actorId = String(payload.actor_id || "admin-os").trim();

  const intake = {
    id,
    intake_no: intakeNo,
    source_type: source.source_type,
    identity_scope: source.identity_scope,
    entry_surface: source.entry_surface,
    supply_program: source.supply_program,
    commerce_channel: source.commerce_channel,
    goods_condition: source.goods_condition,
    source_label: source.source_label,
    source_note: source.source_note,
    reward_eligible: source.reward_eligible,
    professional_buyer_required: source.professional_buyer_required,
    member_supply_locked: source.member_supply_locked,
    source_platform: "manual",
    source_url: "",
    source_snapshot: {
      import_mode: "legacy_product_sample",
      source_usage_policy: "internal_sample_reference",
      publish_policy: "legacy media is a test reference; upload final Dohara media before publishing.",
      source_item_id: sample.id,
      source_parse_status: "legacy_config_sample",
      parser_version: "legacy-product-sample-v1",
      rights_review_required: false,
      source_capture_status: "legacy_config_loaded",
      legal_note: "Internal legacy product sample for one-SKU intake testing only.",
    },
    media_rights_status: "owned_or_original",
    media_transform_required: false,
    air_engine_policy: "direct_review",
    submitted_by: actorId,
    buyer_id: "",
    member_id: "",
    referral_code: "",
    country: "",
    original_title: sample.title,
    original_description: [sample.subtitle, sample.description, sample.placement].filter(Boolean).join(" "),
    original_price: `$${(sample.priceCents / 100).toFixed(2)}`,
    currency: "USD",
    category_hint: sample.category,
    supplier: "legacy_product_sample",
    location: "Dohara legacy shelf",
    logistics_method: "stock_confirmation_required",
    inventory: sample.inventory,
    is_one_of_one: false,
    air_engine_status: "pending",
    status: intakeStatuses.REVIEW_PENDING,
    created_at: now,
    updated_at: now,
  };

  const mediaRows = makeLegacyMediaRows(sample, id, now);
  const draft = {
    id: makeId("draft"),
    intake_id: id,
    ...makeProductDraft({
      ...intake,
      original_description: `${intake.original_description} Materials: ${sample.materials}. Size: ${sample.dimensions}.`,
    }),
    material: sample.materials,
    size_text: sample.dimensions,
    product_story: sample.description,
    placement_suggestion: sample.placement,
    risk_notes: "Legacy product sample intake. This is a one-SKU test record and must not be bulk-published.",
    created_at: now,
    updated_at: now,
  };

  const review = {
    id: makeId("review"),
    intake_id: id,
    assigned_admin: "",
    review_status: "pending",
    review_notes: "Legacy product sample test. Confirm new main/detail/scene outputs before publish.",
    risk_level: "low",
    created_at: now,
    updated_at: now,
  };

  const airJob = {
    id: makeId("airjob"),
    intake_id: id,
    object_id: "",
    job_type: "legacy_sample_rebuild",
    source_platform: "manual",
    source_url: "",
    source_item_id: sample.id,
    canonical_source_url: "",
    commerce_channel: source.commerce_channel,
    goods_condition: source.goods_condition,
    status: "pending",
    priority: "normal",
    media_rights_status: "owned_or_original",
    transform_required: false,
    rights_review_required: false,
    source_capture_status: "legacy_config_loaded",
    source_parse_status: "legacy_config_sample",
    air_engine_policy: "direct_review",
    requested_outputs: requestedOutputs,
    output_manifest: requestedOutputs.map((type) => ({
      media_type: type,
      ...outputSpecs[type],
      status: "missing",
      note: "Awaiting uploaded beautified output for this slot.",
    })),
    ready_outputs: [],
    blocked_outputs: [],
    missing_outputs: requestedOutputs,
    generated_media_ids: [],
    notes: "One legacy product sample intake. Use Air Engine upload slots for final Dohara media outputs.",
    created_at: now,
    updated_at: now,
  };

  await updateStore(context.env, (store) => ({
    ...store,
    objectIntakes: [intake, ...store.objectIntakes],
    objectMedia: [...mediaRows, ...store.objectMedia],
    objectAiDrafts: [draft, ...store.objectAiDrafts],
    objectReviewQueue: [review, ...store.objectReviewQueue],
    airEngineJobs: [airJob, ...(store.airEngineJobs || [])],
    assetRegistry: [
      ...mediaRows.map((item) => ({
        id: makeId("asset"),
        scope: "object_intake",
        object_id: "",
        linked_object_id: "",
        intake_id: id,
        source: "legacy_product_sample",
        file_name: item.storage_key.split("/").pop() || item.id,
        file_url: item.file_url,
        data_url: "",
        storage_key: item.storage_key,
        mime_type: item.mime_type,
        size: 0,
        width: 0,
        height: 0,
        usage: item.media_type,
        alt_text: sample.title,
        tags: ["legacy-product-sample", item.media_type],
        status: item.status,
        created_at: now,
        updated_at: now,
      })),
      ...store.assetRegistry,
    ],
    adminAuditLogs: [
      createAuditLog("legacy_product_sample_intake_created", "object_intake", id, null, intake, `Created one intake test from legacy product ${sample.id}.`, actorId),
      createAuditLog("ai_draft_generated", "object_intake", id, null, draft, "AI product draft generated for legacy product sample.", actorId),
      createAuditLog("submitted_review", "object_intake", id, null, review, "Legacy product sample entered review queue.", actorId),
      createAuditLog("air_engine_job_created", "air_engine_job", airJob.id, null, airJob, "Air Engine job created for one legacy product sample.", actorId),
      ...store.adminAuditLogs,
    ],
  }));

  return json({
    intake_id: id,
    intake_no: intakeNo,
    status: intake.status,
    source_object_id: sample.id,
    review_id: review.id,
    air_engine_job_id: airJob.id,
  }, 201);
}

function makeLegacyMediaRows(sample, intakeId, now) {
  return [
    { media_type: "original", file_url: sample.media.original, status: "legacy_reference" },
    { media_type: "detail", file_url: sample.media.detail, status: "legacy_reference" },
    { media_type: "scene", file_url: sample.media.scene, status: "legacy_reference" },
  ].map((item, index) => ({
    id: makeId("media"),
    intake_id: intakeId,
    object_id: "",
    media_type: item.media_type,
    file_url: item.file_url,
    data_url: "",
    storage_key: `legacy-product-sample/${sample.id}/${item.media_type}`,
    width: 0,
    height: 0,
    mime_type: "image/webp",
    status: item.status,
    sort_order: index,
    created_at: now,
  }));
}
