#!/usr/bin/env node
/**
 * R69 Route / Owner / Write-lock Ledger smoke.
 * File + ledger consistency only. No servers. No Provider calls.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ledgerPath = join(root, "docs/oa/r69-route-owner-boundary-ledger/LEDGER.json");
const mdPath = join(root, "docs/oa/r69-route-owner-boundary-ledger/LEDGER.md");
const readmePath = join(root, "docs/oa/r69-route-owner-boundary-ledger/README.md");
const statusPath = join(root, "docs/oa/r69-route-owner-boundary-ledger/STATUS.txt");

const REQUIRED_PRIMARY = [
  "Overview",
  "CO",
  "Operations",
  "AI Ops",
  "Site",
  "GEO",
  "CS Center",
  "Finance",
  "Logistics",
  "Supply Chain",
  "WK",
  "GS",
  "Compliance",
  "Settings",
];

const REQUIRED_CO_SECONDARY = [
  "/admin/oa/co/intake",
  "/admin/oa/co/objects",
  "/admin/oa/co/media",
  "/admin/oa/co/orders",
  "/admin/oa/co/payments",
  "/admin/oa/co/shipping",
];

const FORBIDDEN_PHRASES = [
  "deploy=true",
  "provider connected",
  "real write enabled",
];

const errors = [];
const notes = [];

function fail(msg) {
  errors.push(msg);
}

function ok(msg) {
  notes.push(msg);
}

if (!existsSync(ledgerPath)) fail(`MISSING ${ledgerPath}`);
if (!existsSync(mdPath)) fail(`MISSING ${mdPath}`);
if (!existsSync(readmePath)) fail(`MISSING ${readmePath}`);
if (!existsSync(statusPath)) fail(`MISSING ${statusPath}`);

let ledger;
try {
  ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
  ok("LEDGER.json parse OK");
} catch (e) {
  fail(`LEDGER.json parse fail: ${e.message}`);
  console.log(JSON.stringify({ pass: false, errors, notes }, null, 2));
  process.exit(1);
}

const blob =
  JSON.stringify(ledger) +
  readFileSync(mdPath, "utf8") +
  readFileSync(readmePath, "utf8") +
  readFileSync(statusPath, "utf8");

for (const phrase of FORBIDDEN_PHRASES) {
  if (blob.toLowerCase().includes(phrase.toLowerCase())) {
    fail(`FORBIDDEN_PHRASE_PRESENT: ${phrase}`);
  }
}

const entries = Array.isArray(ledger.entries) ? ledger.entries : [];
if (entries.length === 0) fail("entries empty");

const primaryModules = new Set(
  entries.filter((e) => e.level === "primary").map((e) => e.module),
);
for (const m of REQUIRED_PRIMARY) {
  if (!primaryModules.has(m)) fail(`PRIMARY_MODULE_MISSING: ${m}`);
}
if (REQUIRED_PRIMARY.every((m) => primaryModules.has(m))) {
  ok(`FOURTEEN_PRIMARY_MODULES_COVERED=${REQUIRED_PRIMARY.length}`);
}

const routes = new Set(entries.map((e) => e.route));
for (const r of REQUIRED_CO_SECONDARY) {
  if (!routes.has(r)) fail(`CO_SECONDARY_MISSING: ${r}`);
}
if (REQUIRED_CO_SECONDARY.every((r) => routes.has(r))) {
  ok("CO_SECONDARY_ROUTES_COVERED=6");
}

const requiredFields = [
  "route",
  "module",
  "level",
  "owner",
  "write_owner",
  "readonly_status",
  "provider_status",
  "real_business_write",
  "cloud_env_binding_write",
  "deploy_status",
  "allowed_writer",
  "forbidden_writers",
  "source_file",
  "notes",
  "next_action",
];

for (const e of entries) {
  for (const f of requiredFields) {
    if (e[f] === undefined || e[f] === null || e[f] === "") {
      fail(`FIELD_MISSING ${e.route || "?"} .${f}`);
    }
  }
  if (e.real_business_write === true || e.real_business_write === "TRUE") {
    fail(`REAL_BUSINESS_WRITE_TRUE_FORBIDDEN ${e.route}`);
  }
  if (e.cloud_env_binding_write === true || e.cloud_env_binding_write === "TRUE") {
    fail(`CLOUD_ENV_BINDING_WRITE_TRUE_FORBIDDEN ${e.route}`);
  }
  if (String(e.deploy_status).toLowerCase() === "authorized") {
    fail(`DEPLOY_STATUS_AUTHORIZED_FORBIDDEN ${e.route}`);
  }
  if (!["not_connected", "provider_pending", "not_applicable"].includes(e.provider_status)) {
    fail(`PROVIDER_STATUS_INVALID ${e.route}=${e.provider_status}`);
  }
}

const freeze = ledger.freeze_objects || {};
if (!freeze.product_publish_digua04_fixed_package) {
  fail("FREEZE_PRODUCT_PUBLISH_MISSING");
} else {
  const shorts = freeze.product_publish_digua04_fixed_package.commits_short || [];
  for (const s of ["8337694", "ceff7f0", "98dba65", "969e8ac"]) {
    if (!shorts.includes(s)) fail(`FREEZE_PUBLISH_SHA_MISSING ${s}`);
  }
  ok("FREEZE_OBJECTS_PRODUCT_PUBLISH_RECORDED");
}
if (!freeze.public_shell_fixed_inputs) {
  fail("FREEZE_SHELL_MISSING");
} else {
  const shorts = freeze.public_shell_fixed_inputs.commits_short || [];
  for (const s of ["93201cd", "14546c4"]) {
    if (!shorts.includes(s)) fail(`FREEZE_SHELL_SHA_MISSING ${s}`);
  }
  ok("FREEZE_OBJECTS_SHELL_RECORDED");
}

const boundaries = ledger.line_boundaries || {};
if (!String(boundaries.dogdan01 || "").includes("R67")) fail("R67_BOUNDARY_MISSING");
else ok("R67_BOUNDARY_RECORDED");
if (!String(boundaries.dogdan02 || "").includes("R69")) fail("R69_BOUNDARY_MISSING");
else ok("R69_BOUNDARY_RECORDED");
if (!String(boundaries.digua04 || "").match(/R3|R68|fixed/i)) fail("R3_R68_BOUNDARY_MISSING");
else ok("R3_R68_BOUNDARY_RECORDED");

// Conflict: dogdan02 must not be write_owner of src pages
for (const e of entries) {
  if (String(e.write_owner).includes("DOGDAN02") && e.source_file?.startsWith("src/")) {
    fail(`BOUNDARY_CONFLICT dogdan02 write_owner on src ${e.route}`);
  }
}

const pass = errors.length === 0;
const result = {
  pass,
  smoke: "oa-r69-route-owner-boundary-smoke",
  entry_count: entries.length,
  primary_modules: [...primaryModules],
  errors,
  notes,
};
console.log(JSON.stringify(result, null, 2));
process.exit(pass ? 0 : 1);
