import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "src", "config", "terminology-guardrail.json");

/** @type {{naming:{product:string;brandEn:string;brandCn:string};bannedTerminology:string[];driftSignals:Record<string,string[]>;calmVocabularyHints:string[];scanScopes:string[];targetExtensions:string[]}} */
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const issues = [];
const filesScanned = [];
const definitionOnlyPaths = [
  "src/language/",
  "src/config/terminology-guardrail.json",
  "docs/terminology-tone-guardrail.md",
];

for (const scope of config.scanScopes) {
  const absoluteScope = path.join(root, scope);
  if (fs.existsSync(absoluteScope)) {
    walk(absoluteScope);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!config.targetExtensions.some((ext) => entry.name.endsWith(ext))) {
      continue;
    }

    const text = fs.readFileSync(fullPath, "utf8");
    const rel = path.relative(root, fullPath).replaceAll("\\", "/");
    filesScanned.push(rel);
    scanFile(rel, text);
  }
}

function scanFile(filePath, text) {
  const lower = text.toLowerCase();
  const isDefinitionOnly = definitionOnlyPaths.some((segment) =>
    filePath.includes(segment),
  );

  if (!isDefinitionOnly) {
    for (const banned of config.bannedTerminology) {
      if (lower.includes(banned.toLowerCase())) {
        issues.push({
          type: "banned-term",
          filePath,
          term: banned,
        });
      }
    }

    for (const [category, terms] of Object.entries(config.driftSignals)) {
      for (const term of terms) {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp(`(?<!non[-\\s])\\b${escaped}\\b`, "i");
        if (pattern.test(text)) {
          issues.push({
            type: "tone-drift",
            category,
            filePath,
            term,
          });
        }
      }
    }
  }

  const naming = config.naming;
  const namingHints = [naming.product, naming.brandEn, naming.brandCn];
  const namingHit = namingHints.some((name) => text.includes(name));
  const isHighPrioritySurface =
    filePath.includes("src/app/(marketing)/page.tsx") ||
    filePath.includes("src/app/(experience)/rituals/") ||
    filePath.includes("src/components/navigation/CalmNavigation.tsx");
  const hasMetadataOrNavText =
    lower.includes("title") ||
    lower.includes("description") ||
    lower.includes("label") ||
    lower.includes("nav");

  if (isHighPrioritySurface && hasMetadataOrNavText && !namingHit) {
    issues.push({
      type: "naming-consistency",
      filePath,
      term: "No canonical naming marker found in high-priority surface",
    });
  }

  const calmHits = config.calmVocabularyHints.filter((term) =>
    lower.includes(term.toLowerCase()),
  ).length;

  if (isHighPrioritySurface && hasMetadataOrNavText && calmHits === 0) {
    issues.push({
      type: "calm-language",
      filePath,
      term: "No calm vocabulary hints detected",
    });
  }
}

const grouped = issues.reduce((acc, issue) => {
  acc[issue.type] = (acc[issue.type] || 0) + 1;
  return acc;
}, {});

console.log("\nTerminology & Tone Guardrail Report");
console.log("===================================");
console.log(`Files scanned: ${filesScanned.length}`);
console.log(`Issues found: ${issues.length}`);
console.log(`By type: ${JSON.stringify(grouped)}`);

if (issues.length > 0) {
  console.log("\nTop issues (first 40):");
  for (const issue of issues.slice(0, 40)) {
    const extra = issue.category ? ` | ${issue.category}` : "";
    console.log(`- [${issue.type}${extra}] ${issue.filePath} -> ${issue.term}`);
  }
  process.exitCode = 1;
} else {
  console.log("\nNo terminology or tone drift issues detected.");
}
