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
  const ok = fs.existsSync(page);
  if (!ok) {
    failed += 1;
    console.error("FAIL missing page", route, page);
  } else {
    console.log("PASS", route);
  }
}

if (failed > 0) {
  console.error("ROUTE_SMOKE=FAIL", failed);
  process.exit(1);
}
console.log("ROUTE_SMOKE_PASS=TRUE");
