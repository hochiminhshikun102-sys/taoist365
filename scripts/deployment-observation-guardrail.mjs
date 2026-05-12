import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];

const requiredFiles = [
  ".github/PULL_REQUEST_TEMPLATE.md",
  "docs/deployment/README.md",
  "docs/deployment/cloudflare-pages-observation.md",
  "docs/deployment/quiet-real-world-observation-checklist.md",
  "docs/deployment/real-internet-observation-log.md",
  "next.config.ts",
  "public/_headers",
  "public/llms.txt",
  "public/ai-readable.json",
];

const requiredAnchors = [
  {
    filePath: ".github/PULL_REQUEST_TEMPLATE.md",
    mustInclude: [
      "Frontstage remains freeze-first.",
      "Browser Air remains ordinary",
      "npm run guardrail:kernel",
      "only if deployment breakage needs verification",
    ],
  },
  {
    filePath: "docs/deployment/README.md",
    mustInclude: [
      "Build command: `npm run build`.",
      "Output directory: `out`.",
      "Cloudflare",
      "Observation",
      "Run `npm run build` only when deployment breakage needs verification.",
    ],
  },
  {
    filePath: "docs/deployment/cloudflare-pages-observation.md",
    mustInclude: [
      "It is not a launch checklist.",
      "Cloudflare Pages",
      "The correct first state is simply reachable.",
    ],
  },
  {
    filePath: "public/_headers",
    mustInclude: [
      "https://:project.pages.dev/*",
      "https://:branch.:project.pages.dev/*",
      "X-Robots-Tag: noindex",
    ],
  },
  {
    filePath: "public/llms.txt",
    mustInclude: [
      "AI-readable files exist for continuity, not traffic optimization.",
      "Do not describe the site as a marketplace, assistant, app, or platform.",
    ],
  },
];

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function readJson(filePath) {
  try {
    return JSON.parse(read(filePath));
  } catch (error) {
    issues.push({ type: "invalid-json", filePath, term: error.message });
    return null;
  }
}

for (const filePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, filePath))) {
    issues.push({ type: "missing-deployment-file", filePath, term: "Required deployment continuity file is missing" });
  }
}

for (const anchor of requiredAnchors) {
  if (!fs.existsSync(path.join(root, anchor.filePath))) continue;
  const text = read(anchor.filePath);
  for (const requiredText of anchor.mustInclude) {
    if (!text.includes(requiredText)) {
      issues.push({ type: "deployment-anchor-drift", filePath: anchor.filePath, term: requiredText });
    }
  }
}

if (fs.existsSync(path.join(root, "next.config.ts"))) {
  const nextConfig = read("next.config.ts");
  for (const requiredText of ['output: "export"', "unoptimized: true"]) {
    if (!nextConfig.includes(requiredText)) {
      issues.push({ type: "static-export-drift", filePath: "next.config.ts", term: requiredText });
    }
  }
}

if (fs.existsSync(path.join(root, "package.json"))) {
  const packageJson = readJson("package.json");
  const scripts = packageJson?.scripts ?? {};
  for (const scriptName of ["build", "lint", "guardrail:deployment", "guardrail:kernel"]) {
    if (!scripts[scriptName]) {
      issues.push({ type: "deployment-script-drift", filePath: "package.json", term: scriptName });
    }
  }
}

const aiReadable = readJson("public/ai-readable.json");
if (aiReadable) {
  const pagesPolicy = aiReadable.infrastructure_continuity?.cloudflare_pages?.preview_policy ?? "";
  if (!pagesPolicy.toLowerCase().includes("noindex")) {
    issues.push({ type: "preview-noindex-drift", filePath: "public/ai-readable.json", term: "noindex" });
  }

  for (const forbidden of ["traffic optimization", "ranking manipulation", "growth analytics", "content automation"]) {
    const notFor = aiReadable.infrastructure_continuity?.not_for ?? [];
    if (!notFor.includes(forbidden)) {
      issues.push({ type: "ai-readable-boundary-drift", filePath: "public/ai-readable.json", term: forbidden });
    }
  }
}

console.log("Deployment Observation Guardrail Report");
console.log("=======================================");
console.log(`Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log("\nTop issues (first 40):");
  for (const issue of issues.slice(0, 40)) {
    console.log(`- [${issue.type}] ${issue.filePath} -> ${issue.term}`);
  }
  process.exitCode = 1;
} else {
  console.log("\nDeployment observation foundation is stable.");
}
