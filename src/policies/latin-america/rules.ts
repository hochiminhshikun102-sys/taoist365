import type { PolicyRuleSet } from "@/policies/shared/types";

export const latamPolicy: PolicyRuleSet = {
  version: "2026.05.v1",
  region: "latin-america",
  abBucket: "A",
  corePersonalityInvariant: true,
  toneIntensity: "rich",
  ritualDepth: "steady",
  recommendationPacing: "slow",
  wordingSensitivity: "medium",
  symbolismDensity: "moderate",
  sessionPacing: "spaced",
};
