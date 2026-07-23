#!/usr/bin/env node
/**
 * dh-token-scan.mjs — DOHARA Account Center V6 Token违禁值扫描
 * 治理：V6三方试跑SOP V0.1 · Tier A/B 门禁之一（非唯一验收）
 * 规则源：tokens-v1.1-r1-forbidden-rules.json（F01-F04/F06/F11静态可扫项）
 * 用法：node scripts/dh-token-scan.mjs [--scope <dir>...]
 * 退出码：0=无违规  1=有BLOCKER违规
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const DEFAULT_SCOPE = [
  "src/app/(member)/account",
  "src/app/account-v6-preview",
  "src/components/account/v6",
  "src/styles/account",
];
const EXEMPT_FILES = [
  ["src", "styles", "account", "account-tokens.v1.1-r1.css"].join(sep),
];
const SCAN_EXT = new Set([".css", ".tsx", ".ts", ".jsx", ".js"]);
const MEDIA_ALLOW = [
  "@media (max-width: 767px)",
  "@media (min-width: 768px)",
];

const RULES = [
  {
    id: "F01_NO_WEIGHT_700",
    re: /font-weight:\s*700|fontWeight:\s*['"]?700/g,
    desc: "禁止font-weight:700",
  },
  {
    id: "F02_NO_ABSOLUTE",
    re: /position:\s*absolute/g,
    desc: "正文/卡片禁position:absolute",
    exemptLine: /dh-allow-absolute:\s*decorative/,
  },
  {
    id: "F03_NO_RAW_COLOR",
    re: /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/g,
    desc: "禁裸色值",
    exemptLine: /var\(--dh-|^\s*\*|^\s*\/\*|^\s*\/\//,
  },
  {
    id: "F04_NO_RAW_PX",
    re: /-?\d+(\.\d+)?px\b/g,
    desc: "禁裸px（数值只住在Token）",
    exemptLine: /var\(--dh-|^\s*\*|^\s*\/\*|^\s*\/\//,
    mediaCheck: true,
  },
  {
    id: "F06_NO_GENERIC_ICON",
    re: /lucide|react-icons|heroicons|@iconify/g,
    desc: "禁通用图标库",
  },
];

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else {
      const ext = name.slice(name.lastIndexOf("."));
      if (SCAN_EXT.has(ext)) yield p;
    }
  }
}

const scopeArg = process.argv.indexOf("--scope");
const scopes =
  scopeArg > -1 ? process.argv.slice(scopeArg + 1) : DEFAULT_SCOPE;

let violations = 0;
const report = [];

function* resolveScope(scope) {
  const p = join(ROOT, scope);
  try {
    if (statSync(p).isFile()) {
      yield p;
      return;
    }
  } catch {
    return;
  }
  yield* walk(p);
}

for (const scope of scopes) {
  for (const file of resolveScope(scope)) {
    const rel = relative(ROOT, file);
    if (EXEMPT_FILES.some((e) => rel.endsWith(e))) continue;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const rule of RULES) {
        rule.re.lastIndex = 0;
        if (!rule.re.test(line)) continue;
        if (rule.exemptLine && rule.exemptLine.test(line)) continue;
        // 豁免标记允许出现在紧邻的前两行（注释块写法）
        if (
          rule.exemptLine &&
          (i > 0 && rule.exemptLine.test(lines[i - 1]) ||
            i > 1 && rule.exemptLine.test(lines[i - 2]))
        )
          continue;
        // F11: 断点字面量是F04唯一@media豁免
        if (rule.mediaCheck && line.includes("@media")) {
          if (MEDIA_ALLOW.some((a) => line.includes(a))) continue;
        }
        violations++;
        report.push(`${rel}:${i + 1} [${rule.id}] ${line.trim().slice(0, 90)}`);
      }
    });
  }
}

if (report.length) {
  console.error(`DH-TOKEN-SCAN: ${violations} violation(s)\n`);
  for (const r of report) console.error("  " + r);
  process.exit(1);
} else {
  console.log("DH-TOKEN-SCAN: TOKEN_VIOLATION_COUNT=0 ✅");
  process.exit(0);
}
