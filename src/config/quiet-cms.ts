import {
  ambientSoundRuntime,
  browserAirMotionRuntime,
  browserAirVideoSystem,
  globalQuietObservationSystem,
  globalRuntimeCoherence,
  imageClimateRuntime,
  objectContinuityRuntime,
  runtimeMemoryLayer,
  unifiedMediaCivilizationStructure,
  unifiedTypographyRuntime,
} from "@/config/runtime-coherence";

export type CmsSurfaceKind = "page" | "collection" | "object" | "media" | "continuity" | "runtime" | "sound";

export type QuietCmsSurface = {
  id: string;
  label: string;
  kind: CmsSurfaceKind;
  use: string;
  pressureLimit: string;
};

export type QuietObjectCollection = {
  id: string;
  name: string;
  presence: string;
  publicEnergy: string;
};

export type QuietObjectField = {
  key: string;
  label: string;
  role: string;
  required: boolean;
};

export type QuietMediaSlot = {
  id: string;
  label: string;
  accepts: readonly ("image" | "video")[];
  use: string;
  restraint: string;
};

export type QuietUploadStep = {
  id: string;
  label: string;
  action: string;
  check: string;
};

export const quietCmsSurfaces: readonly QuietCmsSurface[] = [
  {
    id: "home-page",
    label: "Home page sections",
    kind: "page",
    use: "A few maintained home surfaces without turning the page into a campaign.",
    pressureLimit: "No hero pressure, no seasonal push, no explanation loop.",
  },
  {
    id: "editorial-sections",
    label: "Editorial sections",
    kind: "page",
    use: "Short text blocks that can age without needing a publishing rhythm.",
    pressureLimit: "No magazine cadence, no thought-leadership posture.",
  },
  {
    id: "object-sections",
    label: "Object sections",
    kind: "page",
    use: "Room-facing object groups with stable anchors and low listing pressure.",
    pressureLimit: "No grid urgency, no ranking, no popularity signals.",
  },
  {
    id: "product-runtime",
    label: "Unified product runtime",
    kind: "object",
    use: "One object_id for products, Windkeep, Quiet Receiving, observer uploads, AI media, stories, courier, and long-stay state.",
    pressureLimit: "No duplicate detail pages, no separate object system, no one-off upload structure.",
  },
  {
    id: "runtime-coherence",
    label: "Runtime coherence",
    kind: "runtime",
    use: "Section rhythm, scroll pacing, motion softness, typography, image climate, and pressure balance maintained as one browser-air layer.",
    pressureLimit: "No template split, no separate page climate, no overdesigned system display.",
  },
  {
    id: "video-runtime",
    label: "Browser Air video",
    kind: "media",
    use: "Muted ambient loops, poster-first mobile behavior, auto pause, and bandwidth protection for room light and air movement.",
    pressureLimit: "No promo motion, no fast cuts, no cinematic escalation.",
  },
  {
    id: "ambient-sound",
    label: "Ambient sound layer",
    kind: "sound",
    use: "Optional low room tone, rain, ocean air, and paper movement without turning sound into a feature surface.",
    pressureLimit: "Off by default; no player posture, no session pressure.",
  },
  {
    id: "world-memory",
    label: "World reference system",
    kind: "continuity",
    use: "Quiet Notes, Daily Verse, Courier, Long Stay, passing weather, room traces, and letters can remember each other lightly.",
    pressureLimit: "No public stream, no social loop, no content-machine feeling.",
  },
  {
    id: "global-observation",
    label: "Global quiet observation",
    kind: "object",
    use: "Observer uploads normalize into object_id, emotional metadata, media slots, trust, location, and continuity without creating another object system.",
    pressureLimit: "No operations-center language, no growth surface, no ranking behavior.",
  },
  {
    id: "object-continuity",
    label: "Object continuity layers",
    kind: "continuity",
    use: "Windkeep, Quiet Receiving, Courier, Long Stay Objects, Nearby Objects, and emotional metadata attached to the same object_id.",
    pressureLimit: "No control-room surface, no contest surface, no collector psychology.",
  },
  {
    id: "reality-governance",
    label: "Reality governance",
    kind: "continuity",
    use: "Reality status, trust history, arrival evidence, source confirmation, atmosphere limits, and false-existence removal rules.",
    pressureLimit: "Wide entry first; strict reality governance when existence is false.",
  },
  {
    id: "ritual-sections",
    label: "Ritual sections",
    kind: "page",
    use: "Small ritual surfaces that remain optional and quiet.",
    pressureLimit: "No app feeling, no streaks, no session pressure.",
  },
  {
    id: "mail-surfaces",
    label: "Quiet mail surfaces",
    kind: "page",
    use: "Plain correspondence entry points for slow human replies.",
    pressureLimit: "No newsletter cadence, no retention copy, no funnel language.",
  },
];

export const quietObjectCollections: readonly QuietObjectCollection[] = [
  {
    id: "wind-objects",
    name: "Wind Objects",
    presence: "Objects that move gently through rooms, shelves, and correspondence.",
    publicEnergy: "Circulation without trading-floor behavior.",
  },
  {
    id: "quiet-desk-objects",
    name: "Quiet Desk Objects",
    presence: "Objects that sit near work without becoming productivity tools.",
    publicEnergy: "Useful presence without office-system pressure.",
  },
  {
    id: "ritual-objects",
    name: "Ritual Objects",
    presence: "Objects that support a small act without turning it into a performance.",
    publicEnergy: "Ritual support without spiritual product staging.",
  },
  {
    id: "seasonal-objects",
    name: "Seasonal Objects",
    presence: "Objects that appear when the room and weather make room for them.",
    publicEnergy: "Seasonal presence without drop mechanics.",
  },
  {
    id: "atmospheric-objects",
    name: "Atmospheric Objects",
    presence: "Objects whose main role is placement, light, texture, and room memory.",
    publicEnergy: "Background object archive without decor catalog pressure.",
  },
];

export const quietObjectFields: readonly QuietObjectField[] = [
  { key: "title", label: "Title", role: "Plain object name.", required: true },
  { key: "object_id", label: "Object ID", role: "Unified RI object identity such as RI-OBJ-0001.", required: true },
  { key: "reality_status", label: "Reality status", role: "VERIFIED_REAL, REAL_SUPPLIER_CONFIRMED, HYBRID_REAL_AI, COMMUNITY_VERIFIED, UNVERIFIED, or CONCEPT_OBJECT.", required: true },
  { key: "trustLayer", label: "Trust layer", role: "Verification history, reports, fulfillment history, real arrival evidence, and community confirmations.", required: false },
  { key: "arrivalResidue", label: "Real arrival layer", role: "Object in room, beside shelf, after use, near window, and real placement photos.", required: false },
  { key: "continuityRuntime", label: "Object continuity runtime", role: "Previous holder, previous room, previous weather, passage memory, and continuity chain.", required: false },
  { key: "mediaCivilization", label: "Media civilization structure", role: "hero, object, shelf, atmosphere, residue, mobile, pc, AI, real, emotional, continuity, and story.", required: true },
  { key: "ambientSound", label: "Ambient sound layer", role: "Optional rain, ocean air, room tone, paper movement, or evening ambience without player behavior.", required: false },
  { key: "worldReferences", label: "World references", role: "Quiet Notes, Daily Verse, Courier, Long Stay, weather, room traces, and letters linked lightly.", required: false },
  { key: "subtitle", label: "Subtitle", role: "Short nearby line, not a sales hook.", required: false },
  { key: "atmosphereLine", label: "Atmosphere line", role: "One restrained room line.", required: false },
  { key: "materials", label: "Materials", role: "Material truth before styling language.", required: true },
  { key: "dimensions", label: "Dimensions", role: "Useful scale without product-page aggression.", required: true },
  { key: "placementSuggestion", label: "Placement suggestion", role: "Where the object can quietly live.", required: false },
  { key: "collection", label: "Collection", role: "One collection relation.", required: true },
  { key: "media", label: "Media", role: "Images or video that reduce pressure.", required: false },
  { key: "quietStoryGrid", label: "9-image Quiet Story", role: "Real object, room, texture, use, emotional scene, detail, packaging, nearby life, atmosphere.", required: false },
  { key: "objectStory", label: "Object story", role: "Why the object exists: material, time, maker, room feeling, memory.", required: false },
  { key: "continuity", label: "Continuity", role: "Windkeep, Courier, Long Stay, Quiet Receiving, previous holder.", required: false },
  { key: "emotionalMetadata", label: "Emotional metadata", role: "Residue, tags, room feeling, and nearby object relation.", required: false },
  { key: "detailSurfaces", label: "Detail surfaces", role: "Material, edge, use, and room views.", required: false },
  { key: "shippingState", label: "Shipping state", role: "Plain availability and handling state.", required: false },
  { key: "archiveState", label: "Archive state", role: "Unavailable or past presence without scarcity.", required: false },
];

export const quietMediaSlots: readonly QuietMediaSlot[] = [
  {
    id: "image-upload",
    label: "Image upload",
    accepts: ["image"],
    use: "Primary object and room images.",
    restraint: "Lower contrast, calmer shadows, no commercial product glow.",
  },
  {
    id: "video-upload",
    label: "Video upload",
    accepts: ["video"],
    use: "Slow motion surfaces for light, fabric, paper, and object shadow.",
    restraint: "No fast cuts, no ad rhythm, no short-video pacing.",
  },
  {
    id: "hero-image",
    label: "Hero image assignment",
    accepts: ["image", "video"],
    use: "One quiet surface when a page needs a primary material presence.",
    restraint: "No impact framing, no luxury crop, no dark mysticism.",
  },
  {
    id: "placement-image",
    label: "Placement image assignment",
    accepts: ["image"],
    use: "Room placement, shelf, desk, sill, table, or textile context.",
    restraint: "Keep ordinary room evidence; avoid showroom staging.",
  },
  {
    id: "material-detail",
    label: "Material detail assignment",
    accepts: ["image", "video"],
    use: "Texture, edge, wear, weave, glaze, grain, paper, shadow.",
    restraint: "Texture breathing over premium sharpness.",
  },
  {
    id: "product-runtime-media",
    label: "Product runtime media",
    accepts: ["image", "video"],
    use: "hero, shelf, object, emotional, residue, pc, mobile, ai, real, atmosphere, and story slots.",
    restraint: "One media structure per object_id; no scattered upload piles.",
  },
  {
    id: "air-video-loop",
    label: "Browser Air video loop",
    accepts: ["video"],
    use: "Hero ambient video, background loops, mobile lightweight loop, or atmosphere surface.",
    restraint: "Muted, slow, poster-backed, auto-paused when hidden.",
  },
  {
    id: "arrival-media",
    label: "Arrival trace media",
    accepts: ["image", "video"],
    use: "Object near shelf, beside window, room placement, evening light, or real-life trace.",
    restraint: "Private evidence and room memory before public display.",
  },
  {
    id: "observer-upload-media",
    label: "Observer upload normalization",
    accepts: ["image", "video"],
    use: "Mobile crop, pc crop, shelf image, atmospheric image, and object image derived from upload review.",
    restraint: "Observation before selling; no operator-console energy.",
  },
];

export const quietUploadFlow: readonly QuietUploadStep[] = [
  {
    id: "media",
    label: "Choose media",
    action: "Select image or video and leave it visible before attaching it.",
    check: "Does it feel like a room object, not a product asset?",
  },
  {
    id: "object",
    label: "Create object",
    action: "Assign one RI object_id and fill only fields that help a human place it.",
    check: "No duplicate detail page, no SKU pile, no purchase pressure, no launch wording.",
  },
  {
    id: "collection",
    label: "Assign collection",
    action: "Place the object in one quiet collection first.",
    check: "Collection does not become a campaign or category tree.",
  },
  {
    id: "surfaces",
    label: "Assign surfaces",
    action: "Attach hero, placement, and material detail media only when useful.",
    check: "Media reduces pressure instead of making the object more impressive.",
  },
  {
    id: "state",
    label: "Set state",
    action: "Mark available, unavailable, draft, or archived in plain language.",
    check: "Unavailable reads as ordinary absence, not scarcity.",
  },
  {
    id: "continuity",
    label: "Attach continuity",
    action: "Attach Windkeep, Quiet Receiving, Courier, Long Stay, Nearby Objects, and emotional tags to the same object_id.",
    check: "Continuity feels like time passing, not control-room state.",
  },
  {
    id: "reality",
    label: "Set reality status",
    action: "Choose the lightest honest reality status and attach the first available evidence.",
    check: "AI atmosphere can support room light, but cannot replace real existence.",
  },
  {
    id: "world-memory",
    label: "Attach world memory",
    action: "Attach only nearby notes, weather, courier state, long stay, room trace, or letter fragments that truly reduce pressure.",
    check: "Reference feels like memory, not a stream or recommendation.",
  },
];

export const quietImageTreatmentLines = [
  "Tone softening before drama.",
  "Shadow calming before contrast.",
  "Saturation restraint before brand color.",
  "Warmth balancing before filter unity.",
  "Texture breathing before luxury sharpness.",
  "More negative space when the object feels too eager.",
] as const;

export const quietMotionDirectionLines = [
  "Window light moving slowly.",
  "Fabric shifting without a cut.",
  "Paper movement near still air.",
  "Object shadow drift.",
  "Seasonal light across a surface.",
  "Placement motion that can stay open in a browser tab.",
] as const;

export const quietCmsBoundaries = [
  "CMS stays a maintenance surface.",
  "Upload stays calm and readable.",
  "Objects stay archives before products.",
  "Availability stays plain.",
  "Media treatment reduces pressure.",
  "World memory links stay light and finite.",
  "Ambient sound remains optional and barely present.",
] as const;

export const oneCivilizationCmsRuntime = {
  surfaces: quietCmsSurfaces.map((surface) => surface.id),
  manages: [
    "products",
    "objects",
    "notes",
    "verse",
    "weather",
    "continuity",
    "AI uploads",
    "observer uploads",
    "courier",
    "trust",
    "media",
    "atmosphere assets",
    "room traces",
    "unfinished letters",
  ] as const,
  runtime: {
    coherence: globalRuntimeCoherence,
    motion: browserAirMotionRuntime,
    typography: unifiedTypographyRuntime,
    imageClimate: imageClimateRuntime,
    video: browserAirVideoSystem,
    observation: globalQuietObservationSystem,
    continuity: objectContinuityRuntime,
    sound: ambientSoundRuntime,
    memory: runtimeMemoryLayer,
    mediaStructure: unifiedMediaCivilizationStructure,
  },
} as const;
