#!/usr/bin/env node
/**
 * R70 no-write / Provider boundary audit smoke.
 * Validates audit package + R72 delta invariants. No servers. No Provider calls.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "docs/oa/r70-no-write-provider-boundary-audit");
const required = [
  "README.md",
  "AUDIT.md",
  "AUDIT.json",
  "FINDINGS.md",
  "STATUS.txt",
].map((n) => join(dir, n));

const EXPECTED_HEAD = "c2a680ef006df21b2f76276b11b1dc413af35ee8";
const EXPECTED_BASE = "bf83dc4e8f1ceeaabfc4d2788271c40bc04d9817";
const EXPECTED_R72_FILES = [
  "docs/oa/r69-route-owner-boundary-ledger/LEDGER.json",
  "docs/oa/r69-route-owner-boundary-ledger/LEDGER.md",
  "docs/oa/r69-route-owner-boundary-ledger/README.md",
  "docs/oa/r69-route-owner-boundary-ledger/STATUS.txt",
  "scripts/oa-r67-overview-readiness-smoke.mjs",
  "scripts/oa-r69-route-owner-boundary-smoke.mjs",
  "src/components/oa-overview/OverviewExceptionProjectionWorkbench.tsx",
  "src/components/oa-overview/OverviewReadinessControlBoard.tsx",
  "src/styles/oa/oa-overview.css",
];

const FORBIDDEN = [
  "deploy=true",
  "provider connected",
  "real write enabled",
  "deploy authorized",
];

const errors = [];
const notes = [];
const ok = (m) => notes.push(m);
const fail = (m) => errors.push(m);

for (const p of required) {
  if (!existsSync(p)) fail(`MISSING ${p}`);
  else ok(`present ${p.replace(/\\/g, "/")}`);
}

let audit;
try {
  audit = JSON.parse(readFileSync(join(dir, "AUDIT.json"), "utf8"));
  ok("AUDIT.json parse OK");
} catch (e) {
  fail(`AUDIT.json parse fail: ${e.message}`);
  console.log(JSON.stringify({ pass: false, errors, notes }, null, 2));
  process.exit(1);
}

if (audit.audit_target_head !== EXPECTED_HEAD) {
  fail(`audit_target_head mismatch ${audit.audit_target_head}`);
}
if (audit.product_base !== EXPECTED_BASE) {
  fail(`product_base mismatch ${audit.product_base}`);
}

const listed = (audit.r72_changed_files || []).map((x) => x.path);
if (listed.length !== 9) fail(`r72_changed_files count ${listed.length} != 9`);
for (const f of EXPECTED_R72_FILES) {
  if (!listed.includes(f)) fail(`R72 file missing in AUDIT.json: ${f}`);
}
ok("R72_CHANGED_FILES_AUDITED=9");

if (audit.open_findings_count !== 0) {
  fail(`open_findings_count expected 0 got ${audit.open_findings_count}`);
}
if ((audit.open_findings || []).length !== 0) fail("open_findings not empty");

const bc = audit.boundary_checks || {};
for (const k of [
  "r67_overview_no_real_write",
  "r69a_docs_and_smoke_only",
  "product_publish_r3_r68_not_overwritten",
  "public_shell_not_overwritten",
  "no_provider_connected_claims_in_r72_delta",
  "no_deploy_authorized_claims_in_r72_delta",
  "no_cloudflare_env_binding_write",
  "no_real_business_write",
]) {
  if (bc[k] !== true) fail(`boundary_checks.${k} not true`);
}
ok("BOUNDARY_CHECKS_TRUE");

const pins = bc.freeze_pins_retained || [];
for (const p of ["93201cd", "14546c4", "98dba65", "969e8ac"]) {
  if (!pins.includes(p)) fail(`freeze pin missing ${p}`);
}
ok("FREEZE_PINS_RECORDED");

// Live git delta check when repo available
try {
  const diff = execSync(`git diff --name-only ${EXPECTED_BASE}...${EXPECTED_HEAD}`, {
    cwd: root,
    encoding: "utf8",
  })
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .sort();
  const expected = [...EXPECTED_R72_FILES].sort();
  if (diff.length !== 9) fail(`git delta count ${diff.length} != 9`);
  for (let i = 0; i < expected.length; i++) {
    if (diff[i] !== expected[i]) fail(`git delta mismatch at ${i}: ${diff[i]} vs ${expected[i]}`);
  }
  // Must not include forbidden trees
  for (const f of diff) {
    if (
      f.startsWith("functions/") ||
      f.startsWith("src/components/oa-shell/") ||
      f.startsWith("src/components/oa-publish/") ||
      f.startsWith("src/lib/oa-publish/") ||
      f === "package.json" ||
      f.includes("wrangler")
    ) {
      fail(`forbidden path in R72 delta: ${f}`);
    }
  }
  ok("GIT_DELTA_MATCHES_EXPECTED_9");
} catch (e) {
  fail(`git delta check failed: ${e.message}`);
}

// Scan R72 UI/docs for fake-availability claims.
// Skip smoke scripts: they intentionally list reject phrases in FORBIDDEN arrays (EXPECTED_TEST_ONLY).
for (const rel of EXPECTED_R72_FILES) {
  const abs = join(root, rel);
  if (!existsSync(abs)) {
    fail(`R72 file missing on disk: ${rel}`);
    continue;
  }
  if (rel.startsWith("scripts/") && rel.endsWith(".mjs")) {
    ok(`skip_phrase_scan_smoke_script ${rel}`);
    continue;
  }
  const text = readFileSync(abs, "utf8").toLowerCase();
  for (const phrase of FORBIDDEN) {
    if (text.includes(phrase.toLowerCase())) {
      fail(`FORBIDDEN_PHRASE_IN_R72_DELTA ${rel}: ${phrase}`);
    }
  }
}
// Status must keep hard false/disabled flags
const status = readFileSync(join(dir, "STATUS.txt"), "utf8");
if (!/REAL_BUSINESS_WRITE=FALSE/.test(status)) fail("STATUS missing REAL_BUSINESS_WRITE=FALSE");
if (!/NO_PROVIDER_WIRING=TRUE/.test(status)) fail("STATUS missing NO_PROVIDER_WIRING=TRUE");
if (!/CLOUDFLARE_ENV_BINDING_WRITE=FALSE/.test(status)) {
  fail("STATUS missing CLOUDFLARE_ENV_BINDING_WRITE=FALSE");
}
if (!/DEPLOY=FALSE/.test(status)) fail("STATUS missing DEPLOY=FALSE");
ok("FORBIDDEN_PHRASE_SCAN_PASS");

const pass = errors.length === 0;
console.log(
  JSON.stringify(
    {
      pass,
      smoke: "oa-r70-no-write-provider-boundary-audit",
      audit_target_head: EXPECTED_HEAD,
      open_findings_count: audit.open_findings_count,
      errors,
      notes,
    },
    null,
    2,
  ),
);
process.exit(pass ? 0 : 1);
