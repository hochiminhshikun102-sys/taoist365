import type { PolicyRuleSet } from "@/policies/shared/types";

export const euPolicy: PolicyRuleSet = {
  version: "2026.05.v1",
  region: "eu",
  abBucket: "A",
  corePersonalityInvariant: true,
  toneIntensity: "light",
  ritualDepth: "light",
  recommendationPacing: "slow",
  wordingSensitivity: "high",
  symbolismDensity: "minimal",
  sessionPacing: "spaced",
};
