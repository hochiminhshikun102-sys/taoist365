#!/usr/bin/env node
/**
 * R71 stage2 evidence index smoke — file/JSON integrity only.
 * No servers. No Provider calls. No next build.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docs = join(root, "docs/oa/r71-stage2-evidence-index");
const handoff = join(
  root,
  "handoff/oa/stage2-evidence-index/STAGE2_WORK_REVIEW_ENTRY_CN.md",
);

const required = [
  join(docs, "README.md"),
  join(docs, "STAGE2_INDEX.md"),
  join(docs, "STAGE2_INDEX.json"),
  join(docs, "OPEN_ITEMS.md"),
  join(docs, "STATUS.txt"),
  handoff,
];

const REQUIRED_ACCEPTED_IDS = [
  "product_publish_r3_r68_fixed_package",
  "r67_overview_readiness_board",
  "r69a_route_owner_ledger",
  "r72_stage2_integration_candidate",
  "r70a_no_write_provider_boundary_audit",
];

const REQUIRED_OPEN_IDS = [
  "r68_new_visual_screenshot_acceptance",
  "formal_identity_not_complete",
  "provider_not_connected",
  "cloud_decode_not_connected",
  "work_stage_review_not_complete",
  "pr_not_created",
  "merge_not_occurred",
];

const FORBIDDEN_CLAIM_STRINGS = [
  "work_stage_review_passed=true",
  "provider connected",
  "deploy=true",
  "real write enabled",
  "stage2_work_review_passed",
];

const errors = [];
const notes = [];
const ok = (m) => notes.push(m);
const fail = (m) => errors.push(m);

for (const p of required) {
  if (!existsSync(p)) fail(`MISSING ${p}`);
  else ok(`present ${p.replace(/\\/g, "/")}`);
}

let idx;
try {
  idx = JSON.parse(readFileSync(join(docs, "STAGE2_INDEX.json"), "utf8"));
  ok("STAGE2_INDEX.json parse OK");
} catch (e) {
  fail(`JSON parse fail: ${e.message}`);
  console.log(JSON.stringify({ pass: false, errors, notes }, null, 2));
  process.exit(1);
}

if (idx.stage !== "OA_STAGE2") fail(`stage expected OA_STAGE2 got ${idx.stage}`);
if (!idx.status) {
  fail("status missing");
} else if (
  /(^|[^A-Z_])WORK_PASSED([^A-Z_]|$)/i.test(idx.status) ||
  /(^|[^A-Z_])PRODUCTION_READY([^A-Z_]|$)/i.test(idx.status) ||
  /WORK_PASSED=TRUE|PRODUCTION_READY=TRUE/i.test(idx.status)
) {
  fail(`status unsafe: ${idx.status}`);
}
ok(`status=${idx.status}`);

const accepted = Array.isArray(idx.accepted_items) ? idx.accepted_items : [];
const acceptedIds = accepted.map((x) => x.id);
for (const id of REQUIRED_ACCEPTED_IDS) {
  if (!acceptedIds.includes(id)) fail(`accepted_items missing ${id}`);
}
ok("accepted_items_five_present");

const open = Array.isArray(idx.open_items) ? idx.open_items : [];
const openIds = open.map((x) => x.id);
for (const id of REQUIRED_OPEN_IDS) {
  if (!openIds.includes(id)) fail(`open_items missing ${id}`);
}
for (const item of open) {
  if (String(item.status).toUpperCase() === "PASS") {
    fail(`open_item wrongly PASS: ${item.id}`);
  }
}
ok("open_items_preserved");

const forbidden = Array.isArray(idx.forbidden_claims) ? idx.forbidden_claims : [];
for (const c of [
  "stage2_work_review_passed",
  "provider_connected",
  "deploy=true",
  "r70_open_findings_zero_means_full_stage2_pass",
]) {
  if (!forbidden.includes(c)) fail(`forbidden_claims missing ${c}`);
}
ok("forbidden_claims_present");

if (!Array.isArray(idx.next_steps) || idx.next_steps.length < 3) {
  fail("next_steps too short");
} else ok("next_steps_present");

// Human docs must keep OPEN language
const openMd = readFileSync(join(docs, "OPEN_ITEMS.md"), "utf8");
for (const needle of [
  "R68 新视觉截图验收",
  "Provider 未接",
  "Work 总审尚未完成",
  "PR 尚未创建",
  "OPEN_FINDINGS_COUNT=0",
]) {
  if (!openMd.includes(needle)) fail(`OPEN_ITEMS.md missing ${needle}`);
}
if (/新视觉截图验收.*PASS|Work 总审.*已通过/.test(openMd)) {
  fail("OPEN_ITEMS.md contains forbidden PASS language");
}
ok("OPEN_ITEMS.md_language_ok");

const entry = readFileSync(handoff, "utf8");
if (!entry.includes("准备提交大阶段总审") && !entry.includes("准备提交大阶段 Work 总审")) {
  fail("WORK_ENTRY missing Plus summary / submit phrasing");
}
if (!entry.includes("Plus 已完成日常主控汇总")) {
  fail("WORK_ENTRY missing Plus daily summary line");
}
if (/WORK_STAGE_REVIEW_PASSED=TRUE/.test(entry)) {
  fail("WORK_ENTRY falsely claims Work passed");
}
// Affirmative only (ignore 不得/不是/不能 lines)
const affirmativePass = entry
  .split(/\r?\n/)
  .filter((line) => !/不得|不是|不能|尚未|未授权|FALSE/.test(line))
  .join("\n");
if (/阶段二已经 Work 通过|Work 总审已经通过|Work 已通过/.test(affirmativePass)) {
  fail("WORK_ENTRY falsely claims Work passed");
}
if (!entry.includes("WORK_STAGE_REVIEW_PASSED=FALSE")) {
  fail("WORK_ENTRY missing WORK_STAGE_REVIEW_PASSED=FALSE");
}
ok("WORK_ENTRY_ok");

const status = readFileSync(join(docs, "STATUS.txt"), "utf8");
for (const line of [
  "R3_R68_INDEXED=TRUE",
  "R67_INDEXED=TRUE",
  "R69A_INDEXED=TRUE",
  "R72_INDEXED=TRUE",
  "R70A_INDEXED=TRUE",
  "OPEN_ITEMS_PRESERVED=TRUE",
  "DEPLOY=FALSE",
  "PR=FALSE",
  "MERGE=FALSE",
  "NO_PRODUCT_SOURCE_CHANGED=TRUE",
]) {
  if (!status.includes(line)) fail(`STATUS missing ${line}`);
}
if (status.includes("WORK_STAGE_REVIEW_PASSED=TRUE")) {
  fail("STATUS claims WORK passed");
}
ok("STATUS_flags_ok");

// Soft scan docs for dangerous absolute claims (exclude forbidden_claims list itself)
const blob = [
  readFileSync(join(docs, "README.md"), "utf8"),
  readFileSync(join(docs, "STAGE2_INDEX.md"), "utf8"),
  status,
  entry,
].join("\n").toLowerCase();
for (const phrase of FORBIDDEN_CLAIM_STRINGS) {
  if (blob.includes(phrase.toLowerCase())) {
    fail(`forbidden claim string in narrative: ${phrase}`);
  }
}
ok("narrative_forbidden_scan_pass");

const pass = errors.length === 0;
console.log(
  JSON.stringify(
    {
      pass,
      smoke: "oa-r71-stage2-evidence-index",
      accepted_count: accepted.length,
      open_count: open.length,
      errors,
      notes,
    },
    null,
    2,
  ),
);
process.exit(pass ? 0 : 1);
