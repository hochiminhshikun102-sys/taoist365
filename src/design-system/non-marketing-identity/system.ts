export const nonMarketingIdentity = {
  lowPressureIdentity: {
    identityForce: "subtle",
    attentionDemand: "low",
  },
  ritualFirstPresence: {
    ordering: "ritual-before-brand-message",
    narrativePriority: "state-entry",
  },
  atmosphereBeforeConversion: {
    conversionVisibility: "secondary",
    atmospherePrimary: true,
  },
  memoryBeforeMarketing: {
    memoryType: "felt-experience",
    campaignDependence: "none",
  },
  emotionalTrustOverUrgency: {
    urgencyMechanics: "disabled",
    trustCadence: "slow-built",
  },
} as const;

export const nonMarketingIdentityAvoid = [
  "aggressive_branding",
  "growth_first_visuals",
  "attention_hacking",
  "funnel_identity",
  "status_performance_aesthetics",
] as const;
