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

const intake = read("src/app/admin/oa/co/intake/page.tsx");
const publish = read("src/components/oa-publish/Publish.tsx");
const css = read("src/components/oa-publish/publish.module.css");
const copy = read("src/components/oa-publish/copy.ts");
const legacy = read("src/app/admin/co/publish/page.tsx");
const gate = read("src/app/admin/oa/layout.tsx");
const shell = read("src/components/oa-shell/OaSharedShell.tsx");

record("OA intake uses OaSharedShell", intake.includes("OaSharedShell") && intake.includes('activeKey="co"'));
record("OA intake reuses Publish embedded", intake.includes("<Publish embedded") && !intake.includes("CoSecondaryWorkbench") && !intake.includes("AdminOSAccess"));
record("OA intake keeps CO return paths", ["/admin/oa/commerce", "/admin/oa/overview", "/admin/oa/co/objects", "/admin/oa/co/media", "/admin/oa/co/orders"].every((href) => intake.includes(href)));
record(
  "OA intake return links follow OA locale",
  intake.includes("useOaDesktopLocale") &&
    !intake.includes("Back to CO hub · 返回") &&
    intake.includes('t("返回商品与订单", "Back to CO hub")'),
);
record("legacy publish entry unchanged", legacy.includes("AdminOSAccess") && legacy.includes("<Publish") && !legacy.includes("embedded"));
record("photo link manual UI present", ["'photo'", "'link'", "'manual'"].every((m) => publish.includes(m)) && copy.includes("photo:") && copy.includes("link:") && copy.includes("manual:"));
record("SKU media draft submit preserved", publish.includes("setSkus") && publish.includes("addFiles") && publish.includes("save()") && publish.includes("restore()") && publish.includes("submitPublishIntake") && publish.includes("validate()"));
record("error and denial states remain", publish.includes("role=\"alert\"") && publish.includes("unavailable()") && publish.includes("setIssues") && publish.includes("setNotice"));
record("embedded surface has no second language button", publish.includes("data-oa-publish-surface={embedded?'oa-formal':'legacy'}") && publish.includes("dohara-oa-language") && /embedded\?<div className=\{c\.embedHead\}/.test(publish));
record("embedded does not rebuild cockpit nav", publish.includes("{!embedded&&<aside") && publish.includes("{!embedded&&<dialog ref={menu}"));
record("OA layout gate unchanged", gate.includes("OaAdminAuthGate") && !intake.includes("OaAdminAuthGate"));
record("shared shell file not rewritten by intake", shell.includes("oa-rail") && !intake.includes("oa-rail-item"));
record("embedded CSS present", css.includes(".embedded") && css.includes(".embedMain") && css.includes(".embedHead"));
record("no cream promo primary", !css.includes("#F5E6C8") && css.includes("#5a728c"));

const failed = results.filter((item) => !item.pass);
console.log(JSON.stringify({ batch: "R85", total: results.length, passed: results.length - failed.length, failed: failed.map((item) => item.name) }, null, 2));
if (failed.length > 0) process.exit(1);
