/**
 * R62 TEST_ONLY — targeted handler counterexamples. No production writes.
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const toUrl = (rel) => pathToFileURL(path.join(root, rel)).href;

const { onRequestPost: createIntake } = await import(toUrl("functions/api/object-intakes.js"));
const { onRequestPost: aiDraft } = await import(toUrl("functions/api/object-intakes/[intakeId]/ai-draft.js"));
const { onRequestPost: mediaPost } = await import(toUrl("functions/api/object-intakes/[intakeId]/media.js"));
const { onRequestPost: submitReview } = await import(toUrl("functions/api/object-intakes/[intakeId]/submit-review.js"));
const { onRequestPatch: patchObject } = await import(toUrl("functions/api/admin/objects/[objectId].js"));
const { resolvePublishPolicy } = await import(toUrl("functions/_publish-policy.js"));

const STORE_KEY = "vl-object-intake-store-v1";

function emptyStore() {
  return {
    objectIntakes: [],
    objectMedia: [],
    objectAiDrafts: [],
    objectReviewQueue: [],
    airEngineJobs: [],
    objects: [],
    assetRegistry: [],
    commerceOrders: [],
    buyerProfiles: [],
    adminAuditLogs: [],
  };
}

function makeKv(initial) {
  let data = JSON.stringify(initial);
  const puts = [];
  return {
    puts,
    async get(key) {
      if (key !== STORE_KEY) return null;
      return data;
    },
    async put(key, value) {
      puts.push({ key, value });
      data = value;
    },
  };
}

function buyer(sub) {
  return {
    authenticated: true,
    valid: true,
    expired: false,
    invalid: false,
    server_verified: true,
    identity_kind: "buyer",
    role: "global_buyer",
    permissions: ["intake_create", "intake_mutate", "ai_draft", "media"],
    sub,
    source: "middleware",
  };
}

function owner(sub) {
  return {
    authenticated: true,
    valid: true,
    expired: false,
    invalid: false,
    server_verified: true,
    identity_kind: "windkeep_owner",
    role: "windkeep_owner",
    permissions: ["intake_create", "intake_mutate", "ai_draft"],
    sub,
    source: "middleware",
  };
}

function official(perms) {
  return {
    authenticated: true,
    valid: true,
    expired: false,
    invalid: false,
    server_verified: true,
    identity_kind: "official",
    role: "oa_admin",
    permissions: perms,
    sub: "official-1",
    source: "middleware",
  };
}

function ctx({ auth, kv, url, method = "POST", body, params, headers }) {
  return {
    params: params || {},
    request: new Request(url, {
      method,
      headers: { "content-type": "application/json", ...(headers || {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    }),
    env: { OBJECT_INTAKE_KV: kv },
    data: auth ? { serverAuth: auth } : {},
  };
}

async function parse(response, kv) {
  return { status: response.status, json: await response.json(), puts: kv.puts.length };
}

const rows = [];
let failed = 0;
async function check(name, fn) {
  const result = await fn();
  const ok = Boolean(result.ok);
  rows.push({ name, ok, ...result.detail });
  if (!ok) {
    failed += 1;
    console.error("FAIL", name, result.detail);
  } else console.log("PASS", name);
}

function seedAB() {
  const store = emptyStore();
  store.objectIntakes = [
    {
      id: "draft_a",
      owner_sub: "buyer-A",
      owner_kind: "buyer",
      originator_kind: "buyer",
      external_origin: true,
      source_type: "buyer_upload",
      status: "draft",
    },
    {
      id: "draft_b",
      owner_sub: "buyer-B",
      owner_kind: "buyer",
      originator_kind: "buyer",
      external_origin: true,
      source_type: "buyer_upload",
      status: "draft",
    },
    {
      id: "owner_b",
      owner_sub: "owner-B",
      owner_kind: "windkeep_owner",
      originator_kind: "windkeep_owner",
      external_origin: true,
      source_type: "windkeep_member",
      status: "draft",
    },
  ];
  store.objects = [
    {
      object_id: "OBJ-REJ-1",
      intake_id: "draft_b",
      status: "archived",
      price: "$10.00",
      inventory: 1,
    },
  ];
  return store;
}

await check("buyer_create_source_type_admin_upload => reject + ZERO_WRITE", async () => {
  const kv = makeKv(emptyStore());
  const out = await parse(
    await createIntake(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/api/object-intakes", body: { source_type: "admin_upload", original_title: "x" } })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0 && out.json.zero_write === true, detail: out };
});

await check("buyer_create_source_admin_upload => reject + ZERO_WRITE", async () => {
  const kv = makeKv(emptyStore());
  const out = await parse(
    await createIntake(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/api/object-intakes", body: { source: "admin_upload" } })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("buyer_create_actor_type_official => reject + ZERO_WRITE", async () => {
  const kv = makeKv(emptyStore());
  const out = await parse(
    await createIntake(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/api/object-intakes", body: { actor_type: "official" } })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("buyer_create_ui_official_hint => reject + ZERO_WRITE", async () => {
  const kv = makeKv(emptyStore());
  const out = await parse(
    await createIntake(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/api/object-intakes", body: { ui_hint: "official_oa" } })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("server_verified_official_create_official_source => allowed", async () => {
  const kv = makeKv(emptyStore());
  const out = await parse(
    await createIntake(
      ctx({
        auth: official(["intake_create"]),
        kv,
        url: "https://example.test/api/object-intakes",
        body: { source_type: "admin_upload", original_title: "Official cup", original_description: "d", original_price: "10" },
      }),
    ),
    kv,
  );
  const stored = out.json.intake;
  return {
    ok: out.status === 201 && stored?.source_type === "admin_upload" && stored?.originator_kind === "official" && stored?.owner_sub === "official-1",
    detail: { status: out.status, source_type: stored?.source_type, originator_kind: stored?.originator_kind },
  };
});

await check("server_verified_official_create_buyer_source => not direct_publish", async () => {
  const kv = makeKv(emptyStore());
  const out = await parse(
    await createIntake(
      ctx({
        auth: official(["intake_create"]),
        kv,
        url: "https://example.test/api/object-intakes",
        body: { source_type: "buyer_upload", original_title: "Buyer path" },
      }),
    ),
    kv,
  );
  const policy = resolvePublishPolicy({ identity: official(["publish"]), intake: out.json.intake });
  return {
    ok: out.status === 201 && out.json.intake?.originator_kind === "buyer" && policy.can_direct_publish === false,
    detail: { status: out.status, originator: out.json.intake?.originator_kind, direct: policy.can_direct_publish },
  };
});

async function officialCreate(sourceType) {
  const kv = makeKv(emptyStore());
  const body = sourceType === undefined ? { original_title: "Official item" } : { source_type: sourceType, original_title: "Official item" };
  const out = await parse(
    await createIntake(ctx({ auth: official(["intake_create"]), kv, url: "https://example.test/api/object-intakes", body })),
    kv,
  );
  const policy = out.json.intake
    ? resolvePublishPolicy({ identity: official(["publish"]), intake: out.json.intake })
    : null;
  return { ...out, policy, source_type: out.json.intake?.source_type, empty_source_default: out.json.intake?.empty_source_default };
}

await check("official_create_source_external_link => preserve + review_required", async () => {
  const out = await officialCreate("external_link");
  return {
    ok: out.status === 201 && out.source_type === "external_link" && out.policy?.can_direct_publish === false && out.policy?.publish_policy === "review_required",
    detail: { status: out.status, source_type: out.source_type, direct: out.policy?.can_direct_publish },
  };
});

await check("official_create_source_supplier_batch => preserve + review_required", async () => {
  const out = await officialCreate("supplier_batch");
  return {
    ok: out.status === 201 && out.source_type === "supplier_batch" && out.policy?.can_direct_publish === false,
    detail: { status: out.status, source_type: out.source_type, direct: out.policy?.can_direct_publish },
  };
});

await check("official_create_source_legacy_product_sample => preserve + review_required", async () => {
  const out = await officialCreate("legacy_product_sample");
  return {
    ok: out.status === 201 && out.source_type === "legacy_product_sample" && out.policy?.can_direct_publish === false,
    detail: { status: out.status, source_type: out.source_type, direct: out.policy?.can_direct_publish },
  };
});

await check("official_create_source_unrecognized_non_empty => reject + ZERO_WRITE", async () => {
  const out = await officialCreate("unrecognized_source");
  return {
    ok: out.status === 403 && out.puts === 0 && out.json.zero_write === true && out.json.code === "SOURCE_BINDING_DENIED",
    detail: out,
  };
});

await check("official_create_admin_upload_supported_source => allowed, policy direct only after identity+source class", async () => {
  const out = await officialCreate("admin_upload");
  return {
    ok: out.status === 201 && out.source_type === "admin_upload" && out.policy?.can_direct_publish === true && out.json.intake?.empty_source_default !== true,
    detail: { status: out.status, source_type: out.source_type, direct: out.policy?.can_direct_publish },
  };
});

await check("official_create_empty_source_default => admin_upload explicit empty default", async () => {
  const out = await officialCreate(undefined);
  return {
    ok: out.status === 201 && out.source_type === "admin_upload" && out.empty_source_default === true,
    detail: { status: out.status, source_type: out.source_type, empty_source_default: out.empty_source_default },
  };
});

await check("buyer_create_allowed_source => previous R62 allowed path preserved", async () => {
  const kv = makeKv(emptyStore());
  const out = await parse(
    await createIntake(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/api/object-intakes", body: { original_title: "Buyer cup" } })),
    kv,
  );
  return {
    ok: out.status === 201 && out.json.intake?.source_type === "buyer_upload" && out.json.intake?.external_origin === true,
    detail: { status: out.status, source_type: out.json.intake?.source_type },
  };
});

await check("buyer_A_mutates_buyer_A_allowed_draft => allowed", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await aiDraft(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/api/object-intakes/draft_a/ai-draft", params: { intakeId: "draft_a" }, body: {} })),
    kv,
  );
  return { ok: out.status === 201 && out.puts >= 1, detail: out };
});

await check("buyer_A_mutates_buyer_B_draft => 403 + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await aiDraft(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/api/object-intakes/draft_b/ai-draft", params: { intakeId: "draft_b" }, body: {} })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("buyer_A_ai_draft_buyer_B_draft => 403 + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await aiDraft(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/x", params: { intakeId: "draft_b" }, body: {} })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("buyer_A_media_buyer_B_draft => 403 + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await mediaPost(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/x", params: { intakeId: "draft_b" }, body: {} })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("buyer_A_submit_review_buyer_B_draft => 403 + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await submitReview(ctx({ auth: buyer("buyer-A"), kv, url: "https://example.test/x", params: { intakeId: "draft_b" }, body: {} })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("windkeep_owner_A_mutates_owner_B_object => 403 + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await aiDraft(ctx({ auth: owner("owner-A"), kv, url: "https://example.test/x", params: { intakeId: "owner_b" }, body: {} })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("admin_without_required_action_permission_mutates_foreign_target => 403 + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await aiDraft(ctx({ auth: official(["publish"]), kv, url: "https://example.test/x", params: { intakeId: "draft_b" }, body: {} })),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("official_patch_object_status_published_linked_to_rejected_buyer_intake => reject + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await patchObject(
      ctx({
        auth: official(["object_patch", "publish"]),
        kv,
        url: "https://example.test/api/admin/objects/OBJ-REJ-1",
        method: "PATCH",
        params: { objectId: "OBJ-REJ-1" },
        body: { status: "published" },
      }),
    ),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0 && out.json.code === "PUBLISH_GATE_REQUIRED", detail: out };
});

await check("official_patch_object_status_published_without_publish_gate => reject + ZERO_WRITE", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await patchObject(
      ctx({
        auth: official(["object_patch"]),
        kv,
        url: "https://example.test/x",
        method: "PATCH",
        params: { objectId: "OBJ-REJ-1" },
        body: { status: "published" },
      }),
    ),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0, detail: out };
});

await check("object_patch_publish_transition_requires_authoritative_publish_gate => enforced", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await patchObject(
      ctx({
        auth: official(["object_patch", "publish"]),
        kv,
        url: "https://example.test/x",
        method: "PATCH",
        params: { objectId: "OBJ-REJ-1" },
        body: { status: "published", inventory: 9 },
      }),
    ),
    kv,
  );
  return { ok: out.status === 403 && out.puts === 0 && out.json.code === "PUBLISH_GATE_REQUIRED", detail: out };
});

await check("object_patch_non_publish_safe_field_with_permission => allowed", async () => {
  const kv = makeKv(seedAB());
  const out = await parse(
    await patchObject(
      ctx({
        auth: official(["object_patch"]),
        kv,
        url: "https://example.test/x",
        method: "PATCH",
        params: { objectId: "OBJ-REJ-1" },
        body: { inventory: 3 },
      }),
    ),
    kv,
  );
  return { ok: out.status === 200 && out.json.object?.inventory === 3 && out.json.object?.status === "archived", detail: { status: out.status, inventory: out.json.object?.inventory } };
});

console.log(JSON.stringify({ TEST_ONLY: true, TARGETED: true, total: rows.length, failed, rows }, null, 2));
if (failed > 0) process.exit(1);
console.log("TARGETED_COUNTEREXAMPLE_MATRIX=PASS");
