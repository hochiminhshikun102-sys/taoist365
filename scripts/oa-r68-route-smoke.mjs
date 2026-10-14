import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routes = [
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

let failed = 0;
for (const route of routes) {
  const page = path.join(root, "src/app", route.replace(/^\//, ""), "page.tsx");
  if (!fs.existsSync(page)) {
    failed += 1;
    console.error("FAIL missing page", route);
  } else console.log("PASS", route);
}

for (const extra of ["/admin/oa/overview", "/admin/oa/co/intake"]) {
  const page = path.join(root, "src/app", extra.replace(/^\//, ""), "page.tsx");
  if (!fs.existsSync(page)) {
    failed += 1;
    console.error("FAIL missing", extra);
  } else console.log("PASS extra", extra);
}

const shell = fs.readFileSync(path.join(root, "src/components/oa-shell/OaSharedShell.tsx"), "utf8");
if (!shell.includes("dohara.oa.language") && !fs.readFileSync(path.join(root, "src/components/oa-shell/useOaUiLocale.ts"), "utf8").includes("dohara.oa.language")) {
  failed += 1;
  console.error("FAIL language key missing");
} else console.log("PASS language key");

if (failed > 0) {
  console.error("ROUTE_SMOKE_PASS=FALSE", failed);
  process.exit(1);
}
console.log("ROUTE_SMOKE_PASS=TRUE");
