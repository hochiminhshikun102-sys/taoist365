/**
 * AUTH-06B / R33 — TEST_ONLY publish policy guard matrix.
 * Validates functions/_publish-policy.js (server-side source of truth).
 */
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modUrl = pathToFileURL(path.join(root, "functions", "_publish-policy.js")).href;
const { resolvePublishPolicy, canDirectPublish } = await import(modUrl);

/** @type {{ name: string; input: object; expectPolicy: string; expectDirect: boolean; expectBucket?: string }[]} */
const cases = [
  {
    name: "official OA + admin role",
    input: {
      source_type: "admin_upload",
      entry_surface: "admin_os",
      identity_scope: "admin",
      actor_type: "admin_official",
      role: "oa_admin",
      channel: "oa_admin",
    },
    expectPolicy: "direct_publish",
    expectDirect: true,
    expectBucket: "OFFICIAL_OA_UPLOAD",
  },
  {
    name: "official OA + non-admin role",
    input: {
      source_type: "admin_upload",
      entry_surface: "admin_os",
      identity_scope: "admin",
      actor_type: "buyer",
      role: "global_buyer",
      channel: "oa_admin",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "OFFICIAL_OA_UPLOAD",
  },
  {
    name: "global buyer",
    input: {
      source_type: "buyer_upload",
      entry_surface: "wind_seeker",
      identity_scope: "wind_seeker",
      actor_type: "buyer",
      role: "global_buyer",
      channel: "buyer_portal",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "GLOBAL_BUYER_UPLOAD",
  },
  {
    name: "WindKeep owner",
    input: {
      source_type: "windkeep_member",
      entry_surface: "member_center",
      identity_scope: "windkeep_member",
      supply_program: "windkeep",
      actor_type: "owner",
      role: "windkeep_owner",
      channel: "windkeep",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "BARTER_WINDKEEP_OWNER_UPLOAD",
  },
  {
    name: "barter owner",
    input: {
      source_type: "barter_upload",
      entry_surface: "barter",
      identity_scope: "member",
      actor_type: "owner",
      role: "windkeep_owner",
      channel: "barter",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "BARTER_WINDKEEP_OWNER_UPLOAD",
  },
  {
    name: "unknown source",
    input: {
      source_type: "mystery_source",
      actor_type: "admin_official",
      role: "oa_admin",
      channel: "oa_admin",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "UNKNOWN_OR_UNMAPPED",
  },
  {
    name: "external_link not auto-official",
    input: {
      source_type: "external_link",
      entry_surface: "admin_os",
      identity_scope: "admin",
      actor_type: "admin_official",
      role: "oa_admin",
      channel: "oa_admin",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "UNKNOWN_OR_UNMAPPED",
  },
  {
    name: "supplier_batch not auto-official",
    input: {
      source_type: "supplier_batch",
      entry_surface: "admin_os",
      identity_scope: "supplier",
      actor_type: "admin_official",
      role: "oa_admin",
      channel: "oa_admin",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "UNKNOWN_OR_UNMAPPED",
  },
  {
    name: "buyer body cannot spoof official on buyer intake",
    input: {
      source_type: "buyer_upload",
      entry_surface: "wind_seeker",
      identity_scope: "wind_seeker",
      actor_type: "admin_official",
      role: "oa_admin",
      channel: "oa_admin",
    },
    expectPolicy: "review_required",
    expectDirect: false,
    expectBucket: "GLOBAL_BUYER_UPLOAD",
  },
];

let failed = 0;
const rows = [];

for (const testCase of cases) {
  const policy = resolvePublishPolicy(testCase.input);
  const direct = canDirectPublish(testCase.input);
  const ok =
    policy.publish_policy === testCase.expectPolicy &&
    direct === testCase.expectDirect &&
    policy.can_direct_publish === testCase.expectDirect &&
    (!testCase.expectBucket || policy.policy_bucket === testCase.expectBucket) &&
    typeof policy.reason === "string" &&
    policy.reason.length > 0 &&
    typeof policy.auditAction === "string";

  rows.push({
    name: testCase.name,
    ok,
    publish_policy: policy.publish_policy,
    can_direct_publish: policy.can_direct_publish,
    policy_bucket: policy.policy_bucket,
    reason: policy.reason,
    deny_code: policy.deny_code,
    auditAction: policy.auditAction,
  });

  if (!ok) {
    failed += 1;
    console.error("FAIL", testCase.name, policy);
  } else {
    console.log("PASS", testCase.name, policy.publish_policy, policy.policy_bucket);
  }
}

console.log(
  JSON.stringify(
    {
      TEST_ONLY: true,
      SMOKE: true,
      total: cases.length,
      failed,
      rows,
    },
    null,
    2,
  ),
);

if (failed > 0) process.exit(1);
console.log("PUBLISH_POLICY_GUARD_TEST=PASS");
