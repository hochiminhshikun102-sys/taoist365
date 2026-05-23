export type VeluneProduct = {
  sku: string;
  fileSku: string;
  slug: string;
  series: string;
  seriesLabel: string;
  productName: string;
  shortLine: string;
  description: string;
  price: number;
  msrp: number;
  featured: boolean;
  bestSeller: boolean;
  kind?: "tonic" | "object";
  materials?: string[];
  care?: string[];
  images: string[];
};

export const veluneSeries = [
  {
    "key": "WOOD",
    "label": "Wood",
    "subtitle": "Emotional Flow & Renewal",
    "tone": "Soft botanical blends for renewal, ease, and a lighter daily rhythm.",
    "banner": "/velune-storefront/assets/banners/wood-series-banner.jpg"
  },
  {
    "key": "FIRE",
    "label": "Fire",
    "subtitle": "Vitality & Warm Connection",
    "tone": "Warm daily tonics for gentle energy, focus, and bright connection.",
    "banner": "/velune-storefront/assets/banners/fire-series-banner.jpg"
  },
  {
    "key": "EARTH",
    "label": "Earth",
    "subtitle": "Grounded Nourishment",
    "tone": "Grounding blends for steadiness, comfort, and everyday repair.",
    "banner": "/velune-storefront/assets/banners/earth-series-banner.jpg"
  },
  {
    "key": "METAL",
    "label": "Metal",
    "subtitle": "Clarity & Purification",
    "tone": "Clean mineral-light formulas for clarity, freshness, and calm boundaries.",
    "banner": "/velune-storefront/assets/banners/metal-series-banner.jpg"
  },
  {
    "key": "WATER",
    "label": "Water",
    "subtitle": "Calm Depth & Restoration",
    "tone": "Quiet blue-toned blends for rest, release, and deep daily calm.",
    "banner": "/velune-storefront/assets/banners/water-series-banner.jpg"
  },
  {
    "key": "HOME_OBJECTS",
    "label": "Home Objects",
    "subtitle": "Light, Air & Everyday Rooms",
    "tone": "Gentle home objects for windows, tables, shelves, and soft evening light.",
    "banner": "/velune-storefront/assets/objects/window-crystal-garden/02-lifestyle.jpg"
  }
] as const;

export const veluneProducts: VeluneProduct[] = [
  {
    "sku": "VEL-TEST-001",
    "fileSku": "vel-test-001",
    "slug": "vel-test-001-stripe-live-payment-test",
    "series": "WOOD",
    "seriesLabel": "Test",
    "productName": "Stripe Live Payment Test",
    "shortLine": "One dollar checkout item for live payment verification.",
    "description": "A temporary one dollar item for verifying the live Stripe checkout flow.",
    "price": 1,
    "msrp": 1,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wd-001/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wd-001/02-main-package.jpg"
    ]
  },
  {
    "sku": "VEL-WD-001",
    "fileSku": "vel-wd-001",
    "slug": "vel-wd-001-flow-soft",
    "series": "WOOD",
    "seriesLabel": "Wood",
    "productName": "Flow Soft",
    "shortLine": "Relaxes daily tension and emotional tightness.",
    "description": "A soft green daily tonic for easing emotional pressure and returning to a more fluid state.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-wd-001/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wd-001/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wd-001/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wd-001/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wd-001/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wd-001/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WD-002",
    "fileSku": "vel-wd-002",
    "slug": "vel-wd-002-night-ease",
    "series": "WOOD",
    "seriesLabel": "Wood",
    "productName": "Night Ease",
    "shortLine": "Calms the mood and supports a softer nighttime state.",
    "description": "A quiet evening blend for letting the day loosen and settle before rest.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-wd-002/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wd-002/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wd-002/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wd-002/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wd-002/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wd-002/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WD-003",
    "fileSku": "vel-wd-003",
    "slug": "vel-wd-003-cycle-calm",
    "series": "WOOD",
    "seriesLabel": "Wood",
    "productName": "Cycle Calm",
    "shortLine": "Supports calm through physical ups and downs.",
    "description": "A gentle cycle-support tonic for steady comfort and emotional ease.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wd-003/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wd-003/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wd-003/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wd-003/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wd-003/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wd-003/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WD-004",
    "fileSku": "vel-wd-004",
    "slug": "vel-wd-004-belly-light",
    "series": "WOOD",
    "seriesLabel": "Wood",
    "productName": "Belly Light",
    "shortLine": "Creates a lighter, more comfortable everyday body feeling.",
    "description": "A botanical daily tonic for lighter digestion and a more comfortable body mood.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wd-004/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wd-004/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wd-004/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wd-004/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wd-004/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wd-004/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WD-005",
    "fileSku": "vel-wd-005",
    "slug": "vel-wd-005-mind-unfold",
    "series": "WOOD",
    "seriesLabel": "Wood",
    "productName": "Mind Unfold",
    "shortLine": "Opens crowded thoughts and restores a relaxed state.",
    "description": "A clear soft-green blend for crowded thoughts, daily overwhelm, and gentle renewal.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wd-005/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wd-005/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wd-005/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wd-005/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wd-005/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wd-005/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WD-006",
    "fileSku": "vel-wd-006",
    "slug": "vel-wd-006-fresh-unwind",
    "series": "WOOD",
    "seriesLabel": "Wood",
    "productName": "Fresh Unwind",
    "shortLine": "All-day gentle unwinding and restored ease.",
    "description": "A deep green unwind tonic for long days when the body and mood need room.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wd-006/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wd-006/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wd-006/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wd-006/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wd-006/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wd-006/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-FR-001",
    "fileSku": "vel-fr-001",
    "slug": "vel-fr-001-warm-rise",
    "series": "FIRE",
    "seriesLabel": "Fire",
    "productName": "Warm Rise",
    "shortLine": "Wakes the body gently and lifts low-energy mornings.",
    "description": "A warm botanical tonic for slow mornings, soft vitality, and daily brightness.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-fr-001/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-fr-001/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-fr-001/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-fr-001/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-fr-001/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-fr-001/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-FR-002",
    "fileSku": "vel-fr-002",
    "slug": "vel-fr-002-body-gentle-warm",
    "series": "FIRE",
    "seriesLabel": "Fire",
    "productName": "Body Gentle Warm",
    "shortLine": "Brings a soft feeling of warmth and daily comfort.",
    "description": "A comforting warm-toned daily blend for body ease and quiet steadiness.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-fr-002/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-fr-002/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-fr-002/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-fr-002/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-fr-002/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-fr-002/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-FR-003",
    "fileSku": "vel-fr-003",
    "slug": "vel-fr-003-mood-bright",
    "series": "FIRE",
    "seriesLabel": "Fire",
    "productName": "Mood Bright",
    "shortLine": "Lightens a low mood and supports an easier emotional state.",
    "description": "A bright orange botanical tonic for a lifted, more open everyday mood.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-fr-003/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-fr-003/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-fr-003/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-fr-003/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-fr-003/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-fr-003/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-FR-004",
    "fileSku": "vel-fr-004",
    "slug": "vel-fr-004-focus-glow",
    "series": "FIRE",
    "seriesLabel": "Fire",
    "productName": "Focus Glow",
    "shortLine": "Gathers attention and supports clear daily focus.",
    "description": "A warm focus blend for clean attention without a high-stimulation feeling.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-fr-004/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-fr-004/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-fr-004/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-fr-004/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-fr-004/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-fr-004/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-FR-005",
    "fileSku": "vel-fr-005",
    "slug": "vel-fr-005-daily-spark",
    "series": "FIRE",
    "seriesLabel": "Fire",
    "productName": "Daily Spark",
    "shortLine": "Adds a gentle spark of everyday vitality.",
    "description": "A sunlit daily tonic for a small, steady spark of energy.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-fr-005/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-fr-005/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-fr-005/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-fr-005/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-fr-005/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-fr-005/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-FR-006",
    "fileSku": "vel-fr-006",
    "slug": "vel-fr-006-heart-light",
    "series": "FIRE",
    "seriesLabel": "Fire",
    "productName": "Heart Light",
    "shortLine": "Supports a full, warm, balanced inner state.",
    "description": "A warm connection blend for soft emotional openness and calm heart presence.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-fr-006/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-fr-006/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-fr-006/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-fr-006/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-fr-006/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-fr-006/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-ER-001",
    "fileSku": "vel-er-001",
    "slug": "vel-er-001-core-nourish",
    "series": "EARTH",
    "seriesLabel": "Earth",
    "productName": "Core Nourish",
    "shortLine": "Gently nourishes the body's foundation for daily steadiness.",
    "description": "A grounded daily tonic for body foundation, warmth, and steady nourishment.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-er-001/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-er-001/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-er-001/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-er-001/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-er-001/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-er-001/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-ER-002",
    "fileSku": "vel-er-002",
    "slug": "vel-er-002-light-digest",
    "series": "EARTH",
    "seriesLabel": "Earth",
    "productName": "Light Digest",
    "shortLine": "Encourages a lighter, more comfortable daily body feeling.",
    "description": "A soft earth-toned digestive support blend for everyday lightness.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-er-002/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-er-002/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-er-002/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-er-002/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-er-002/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-er-002/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-ER-003",
    "fileSku": "vel-er-003",
    "slug": "vel-er-003-stable-mind",
    "series": "EARTH",
    "seriesLabel": "Earth",
    "productName": "Stable Mind",
    "shortLine": "Settles scattered thoughts into a calmer mental space.",
    "description": "A grounding botanical tonic for scattered thoughts and daily steadiness.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-er-003/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-er-003/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-er-003/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-er-003/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-er-003/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-er-003/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-ER-004",
    "fileSku": "vel-er-004",
    "slug": "vel-er-004-body-ground",
    "series": "EARTH",
    "seriesLabel": "Earth",
    "productName": "Body Ground",
    "shortLine": "Grounds the body and eases heavy daily fatigue.",
    "description": "A deeper earth blend for heavy days, body grounding, and slow repair.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-er-004/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-er-004/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-er-004/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-er-004/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-er-004/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-er-004/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-ER-005",
    "fileSku": "vel-er-005",
    "slug": "vel-er-005-soft-restore",
    "series": "EARTH",
    "seriesLabel": "Earth",
    "productName": "Soft Restore",
    "shortLine": "Supports soft repair and a gradual return to ease.",
    "description": "A gentle restorative tonic for quiet repair and calm daily rebuilding.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-er-005/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-er-005/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-er-005/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-er-005/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-er-005/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-er-005/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-ER-006",
    "fileSku": "vel-er-006",
    "slug": "vel-er-006-daily-balance",
    "series": "EARTH",
    "seriesLabel": "Earth",
    "productName": "Daily Balance",
    "shortLine": "Helps maintain a stable, balanced everyday rhythm.",
    "description": "An everyday balance tonic for steady rhythm, calm body, and grounded mood.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-er-006/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-er-006/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-er-006/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-er-006/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-er-006/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-er-006/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-MT-001",
    "fileSku": "vel-mt-001",
    "slug": "vel-mt-001-pure-breath",
    "series": "METAL",
    "seriesLabel": "Metal",
    "productName": "Pure Breath",
    "shortLine": "Brings a clearer, fresher feeling through the day.",
    "description": "A silver-grey clarity tonic for fresh breath, clean space, and lightness.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-mt-001/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-mt-001/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-mt-001/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-mt-001/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-mt-001/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-mt-001/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-MT-002",
    "fileSku": "vel-mt-002",
    "slug": "vel-mt-002-skin-soft-calm",
    "series": "METAL",
    "seriesLabel": "Metal",
    "productName": "Skin Soft Calm",
    "shortLine": "Supports soft comfort for easily unsettled skin.",
    "description": "A gentle clarity blend for soft skin comfort and calm boundaries.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-mt-002/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-mt-002/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-mt-002/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-mt-002/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-mt-002/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-mt-002/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-MT-003",
    "fileSku": "vel-mt-003",
    "slug": "vel-mt-003-boundary-peace",
    "series": "METAL",
    "seriesLabel": "Metal",
    "productName": "Boundary Peace",
    "shortLine": "Creates calm distance from noise and emotional overload.",
    "description": "A quiet boundary tonic for clean space, calm distance, and mental lightness.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-mt-003/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-mt-003/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-mt-003/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-mt-003/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-mt-003/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-mt-003/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-MT-004",
    "fileSku": "vel-mt-004",
    "slug": "vel-mt-004-clear-sense",
    "series": "METAL",
    "seriesLabel": "Metal",
    "productName": "Clear Sense",
    "shortLine": "Refreshes the senses and clears the inner atmosphere.",
    "description": "A refreshing daily tonic for sensory clarity and a cleaner inner feeling.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-mt-004/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-mt-004/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-mt-004/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-mt-004/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-mt-004/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-mt-004/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-MT-005",
    "fileSku": "vel-mt-005",
    "slug": "vel-mt-005-mild-purify",
    "series": "METAL",
    "seriesLabel": "Metal",
    "productName": "Mild Purify",
    "shortLine": "Offers gentle daily purification and clean comfort.",
    "description": "A mild purification blend for everyday clarity without harshness.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-mt-005/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-mt-005/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-mt-005/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-mt-005/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-mt-005/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-mt-005/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-MT-006",
    "fileSku": "vel-mt-006",
    "slug": "vel-mt-006-fresh-shield",
    "series": "METAL",
    "seriesLabel": "Metal",
    "productName": "Fresh Shield",
    "shortLine": "Supports a stable, comfortable sense of inner defense.",
    "description": "A silver shield tonic for clear boundaries and steady daily protection.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-mt-006/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-mt-006/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-mt-006/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-mt-006/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-mt-006/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-mt-006/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WT-001",
    "fileSku": "vel-wt-001",
    "slug": "vel-wt-001-deep-quiet",
    "series": "WATER",
    "seriesLabel": "Water",
    "productName": "Deep Quiet",
    "shortLine": "Deeply settles agitation and restores inner stillness.",
    "description": "A deep blue calm tonic for pressure release and quiet inner depth.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-wt-001/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wt-001/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wt-001/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wt-001/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wt-001/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wt-001/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WT-002",
    "fileSku": "vel-wt-002",
    "slug": "vel-wt-002-night-deep-rest",
    "series": "WATER",
    "seriesLabel": "Water",
    "productName": "Night Deep Rest",
    "shortLine": "Supports deeper evening ease and calmer rest.",
    "description": "A nighttime restoration blend for slowing down and entering deeper rest.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": true,
    "images": [
      "/velune-storefront/assets/products/vel-wt-002/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wt-002/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wt-002/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wt-002/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wt-002/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wt-002/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WT-003",
    "fileSku": "vel-wt-003",
    "slug": "vel-wt-003-pressure-ease",
    "series": "WATER",
    "seriesLabel": "Water",
    "productName": "Pressure Ease",
    "shortLine": "Releases stored pressure and eases worn-down tension.",
    "description": "A cooling water-toned tonic for pressure release and softer recovery.",
    "price": 34,
    "msrp": 39,
    "featured": true,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wt-003/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wt-003/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wt-003/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wt-003/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wt-003/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wt-003/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WT-004",
    "fileSku": "vel-wt-004",
    "slug": "vel-wt-004-inner-soft",
    "series": "WATER",
    "seriesLabel": "Water",
    "productName": "Inner Soft",
    "shortLine": "Softens internal imbalance and hidden fatigue.",
    "description": "A soft blue daily tonic for inner softness, rest, and hidden fatigue.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wt-004/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wt-004/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wt-004/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wt-004/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wt-004/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wt-004/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WT-005",
    "fileSku": "vel-wt-005",
    "slug": "vel-wt-005-slow-restore",
    "series": "WATER",
    "seriesLabel": "Water",
    "productName": "Slow Restore",
    "shortLine": "Encourages deep repair at a slower, quieter pace.",
    "description": "A deeper restorative blend for long fatigue and calm rebuilding.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wt-005/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wt-005/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wt-005/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wt-005/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wt-005/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wt-005/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-WT-006",
    "fileSku": "vel-wt-006",
    "slug": "vel-wt-006-hormone-soft-balance",
    "series": "WATER",
    "seriesLabel": "Water",
    "productName": "Hormone Soft Balance",
    "shortLine": "Supports a smoother, steadier inner rhythm.",
    "description": "A water-soft balance tonic for steadier rhythm and quiet restoration.",
    "price": 34,
    "msrp": 39,
    "featured": false,
    "bestSeller": false,
    "images": [
      "/velune-storefront/assets/products/vel-wt-006/01-main-white.jpg",
      "/velune-storefront/assets/products/vel-wt-006/02-main-package.jpg",
      "/velune-storefront/assets/products/vel-wt-006/03-atmosphere-banner.jpg",
      "/velune-storefront/assets/products/vel-wt-006/04-lifestyle-scene.jpg",
      "/velune-storefront/assets/products/vel-wt-006/05-lifestyle-use.jpg",
      "/velune-storefront/assets/products/vel-wt-006/06-thumbnail.jpg"
    ]
  },
  {
    "sku": "VEL-OB-001",
    "fileSku": "vel-ob-001",
    "slug": "vel-ob-001-window-crystal-garden",
    "series": "HOME_OBJECTS",
    "seriesLabel": "Home Objects",
    "productName": "Window Crystal Garden",
    "shortLine": "A quiet tabletop object with crystal-toned accents and soft greenery.",
    "description": "A decorative window-side object for shelves, desks, and living rooms. Styled as a calm home accent, not as a spiritual or therapeutic item.",
    "price": 48,
    "msrp": 58,
    "featured": true,
    "bestSeller": true,
    "kind": "object",
    "materials": ["Decorative crystal-toned accents", "Wood-look branch detail", "Moss-style base", "Tabletop display vessel"],
    "care": ["Keep dry and away from direct water exposure.", "Dust gently with a soft cloth.", "Indoor decorative use only."],
    "images": [
      "/velune-storefront/assets/objects/window-crystal-garden/01-main.webp",
      "/velune-storefront/assets/objects/window-crystal-garden/02-lifestyle.jpg",
      "/velune-storefront/assets/objects/window-crystal-garden/03-detail.webp",
      "/velune-storefront/assets/objects/window-crystal-garden/04-placement.webp"
    ]
  },
  {
    "sku": "VEL-OB-002",
    "fileSku": "vel-ob-002",
    "slug": "vel-ob-002-clear-star-window-chime",
    "series": "HOME_OBJECTS",
    "seriesLabel": "Home Objects",
    "productName": "Clear Star Window Chime",
    "shortLine": "A clear hanging chime for soft window light and gentle room movement.",
    "description": "A lightweight decorative window chime for bedrooms, studios, and quiet corners. Presented as a home decor object only.",
    "price": 28,
    "msrp": 34,
    "featured": true,
    "bestSeller": true,
    "kind": "object",
    "materials": ["Clear acrylic and glass-style beads", "Metal connector hardware", "Lightweight hanging cord"],
    "care": ["Hang indoors or in a covered area.", "Avoid heavy wind, water, and direct impact.", "Wipe with a dry microfiber cloth."],
    "images": [
      "/velune-storefront/assets/objects/clear-star-window-chime/01-main.png",
      "/velune-storefront/assets/objects/clear-star-window-chime/02-lifestyle.png",
      "/velune-storefront/assets/objects/clear-star-window-chime/03-detail.png"
    ]
  },
  {
    "sku": "VEL-OB-003",
    "fileSku": "vel-ob-003",
    "slug": "vel-ob-003-ceramic-lotus-glow-lamp",
    "series": "HOME_OBJECTS",
    "seriesLabel": "Home Objects",
    "productName": "Ceramic Lotus Glow Lamp",
    "shortLine": "A sculptural ceramic glow piece for bedside and shelf styling.",
    "description": "A soft decorative light object for creating a warm evening corner. Designed for room atmosphere, not ritual use.",
    "price": 42,
    "msrp": 52,
    "featured": true,
    "bestSeller": false,
    "kind": "object",
    "materials": ["Ceramic-style floral body", "Soft translucent finish", "Decorative tabletop base"],
    "care": ["Use only with compatible low-heat lighting accessories.", "Keep away from children and pets when in use.", "Clean when cool with a dry cloth."],
    "images": [
      "/velune-storefront/assets/objects/ceramic-lotus-glow-lamp/01-main.jpg",
      "/velune-storefront/assets/objects/ceramic-lotus-glow-lamp/02-lifestyle.jpg"
    ]
  },
  {
    "sku": "VEL-OB-004",
    "fileSku": "vel-ob-004",
    "slug": "vel-ob-004-arc-brass-incense-stand",
    "series": "HOME_OBJECTS",
    "seriesLabel": "Home Objects",
    "productName": "Arc Brass Incense Stand",
    "shortLine": "A minimal brass arc holder for clean desk and shelf styling.",
    "description": "A restrained tabletop holder for home fragrance moments. Simple, sculptural, and easy to place in modern rooms.",
    "price": 36,
    "msrp": 46,
    "featured": false,
    "bestSeller": true,
    "kind": "object",
    "materials": ["Brass-tone metal arc", "Weighted base cup", "Minimal tabletop holder form"],
    "care": ["Place on a heat-safe, stable surface.", "Never leave burning incense unattended.", "Allow all parts to cool before cleaning."],
    "images": [
      "/velune-storefront/assets/objects/arc-brass-incense-stand/01-main.jpg",
      "/velune-storefront/assets/objects/arc-brass-incense-stand/02-glass-form.jpg",
      "/velune-storefront/assets/objects/arc-brass-incense-stand/03-tall-glass.jpg",
      "/velune-storefront/assets/objects/arc-brass-incense-stand/04-teardrop-glass.jpg"
    ]
  },
  {
    "sku": "VEL-OB-005",
    "fileSku": "vel-ob-005",
    "slug": "vel-ob-005-color-glass-table-lamp",
    "series": "HOME_OBJECTS",
    "seriesLabel": "Home Objects",
    "productName": "Color Glass Table Lamp",
    "shortLine": "A small colored lamp accent for warm side-table light.",
    "description": "A decorative lamp-style object for living rooms, bedside corners, and styled shelves.",
    "price": 62,
    "msrp": 76,
    "featured": false,
    "bestSeller": false,
    "kind": "object",
    "materials": ["Colored glass-style shade", "Metal-tone pedestal", "Decorative tabletop form"],
    "care": ["Use on a flat, dry surface.", "Follow the final electrical label before use.", "Dust gently with a dry cloth."],
    "images": [
      "/velune-storefront/assets/objects/color-glass-table-lamp/01-main.jpg"
    ]
  },
  {
    "sku": "VEL-OB-006",
    "fileSku": "vel-ob-006",
    "slug": "vel-ob-006-walnut-pocket-case",
    "series": "HOME_OBJECTS",
    "seriesLabel": "Home Objects",
    "productName": "Walnut Pocket Case",
    "shortLine": "A small wood-grain case for everyday carrying and shelf display.",
    "description": "A compact wood-grain accessory case for small keepsakes, desk items, or travel organization.",
    "price": 24,
    "msrp": 30,
    "featured": false,
    "bestSeller": false,
    "kind": "object",
    "materials": ["Wood-grain case body", "Cord detail", "Smooth handheld finish"],
    "care": ["Keep dry.", "Avoid prolonged sun exposure.", "Wipe with a soft dry cloth."],
    "images": [
      "/velune-storefront/assets/objects/walnut-pocket-case/01-main.jpg",
      "/velune-storefront/assets/objects/walnut-pocket-case/02-detail.jpg",
      "/velune-storefront/assets/objects/walnut-pocket-case/03-lifestyle.jpg"
    ]
  }
];

export function getVeluneProduct(slug: string): VeluneProduct | undefined {
  return veluneProducts.find((product) => product.slug === slug);
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
