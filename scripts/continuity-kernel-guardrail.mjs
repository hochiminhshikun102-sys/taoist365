import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const requiredFiles = [
  ".github/PULL_REQUEST_TEMPLATE.md",
  "docs/deployment/README.md",
  "docs/deployment/cloudflare-pages-observation.md",
  "public/_headers",
  "public/llms.txt",
  "public/ai-readable.json",
  "src/config/terminology-guardrail.json",
  "src/config/runtime-infrastructure-guardrail.json",
];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, filePath))) {
    issues.push({ type: "missing-kernel-path", filePath, term: "Required continuity path is missing" });
  }
}

const checks = [
  ["node", "scripts/operating-layer-guardrail.mjs"],
  ["node", "scripts/civilization-continuity-guardrail.mjs"],
  ["node", "scripts/deployment-observation-guardrail.mjs"],
];

let commandFailures = 0;
for (const [command, ...args] of checks) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    commandFailures += 1;
  }
}

console.log("\nContinuity Kernel Guardrail Report");
console.log("==================================");
console.log(`Kernel path issues: ${issues.length}`);
console.log(`Command failures: ${commandFailures}`);

if (issues.length > 0) {
  console.log("\nTop issues (first 40):");
  for (const issue of issues.slice(0, 40)) {
    console.log(`- [${issue.type}] ${issue.filePath} -> ${issue.term}`);
  }
}

if (issues.length > 0 || commandFailures > 0) {
  process.exitCode = 1;
} else {
  console.log("\nContinuity kernel is stable.");
}
