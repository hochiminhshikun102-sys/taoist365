/**
 * R60 TEST_ONLY — policy matrix (no production writes).
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modUrl = pathToFileURL(path.join(root, "functions", "_publish-policy.js")).href;
const { resolvePublishPolicy, canDirectPublish, assertActionAuthz, emptyIdentity } = await import(modUrl);

const official = {
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

const buyer = {
  ...official,
  identity_kind: "buyer",
  role: "global_buyer",
  permissions: ["intake_write"],
};

const owner = {
  ...official,
  identity_kind: "windkeep_owner",
  role: "windkeep_owner",
  permissions: ["intake_write"],
};

/** @type {{ name: string; run: () => boolean }[]} */
const cases = [];

function expect(name, cond) {
  cases.push({ name, run: () => Boolean(cond) });
}

expect(
  "official_oa + server_verified_admin + publish permission => direct_publish",
  resolvePublishPolicy({
    identity: official,
    source_type: "admin_upload",
    intake: { source_type: "admin_upload", entry_surface: "admin_os", identity_scope: "admin" },
  }).can_direct_publish === true,
);

expect(
  "verified buyer / global_buyer => review_required",
  resolvePublishPolicy({
    identity: official,
    intake: { source_type: "buyer_upload", entry_surface: "wind_seeker", identity_scope: "wind_seeker" },
  }).publish_policy === "review_required",
);

expect(
  "verified barter / windkeep_owner => review_required",
  resolvePublishPolicy({
    identity: official,
    intake: { source_type: "windkeep_member", entry_surface: "member_center", identity_scope: "windkeep_member", supply_program: "windkeep" },
  }).publish_policy === "review_required",
);

expect(
  "external_link => review_required",
  resolvePublishPolicy({ identity: official, intake: { source_type: "external_link" } }).publish_policy === "review_required",
);

expect(
  "supplier_batch => review_required",
  resolvePublishPolicy({ identity: official, intake: { source_type: "supplier_batch" } }).publish_policy === "review_required",
);

expect(
  "request_body_official_only => no permission elevation",
  canDirectPublish({
    identity: emptyIdentity(),
    actor_type: "admin_official",
    role: "oa_admin",
    source_type: "official_oa",
    intake: { source_type: "admin_upload" },
  }) === false,
);

expect(
  "official tag / source=official only => no elevation",
  canDirectPublish({
    identity: emptyIdentity(),
    source: "official",
    source_type: "official",
    intake: { source_type: "official", tags: ["official"] },
  }) === false,
);

expect(
  "draft_label_official only => no elevation",
  canDirectPublish({
    identity: emptyIdentity(),
    intake: { source_type: "admin_upload", labels: ["official"], tags: ["oa_admin"] },
  }) === false,
);

expect(
  "created_by=admin-os only => no elevation",
  canDirectPublish({
    identity: emptyIdentity(),
    created_by: "admin-os",
    intake: { source_type: "admin_upload", created_by: "admin-os" },
  }) === false,
);

expect(
  "submitted_by=admin-os only => no elevation",
  canDirectPublish({
    identity: emptyIdentity(),
    submitted_by: "admin-os",
    intake: { source_type: "admin_upload", submitted_by: "admin-os" },
  }) === false,
);

expect(
  "actor_type=official only => no elevation",
  canDirectPublish({
    identity: emptyIdentity(),
    actor_type: "admin_official",
    intake: { source_type: "admin_upload", actor_type: "oa_admin" },
  }) === false,
);

expect("missing auth => 401", assertActionAuthz(emptyIdentity(), "publish").httpStatus === 401);
expect(
  "invalid auth => 401",
  assertActionAuthz(
    { ...official, invalid: true, valid: false, server_verified: false },
    "publish",
  ).httpStatus === 401,
);
expect(
  "expired auth => 401",
  assertActionAuthz({ ...official, expired: true, valid: false, server_verified: false }, "publish").httpStatus === 401,
);
expect("verified unauthorized => 403", assertActionAuthz(buyer, "publish").httpStatus === 403);
expect("verified owner cannot publish skip => 403", assertActionAuthz(owner, "publish").httpStatus === 403);
expect("verified official publish authz ok", assertActionAuthz(official, "publish").ok === true);
expect(
  "official + oa_admin + permissions=[] cannot publish",
  assertActionAuthz({ ...official, permissions: [] }, "publish").httpStatus === 403,
);
expect(
  "external origin cannot be washed to direct_publish",
  resolvePublishPolicy({
    identity: official,
    intake: { source_type: "admin_upload", originator_kind: "buyer", external_origin: true },
  }).can_direct_publish === false,
);
expect(
  "server_verified_official_create_buyer_source => not direct_publish",
  resolvePublishPolicy({
    identity: official,
    intake: { source_type: "buyer_upload", originator_kind: "buyer", external_origin: true },
  }).publish_policy === "review_required",
);

let failed = 0;
for (const testCase of cases) {
  const ok = testCase.run();
  if (!ok) {
    failed += 1;
    console.error("FAIL", testCase.name);
  } else {
    console.log("PASS", testCase.name);
  }
}

console.log(JSON.stringify({ TEST_ONLY: true, total: cases.length, failed }, null, 2));
if (failed > 0) process.exit(1);
console.log("PUBLISH_POLICY_GUARD_TEST=PASS");
