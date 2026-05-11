import type { RegionCode } from "@/policies/shared/types";

export interface RegionalAdaptation {
  region: RegionCode;
  wordingStyle: "refined-minimal" | "plain-neutral" | "plain-minimal";
  onboardingPacing: "light" | "guided";
  visualWarmth: "soft" | "warm";
  ritualIntensity: "light" | "steady";
  corePersonalityInvariant: true;
}

export const regionalAdaptations: Record<RegionCode, RegionalAdaptation> = {
  global: {
    region: "global",
    wordingStyle: "refined-minimal",
    onboardingPacing: "guided",
    visualWarmth: "soft",
    ritualIntensity: "steady",
    corePersonalityInvariant: true,
  },
  us: {
    region: "us",
    wordingStyle: "refined-minimal",
    onboardingPacing: "guided",
    visualWarmth: "soft",
    ritualIntensity: "steady",
    corePersonalityInvariant: true,
  },
  eu: {
    region: "eu",
    wordingStyle: "refined-minimal",
    onboardingPacing: "light",
    visualWarmth: "soft",
    ritualIntensity: "light",
    corePersonalityInvariant: true,
  },
  "latin-america": {
    region: "latin-america",
    wordingStyle: "plain-neutral",
    onboardingPacing: "guided",
    visualWarmth: "warm",
    ritualIntensity: "steady",
    corePersonalityInvariant: true,
  },
  "middle-east": {
    region: "middle-east",
    wordingStyle: "plain-minimal",
    onboardingPacing: "guided",
    visualWarmth: "soft",
    ritualIntensity: "steady",
    corePersonalityInvariant: true,
  },
  australia: {
    region: "australia",
    wordingStyle: "refined-minimal",
    onboardingPacing: "light",
    visualWarmth: "soft",
    ritualIntensity: "light",
    corePersonalityInvariant: true,
  },
  "southeast-asia": {
    region: "southeast-asia",
    wordingStyle: "plain-neutral",
    onboardingPacing: "guided",
    visualWarmth: "warm",
    ritualIntensity: "steady",
    corePersonalityInvariant: true,
  },
};

export function getRegionalAdaptation(region: RegionCode): RegionalAdaptation {
  return regionalAdaptations[region] ?? regionalAdaptations.global;
}
