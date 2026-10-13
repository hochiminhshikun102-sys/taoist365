/**
 * R60 TEST_ONLY — publish handler 401/403 + ZERO_WRITE.
 * Uses in-memory KV mock. No production writes.
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publishUrl = pathToFileURL(
  path.join(root, "functions", "api", "admin", "object-intakes", "[intakeId]", "publish.js"),
).href;
const { onRequestPost } = await import(publishUrl);

const STORE_KEY = "vl-object-intake-store-v1";

function seedStore() {
  return {
    objectIntakes: [
      {
        id: "intake_approved_1",
        source_type: "admin_upload",
        identity_scope: "admin",
        entry_surface: "admin_os",
        supply_program: "commerce",
        status: "approved",
        submitted_by: "admin-os",
        created_by: "admin-os",
        original_title: "Quiet cup",
        original_description: "A quiet cup.",
        original_price: "$48.00",
        inventory: 1,
        category_hint: "ritual-objects",
        media_rights_status: "owned_or_original",
        air_engine_status: "ready",
      },
    ],
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

function officialAuth() {
  return {
    authenticated: true,
    valid: true,
    expired: false,
    invalid: false,
    server_verified: true,
    identity_kind: "official",
    role: "oa_admin",
    permissions: ["publish"],
    source: "middleware",
  };
}

async function callPublish({ auth, body, headers } = {}) {
  const kv = makeKv(seedStore());
  const request = new Request("https://example.test/api/admin/object-intakes/intake_approved_1/publish", {
    method: "POST",
    headers: { "content-type": "application/json", ...(headers || {}) },
    body: JSON.stringify(body || { actor_type: "admin_official", source: "official", submitted_by: "admin-os" }),
  });
  const context = {
    params: { intakeId: "intake_approved_1" },
    request,
    env: { OBJECT_INTAKE_KV: kv },
    data: auth ? { serverAuth: auth } : {},
  };
  const response = await onRequestPost(context);
  return { status: response.status, json: await response.json(), puts: kv.puts };
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
  } else {
    console.log("PASS", name);
  }
}

await check("missing auth context => HTTP 401 + ZERO_WRITE", async () => {
  const out = await callPublish({ auth: null });
  return { ok: out.status === 401 && out.puts.length === 0 && out.json.zero_write === true, detail: { status: out.status, puts: out.puts.length } };
});

await check("invalid auth context => HTTP 401 + ZERO_WRITE", async () => {
  const out = await callPublish({
    auth: { ...officialAuth(), invalid: true, valid: false, server_verified: false },
  });
  return { ok: out.status === 401 && out.puts.length === 0, detail: { status: out.status, puts: out.puts.length } };
});

await check("expired auth context => HTTP 401 + ZERO_WRITE", async () => {
  const out = await callPublish({
    auth: { ...officialAuth(), expired: true, valid: false, server_verified: false },
  });
  return { ok: out.status === 401 && out.puts.length === 0, detail: { status: out.status, puts: out.puts.length } };
});

await check("verified but unauthorized actor => HTTP 403 + ZERO_WRITE", async () => {
  const out = await callPublish({
    auth: {
      ...officialAuth(),
      identity_kind: "buyer",
      role: "global_buyer",
      permissions: ["intake_write"],
    },
  });
  return { ok: out.status === 403 && out.puts.length === 0, detail: { status: out.status, puts: out.puts.length } };
});

await check("approved draft + unauthenticated publish => HTTP 401 + ZERO_WRITE", async () => {
  const out = await callPublish({ auth: null, body: { official: true, actor_type: "oa_admin" } });
  return { ok: out.status === 401 && out.puts.length === 0, detail: { status: out.status, puts: out.puts.length } };
});

await check("non-admin with official-looking body => HTTP 403 + ZERO_WRITE", async () => {
  const out = await callPublish({
    auth: {
      authenticated: true,
      valid: true,
      expired: false,
      invalid: false,
      server_verified: true,
      identity_kind: "member",
      role: "member",
      permissions: [],
      source: "middleware",
    },
    body: { actor_type: "admin_official", role: "oa_admin", source: "official", submitted_by: "admin-os" },
  });
  return { ok: out.status === 403 && out.puts.length === 0, detail: { status: out.status, puts: out.puts.length } };
});

await check("legacy publish entry without server identity => HTTP 401 + ZERO_WRITE", async () => {
  const out = await callPublish({
    auth: null,
    headers: { "x-oa-actor-type": "admin_official", "x-oa-actor-role": "oa_admin", "x-oa-channel": "oa_admin" },
    body: { created_by: "admin-os", submitted_by: "admin-os", source: "official", actor_type: "official" },
  });
  return { ok: out.status === 401 && out.puts.length === 0, detail: { status: out.status, puts: out.puts.length, code: out.json.code } };
});

await check("official auth reaches handler after authz (not 401/403)", async () => {
  const out = await callPublish({ auth: officialAuth() });
  return {
    ok: out.status !== 401 && out.status !== 403,
    detail: { status: out.status, code: out.json.code || out.json.error },
  };
});

console.log(JSON.stringify({ TEST_ONLY: true, HANDLER: true, total: rows.length, failed, rows }, null, 2));
if (failed > 0) process.exit(1);
console.log("PUBLISH_HANDLER_GUARD_TEST=PASS");
