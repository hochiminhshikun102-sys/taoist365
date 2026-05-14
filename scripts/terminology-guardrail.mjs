import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "src", "config", "terminology-guardrail.json");

/** @type {{naming:{primaryBrand:string;ecosystemAnchor:string;archiveSource:string};bannedTerminology:string[];driftSignals:Record<string,string[]>;definitionOnlyPaths:string[];calmVocabularyHints:string[];scanScopes:string[];productionPathScopes:string[];targetExtensions:string[];requiredAnchors:{filePath:string;mustInclude:string[]}[];requiredPackageScripts:string[];requiredProductionAssetFiles:string[];publicRoot:{directory:string;forbiddenDirectories:string[]};productionReferences:{scanScopes:string[];allowedBrandPrefix:string};productionAssets:{directory:string;forbiddenNameFragments:string[];forbiddenContentTerms:string[]}}} */
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const issues = [];
const filesScanned = [];
const pathsScanned = [];
const definitionOnlyPaths = config.definitionOnlyPaths ?? [];

for (const scope of config.scanScopes) {
  const absoluteScope = path.join(root, scope);
  if (!fs.existsSync(absoluteScope)) {
    issues.push({
      type: "missing-scan-scope",
      filePath: scope,
      term: "Configured scan scope does not exist",
    });
  } else if (fs.statSync(absoluteScope).isFile()) {
    scanOneFile(absoluteScope);
  } else {
    walk(absoluteScope);
  }
}

scanProductionPaths();
scanRequiredAnchors();
scanProductionAssets();
scanRequiredPackageScripts();
scanRequiredProductionAssetFiles();
scanPublicRootIsolation();
scanProductionReferences();
scanQuietInternetLanguage();
scanQuietAdmin();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    scanOneFile(fullPath);
  }
}

function scanOneFile(fullPath) {
  const ext = path.extname(fullPath);
  if (!config.targetExtensions.includes(ext)) {
    return;
  }

  const rel = path.relative(root, fullPath).replaceAll("\\", "/");
  if ((config.scanExcludePaths ?? []).some((segment) => rel.includes(segment))) {
    return;
  }

  const text = fs.readFileSync(fullPath, "utf8");
  filesScanned.push(rel);
  scanFile(rel, text);
}

function scanFile(filePath, text) {
  const lower = text.toLowerCase();
  const isDefinitionOnly = definitionOnlyPaths.some((segment) =>
    filePath.includes(segment),
  );

  if (!isDefinitionOnly) {
    for (const banned of config.bannedTerminology) {
      if (hasDriftTerm(text, banned)) {
        issues.push({
          type: "banned-term",
          filePath,
          term: banned,
        });
      }
    }

    for (const [category, terms] of Object.entries(config.driftSignals)) {
      for (const term of terms) {
        if (hasDriftTerm(text, term)) {
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
  const namingHints = [naming.primaryBrand, naming.ecosystemAnchor];
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

function hasDriftTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\b${escaped}\\b`, "gi");

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith("import ") || trimmed.startsWith("export type ")) {
      continue;
    }

    for (const match of line.matchAll(pattern)) {
      if (term.toLowerCase() === "fortune" && (line.includes("Fortune Draw") || line.includes("/brand/production/homepage/ways-to-begin/fortune-draw"))) {
        continue;
      }

      if (!isBoundaryUse(line, match.index ?? 0)) {
        return true;
      }
    }
  }

  return false;
}

function isBoundaryUse(line, index) {
  const before = line.slice(Math.max(0, index - 42), index).toLowerCase();
  return /\b(no|not|non|never|without|anti)\s*[-\w\s]*$/.test(before);
}

function scanProductionPaths() {
  const forbiddenPathTerms = [
    "dashboard",
    "marketplace",
    "assistant",
    "chatbot",
    "companion",
    "feed",
    "streak",
    "retention",
    "auction",
    "inventory",
    "checkout",
    "sanctuary",
  ];

  for (const scope of config.productionPathScopes ?? []) {
    const absoluteScope = path.join(root, scope);
    if (!fs.existsSync(absoluteScope)) {
      continue;
    }

    const stat = fs.statSync(absoluteScope);
    if (stat.isFile()) {
      scanPathName(absoluteScope);
    } else {
      walkPaths(absoluteScope);
    }
  }

  function walkPaths(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      scanPathName(fullPath);
      if (entry.isDirectory()) {
        walkPaths(fullPath);
      }
    }
  }

  function scanPathName(fullPath) {
    const rel = path.relative(root, fullPath).replaceAll("\\", "/");
    if ((config.productionPathExcludePaths ?? []).some((segment) => rel.includes(segment))) {
      return;
    }

    pathsScanned.push(rel);
    const lowerPath = rel.toLowerCase();
    for (const term of forbiddenPathTerms) {
      if (lowerPath.includes(term)) {
        issues.push({
          type: "production-path-drift",
          filePath: rel,
          term,
        });
      }
    }
  }
}

function scanRequiredAnchors() {
  for (const anchor of config.requiredAnchors ?? []) {
    const absolutePath = path.join(root, anchor.filePath);
    if (!fs.existsSync(absolutePath)) {
      issues.push({
        type: "missing-governance-anchor",
        filePath: anchor.filePath,
        term: "Required governance file is missing",
      });
      continue;
    }

    const text = fs.readFileSync(absolutePath, "utf8");
    for (const requiredText of anchor.mustInclude) {
      if (!text.includes(requiredText)) {
        issues.push({
          type: "governance-anchor-drift",
          filePath: anchor.filePath,
          term: requiredText,
        });
      }
    }
  }
}

function scanProductionAssets() {
  const assetConfig = config.productionAssets;
  if (!assetConfig) {
    return;
  }

  const absoluteDir = path.join(root, assetConfig.directory);
  if (!fs.existsSync(absoluteDir)) {
    issues.push({
      type: "missing-production-assets",
      filePath: assetConfig.directory,
      term: "Production asset directory is missing",
    });
    return;
  }

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const lowerName = entry.name.toLowerCase();
    for (const fragment of assetConfig.forbiddenNameFragments) {
      if (lowerName.includes(fragment.toLowerCase())) {
        issues.push({
          type: "production-asset-drift",
          filePath: `${assetConfig.directory}/${entry.name}`,
          term: fragment,
        });
      }
    }

    if (entry.isFile() && entry.name.endsWith(".svg")) {
      const content = fs.readFileSync(path.join(absoluteDir, entry.name), "utf8");
      for (const term of assetConfig.forbiddenContentTerms ?? []) {
        if (content.toLowerCase().includes(term.toLowerCase())) {
          issues.push({
            type: "production-svg-drift",
            filePath: `${assetConfig.directory}/${entry.name}`,
            term,
          });
        }
      }
    }
  }
}

function scanRequiredPackageScripts() {
  const packagePath = path.join(root, "package.json");
  if (!fs.existsSync(packagePath)) {
    issues.push({
      type: "missing-package",
      filePath: "package.json",
      term: "package.json is missing",
    });
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  for (const scriptName of config.requiredPackageScripts ?? []) {
    if (!pkg.scripts?.[scriptName]) {
      issues.push({
        type: "missing-package-script",
        filePath: "package.json",
        term: scriptName,
      });
    }
  }
}

function scanRequiredProductionAssetFiles() {
  for (const filePath of config.requiredProductionAssetFiles ?? []) {
    const absolutePath = path.join(root, filePath);
    if (!fs.existsSync(absolutePath)) {
      issues.push({
        type: "missing-production-asset",
        filePath,
        term: "Required production asset is missing",
      });
      continue;
    }

    if (filePath.endsWith(".svg")) {
      const content = fs.readFileSync(absolutePath, "utf8");
      if (!content.includes("<svg")) {
        issues.push({
          type: "invalid-production-svg",
          filePath,
          term: "Missing <svg marker",
        });
      }
    }
  }
}

function scanPublicRootIsolation() {
  const rootConfig = config.publicRoot;
  if (!rootConfig) {
    return;
  }

  const absoluteDir = path.join(root, rootConfig.directory);
  if (!fs.existsSync(absoluteDir)) {
    issues.push({
      type: "missing-public-root",
      filePath: rootConfig.directory,
      term: "Public directory is missing",
    });
    return;
  }

  for (const dirName of rootConfig.forbiddenDirectories ?? []) {
    const absolutePath = path.join(absoluteDir, dirName);
    if (fs.existsSync(absolutePath)) {
      issues.push({
        type: "public-archive-isolation",
        filePath: `${rootConfig.directory}/${dirName}`,
        term: "Archive/source pack must not live under public",
      });
    }
  }
}

function scanProductionReferences() {
  const referenceConfig = config.productionReferences;
  if (!referenceConfig) {
    return;
  }

  const brandReferencePattern = /["'`]([^"'`]*\/brand\/[^"'`]*)["'`]/g;
  for (const scope of referenceConfig.scanScopes ?? []) {
    const absoluteScope = path.join(root, scope);
    if (!fs.existsSync(absoluteScope)) {
      continue;
    }

    if (fs.statSync(absoluteScope).isFile()) {
      scanReferenceFile(absoluteScope);
    } else {
      walkReferenceFiles(absoluteScope);
    }
  }

  function walkReferenceFiles(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkReferenceFiles(fullPath);
      } else {
        scanReferenceFile(fullPath);
      }
    }
  }

  function scanReferenceFile(fullPath) {
    const ext = path.extname(fullPath);
    if (!config.targetExtensions.includes(ext)) {
      return;
    }

    const text = fs.readFileSync(fullPath, "utf8");
    const rel = path.relative(root, fullPath).replaceAll("\\", "/");
    for (const match of text.matchAll(brandReferencePattern)) {
      const reference = match[1];
      if (!reference.startsWith(referenceConfig.allowedBrandPrefix)) {
        issues.push({
          type: "production-brand-reference-drift",
          filePath: rel,
          term: reference,
        });
      }
    }
  }
}

function scanQuietInternetLanguage() {
  const languageConfig = config.quietInternetLanguage;
  if (!languageConfig) {
    return;
  }

  for (const scope of languageConfig.scanScopes ?? []) {
    const absoluteScope = path.join(root, scope);
    if (!fs.existsSync(absoluteScope)) {
      issues.push({
        type: "missing-quiet-internet-scope",
        filePath: scope,
        term: "Configured quiet internet language scope does not exist",
      });
      continue;
    }

    if (fs.statSync(absoluteScope).isFile()) {
      scanQuietInternetFile(absoluteScope);
    } else {
      walkQuietInternetFiles(absoluteScope);
    }
  }

  function walkQuietInternetFiles(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkQuietInternetFiles(fullPath);
      } else {
        scanQuietInternetFile(fullPath);
      }
    }
  }

  function scanQuietInternetFile(fullPath) {
    const ext = path.extname(fullPath);
    if (!config.targetExtensions.includes(ext)) {
      return;
    }

    const rel = path.relative(root, fullPath).replaceAll("\\", "/");
    if ((languageConfig.excludePaths ?? []).some((segment) => rel.includes(segment))) {
      return;
    }

    const text = fs.readFileSync(fullPath, "utf8");
    const visibleText = ext === ".md" ? text : extractProbableVisibleText(text);
    for (const term of languageConfig.forbiddenPublicTerms ?? []) {
      if (hasDriftTerm(visibleText, term)) {
        issues.push({
          type: "quiet-internet-language-drift",
          filePath: rel,
          term,
        });
      }
    }
  }
}

function extractProbableVisibleText(text) {
  const chunks = [];
  const stringPattern = /(["'`])((?:\\.|(?!\1).)*)\1/g;

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (
      !trimmed ||
      trimmed.startsWith("import ") ||
      trimmed.startsWith("export ") ||
      trimmed.startsWith("//") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("/*") ||
      trimmed.includes("className=") ||
      trimmed.includes("href=") ||
      trimmed.includes("src=")
    ) {
      continue;
    }

    for (const match of line.matchAll(stringPattern)) {
      const value = match[2]
        .replaceAll("\\n", " ")
        .replaceAll("\\u2014", "-")
        .replaceAll("\\u00b7", " ")
        .trim();
      if (value && !value.startsWith("@/") && !value.startsWith("/") && !/^[a-z0-9:-]+$/i.test(value)) {
        chunks.push(value);
      }
    }

    const jsxText = line
      .replace(/<[^>]+>/g, " ")
      .replace(/{[^}]*}/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (/[a-zA-Z]/.test(jsxText) && !jsxText.startsWith("const ") && !jsxText.startsWith("return ")) {
      chunks.push(jsxText);
    }
  }

  return chunks.join("\n");
}

function scanQuietAdmin() {
  const adminConfig = config.quietAdmin;
  if (!adminConfig) {
    return;
  }

  for (const filePath of adminConfig.requiredPaths ?? []) {
    const absolutePath = path.join(root, filePath);
    if (!fs.existsSync(absolutePath)) {
      issues.push({
        type: "quiet-admin-missing-path",
        filePath,
        term: "Required quiet admin path is missing",
      });
    }
  }

  for (const anchor of adminConfig.requiredText ?? []) {
    const absolutePath = path.join(root, anchor.filePath);
    if (!fs.existsSync(absolutePath)) {
      issues.push({
        type: "quiet-admin-missing-anchor",
        filePath: anchor.filePath,
        term: "Required quiet admin anchor file is missing",
      });
      continue;
    }

    const text = fs.readFileSync(absolutePath, "utf8");
    for (const requiredText of anchor.mustInclude ?? []) {
      if (!text.includes(requiredText)) {
        issues.push({
          type: "quiet-admin-anchor-drift",
          filePath: anchor.filePath,
          term: requiredText,
        });
      }
    }
  }

  for (const anchor of adminConfig.observationWindowAnchors ?? []) {
    const absolutePath = path.join(root, anchor.filePath);
    if (!fs.existsSync(absolutePath)) {
      issues.push({
        type: "observation-window-missing-anchor",
        filePath: anchor.filePath,
        term: "Protected frontstage file is missing",
      });
      continue;
    }

    const text = fs.readFileSync(absolutePath, "utf8");
    for (const requiredText of anchor.mustInclude ?? []) {
      if (!text.includes(requiredText)) {
        issues.push({
          type: "observation-window-drift",
          filePath: anchor.filePath,
          term: requiredText,
        });
      }
    }
  }

  for (const scope of adminConfig.scanScopes ?? []) {
    const absoluteScope = path.join(root, scope);
    if (!fs.existsSync(absoluteScope)) {
      issues.push({
        type: "quiet-admin-missing-scope",
        filePath: scope,
        term: "Configured quiet admin scope does not exist",
      });
      continue;
    }

    if (fs.statSync(absoluteScope).isFile()) {
      scanQuietAdminFile(absoluteScope);
    } else {
      walkQuietAdminFiles(absoluteScope);
    }
  }

  function walkQuietAdminFiles(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkQuietAdminFiles(fullPath);
      } else {
        scanQuietAdminFile(fullPath);
      }
    }
  }

  function scanQuietAdminFile(fullPath) {
    const ext = path.extname(fullPath);
    if (!config.targetExtensions.includes(ext)) {
      return;
    }

    const rel = path.relative(root, fullPath).replaceAll("\\", "/");
    const text = fs.readFileSync(fullPath, "utf8");
    for (const term of adminConfig.forbiddenTerms ?? []) {
      if (hasDriftTerm(text, term)) {
        issues.push({
          type: "quiet-admin-language-drift",
          filePath: rel,
          term,
        });
      }
    }
  }
}

const grouped = issues.reduce((acc, issue) => {
  acc[issue.type] = (acc[issue.type] || 0) + 1;
  return acc;
}, {});

console.log("\nTerminology Drift Guardrail Report");
console.log("===================================");
console.log(`Files scanned: ${filesScanned.length}`);
console.log(`Production paths scanned: ${pathsScanned.length}`);
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
