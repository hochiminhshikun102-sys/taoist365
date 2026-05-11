export type SeasonalMoment = "early-morning" | "late-afternoon" | "quiet-evening";

export const seasonalPresence = {
  shared: {
    title: "Light",
    moments: {
      "early-morning": "Low sun; shorter shadows.",
      "late-afternoon": "Warm side wall; earlier shade in corners.",
      "quiet-evening": "Less daylight; lamps matter more.",
    } as Record<SeasonalMoment, string>,
  },
  homepage: {
    traces: ["Sun angle shifted since last month.", "Radiator ticks.", "Dust visible in one beam."],
  },
  drawALot: {
    traces: ["Hand warmth on ceramic.", "Paper slower to flatten.", "Less glare on screen."],
  },
  dailyGuidance: {
    traces: ["Cooler by the window.", "First coffee cooling.", "Traffic louder before nine."],
  },
  homeHarmony: {
    traces: ["Corner darker earlier.", "Fabric holds crease.", "Floor shows shoe path."],
  },
} as const;
