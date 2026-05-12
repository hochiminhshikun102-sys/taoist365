export type CmsSurfaceKind = "page" | "collection" | "object" | "media";

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
    publicEnergy: "Circulation without marketplace behavior.",
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
  { key: "subtitle", label: "Subtitle", role: "Short nearby line, not a sales hook.", required: false },
  { key: "atmosphereLine", label: "Atmosphere line", role: "One restrained room line.", required: false },
  { key: "materials", label: "Materials", role: "Material truth before styling language.", required: true },
  { key: "dimensions", label: "Dimensions", role: "Useful scale without product-page aggression.", required: true },
  { key: "placementSuggestion", label: "Placement suggestion", role: "Where the object can quietly live.", required: false },
  { key: "collection", label: "Collection", role: "One collection relation.", required: true },
  { key: "media", label: "Media", role: "Images or video that reduce pressure.", required: false },
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
];

export const quietUploadWorkflow: readonly QuietUploadStep[] = [
  {
    id: "media",
    label: "Choose media",
    action: "Select image or video and leave it visible before attaching it.",
    check: "Does it feel like a room object, not a product asset?",
  },
  {
    id: "object",
    label: "Create object",
    action: "Name the object plainly and fill only fields that help a human place it.",
    check: "No SKU pile, no purchase pressure, no launch wording.",
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
] as const;
