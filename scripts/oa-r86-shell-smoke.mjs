import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const results = [];
function record(name, pass, detail = "") {
  results.push({ name, pass, detail });
  if (!pass) console.error(`FAIL ${name}${detail ? ` :: ${detail}` : ""}`);
  else console.log(`PASS ${name}`);
}
function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const shell = read("src/components/oa-shell/OaSharedShell.tsx");
const nav = read("src/components/oa-shell/oaNavCanonical.ts");
const css = read("src/styles/oa/oa-shell.css");
const locale = read("src/components/oa-overview/useOaDesktopLocale.ts");
const gate = read("src/app/admin/oa/layout.tsx");
const intake = read("src/app/admin/oa/co/intake/page.tsx");
const publish = read("src/components/oa-publish/Publish.tsx");

const keys = [...nav.matchAll(/key: "([^"]+)"/g)].map((m) => m[1]);
const expectedKeys = [
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
const routes = [...nav.matchAll(/route: "(\/admin\/oa\/co\/[^"]+)"/g)].map((m) => m[1]);
const expectedRoutes = [
  "/admin/oa/co/intake",
  "/admin/oa/co/objects",
  "/admin/oa/co/media",
  "/admin/oa/co/orders",
  "/admin/oa/co/payments",
  "/admin/oa/co/shipping",
];

record("14 primary keys unchanged", JSON.stringify(keys) === JSON.stringify(expectedKeys));
record("CO six routes unchanged", JSON.stringify(routes) === JSON.stringify(expectedRoutes));
record("submenu keeps backward-compatible label", nav.includes("Product Intake · 宝贝入库") && nav.includes("zh:") && nav.includes("en:"));
record("shell uses shared OA locale hook", shell.includes("useOaDesktopLocale") && locale.includes("dohara.oa.language"));
record("rail renders single locale label", shell.includes("{t(item.zh, item.en)}") && !shell.includes("{item.en} · {item.zh}"));
record("no second language control in shell", !/setLocale\(/.test(shell) && shell.includes('t("菜单", "Menu")'));
record("desktop hover bridge present", shell.includes("oa-hover-bridge") && shell.includes("scheduleClose") && css.includes(".oa-hover-bridge"));
record("click escape keyboard close present", shell.includes('event.key === "Escape"') && shell.includes("onPrimaryActivate"));
record("mobile nav toggle present", shell.includes("oa-nav-toggle") && css.includes(".oa-nav-toggle") && css.includes(".is-drawer-open"));
record("status not fixed overlay", css.includes(".oa-status") && /oa-status \{[^}]*position: static/s.test(css) && !/oa-status \{[^}]*position: fixed/s.test(css));
record("R84 gate file unchanged by shell work", gate.includes("OaAdminAuthGate"));
record("R85 intake still embeds Publish", intake.includes("<Publish embedded") && publish.includes("submitPublishIntake"));
record("no 15th primary module", nav.includes("NO_15TH_DOMAIN") && keys.length === 14);

const failed = results.filter((item) => item.pass === false);
console.log(JSON.stringify({ batch: "R86", total: results.length, passed: results.length - failed.length, failed: failed.map((item) => item.name) }, null, 2));
if (failed.length) process.exit(1);
