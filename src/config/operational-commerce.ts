import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";

export type CommerceCollectionId = "wind-objects" | "quiet-desk" | "ritual-objects" | "seasonal-collections";

export type CommerceCollection = {
  id: CommerceCollectionId;
  title: string;
  shortTitle: string;
  summary: string;
  entry: string;
};

export type CommerceObject = {
  id: string;
  title: string;
  subtitle: string;
  atmosphereLine: string;
  collection: CommerceCollectionId;
  collectionTitle: string;
  materials: readonly string[];
  dimensions: string;
  placement: string;
  detailSurfaces: readonly string[];
  shippingState: "available" | "limited" | "made-to-order" | "archived";
  archiveState: "active" | "quiet-archive";
  stock: number;
  priceCents: number;
  trustNotes: readonly string[];
  shippingNote: string;
  media: {
    hero: string;
    alt: string;
    caption: string;
    videoPoster: string;
    motion: string;
    placement: string;
    detail: string;
    collection: string;
    package: string;
  };
  relatedIds: readonly string[];
};

export type GlobalCommerceRegion = {
  region: string;
  shippingHook: string;
  complianceHook: string;
};

export const globalCommerceRegions: readonly GlobalCommerceRegion[] = [
  {
    region: "United States",
    shippingHook: "USD base pricing, carton or padded mailer by object weight, address confirmed before payment.",
    complianceHook: "Care note, material note, and damaged-package handling prepared for payment-provider review.",
  },
  {
    region: "Europe",
    shippingHook: "Metric dimensions shown beside inch sizing; customs and VAT wording kept ready for later localization.",
    complianceHook: "Material and origin fields stay explicit so country-specific policy copy can be added without page rebuild.",
  },
  {
    region: "Middle East",
    shippingHook: "Protective inner wrap and moisture-aware packing for long transit routes.",
    complianceHook: "Neutral English base copy with region-specific delivery and restricted-item hooks reserved.",
  },
  {
    region: "Latin America",
    shippingHook: "Sturdy outer carton, product card, and tracking handoff prepared for cross-border shipment.",
    complianceHook: "Duties, return window, and delivery exception copy reserved for order integration.",
  },
  {
    region: "Australia",
    shippingHook: "Long-distance carton protection and metric sizing visible before payment confirmation.",
    complianceHook: "Biosecurity-sensitive material notes kept separate for future object-level checks.",
  },
  {
    region: "Japan / Korea",
    shippingHook: "Compact packaging, clean insert card, and precise cm sizing for small-room placement.",
    complianceHook: "Localization hook reserved without changing the English base product page.",
  },
  {
    region: "Southeast Asia",
    shippingHook: "Humidity-aware wrap and compact carton sizing for mixed climate routes.",
    complianceHook: "Regional shipping copy and currency display can be added through the commerce layer later.",
  },
] as const;

export const globalPackagingStandard = [
  "Outer mailer or corrugated carton sized to reduce empty movement.",
  "Soft inner wrap for surface protection without luxury unboxing pressure.",
  "Product card with title, material, size, and care note.",
  "Corner or impact buffer for ceramic, metal bell, resin, and glass-like pieces.",
  "Region label hook reserved for customs, return address, and carrier handoff.",
] as const;

export const commerceCollections: readonly CommerceCollection[] = [
  {
    id: "wind-objects",
    title: "Wind Objects",
    shortTitle: "Wind",
    summary: "Light room objects that can move between shelf, window, and correspondence.",
    entry: "Small pieces for air, paper, window light, and slow repositioning.",
  },
  {
    id: "quiet-desk",
    title: "Quiet Desk",
    shortTitle: "Desk",
    summary: "Useful desk objects that do not turn the room into a productivity surface.",
    entry: "Cups, paper, trays, and weights for ordinary work beside the day.",
  },
  {
    id: "ritual-objects",
    title: "Ritual Objects",
    shortTitle: "Ritual",
    summary: "Objects for a small act, not for performance or spiritual staging.",
    entry: "Bowls, dishes, cups, and paper that support a pause.",
  },
  {
    id: "seasonal-collections",
    title: "Seasonal Collections",
    shortTitle: "Seasonal",
    summary: "Objects that appear when the room and weather can hold them.",
    entry: "Short availability windows without countdown pressure.",
  },
] as const;

const collectionByIndex: readonly CommerceCollectionId[] = [
  "quiet-desk",
  "wind-objects",
  "quiet-desk",
  "ritual-objects",
  "quiet-desk",
  "wind-objects",
  "ritual-objects",
  "seasonal-collections",
] as const;

const objectDetails = {
  "taoist365-desk-mug-sand": {
    title: "Still Water incense box",
    subtitle: "Wooden incense box with small ceramic rest.",
    atmosphereLine: "A table object for incense that reads as daily use, not ceremony staging.",
    materials: ["Finished wood box", "ceramic rest", "paper sleeve"],
    dimensions: "8.6 in x 2.1 in x 1.2 in",
    placement: "Desk edge, tea table, or shelf where one stick can rest without becoming a display.",
    priceCents: 3900,
    stock: 6,
    media: ["incense-box.jpg", "57.jpg", "52.jpg"],
  },
  "taoist365-linen-napkin-raw": {
    title: "Window crystal bracelet",
    subtitle: "Mixed crystal bracelet with quiet metal charm.",
    atmosphereLine: "A wrist object with enough color to catch light and enough restraint to stay ordinary.",
    materials: ["Mixed crystal beads", "alloy charm", "elastic cord"],
    dimensions: "6.7 in inner circumference, stretch fit",
    placement: "Wrist, tray, bedside dish, or window ledge between uses.",
    priceCents: 2800,
    stock: 18,
    media: ["25.jpg", "23.jpg", "24.jpg"],
  },
  "taoist365-oak-tray-narrow": {
    title: "Lotus table light",
    subtitle: "Small lotus lamp for shelf, desk, or night table.",
    atmosphereLine: "A warm object that can hold light without turning the room theatrical.",
    materials: ["Printed shade", "metal stem", "weighted base"],
    dimensions: "10.2 in tall / 4.5 in shade diameter",
    placement: "Side table, low shelf, tea corner, or desk back edge.",
    priceCents: 6400,
    stock: 4,
    media: ["8.jpg", "5.jpg", "18.png"],
  },
  "taoist365-stone-smoke-dish": {
    title: "Round moon pendant",
    subtitle: "Round metal pendant with cloud-mark face.",
    atmosphereLine: "A small weight near the collarbone; readable up close, quiet from across the room.",
    materials: ["Aged alloy", "cord", "small bead detail"],
    dimensions: "Pendant about 1.1 in wide / adjustable cord",
    placement: "Neck, wall peg, tray, or beside a mirror after use.",
    priceCents: 3200,
    stock: 5,
    media: ["31.jpg", "50.jpg", "70.jpg"],
  },
  "taoist365-layflat-notebook": {
    title: "Tao fruit tea set",
    subtitle: "Fruit tea gift set with cup and shelf-ready packaging.",
    atmosphereLine: "A soft kitchen object for gifting without loud gift-box energy.",
    materials: ["Dried fruit tea", "paper box", "ceramic cup reference"],
    dimensions: "Gift box about 9.4 in x 6.1 in x 2.6 in",
    placement: "Kitchen shelf, tea table, guest drawer, or morning counter.",
    priceCents: 4600,
    stock: 12,
    media: ["76.png", "77.png", "12.jpg"],
  },
  "taoist365-cotton-letter-sheets": {
    title: "Protective room charm",
    subtitle: "Color charm with small hanging bell.",
    atmosphereLine: "A small hanging object for doorway, lamp pull, or a shelf corner.",
    materials: ["Printed charm face", "metal bell", "braided hanging cord"],
    dimensions: "3.2 in body / 5.1 in hanging length",
    placement: "Door hook, cabinet pull, lamp side, or window latch.",
    priceCents: 2200,
    stock: 20,
    media: ["49.jpg", "49.2.jpg", "49.4.jpg"],
  },
  "taoist365-night-teacup": {
    title: "Quiet desk mug",
    subtitle: "Ceramic mug with small Taoist365 graphic.",
    atmosphereLine: "A working mug that can sit beside a laptop without becoming office merch.",
    materials: ["Ceramic", "glazed print", "rounded handle"],
    dimensions: "3.7 in tall / about 11 oz",
    placement: "Desk, breakfast table, studio shelf, or beside paper notes.",
    priceCents: 2400,
    stock: 3,
    media: ["85.jpg", "84.jpg", "12.jpg"],
  },
  "taoist365-maple-paperweight": {
    title: "Moon standing ornament",
    subtitle: "Small crescent standing ornament for table or shelf.",
    atmosphereLine: "A standing curve for light and shadow, useful when a surface needs one quiet vertical line.",
    materials: ["Metal crescent", "stone-like base", "small hanging form"],
    dimensions: "9.8 in tall / 5.6 in wide",
    placement: "Shelf, desk back edge, entry table, or windowsill.",
    priceCents: 5200,
    stock: 7,
    media: ["68.jpg", "35.jpg", "36.jpg"],
  },
} as const;

type MaterialObjectSeed = {
  id: string;
  sourceStem: string;
  title: string;
  subtitle: string;
  atmosphereLine: string;
  inspiration: string;
  collection: CommerceCollectionId;
  materials: readonly string[];
  dimensions: string;
  placement: string;
  priceCents: number;
  stock: number;
};

const materialObjectSeeds: readonly MaterialObjectSeed[] = [
  {
    id: "soft-room-rabbit-102",
    sourceStem: "102",
    title: "Soft Room Rabbit",
    subtitle: "Cream plush room figure with long ears.",
    atmosphereLine: "A small soft figure for a shelf, bedside ledge, or quiet desk corner.",
    inspiration: "Designed from the feeling of a toy left near morning light, with the rabbit shape kept simple and low-pressure.",
    collection: "seasonal-collections",
    materials: ["Soft plush textile", "embroidered face", "filled body"],
    dimensions: "Approx. 9 in tall / final measurement confirmed before shipping",
    placement: "Bedside table, reading shelf, nursery chair, or studio window ledge.",
    priceCents: 3600,
    stock: 8,
  },
  {
    id: "long-ear-jellyfish-103",
    sourceStem: "103",
    title: "Long Ear Jellyfish",
    subtitle: "Plush jellyfish-rabbit form with soft hanging legs.",
    atmosphereLine: "A gentle object that reads between toy, room companion, and soft sculpture.",
    inspiration: "The shape comes from water movement and long-eared plush toys, kept rounded so it does not become character-heavy.",
    collection: "wind-objects",
    materials: ["Plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 10 in tall / final measurement confirmed before shipping",
    placement: "Shelf edge, bed rail, low cabinet, or a chair that can hold one quiet object.",
    priceCents: 3900,
    stock: 7,
  },
  {
    id: "line-octopus-104",
    sourceStem: "104",
    title: "Line Octopus",
    subtitle: "Cream octopus figure with drawn line details.",
    atmosphereLine: "A small sea-form object with enough linework to feel handmade, not decorative loud.",
    inspiration: "Drawn from notebook sketch lines and slow tide forms, with visible marks treated as part of the object language.",
    collection: "wind-objects",
    materials: ["Plush textile", "stitched line detail", "filled base"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Desk shelf, side table, child room surface, or beside a stack of books.",
    priceCents: 4200,
    stock: 5,
  },
  {
    id: "listening-moon-figure-105",
    sourceStem: "105",
    title: "Listening Moon Figure",
    subtitle: "Small plush figure with headset-like ear forms.",
    atmosphereLine: "A quiet desk companion for rooms where work should not become performance.",
    inspiration: "Designed around the image of listening without reacting, with rounded proportions and a soft moon-like face.",
    collection: "quiet-desk",
    materials: ["Plush textile", "embroidered details", "filled body"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Monitor side, notebook corner, studio shelf, or night table.",
    priceCents: 3800,
    stock: 6,
  },
  {
    id: "backline-moon-figure-106",
    sourceStem: "106",
    title: "Backline Moon Figure",
    subtitle: "Rear-view soft figure with quiet stitched back lines.",
    atmosphereLine: "A back-facing object for rooms that do not need everything to look forward.",
    inspiration: "Made from the overlooked calm of an object turned away, where the back is allowed to carry the design.",
    collection: "quiet-desk",
    materials: ["Plush textile", "stitched linework", "soft fill"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Bookshelf, desk back edge, or any surface that benefits from a quiet silhouette.",
    priceCents: 3600,
    stock: 6,
  },
  {
    id: "small-moon-listener-107",
    sourceStem: "107",
    title: "Small Moon Listener",
    subtitle: "Cream soft figure with rounded face and side ears.",
    atmosphereLine: "A compact plush object that keeps the room friendly without becoming cute-noisy.",
    inspiration: "Built from a simple listening pose and the quiet balance of a moon-faced toy.",
    collection: "quiet-desk",
    materials: ["Plush textile", "embroidered face", "filled body"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Desk corner, soft chair, bed ledge, or a child's reading shelf.",
    priceCents: 3600,
    stock: 8,
  },
  {
    id: "gray-room-companion-front-108-1",
    sourceStem: "108-1",
    title: "Gray Room Companion",
    subtitle: "Round gray plush figure with simple stitched front.",
    atmosphereLine: "A gray soft object for rooms that need one grounded shape.",
    inspiration: "Drawn from stone, cloud, and stuffed toy proportions, with color restrained for long-open room comfort.",
    collection: "quiet-desk",
    materials: ["Gray plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Desk shelf, sofa corner, studio cabinet, or entry bench.",
    priceCents: 3900,
    stock: 6,
  },
  {
    id: "gray-room-companion-back-108-2",
    sourceStem: "108-2",
    title: "Gray Room Companion Back View",
    subtitle: "Rear-view gray plush figure with stitched back presence.",
    atmosphereLine: "A quiet back-view variant for a shelf that does not need a face.",
    inspiration: "The piece keeps attention low by letting the back silhouette be the main design surface.",
    collection: "quiet-desk",
    materials: ["Gray plush textile", "stitched detail", "soft filling"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf facing sideways or backward, studio ledge, or low cabinet.",
    priceCents: 3900,
    stock: 5,
  },
  {
    id: "quiet-shelf-cat-109",
    sourceStem: "109",
    title: "Quiet Shelf Cat",
    subtitle: "Cream sitting cat soft figure.",
    atmosphereLine: "A small cat object for a room that can hold one watchful shape.",
    inspiration: "Inspired by the stillness of a cat looking away from the room rather than asking for attention.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered linework", "filled base"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Bookshelf, windowsill, low desk surface, or beside a ceramic cup.",
    priceCents: 3800,
    stock: 6,
  },
  {
    id: "round-cloud-plush-120",
    sourceStem: "120",
    title: "Round Cloud Plush",
    subtitle: "Round plush object with soft gray seam and tag.",
    atmosphereLine: "A small cloud-like object for a shelf that needs weight without hardness.",
    inspiration: "The piece borrows from cloud mass and stone roundness, keeping the face and gesture almost absent.",
    collection: "wind-objects",
    materials: ["Soft plush textile", "stitched seam", "filled round body"],
    dimensions: "Approx. 7 in wide / final measurement confirmed before shipping",
    placement: "Shelf, bed edge, sofa side, or basket beside fabric.",
    priceCents: 3400,
    stock: 7,
  },
  {
    id: "small-jellyfish-room-121-1",
    sourceStem: "121-1",
    title: "Small Jellyfish Room Object",
    subtitle: "Cream jellyfish plush with compact body.",
    atmosphereLine: "A soft sea-form object with a small footprint and quiet face.",
    inspiration: "Designed from the pause between floating and resting, with the object allowed to feel handmade.",
    collection: "wind-objects",
    materials: ["Plush textile", "embroidered details", "soft filling"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Window ledge, desk shelf, nursery shelf, or low side table.",
    priceCents: 3500,
    stock: 9,
  },
  {
    id: "long-leg-octopus-122",
    sourceStem: "122",
    title: "Long Leg Octopus",
    subtitle: "Cream octopus soft figure with long resting legs.",
    atmosphereLine: "A vertical plush object that keeps movement in the legs, not in the room.",
    inspiration: "Based on a slow underwater curve, with long lines softened into a shelf-friendly figure.",
    collection: "wind-objects",
    materials: ["Plush textile", "stitched linework", "filled legs"],
    dimensions: "Approx. 9.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf edge, bed corner, studio ledge, or a child room surface.",
    priceCents: 4200,
    stock: 6,
  },
  {
    id: "standing-octopus-plinth-124",
    sourceStem: "124",
    title: "Standing Octopus Plinth",
    subtitle: "Cream octopus figure on a small base.",
    atmosphereLine: "A shelf object with a steady base and soft vertical movement.",
    inspiration: "The base makes the object feel like a small room marker rather than a toy demanding attention.",
    collection: "ritual-objects",
    materials: ["Plush textile", "stitched details", "soft base"],
    dimensions: "Approx. 9 in tall / final measurement confirmed before shipping",
    placement: "Altar shelf, desk back edge, bookcase, or entry table.",
    priceCents: 4400,
    stock: 5,
  },
  {
    id: "moon-octopus-marker-125",
    sourceStem: "125",
    title: "Moon Octopus Marker",
    subtitle: "Small standing octopus-like figure with moon face.",
    atmosphereLine: "A compact vertical figure for a calm shelf or desk line.",
    inspiration: "Designed as a small marker of presence, not a character performance.",
    collection: "ritual-objects",
    materials: ["Plush textile", "stitched face", "soft base"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf center, desk rear edge, low altar surface, or beside paper.",
    priceCents: 4100,
    stock: 6,
  },
  {
    id: "turned-moon-figure-127",
    sourceStem: "127",
    title: "Turned Moon Figure",
    subtitle: "Cream back-facing plush figure with rounded limbs.",
    atmosphereLine: "A room object that can face away and still hold the shelf.",
    inspiration: "The design treats a turned back as quiet companionship rather than absence.",
    collection: "quiet-desk",
    materials: ["Plush textile", "stitched back lines", "soft fill"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Bookshelf, bedside edge, desk shelf, or nursery surface.",
    priceCents: 3600,
    stock: 7,
  },
  {
    id: "gray-backline-plush-128",
    sourceStem: "128",
    title: "Gray Backline Plush",
    subtitle: "Gray rear-view soft figure with stitched vertical lines.",
    atmosphereLine: "A gray object for quiet surfaces, with design held mostly in the back.",
    inspiration: "Made from the ordinary view of an object sitting on a shelf after someone has left the room.",
    collection: "quiet-desk",
    materials: ["Gray plush textile", "stitched seam", "soft fill"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Desk back edge, shelf, sofa corner, or cabinet surface.",
    priceCents: 3800,
    stock: 5,
  },
  {
    id: "lavender-jellyfish-front-129",
    sourceStem: "129",
    title: "Lavender Jellyfish",
    subtitle: "Lavender plush jellyfish with rounded front.",
    atmosphereLine: "A soft color object that stays light enough for a quiet room.",
    inspiration: "The lavender tone comes from low evening light, with the shape kept friendly and simple.",
    collection: "seasonal-collections",
    materials: ["Lavender plush textile", "embroidered face", "filled legs"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Bedside surface, shelf, child room, or soft chair.",
    priceCents: 3900,
    stock: 8,
  },
  {
    id: "lavender-jellyfish-side-129-1",
    sourceStem: "129-1",
    title: "Lavender Jellyfish Side Form",
    subtitle: "Lavender plush jellyfish with side-facing body.",
    atmosphereLine: "A soft side profile for a shelf that benefits from gentle color.",
    inspiration: "Designed around a side glance rather than a front-facing pose, so the color can settle into the room.",
    collection: "seasonal-collections",
    materials: ["Lavender plush textile", "embroidered face", "soft fill"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf edge, nightstand, nursery room, or reading chair.",
    priceCents: 3900,
    stock: 7,
  },
  {
    id: "lavender-tall-jellyfish-129b-1",
    sourceStem: "129b-1",
    title: "Lavender Tall Jellyfish",
    subtitle: "Tall lavender plush form with long body.",
    atmosphereLine: "A vertical lavender object that adds color without turning into display energy.",
    inspiration: "The elongated body is drawn from hanging fabric and slow water movement.",
    collection: "seasonal-collections",
    materials: ["Lavender plush textile", "stitched details", "soft fill"],
    dimensions: "Approx. 9.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf, bedside table, low cabinet, or soft room corner.",
    priceCents: 4200,
    stock: 5,
  },
  {
    id: "lavender-front-jellyfish-129b-2",
    sourceStem: "129b-2",
    title: "Lavender Front Jellyfish",
    subtitle: "Compact lavender plush with calm face.",
    atmosphereLine: "A small plush object with a muted violet presence.",
    inspiration: "Made as a quieter colorway where lavender behaves like fabric shadow rather than accent color.",
    collection: "seasonal-collections",
    materials: ["Lavender plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Reading shelf, bedside, soft chair, or studio cabinet.",
    priceCents: 3900,
    stock: 6,
  },
  {
    id: "bow-jellyfish-130",
    sourceStem: "130",
    title: "Bow Jellyfish",
    subtitle: "Cream plush jellyfish with a small bow detail.",
    atmosphereLine: "A soft figure with one small accent, kept gentle enough for daily presence.",
    inspiration: "The bow adds a human note without making the object feel like a costume.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "small bow", "embroidered face"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Bedside, shelf, child room, or near folded fabric.",
    priceCents: 3800,
    stock: 8,
  },
  {
    id: "blue-light-jellyfish-131",
    sourceStem: "131",
    title: "Blue Light Jellyfish",
    subtitle: "Cream plush jellyfish photographed against soft blue light.",
    atmosphereLine: "A calm plush object with a cooler air surface for the room.",
    inspiration: "The blue field suggests window light and keeps the soft form from feeling overly sweet.",
    collection: "wind-objects",
    materials: ["Plush textile", "embroidered face", "soft fill"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Window shelf, desk, bedside table, or light-toned room surface.",
    priceCents: 3700,
    stock: 6,
  },
  {
    id: "open-leg-octopus-132",
    sourceStem: "132",
    title: "Open Leg Octopus",
    subtitle: "Cream octopus plush with wider resting legs.",
    atmosphereLine: "A low, grounded object that gives a shelf one soft spread shape.",
    inspiration: "The form is based on an octopus at rest, translated into a fabric object that sits rather than performs.",
    collection: "wind-objects",
    materials: ["Plush textile", "embroidered details", "filled legs"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Low shelf, bed edge, reading chair, or child room ledge.",
    priceCents: 4300,
    stock: 5,
  },
  {
    id: "bow-room-jellyfish-133",
    sourceStem: "133",
    title: "Bow Room Jellyfish",
    subtitle: "Cream jellyfish plush with a small side bow.",
    atmosphereLine: "A soft daily object with one gentle note of ornament.",
    inspiration: "The design keeps the bow small so the object remains room-friendly instead of gift-shop loud.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "bow detail", "soft filling"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Bedside, shelf, dressing table, or linen basket.",
    priceCents: 3800,
    stock: 8,
  },
  {
    id: "winter-cap-jellyfish-front-134-1",
    sourceStem: "134-1",
    title: "Winter Cap Jellyfish",
    subtitle: "Cream plush jellyfish with knitted cap.",
    atmosphereLine: "A seasonal soft object that adds warmth without becoming holiday noise.",
    inspiration: "The cap comes from winter room habits: soft fabric, low light, and a small object kept nearby.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "knit cap", "embroidered face"],
    dimensions: "Approx. 9 in tall / final measurement confirmed before shipping",
    placement: "Winter shelf, bed edge, reading chair, or near folded blankets.",
    priceCents: 4400,
    stock: 6,
  },
  {
    id: "winter-cap-jellyfish-back-134-2",
    sourceStem: "134-2",
    title: "Winter Cap Jellyfish Back View",
    subtitle: "Rear-view plush jellyfish with knitted cap.",
    atmosphereLine: "A back-facing winter object for a shelf that wants warmth, not display.",
    inspiration: "The rear view keeps the cap and silhouette as the main quiet gesture.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "knit cap", "soft fill"],
    dimensions: "Approx. 9 in tall / final measurement confirmed before shipping",
    placement: "Shelf, bed ledge, blanket basket, or low cabinet.",
    priceCents: 4400,
    stock: 5,
  },
  {
    id: "plain-jellyfish-135-1",
    sourceStem: "135-1",
    title: "Plain Jellyfish",
    subtitle: "Cream plush jellyfish with simple face.",
    atmosphereLine: "A simple soft figure for a room that does not need added explanation.",
    inspiration: "Made from the most ordinary version of the form: rounded top, soft legs, almost no expression.",
    collection: "wind-objects",
    materials: ["Plush textile", "embroidered face", "soft fill"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Shelf, desk, bedside, or child's reading surface.",
    priceCents: 3500,
    stock: 10,
  },
  {
    id: "plain-jellyfish-back-135-2",
    sourceStem: "135-2",
    title: "Plain Jellyfish Back View",
    subtitle: "Rear-view cream plush jellyfish.",
    atmosphereLine: "A simple back-view object with quiet seam and soft proportion.",
    inspiration: "The design lets the back carry the object, reducing face-forward display pressure.",
    collection: "wind-objects",
    materials: ["Plush textile", "stitched seam", "soft fill"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Bookshelf, bedside, linen shelf, or soft chair.",
    priceCents: 3500,
    stock: 8,
  },
  {
    id: "rope-leg-jellyfish-136-1",
    sourceStem: "136-1",
    title: "Rope Leg Jellyfish",
    subtitle: "Cream plush jellyfish with rope-like legs.",
    atmosphereLine: "A more tactile plush object with texture kept in the lower body.",
    inspiration: "The legs borrow from cord, braid, and tide marks, giving the object a material rhythm.",
    collection: "wind-objects",
    materials: ["Plush textile", "braided leg texture", "embroidered face"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf edge, studio surface, nursery shelf, or soft basket.",
    priceCents: 4300,
    stock: 5,
  },
  {
    id: "rose-bow-jellyfish-137",
    sourceStem: "137",
    title: "Rose Bow Jellyfish",
    subtitle: "Cream and rose plush figure with bow.",
    atmosphereLine: "A warmer color object that stays small and shelf-friendly.",
    inspiration: "The rose accent is held low in the body so the plush keeps a calm face and soft outline.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "bow detail", "embroidered face"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Dressing table, bedside shelf, child room, or folded linen corner.",
    priceCents: 3900,
    stock: 6,
  },
  {
    id: "soft-ear-companion-138",
    sourceStem: "138",
    title: "Soft Ear Companion",
    subtitle: "Cream plush figure with long soft ears.",
    atmosphereLine: "A familiar soft form for a room that wants one gentle companion object.",
    inspiration: "The long ears are kept relaxed, closer to fabric weight than character gesture.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 9 in tall / final measurement confirmed before shipping",
    placement: "Bedside, low shelf, reading chair, or a child's room.",
    priceCents: 3700,
    stock: 8,
  },
  {
    id: "rounded-ear-companion-139",
    sourceStem: "139",
    title: "Rounded Ear Companion",
    subtitle: "Cream plush with rounded body and long ears.",
    atmosphereLine: "A soft figure that can sit near books without asking for attention.",
    inspiration: "The object keeps the familiar rabbit form but reduces expression so it can age quietly in a room.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered face", "soft fill"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Bookshelf, bedside table, soft chair, or studio shelf.",
    priceCents: 3700,
    stock: 8,
  },
  {
    id: "wing-ear-companion-140",
    sourceStem: "140",
    title: "Wing Ear Companion",
    subtitle: "Cream plush with long ears and side wing shapes.",
    atmosphereLine: "A soft room object with small wing-like side forms.",
    inspiration: "The side shapes borrow from sleeves and wings, giving the piece a slightly lifted silhouette.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf, bed edge, nursery chair, or near folded fabric.",
    priceCents: 3800,
    stock: 7,
  },
  {
    id: "long-ear-room-figure-142",
    sourceStem: "142",
    title: "Long Ear Room Figure",
    subtitle: "Cream long-eared plush with quiet stance.",
    atmosphereLine: "A soft figure for a shelf that should stay light, not staged.",
    inspiration: "Designed from the simplest long-ear silhouette, with the body rounded for slow room aging.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Bedside shelf, reading chair, low cabinet, or child room.",
    priceCents: 3700,
    stock: 8,
  },
  {
    id: "small-wing-ear-143",
    sourceStem: "143",
    title: "Small Wing Ear",
    subtitle: "Compact cream plush with long ears and side forms.",
    atmosphereLine: "A smaller soft object with a calm vertical shape.",
    inspiration: "The piece reduces the long-ear form into a compact shelf object for everyday rooms.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 8 in tall / final measurement confirmed before shipping",
    placement: "Desk shelf, bedside ledge, fabric basket, or low room surface.",
    priceCents: 3600,
    stock: 9,
  },
  {
    id: "rabbit-room-marker-145",
    sourceStem: "145",
    title: "Rabbit Room Marker",
    subtitle: "Cream rabbit plush with upright ears.",
    atmosphereLine: "A simple rabbit marker for a soft room surface.",
    inspiration: "The upright ears give the object clarity while the body remains rounded and quiet.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered face", "soft fill"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Bookshelf, child room, bedside, or near a chair arm.",
    priceCents: 3600,
    stock: 8,
  },
  {
    id: "cat-suit-room-figure-99",
    sourceStem: "99",
    title: "Cat Suit Room Figure",
    subtitle: "Cream cat-like plush standing figure.",
    atmosphereLine: "A watchful soft object with a little more character, kept gentle for the room.",
    inspiration: "The cat face gives the figure a clear personality while the palette keeps it from becoming loud.",
    collection: "seasonal-collections",
    materials: ["Plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 9 in tall / final measurement confirmed before shipping",
    placement: "Shelf, child room, entry bench, or beside books.",
    priceCents: 3900,
    stock: 6,
  },
  {
    id: "moon-body-front-150-1",
    sourceStem: "150-1",
    title: "Moon Body Figure",
    subtitle: "Cream soft figure with rounded ears and seated body.",
    atmosphereLine: "A grounded plush figure for a room that can hold one quiet seated form.",
    inspiration: "The design comes from a seated moon-like body with minimal facial detail and soft proportions.",
    collection: "quiet-desk",
    materials: ["Plush textile", "embroidered face", "soft filling"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Desk shelf, bed edge, studio cabinet, or entry bench.",
    priceCents: 3800,
    stock: 6,
  },
  {
    id: "moon-body-back-150-2",
    sourceStem: "150-2",
    title: "Moon Body Back View",
    subtitle: "Rear-view seated cream soft figure.",
    atmosphereLine: "A back-facing plush surface that can sit quietly in peripheral view.",
    inspiration: "Made for a shelf where the object does not need to face the room to be present.",
    collection: "quiet-desk",
    materials: ["Plush textile", "stitched back", "soft filling"],
    dimensions: "Approx. 8.5 in tall / final measurement confirmed before shipping",
    placement: "Shelf, desk rear edge, low cabinet, or soft chair.",
    priceCents: 3800,
    stock: 5,
  },
];

const autoMaterialSourceStems = [
  "1.1", "1", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "2", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "3", "30", "31", "32", "33", "35", "36", "37", "38", "39", "4", "40", "41", "42", "43", "44", "45", "46", "47", "49.1", "49.2", "49.3", "49.4", "49", "5", "50", "51", "52", "53", "54", "55", "56", "57", "58", "6", "60", "63", "64", "65", "66", "67.1", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "8", "80", "83", "84", "85", "86", "87", "9", "91", "92", "93", "94", "95", "96", "97", "131-2", "161", "162", "163", "165", "166", "167", "168", "crystal-window-plant", "incense-box", "tea-gift-box", "风铃001",
] as const;

const splitMaterialSourceStems = [
  "91-split-11", "91-split-12", "91-split-13", "91-split-21", "91-split-22", "91-split-23",
  "92-split-11", "92-split-12", "92-split-13", "92-split-21", "92-split-22", "92-split-23",
  "93-split-11", "93-split-12", "93-split-13", "93-split-21", "93-split-22", "93-split-23",
  "94-split-11", "94-split-12", "94-split-13", "94-split-21", "94-split-22", "94-split-23",
  "95-split-11", "95-split-12", "95-split-13", "95-split-21", "95-split-22", "95-split-23",
  "96-split-11", "96-split-12", "96-split-13", "96-split-21", "96-split-22", "96-split-23",
  "97-split-11", "97-split-12", "97-split-13", "97-split-21", "97-split-22", "97-split-23",
] as const;

const collectionCycle: readonly CommerceCollectionId[] = ["wind-objects", "quiet-desk", "ritual-objects", "seasonal-collections"];

function titleFromStem(stem: string) {
  if (stem.includes("split")) {
    const [sheet, , cell] = stem.split("-");
    return `Material Cut ${sheet}.${cell}`;
  }

  const named: Record<string, string> = {
    "crystal-window-plant": "Crystal Window Plant",
    "incense-box": "Still Water Incense Box",
    "tea-gift-box": "Tao Fruit Tea Gift Box",
    "风铃001": "Window Wind Bell",
    "161": "Window Bell 161",
    "162": "Window Bell 162",
    "163": "Window Bell 163",
    "165": "Window Bell 165",
    "166": "Window Bell 166",
    "167": "Window Bell 167",
    "168": "Window Bell 168",
  };

  return named[stem] ?? `Material Object ${stem.toUpperCase()}`;
}

function autoMaterialSeed(stem: string, index: number, fromSplit = false): MaterialObjectSeed {
  const title = titleFromStem(stem);
  const isWindBell = title.includes("Wind Bell") || title.includes("Window Bell");
  const collection = isWindBell ? "wind-objects" : fromSplit ? "ritual-objects" : collectionCycle[index % collectionCycle.length];
  const namedSlugs: Record<string, string> = {
    "风铃001": "window-wind-bell-001",
  };
  const normalizedSlug = stem.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const slug = namedSlugs[stem] ?? (normalizedSlug || `source-${index}`);

  return {
    id: `material-${slug}`,
    sourceStem: stem,
    title,
    subtitle: isWindBell ? "Decorative room wind bell prepared from the current product shelf." : fromSplit ? "Cropped product candidate from a multi-object source image." : "First-stage product link from the current Taoist365 material shelf.",
    atmosphereLine: isWindBell
      ? "A hanging object for window air, small sound, and low-pressure room movement."
      : fromSplit
      ? "A separated product surface prepared from a grouped material board for internal testing."
      : "A quiet product surface prepared for internal commerce testing.",
    inspiration: isWindBell
      ? "The design direction comes from small bells, window light, and hanging room objects that move only when the air moves."
      : fromSplit
      ? "This link comes from a grouped product board. The first pass isolates the object area, calms the background, and keeps the shape available for later model-level cleanup."
      : "This link keeps the product shape from the original material while resetting the surrounding field into a softer Taoist365 surface.",
    collection,
    materials: standardizedMaterials(title, stem, isWindBell),
    dimensions: standardizedDimensions(title, stem, isWindBell),
    placement: standardizedPlacement(title, isWindBell, fromSplit),
    priceCents: isWindBell ? 5800 + (index % 4) * 400 : fromSplit ? 3200 + (index % 5) * 300 : 2800 + (index % 8) * 400,
    stock: fromSplit ? 3 + (index % 4) : 4 + (index % 9),
  };
}

function standardizedMaterials(title: string, source: string, isWindBell = false) {
  const lower = `${title} ${source}`.toLowerCase();

  if (isWindBell || lower.includes("wind bell") || lower.includes("window bell") || lower.includes("椋庨搩")) {
    return ["Brass-tone metal bell", "alloy hanging hardware", "cotton or braided cord"];
  }

  if (lower.includes("bracelet") || lower.includes("crystal")) {
    return ["Mixed crystal beads", "elastic cord", "alloy charm or spacer"];
  }

  if (lower.includes("plush") || lower.includes("jellyfish") || lower.includes("rabbit") || lower.includes("cat") || lower.includes("moon body")) {
    return ["Soft plush textile", "polyester fiber fill", "embroidered or appliqued surface detail"];
  }

  if (lower.includes("lamp") || lower.includes("light")) {
    return ["Printed shade", "metal stem", "weighted base"];
  }

  if (lower.includes("tea")) {
    return ["Dried fruit tea", "paper gift box", "food-grade inner pouch"];
  }

  if (lower.includes("incense") || lower.includes("wood")) {
    return ["Finished wood", "ceramic rest", "paper sleeve"];
  }

  if (lower.includes("linen") || lower.includes("cotton") || lower.includes("fabric")) {
    return ["Linen or cotton textile", "stitched edge", "soft folded wrap"];
  }

  if (lower.includes("pendant") || lower.includes("ornament") || lower.includes("charm")) {
    return ["Alloy metal body", "braided cord", "small charm hardware"];
  }

  if (lower.includes("ceramic") || lower.includes("dish") || lower.includes("bowl")) {
    return ["Ceramic body", "glazed surface", "protective paper wrap"];
  }

  return ["Resin or alloy object body", "soft room finish", "protective packing material"];
}

function standardizedDimensions(title: string, source: string, isWindBell = false) {
  const lower = `${title} ${source}`.toLowerCase();

  if (isWindBell || lower.includes("wind bell") || lower.includes("window bell") || lower.includes("椋庨搩")) {
    return "Approx. 10-18 in / 25-46 cm hanging length";
  }

  if (lower.includes("bracelet") || lower.includes("crystal")) {
    return "Approx. 6.5-7.2 in / 16.5-18.3 cm inner circumference";
  }

  if (lower.includes("plush") || lower.includes("jellyfish") || lower.includes("rabbit") || lower.includes("cat") || lower.includes("moon body")) {
    return "Approx. 7-10 in / 18-25 cm tall";
  }

  if (lower.includes("lamp") || lower.includes("light")) {
    return "Approx. 8-12 in / 20-30 cm tall";
  }

  if (lower.includes("tea")) {
    return "Approx. 6 x 4 x 2 in / 15 x 10 x 5 cm gift box";
  }

  if (lower.includes("incense") || lower.includes("wood")) {
    return "Approx. 8-10 in / 20-25 cm long";
  }

  if (lower.includes("pendant") || lower.includes("ornament") || lower.includes("charm")) {
    return "Approx. 2-5 in / 5-13 cm object body";
  }

  if (lower.includes("ceramic") || lower.includes("dish") || lower.includes("bowl")) {
    return "Approx. 3-6 in / 8-15 cm across";
  }

  return "Approx. 4-9 in / 10-23 cm room-object scale";
}

function standardizedPlacement(title: string, isWindBell = false, fromSplit = false) {
  const lower = title.toLowerCase();

  if (isWindBell || lower.includes("wind bell") || lower.includes("window bell")) {
    return "Window hook, entryway peg, balcony corner, or a shelf edge with moving air.";
  }

  if (lower.includes("bracelet") || lower.includes("pendant")) {
    return "Wrist, bedside tray, shelf dish, or travel pouch between uses.";
  }

  if (lower.includes("plush") || lower.includes("jellyfish") || lower.includes("rabbit") || lower.includes("cat")) {
    return "Reading chair, bed edge, low shelf, or soft room corner.";
  }

  if (fromSplit) {
    return "Shelf, tray, product card, or small-room surface after the grouped source image is separated.";
  }

  return "Shelf, desk, room corner, or product card surface with low visual pressure.";
}

function marketAdjustedPriceCents(basePriceCents: number, title: string, source: string, index: number) {
  const lower = `${title} ${source}`.toLowerCase();

  if (lower.includes("wind bell") || lower.includes("window bell") || lower.includes("风铃")) {
    return 5800 + (index % 5) * 500;
  }

  if (lower.includes("bracelet") || lower.includes("crystal")) {
    return Math.max(basePriceCents, 4200);
  }

  if (lower.includes("plush") || lower.includes("jellyfish") || lower.includes("rabbit") || lower.includes("cat") || lower.includes("moon body")) {
    return Math.max(basePriceCents, 4800 + (index % 6) * 400);
  }

  if (lower.includes("lamp") || lower.includes("light")) {
    return Math.max(basePriceCents, 7800);
  }

  if (lower.includes("tea")) {
    return Math.max(basePriceCents, 6200);
  }

  if (lower.includes("pendant") || lower.includes("ornament")) {
    return Math.max(basePriceCents, 5200);
  }

  return Math.max(basePriceCents, 3600 + (index % 8) * 400);
}

function derivedStemFromAsset(assetName: string) {
  return assetName.replace(/\.[^.]+$/, "").toLowerCase();
}

const autoMaterialObjectSeeds: readonly MaterialObjectSeed[] = [
  ...autoMaterialSourceStems.map((stem, index) => autoMaterialSeed(stem, index)),
  ...splitMaterialSourceStems.map((stem, index) => autoMaterialSeed(stem, index, true)),
];

function collectionTitle(collectionId: CommerceCollectionId) {
  return commerceCollections.find((collection) => collection.id === collectionId)?.title ?? "Objects";
}

const foundationalCommerceObjects: readonly CommerceObject[] = taoist365ObjectsCatalog.map((piece, index) => {
  const details = objectDetails[piece.id as keyof typeof objectDetails];
  const collection = collectionByIndex[index] ?? "quiet-desk";

  return {
    id: piece.id,
    title: details.title,
    subtitle: details.subtitle,
    atmosphereLine: details.atmosphereLine,
    collection,
    collectionTitle: collectionTitle(collection),
    materials: details.materials,
    dimensions: details.dimensions,
    placement: details.placement,
    detailSurfaces: [piece.livedWithPresence, piece.roomTrace, piece.necessityNote],
    shippingState: details.stock <= 4 ? "limited" : "available",
    archiveState: "active",
    stock: details.stock,
    priceCents: marketAdjustedPriceCents(details.priceCents, details.title, piece.id, index),
    trustNotes: [
      "Ships after human stock confirmation.",
      "Photos are current material references from the Taoist365 asset shelf.",
      "Small visible variation is treated as ordinary, not defective.",
    ],
    shippingNote: "Ships from a small-stock shelf. Typical packing window is 3-5 business days after confirmation.",
    media: {
      hero: `/objects-living/${details.media[0]}`,
      alt: `${details.title} photographed for Taoist365`,
      caption: `${details.title} in a real product surface from the Taoist365 material shelf.`,
      videoPoster: `/objects-living/${details.media[0]}`,
      motion: `/objects-motion/${piece.id}.gif`,
      placement: `/objects-living/${details.media[1]}`,
      detail: `/objects-living/${details.media[2]}`,
      collection: `/objects-living/${details.media[0]}`,
      package: `/objects-derived/${derivedStemFromAsset(details.media[0])}-package.webp`,
    },
    relatedIds: taoist365ObjectsCatalog
      .filter((candidate) => candidate.id !== piece.id)
      .slice((index + 1) % taoist365ObjectsCatalog.length)
      .slice(0, 3)
      .map((candidate) => candidate.id),
  };
});

const allMaterialObjectSeeds: readonly MaterialObjectSeed[] = [...materialObjectSeeds, ...autoMaterialObjectSeeds];

const materialProductObjects: readonly CommerceObject[] = allMaterialObjectSeeds.map((seed, index) => {
  const relatedSeeds = [
    allMaterialObjectSeeds[(index + 1) % allMaterialObjectSeeds.length],
    allMaterialObjectSeeds[(index + 2) % allMaterialObjectSeeds.length],
    allMaterialObjectSeeds[(index + 5) % allMaterialObjectSeeds.length],
  ];

  return {
    id: seed.id,
    title: seed.title,
    subtitle: seed.subtitle,
    atmosphereLine: seed.atmosphereLine,
    collection: seed.collection,
    collectionTitle: collectionTitle(seed.collection),
    materials: seed.materials,
    dimensions: seed.dimensions,
    placement: seed.placement,
    detailSurfaces: [
      seed.inspiration,
      "High-resolution product derivatives are normalized for Browser Air backgrounds while preserving object shape.",
      "Multi-angle, detail, placement, and packaging views share the same product link so later photography can replace the asset set cleanly.",
    ],
    shippingState: seed.stock <= 5 ? "limited" : "available",
    archiveState: "active",
    stock: seed.stock,
    priceCents: marketAdjustedPriceCents(seed.priceCents, seed.title, seed.sourceStem, index),
    trustNotes: [
      "USD is the base display currency; future currency hooks are reserved.",
      "Ships after stock, size, and region confirmation.",
      "Packaging follows the global object packing standard before carrier handoff.",
    ],
    shippingNote: "Ships after stock and region confirmation. Most small objects are prepared within 3-5 business days.",
    media: {
      hero: `/objects-derived/${seed.sourceStem}-hero.webp`,
      alt: `${seed.title} product image`,
      caption: `${seed.title} staged from the current Taoist365 product material shelf.`,
      videoPoster: `/objects-derived/${seed.sourceStem}-hero.webp`,
      motion: `/objects-derived/${seed.sourceStem}-placement.webp`,
      placement: `/objects-derived/${seed.sourceStem}-placement.webp`,
      detail: `/objects-derived/${seed.sourceStem}-detail.webp`,
      collection: `/objects-derived/${seed.sourceStem}-hero.webp`,
      package: `/objects-derived/${seed.sourceStem}-package.webp`,
    },
    relatedIds: relatedSeeds.map((item) => item.id),
  };
});

export const commerceObjects: readonly CommerceObject[] = [...foundationalCommerceObjects, ...materialProductObjects];

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(cents / 100);
}

export function objectById(id: string) {
  return commerceObjects.find((object) => object.id === id);
}

export function objectsForCollection(collectionId: CommerceCollectionId) {
  return commerceObjects.filter((object) => object.collection === collectionId);
}

function relationshipScore(source: CommerceObject, candidate: CommerceObject) {
  if (source.id === candidate.id || candidate.archiveState === "quiet-archive") {
    return -1;
  }

  let score = 0;
  if (source.collection === candidate.collection) score += 4;
  if (source.materials.some((material) => candidate.materials.includes(material))) score += 3;

  const sourceRoomWords = `${source.placement} ${source.atmosphereLine}`.toLowerCase();
  const candidateRoomWords = `${candidate.placement} ${candidate.atmosphereLine}`.toLowerCase();
  for (const word of ["window", "desk", "shelf", "room", "tea", "linen", "light", "wind", "wood", "ceramic"]) {
    if (sourceRoomWords.includes(word) && candidateRoomWords.includes(word)) score += 1;
  }

  if (source.collection === "wind-objects" && ["quiet-desk", "ritual-objects"].includes(candidate.collection)) {
    score += 2;
  }
  if (source.collection === "seasonal-collections" && candidate.collection === "wind-objects") {
    score += 2;
  }

  return score;
}

export function quietPairingsForObjectId(id: string, limit = 4) {
  const source = objectById(id);
  if (!source) return [];

  return commerceObjects
    .map((candidate) => ({ candidate, score: relationshipScore(source, candidate) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function quietPairingsForCart(ids: readonly string[], limit = 4) {
  const cartIds = new Set(ids);
  const selectedObjects = ids.map((id) => objectById(id)).filter(Boolean) as CommerceObject[];

  if (selectedObjects.length === 0) {
    return commerceObjects.filter((object) => object.collection === "wind-objects").slice(0, limit);
  }

  return commerceObjects
    .filter((candidate) => !cartIds.has(candidate.id) && candidate.archiveState !== "quiet-archive")
    .map((candidate) => ({
      candidate,
      score: selectedObjects.reduce((total, source) => total + Math.max(0, relationshipScore(source, candidate)), 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function collectionById(id: string) {
  return commerceCollections.find((collection) => collection.id === id);
}
