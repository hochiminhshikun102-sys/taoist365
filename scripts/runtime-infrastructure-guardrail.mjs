import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "src", "config", "runtime-infrastructure-guardrail.json");

/** @type {{budgets:{maxRuntimeFiles:number;maxDataDirectories:number;maxWorldRuntimeFields:number};activeWorldRuntimeFields:string[];expectedResolverSequence:string[];requiredRuntimeFiles:string[];requiredDataDirectories:string[];requiredDocs:{filePath:string;mustInclude:string[]}[];forbiddenRuntimePathFragments:string[]}} */
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const issues = [];
const runtimeFiles = listFiles(path.join(root, "src", "runtime"), [".ts", ".tsx"]);
const dataDirectories = listDirectories(path.join(root, "src", "data"));
const worldRuntimeFields = readWorldRuntimeFields();
const resolverSequence = readBuildRuntimeResolverSequence();

checkBudget("runtime-file-budget", "src/runtime", runtimeFiles.length, config.budgets.maxRuntimeFiles);
checkBudget("data-directory-budget", "src/data", dataDirectories.length, config.budgets.maxDataDirectories);
checkBudget("world-runtime-field-budget", "src/lib/use-world-runtime.ts", worldRuntimeFields.length, config.budgets.maxWorldRuntimeFields);
checkExactWorldRuntimeFields();
checkExactResolverSequence();
checkRequiredPaths(config.requiredRuntimeFiles, "required-runtime-file");
checkRequiredPaths(config.requiredDataDirectories, "required-data-directory");
checkRequiredDocs();
checkForbiddenRuntimePathFragments();

const grouped = issues.reduce((acc, issue) => {
  acc[issue.type] = (acc[issue.type] || 0) + 1;
  return acc;
}, {});

console.log("\nRuntime Infrastructure Guardrail Report");
console.log("=======================================");
console.log(`Runtime files: ${runtimeFiles.length}/${config.budgets.maxRuntimeFiles}`);
console.log(`Data directories: ${dataDirectories.length}/${config.budgets.maxDataDirectories}`);
console.log(`World runtime fields: ${worldRuntimeFields.length}/${config.budgets.maxWorldRuntimeFields}`);
console.log(`Resolver sequence: ${resolverSequence.length}/${config.expectedResolverSequence.length}`);
console.log(`Issues found: ${issues.length}`);
console.log(`By type: ${JSON.stringify(grouped)}`);

if (issues.length > 0) {
  console.log("\nTop issues (first 40):");
  for (const issue of issues.slice(0, 40)) {
    console.log(`- [${issue.type}] ${issue.filePath} -> ${issue.term}`);
  }
  process.exitCode = 1;
} else {
  console.log("\nNo runtime infrastructure drift detected.");
}

function listFiles(dir, extensions) {
  if (!fs.existsSync(dir)) {
    issues.push({ type: "missing-directory", filePath: path.relative(root, dir).replaceAll("\\", "/"), term: "Directory is missing" });
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath, extensions));
    } else if (extensions.includes(path.extname(entry.name))) {
      files.push(path.relative(root, fullPath).replaceAll("\\", "/"));
    }
  }
  return files;
}

function listDirectories(dir) {
  if (!fs.existsSync(dir)) {
    issues.push({ type: "missing-directory", filePath: path.relative(root, dir).replaceAll("\\", "/"), term: "Directory is missing" });
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `src/data/${entry.name}`);
}

function readWorldRuntimeFields() {
  const filePath = path.join(root, "src", "lib", "use-world-runtime.ts");
  const text = fs.readFileSync(filePath, "utf8");
  const typeBlock = text.match(/export type WorldRuntime = \{([\s\S]*?)\n\};/);
  if (!typeBlock) {
    issues.push({ type: "missing-world-runtime-type", filePath: "src/lib/use-world-runtime.ts", term: "WorldRuntime type block not found" });
    return [];
  }

  return [...typeBlock[1].matchAll(/^\s{2}([a-zA-Z][a-zA-Z0-9]*):/gm)].map((match) => match[1]);
}

function readBuildRuntimeResolverSequence() {
  const filePath = path.join(root, "src", "lib", "use-world-runtime.ts");
  const text = fs.readFileSync(filePath, "utf8");
  const buildRuntimeBlock = text.match(/function buildRuntime\(now: Date\): WorldRuntime \{([\s\S]*?)\n  return \{/);
  if (!buildRuntimeBlock) {
    issues.push({ type: "missing-build-runtime", filePath: "src/lib/use-world-runtime.ts", term: "buildRuntime block not found" });
    return [];
  }

  return [...buildRuntimeBlock[1].matchAll(/\b(resolve[A-Z][A-Za-z0-9]+)\(/g)].map((match) => match[1]);
}

function checkBudget(type, filePath, actual, max) {
  if (actual > max) {
    issues.push({ type, filePath, term: `${actual} exceeds frozen budget ${max}` });
  }
}

function checkExactWorldRuntimeFields() {
  const expected = config.activeWorldRuntimeFields;
  const actual = worldRuntimeFields;
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);

  for (const field of actual) {
    if (!expectedSet.has(field)) {
      issues.push({ type: "new-world-runtime-field", filePath: "src/lib/use-world-runtime.ts", term: field });
    }
  }

  for (const field of expected) {
    if (!actualSet.has(field)) {
      issues.push({ type: "missing-world-runtime-field", filePath: "src/lib/use-world-runtime.ts", term: field });
    }
  }

  if (expected.join("\n") !== actual.join("\n")) {
    issues.push({ type: "world-runtime-field-order-drift", filePath: "src/lib/use-world-runtime.ts", term: "WorldRuntime field order changed" });
  }
}

function checkExactResolverSequence() {
  const expected = config.expectedResolverSequence;
  const actual = resolverSequence;
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);

  for (const resolver of actual) {
    if (!expectedSet.has(resolver)) {
      issues.push({ type: "new-runtime-resolver", filePath: "src/lib/use-world-runtime.ts", term: resolver });
    }
  }

  for (const resolver of expected) {
    if (!actualSet.has(resolver)) {
      issues.push({ type: "missing-runtime-resolver", filePath: "src/lib/use-world-runtime.ts", term: resolver });
    }
  }

  if (expected.join("\n") !== actual.join("\n")) {
    issues.push({ type: "runtime-orchestration-order-drift", filePath: "src/lib/use-world-runtime.ts", term: "buildRuntime resolver order changed" });
  }
}

function checkRequiredPaths(paths, type) {
  for (const relPath of paths) {
    if (!fs.existsSync(path.join(root, relPath))) {
      issues.push({ type, filePath: relPath, term: "Required runtime infrastructure path is missing" });
    }
  }
}

function checkRequiredDocs() {
  for (const doc of config.requiredDocs) {
    const absolutePath = path.join(root, doc.filePath);
    if (!fs.existsSync(absolutePath)) {
      issues.push({ type: "missing-runtime-doc", filePath: doc.filePath, term: "Required runtime infrastructure doc is missing" });
      continue;
    }

    const text = fs.readFileSync(absolutePath, "utf8");
    for (const requiredText of doc.mustInclude) {
      if (!text.includes(requiredText)) {
        issues.push({ type: "runtime-doc-anchor-drift", filePath: doc.filePath, term: requiredText });
      }
    }
  }
}

function checkForbiddenRuntimePathFragments() {
  for (const filePath of runtimeFiles) {
    const lower = filePath.toLowerCase();
    for (const fragment of config.forbiddenRuntimePathFragments) {
      if (lower.includes(fragment.toLowerCase())) {
        issues.push({ type: "runtime-path-drift", filePath, term: fragment });
      }
    }
  }
}
