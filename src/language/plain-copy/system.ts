export const plainSiteCopySystem = {
  flowBeforeConversion: {
    order: "flow-first",
    conversionVisibility: "secondary",
  },
  layoutBeforeSelling: {
    contentPriority: "state-and-guidance",
    salesTone: "subtle",
  },
  trustOverUrgency: {
    trustCadence: "slow",
    urgencyMechanics: "forbidden",
  },
  quietCommerceLanguage: {
    style: "informative-soft",
    pressure: "low",
  },
  softDiscoveryWording: {
    explorationTone: "gentle",
    forcefulCTA: false,
  },
} as const;

export const plainSiteCopyAvoid = [
  "scarcity_language",
  "urgency_pressure",
  "high_conversion_phrasing",
  "sales_cta_stacking",
  "dopamine_copywriting",
] as const;
