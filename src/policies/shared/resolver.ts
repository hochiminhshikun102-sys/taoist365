import { australiaPolicy } from "@/policies/australia/rules";
import { euPolicy } from "@/policies/eu/rules";
import { globalPolicy } from "@/policies/global/rules";
import { latamPolicy } from "@/policies/latin-america/rules";
import { middleEastPolicy } from "@/policies/middle-east/rules";
import { seaPolicy } from "@/policies/southeast-asia/rules";
import { usPolicy } from "@/policies/us/rules";
import type { PolicyRuleSet, RegionCode } from "@/policies/shared/types";

export function resolvePolicyRuleSet(region: RegionCode, abBucket: "A" | "B"): PolicyRuleSet {
  const base = pickRegionPolicy(region);

  if (abBucket === "B") {
    return {
      ...base,
      abBucket,
      recommendationPacing: base.recommendationPacing === "slow" ? "steady" : "slow",
    };
  }

  return { ...base, abBucket };
}

function pickRegionPolicy(region: RegionCode): PolicyRuleSet {
  switch (region) {
    case "us":
      return usPolicy;
    case "eu":
      return euPolicy;
    case "middle-east":
      return middleEastPolicy;
    case "southeast-asia":
      return seaPolicy;
    case "latin-america":
      return latamPolicy;
    case "australia":
      return australiaPolicy;
    case "global":
    default:
      return globalPolicy;
  }
}
