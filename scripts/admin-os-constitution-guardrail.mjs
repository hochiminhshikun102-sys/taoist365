import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "src", "config", "admin-os-constitution.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const issues = [];

for (const relPath of config.constitutionPaths ?? []) {
  const absolutePath = path.join(root, relPath);
  if (!fs.existsSync(absolutePath)) {
    issues.push({ type: "missing-constitution-path", filePath: relPath, term: "Required Admin OS constitution path is missing" });
  }
}

for (const anchor of config.requiredBlueprintAnchors ?? []) {
  assertFileIncludes(anchor.path, anchor.mustInclude ?? [], "constitution-anchor-drift");
}

for (const relPath of config.adminWorkspace?.requiredSourcePaths ?? []) {
  const absolutePath = path.join(root, relPath);
  if (!fs.existsSync(absolutePath)) {
    issues.push({ type: "missing-admin-workspace-source", filePath: relPath, term: "Required Admin OS source path is missing" });
  }
}

const adminConsolePath = "src/components/admin/AdminOSConsole.tsx";
const adminConsole = readText(adminConsolePath);
if (adminConsole) {
  for (const workspaceId of config.adminWorkspace.requiredWorkspaceIds ?? []) {
    if (!adminConsole.includes(`"${workspaceId}"`)) {
      issues.push({ type: "missing-admin-workspace-id", filePath: adminConsolePath, term: workspaceId });
    }
  }

  for (const term of config.adminWorkspace.requiredTerms ?? []) {
    if (!adminConsole.includes(term)) {
      issues.push({ type: "missing-admin-workspace-term", filePath: adminConsolePath, term });
    }
  }

  for (const term of config.adminWorkspace.forbiddenTerms ?? []) {
    if (adminConsole.includes(term)) {
      issues.push({ type: "admin-workspace-landing-page-regression", filePath: adminConsolePath, term });
    }
  }
}

const adminWorkspaceRoutePath = "src/app/admin/[workspaceId]/page.tsx";
const adminWorkspaceRoute = readText(adminWorkspaceRoutePath);
if (adminWorkspaceRoute) {
  for (const workspaceId of config.adminWorkspace.requiredWorkspaceIds ?? []) {
    if (!adminWorkspaceRoute.includes(`"${workspaceId}"`)) {
      issues.push({ type: "missing-admin-route-static-param", filePath: adminWorkspaceRoutePath, term: workspaceId });
    }
  }
}

const clientRuntimePath = "src/app/(member)/account/page.tsx";
const clientRuntime = readText(clientRuntimePath);
if (clientRuntime) {
  for (const term of config.clientRuntime.requiredTerms ?? []) {
    if (!clientRuntime.includes(term)) {
      issues.push({ type: "missing-client-runtime-term", filePath: clientRuntimePath, term });
    }
  }

  for (const term of config.clientRuntime.forbiddenTerms ?? []) {
    if (clientRuntime.includes(term)) {
      issues.push({ type: "client-risk-control-boundary-drift", filePath: clientRuntimePath, term });
    }
  }
}

scanPackageScript();

console.log("\nAdmin OS Constitution Guardrail Report");
console.log("======================================");
console.log(`Constitution version: ${config.constitutionVersion}`);
console.log(`Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log("\nTop issues (first 60):");
  for (const issue of issues.slice(0, 60)) {
    console.log(`- [${issue.type}] ${issue.filePath} -> ${issue.term}`);
  }
  process.exitCode = 1;
} else {
  console.log("\nAdmin OS constitution is stable.");
}

function readText(relPath) {
  const absolutePath = path.join(root, relPath);
  if (!fs.existsSync(absolutePath)) {
    return "";
  }

  return fs.readFileSync(absolutePath, "utf8");
}

function assertFileIncludes(relPath, terms, issueType) {
  const text = readText(relPath);
  if (!text) {
    issues.push({ type: "missing-anchor-file", filePath: relPath, term: "Required anchor file is missing" });
    return;
  }

  for (const term of terms) {
    if (!text.includes(term)) {
      issues.push({ type: issueType, filePath: relPath, term });
    }
  }
}

function scanPackageScript() {
  const packagePath = path.join(root, "package.json");
  if (!fs.existsSync(packagePath)) {
    issues.push({ type: "missing-package-json", filePath: "package.json", term: "package.json is missing" });
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  if (!pkg.scripts?.["guardrail:admin-os"]) {
    issues.push({ type: "missing-admin-os-script", filePath: "package.json", term: "guardrail:admin-os" });
  }
}
