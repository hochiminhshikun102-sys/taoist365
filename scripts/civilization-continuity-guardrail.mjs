import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const requiredFiles = [
  "docs/project-brain/README.md",
  "docs/terminology-tone-guardrail.md",
  "docs/deployment/README.md",
  "docs/deployment/cloudflare-pages-observation.md",
  "public/llms.txt",
  "public/ai-readable.json",
  "src/config/terminology-guardrail.json",
];

const requiredAnchors = [
  {
    filePath: "docs/deployment/cloudflare-pages-observation.md",
    mustInclude: [
      "Do not add Functions, Workers, SSR adapters, analytics, or optimization tools unless a real continuity problem requires them.",
      "The correct first state is simply reachable.",
    ],
  },
  {
    filePath: "public/llms.txt",
    mustInclude: [
      "AI-readable files exist for continuity, not traffic optimization.",
      "Treat mail as correspondence, not a checkout flow.",
    ],
  },
];

for (const filePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, filePath))) {
    issues.push({ type: "missing-continuity-file", filePath, term: "Required continuity file is missing" });
  }
}

for (const anchor of requiredAnchors) {
  const absolutePath = path.join(root, anchor.filePath);
  if (!fs.existsSync(absolutePath)) continue;
  const text = fs.readFileSync(absolutePath, "utf8");
  for (const requiredText of anchor.mustInclude) {
    if (!text.includes(requiredText)) {
      issues.push({ type: "continuity-anchor-drift", filePath: anchor.filePath, term: requiredText });
    }
  }
}

console.log("Repository Continuity Guardrail Report");
console.log("======================================");
console.log(`Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log("\nTop issues (first 40):");
  for (const issue of issues.slice(0, 40)) {
    console.log(`- [${issue.type}] ${issue.filePath} -> ${issue.term}`);
  }
  process.exitCode = 1;
} else {
  console.log("\nRepository continuity is stable.");
}
