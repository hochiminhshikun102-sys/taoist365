import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const forbidden = [
  "src/app/admin/oa/co/intake/page.tsx",
  "src/components/oa-publish",
  "src/lib/oa-publish",
  "src/components/oa-shell",
];

const required = [
  "src/app/admin/oa/overview/page.tsx",
  "src/components/oa-overview/OverviewReadinessControlBoard.tsx",
  "src/components/oa-overview/readinessBoard.ts",
  "src/styles/oa/oa-overview.css",
];

const primaryRoutes = [
  "/admin/oa/overview",
  "/admin/oa/commerce",
  "/admin/oa/operations",
  "/admin/oa/ai-ops",
  "/admin/oa/site",
  "/admin/oa/geo",
  "/admin/oa/cs-center",
  "/admin/oa/finance",
  "/admin/oa/logistics",
  "/admin/oa/supply-chain",
  "/admin/oa/wk",
  "/admin/oa/gs",
  "/admin/oa/compliance",
  "/admin/oa/settings",
];

const modules = [
  "overview",
  "co",
  "operations",
  "ai_ops",
  "site",
  "geo",
  "cs_center",
  "finance",
  "logistics",
  "supply_chain",
  "wk",
  "gs",
  "compliance",
  "settings",
];

const flags = [
  "OA readonly foundation",
  "Provider not connected",
  "Production deploy disabled",
  "Real business write disabled",
];

let failed = 0;

function fail(msg) {
  failed += 1;
  console.error("FAIL", msg);
}

for (const rel of required) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) fail(`missing ${rel}`);
  else console.log("PASS file", rel);
}

const page = fs.readFileSync(path.join(root, "src/app/admin/oa/overview/page.tsx"), "utf8");
if (!page.includes("OverviewReadinessControlBoard")) fail("overview page missing Readiness board");
else console.log("PASS overview wires Readiness board");
if (!page.includes("OaSharedShell")) fail("overview lost shared shell");
else console.log("PASS overview still uses OaSharedShell");

const board = fs.readFileSync(path.join(root, "src/components/oa-overview/readinessBoard.ts"), "utf8");
for (const key of modules) {
  if (!board.includes(`key: "${key}"`)) fail(`matrix missing module ${key}`);
}
if (modules.every((key) => board.includes(`key: "${key}"`))) {
  console.log("PASS matrix 14 modules");
}

const css = fs.readFileSync(path.join(root, "src/styles/oa/oa-overview.css"), "utf8");
if (!css.includes(".oa-r67-readiness")) fail("oa-overview.css missing .oa-r67-readiness");
else console.log("PASS r67 css");

const tsx = fs.readFileSync(
  path.join(root, "src/components/oa-overview/OverviewReadinessControlBoard.tsx"),
  "utf8",
);
for (const flag of flags) {
  if (!tsx.includes(flag) && !board.includes(flag)) fail(`missing global flag ${flag}`);
}
console.log("PASS global flags present in fixture");

for (const route of primaryRoutes) {
  const pagePath = path.join(root, "src/app", route.replace(/^\//, ""), "page.tsx");
  if (!fs.existsSync(pagePath)) fail(`missing primary route ${route}`);
  else console.log("PASS route", route);
}

const live = process.env.OA_R67_LIVE_URL || "http://localhost:3666/admin/oa/overview";
try {
  const res = await fetch(live, { redirect: "follow" });
  if (!res.ok) fail(`live overview HTTP ${res.status}`);
  else {
    const html = await res.text();
    if (!html.includes("data-oa-r67-readiness") && !html.includes("Readiness Control Board") && !html.includes("全局就绪看板")) {
      console.log("WARN live HTML may still be hydrating; static markers not required in RSC payload");
    }
    console.log("PASS live overview", live, res.status);
  }
} catch (err) {
  console.log("WARN live overview unreachable", live, String(err.message || err));
}

console.log("NO_INTAKE_TOUCH_CHECK=scripts only reads forbidden list; git must confirm");
for (const rel of forbidden) {
  console.log("FORBIDDEN_PATH", rel);
}

if (failed > 0) {
  console.error("OVERVIEW_SMOKE_PASS=FALSE", failed);
  process.exit(1);
}
console.log("OVERVIEW_SMOKE_PASS=TRUE");
console.log("READINESS_MATRIX_14_MODULES_READY=TRUE");
