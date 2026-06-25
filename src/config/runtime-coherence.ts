import {
  browserAirVideoRuntime,
  courierStatesLayer,
  dailyVerses,
  longStayObjects,
  passingWeather,
  quietNotes,
  roomResidues,
  smallHumanMoments,
  unfinishedLetters,
} from "@/config/ri-foundation-civilization";
import { browserAirCivilizationRoot, browserAirPalette, commerceConstitution, globalEmotionalPrinciple, windDefinition } from "@/config/browser-air-constitution";

export type RuntimeCoherenceLine = {
  id: string;
  label: string;
  intention: string;
  restraint: string;
};

export type AmbientRuntimeSlot = {
  id: string;
  label: string;
  source: string;
  use: string;
  volume: "barely-there" | "room-low" | "off-by-default";
};

export type MediaCivilizationKind =
  | "hero"
  | "object"
  | "shelf"
  | "atmosphere"
  | "residue"
  | "mobile"
  | "pc"
  | "AI"
  | "real"
  | "emotional"
  | "continuity"
  | "story";

export const globalRuntimeCoherence: readonly RuntimeCoherenceLine[] = [
  {
    id: "section-spacing",
    label: "Section spacing",
    intention: "Sections keep enough distance for the page to breathe before the next object appears.",
    restraint: "No stacked pressure, no dense commerce rhythm, no repeated block urgency.",
  },
  {
    id: "scroll-pacing",
    label: "Scroll pacing",
    intention: "The page opens as a room: image, pause, text, then another quiet surface.",
    restraint: "No rapid reveal rhythm, no forced momentum, no attention hook.",
  },
  {
    id: "paragraph-rhythm",
    label: "Paragraph rhythm",
    intention: "Short lines and medium leading keep reading close to air rather than promotion.",
    restraint: "No pitch paragraphs, no manifesto density, no slogan stacking.",
  },
  {
    id: "pressure-balance",
    label: "Visual pressure",
    intention: "Wind Blue, Ivory Living, low contrast, and quiet shadows stay shared across pages.",
    restraint: "No hard panels, no heavy depth, no theatrical atmosphere.",
  },
];

export const browserAirConstitutionRuntime = {
  root: browserAirCivilizationRoot,
  palette: browserAirPalette,
  wind: windDefinition,
  commerce: commerceConstitution,
  globalEmotion: globalEmotionalPrinciple,
} as const;

export const browserAirMotionRuntime: readonly RuntimeCoherenceLine[] = [
  {
    id: "slow-drift",
    label: "Slow drift",
    intention: "Surfaces can move a few pixels over long durations, like air in a room.",
    restraint: "No spectacle, no large parallax, no fast transitions.",
  },
  {
    id: "soft-fade",
    label: "Soft fade",
    intention: "Opacity changes are slow enough to feel like light changing, not an interface event.",
    restraint: "No pop-in, no bounce, no spotlight behavior.",
  },
  {
    id: "shadow-breathing",
    label: "Shadow breathing",
    intention: "Object shadows can soften and return so images feel long-open.",
    restraint: "No hover lift that turns objects into cards to chase.",
  },
  {
    id: "glass-reflection",
    label: "Glass reflection",
    intention: "A small reflective layer may pass over hero and object media.",
    restraint: "No glossy luxury sheen, no synthetic shine.",
  },
];

export const unifiedTypographyRuntime: readonly RuntimeCoherenceLine[] = [
  {
    id: "title-weight",
    label: "Title weight",
    intention: "Display type stays light, close, and human, with hierarchy carried by space.",
    restraint: "No loud headline contrast, no campaign scale inside small panels.",
  },
  {
    id: "reading-density",
    label: "Reading density",
    intention: "Body copy keeps long leading, short measure, and ordinary language.",
    restraint: "No sales copy density, no concept explanation load.",
  },
  {
    id: "quiet-hierarchy",
    label: "Quiet hierarchy",
    intention: "Labels stay small and supportive; object names and room lines carry the page.",
    restraint: "No badge-heavy system language, no operational display.",
  },
];

export const imageClimateRuntime: readonly RuntimeCoherenceLine[] = [
  {
    id: "airy-blue-balance",
    label: "Airy blue balance",
    intention: "Images lean toward locked Wind Blue, sunlight, cloud air, and soft browser openness.",
    restraint: "No dark mystic color, no high-saturation retail glow.",
  },
  {
    id: "linen-warmth",
    label: "Linen warmth",
    intention: "Mobile and room details keep locked Ivory Living so objects feel sun-warmed and handheld.",
    restraint: "No cold gallery white, no beige monotone.",
  },
  {
    id: "shadow-softness",
    label: "Shadow softness",
    intention: "Shadows should feel like room light, not premium staging.",
    restraint: "No luxury black edge, no hard contrast crop.",
  },
  {
    id: "real-image-first",
    label: "Real image first",
    intention: "Real object evidence anchors atmosphere media before any generated room light is used.",
    restraint: "Generated atmosphere cannot replace real presence.",
  },
];

export const browserAirVideoSystem = {
  slots: browserAirVideoRuntime,
  playback: {
    muted: true,
    autoPlay: true,
    loop: true,
    playsInline: true,
    autoPauseWhenHidden: true,
    mobilePrefersPosterFirst: true,
    bandwidth: "Prefer short, compressed loops; keep poster images useful when video is paused.",
  },
  climate: [
    "window light moving slowly",
    "curtain motion without cuts",
    "glass reflection in pale air",
    "ocean light that can stay open in a tab",
    "rain or room silence without music-player presence",
  ] as const,
} as const;

export const globalQuietObservationSystem: readonly RuntimeCoherenceLine[] = [
  {
    id: "upload-flow",
    label: "Observation upload",
    intention: "A real object can be photographed, normalized, and attached to one object_id.",
    restraint: "No operations-center tone, no growth surface, no ranking.",
  },
  {
    id: "object-normalization",
    label: "Object normalization",
    intention: "Uploads become object image, shelf image, pc crop, mobile crop, atmosphere, and story surfaces.",
    restraint: "No duplicate object record, no scattered asset pile.",
  },
  {
    id: "emotional-metadata",
    label: "Emotional metadata",
    intention: "City, material, room feeling, residue, weather, and previous room travel with the object.",
    restraint: "No dramatic backstory, no synthetic mythology.",
  },
  {
    id: "trust-compatibility",
    label: "Trust compatibility",
    intention: "Every upload can attach source notes, real arrival evidence, and quiet confirmations.",
    restraint: "No fake existence; atmosphere remains support, not proof.",
  },
];

export const objectContinuityRuntime: readonly RuntimeCoherenceLine[] = [
  {
    id: "previous-holder",
    label: "Previous holder",
    intention: "Objects may remember a plain previous holder note when it helps the room feel lived in.",
    restraint: "No collector drama, no rarity language.",
  },
  {
    id: "previous-room",
    label: "Previous room",
    intention: "A room, shelf, window, or table can remain attached as quiet context.",
    restraint: "No invented epic path, no travel performance.",
  },
  {
    id: "previous-weather",
    label: "Previous weather",
    intention: "Weather gives the object a low-frequency memory of time passing.",
    restraint: "No symbolic reading, no mystic weather coding.",
  },
  {
    id: "passage-memory",
    label: "Passage memory",
    intention: "Courier, Long Stay, Quiet Receiving, and nearby objects become one continuity chain.",
    restraint: "No timeline interface, no shipping-system posture.",
  },
];

export const arrivalResidueRuntime = {
  enabled: true,
  reservedSlots: ["object near shelf", "object beside window", "room placement", "evening light", "real-life residue"] as const,
  restraint: "Arrival traces remain private object evidence and room memory, not a social surface.",
} as const;

export const ambientSoundRuntime: readonly AmbientRuntimeSlot[] = [
  {
    id: "distant-rain",
    label: "Distant rain",
    source: "/audio/browser-air/distant-rain.mp3",
    use: "A very low room layer for rain pages and evening object surfaces.",
    volume: "off-by-default",
  },
  {
    id: "ocean-air",
    label: "Ocean air",
    source: "/audio/browser-air/ocean-air.mp3",
    use: "Soft coastal air for hero atmosphere when the page needs less visual weight.",
    volume: "off-by-default",
  },
  {
    id: "room-tone",
    label: "Room tone",
    source: "/audio/browser-air/room-tone.mp3",
    use: "Barely present interior air for long-open object pages.",
    volume: "barely-there",
  },
  {
    id: "paper-movement",
    label: "Paper movement",
    source: "/audio/browser-air/paper-movement.mp3",
    use: "Short, quiet texture for notes and unfinished letters.",
    volume: "off-by-default",
  },
];

export const runtimeMemoryLayer = {
  quietNotes: quietNotes.slice(0, 18).map((note) => note.id),
  dailyVerses: dailyVerses.slice(0, 24),
  courier: courierStatesLayer.slice(0, 18).map((state) => state.id),
  longStay: longStayObjects.slice(0, 18).map((object) => object.id),
  weather: passingWeather.slice(0, 18).map((weather) => weather.id),
  roomResidues: roomResidues.slice(0, 18).map((residue) => residue.id),
  humanMoments: smallHumanMoments.slice(0, 18).map((moment) => moment.id),
  unfinishedLetters: unfinishedLetters.slice(0, 12).map((letter) => letter.id),
  purpose: "Pages can reference nearby notes, weather, courier states, long stays, room traces, and letters without creating a public stream.",
} as const;

export const unifiedMediaCivilizationStructure: readonly MediaCivilizationKind[] = [
  "hero",
  "object",
  "shelf",
  "atmosphere",
  "residue",
  "mobile",
  "pc",
  "AI",
  "real",
  "emotional",
  "continuity",
  "story",
] as const;
