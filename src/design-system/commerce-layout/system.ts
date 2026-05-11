export const nonCommercialAtmosphere = {
  productQuietness: {
    visualPriority: "secondary",
    pressure: "low",
  },
  ritualBeforeCommerce: {
    orderingPrinciple: "ritual-first",
    conversionUrgency: "none",
  },
  atmosphereFirstSurfaces: {
    surfaceIntent: "state-before-shopping",
    sensoryLoad: "low",
  },
  lowPressureDiscovery: {
    browsingTone: "gentle",
    pushMechanics: "disabled",
  },
  objectIntegrationIntoSpace: {
    objectRole: "layout-anchor",
    showcaseMode: "off",
  },
} as const;

export const nonCommercialAtmosphereAvoid = [
  "product_grid_pressure",
  "conversion_funnels",
  "marketplace_feeling",
  "tiktok_commerce_rhythm",
] as const;
