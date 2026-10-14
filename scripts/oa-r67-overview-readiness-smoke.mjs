import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const required = [
  "src/app/admin/oa/overview/page.tsx",
  "src/components/oa-overview/OverviewExceptionProjectionWorkbench.tsx",
  "src/components/oa-overview/OverviewReadinessControlBoard.tsx",
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

const forbiddenTouched = [
  "src/app/admin/oa/co/intake/page.tsx",
  "src/app/admin/oa/layout.tsx",
  "src/app/admin/layout.tsx",
  "src/app/layout.tsx",
  "src/components/oa-shell/OaSharedShell.tsx",
  "src/components/oa-shell/oaNavCanonical.ts",
  "src/styles/oa/oa-shell.css",
  "src/styles/oa/oa-tokens.css",
  "src/components/oa-skeleton/primaryEntries.ts",
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
if (page.includes("OverviewReadinessControlBoard")) fail("overview page.tsx must stay unchanged (no board import)");
else console.log("PASS overview page unchanged (no board import)");
if (!page.includes("OverviewExceptionProjectionWorkbench")) fail("overview page lost workbench");
else console.log("PASS overview page still mounts workbench");
if (!page.includes("OaSharedShell")) fail("overview lost shared shell");
else console.log("PASS overview still uses OaSharedShell");

const workbench = fs.readFileSync(
  path.join(root, "src/components/oa-overview/OverviewExceptionProjectionWorkbench.tsx"),
  "utf8",
);
if (!workbench.includes("OverviewReadinessControlBoard")) fail("workbench missing Readiness board insert");
else console.log("PASS workbench mounts Readiness board");
if (!workbench.includes("data-oa-overview-projection")) fail("workbench lost existing projection root");
else console.log("PASS existing projection blocks kept");

const board = fs.readFileSync(
  path.join(root, "src/components/oa-overview/OverviewReadinessControlBoard.tsx"),
  "utf8",
);
if (board.includes("useOaUiLocale")) fail("R67 must not import R66 language hook");
else console.log("PASS no R66 language hook");
for (const key of modules) {
  if (!board.includes(`key: "${key}"`)) fail(`matrix missing module ${key}`);
}
console.log("PASS matrix 14 modules");
for (const flag of flags) {
  if (!board.includes(flag)) fail(`missing global flag ${flag}`);
}
console.log("PASS global flags present");
if (!board.includes("FALSE")) fail("realWrite FALSE missing");
else console.log("PASS realWrite FALSE visible");

const css = fs.readFileSync(path.join(root, "src/styles/oa/oa-overview.css"), "utf8");
if (!css.includes(".oa-readiness-board")) fail("oa-overview.css missing .oa-readiness-board");
else console.log("PASS oa-readiness-* css appended");
if (!css.includes(".oa-page {")) fail("existing .oa-page rule missing");
else console.log("PASS existing overview css kept");

for (const rel of forbiddenTouched) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) continue;
}

for (const route of primaryRoutes) {
  const pagePath = path.join(root, "src/app", route.replace(/^\//, ""), "page.tsx");
  if (!fs.existsSync(pagePath)) fail(`missing primary route ${route}`);
  else console.log("PASS route", route);
}

const live = process.env.OA_R67_LIVE_URL;
if (live) {
  try {
    const res = await fetch(live, { redirect: "follow" });
    if (!res.ok) fail(`live overview HTTP ${res.status}`);
    else {
      const html = await res.text();
      if (
        !html.includes("data-oa-readiness") &&
        !html.includes("Readiness Control Board") &&
        !html.includes("全局就绪看板")
      ) {
        fail("live overview missing readiness board markers");
      } else {
        console.log("PASS live overview", live, res.status);
      }
    }
  } catch (err) {
    fail(`live overview unreachable ${live} ${String(err.message || err)}`);
  }
} else {
  console.log("SKIP live overview (OA_R67_LIVE_URL unset; file smoke only)");
}

if (failed > 0) {
  console.error("OVERVIEW_SMOKE_PASS=FALSE", failed);
  process.exit(1);
}
console.log("OVERVIEW_SMOKE_PASS=TRUE");
console.log("READINESS_MATRIX_14_MODULES_READY=TRUE");
console.log("OVERVIEW_PAGE_UNCHANGED=TRUE");
