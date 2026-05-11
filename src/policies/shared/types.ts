export type RegionCode =
  | "global"
  | "us"
  | "eu"
  | "middle-east"
  | "southeast-asia"
  | "latin-america"
  | "australia";

export interface PolicyRuleSet {
  version: string;
  region: RegionCode;
  abBucket: "A" | "B";
  corePersonalityInvariant: true;
  toneIntensity: "light" | "balanced" | "rich";
  ritualDepth: "light" | "steady" | "deep";
  recommendationPacing: "slow" | "steady";
  wordingSensitivity: "high" | "medium";
  symbolismDensity: "minimal" | "moderate";
  sessionPacing: "spaced" | "standard";
}

export const policyVersion = "2026.05.v1";
