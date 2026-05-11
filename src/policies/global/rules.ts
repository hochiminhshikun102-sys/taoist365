import type { PolicyRuleSet } from "@/policies/shared/types";

export const globalPolicy: PolicyRuleSet = {
  version: "2026.05.v1",
  region: "global",
  abBucket: "A",
  corePersonalityInvariant: true,
  toneIntensity: "balanced",
  ritualDepth: "steady",
  recommendationPacing: "slow",
  wordingSensitivity: "high",
  symbolismDensity: "minimal",
  sessionPacing: "spaced",
};
