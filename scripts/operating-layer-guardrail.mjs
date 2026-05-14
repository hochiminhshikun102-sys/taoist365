import { spawnSync } from "node:child_process";

const root = process.cwd();

const checks = [
  ["node", "scripts/terminology-guardrail.mjs"],
  ["node", "scripts/runtime-infrastructure-guardrail.mjs"],
  ["node", "scripts/admin-os-constitution-guardrail.mjs"],
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

console.log("\nOperating Layer Guardrail Report");
console.log("================================");
console.log(`Command failures: ${commandFailures}`);

if (commandFailures > 0) {
  process.exitCode = 1;
} else {
  console.log("\nOperating layer is stable.");
}
