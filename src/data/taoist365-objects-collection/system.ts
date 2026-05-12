import type { LivingPhotoRef } from "@/data/living-visuals/system";

function p(fileName: string): string {
  return `/objects-living/${fileName}`;
}

/**
 * First real Taoist365 object batch - lived-in pieces, mail-only correspondence.
 * Not a SKU wall: stable anchors, small-batch honesty, American-adjacent ordinary rooms.
 */
export interface Taoist365ObjectPiece {
  id: string;
  /** Short shelf label - not a product category tree */
  catalogLine: string;
  title: string;
  livedWithPresence: string;
  memoryStory: string;
  roomPlacement: string;
  roomTrace: string;
  necessityNote: string;
  softCorrespondence: string;
  /** Honest batch language - no countdown, no "drop" */
  editionNote: string;
  photo: LivingPhotoRef;
}

export const taoist365ObjectsCatalog: readonly Taoist365ObjectPiece[] = [
  {
    id: "taoist365-desk-mug-sand",
    catalogLine: "Cup - desk and kitchen",
    title: "Sand stoneware desk mug",
    livedWithPresence:
      "Rim slightly uneven where the kiln last argued with gravity; glaze pooled thicker on one side. It already looks like something borrowed from a working apartment, not a gift box.",
    memoryStory:
      "You reach for it before checking email because the weight in hand is the first honest vote of the morning. It remembers oil from thumbs and the ring inside from yesterday's pour.",
    roomPlacement:
      "Sits nearer the keyboard than the sink; American rental desk, LED mixed with whatever the window still owes.",
    roomTrace:
      "Warmth measured in sips, not metrics; cooling accepted without throwing the day away.",
    necessityNote:
      "When every other cup feels like branding, you may need one plain cylinder that agrees to scuff.",
    softCorrespondence:
      "Write which line (sand stoneware desk mug) and your city; humans reply with what is available now, not a cart.",
    editionNote: "Thrown in small runs; glaze varies batch to batch; no matching-set theater.",
    photo: {
      src: p("tea-gift-box.jpg"),
      alt: "Stoneware mug on kitchen counter as if someone stepped away minutes ago",
      caption:
        "Someone left mid-sip; rim stain, counter clutter honest; not styled emptiness, not display polish.",
      credit: "Studio Republic",
      creditHref: "https://unsplash.com/@studiolighthouse?utm_source=taoist365&utm_medium=referral",
    },
  },
  {
    id: "taoist365-linen-napkin-raw",
    catalogLine: "Linen - table and hands",
    title: "Raw-edge linen napkin (single)",
    livedWithPresence:
      "Hem wanders; one corner softened first from being grabbed while hot. It never wanted to be a showroom fold.",
    memoryStory:
      "You keep it because paper towels lie about being temporary. Linen admits laundry and still comes back uneven.",
    roomPlacement:
      "Crumpled beside a laptop, under a bowl, or in a rental drawer that never quite closes flat.",
    roomTrace:
      "Absorbs spill and pride alike; ordinary American kitchen forgiveness.",
    necessityNote:
      "When you want one cloth that can look worse over time without feeling like failure.",
    softCorrespondence:
      "Mail asks for the raw-edge linen napkin; say natural or oat if you care about tone; we answer in sentences, not SKUs.",
    editionNote: "Cut from the same bolt for a while; edges fray on purpose.",
    photo: {
      src: p("crystal-window-plant.jpg"),
      alt: "Rumpled linen fabric as if draped from a chair back after someone sat down tired",
      caption:
        "Wash-fatigue and curl that forgot the drawer; linen tired many cycles, not distressed for camera.",
      credit: "Naomi Hebert",
      creditHref: "https://unsplash.com/@naomi?utm_source=taoist365&utm_medium=referral",
    },
  },
  {
    id: "taoist365-oak-tray-narrow",
    catalogLine: "Wood - counter",
    title: "Narrow white-oak catch tray",
    livedWithPresence:
      "Grain rises where oil from keys and coins met it first. Corners softened because apartments bump.",
    memoryStory:
      "It became the honest landing for receipts, lip balm, and the one screw you will need later. Trays earn their scratches.",
    roomPlacement:
      "Kitchen counter beside the stove plug, or hall table under mail you will open Sunday.",
    roomTrace:
      "Small containment without pretending the house is organized.",
    necessityNote:
      "When flat surfaces lie about being empty, this one admits they collect.",
    softCorrespondence:
      "Name narrow white-oak catch tray in mail; we send dimensions in reply, not a checkout link.",
    editionNote: "Oiled by hand here; color shifts with humidity like real wood should.",
    photo: {
      src: p("incense-box.jpg"),
      alt: "Kitchen counter with everyday clutter and daylight; keys and receipts where hands emptied",
      caption:
        "Tray six months into default key clang; oil halos, coin ghosts unmoved, infrastructure not vignette.",
      credit: "Becca Tapert",
      creditHref: "https://unsplash.com/@beccatapert?utm_source=taoist365&utm_medium=referral",
    },
  },
  {
    id: "taoist365-stone-smoke-dish",
    catalogLine: "Stone - corner and sill",
    title: "Flat river-stone smoke dish",
    livedWithPresence:
      "Ash sits gray on gray; the stone does not polish itself for guests. Cool to the touch long after the last ember.",
    memoryStory:
      "You keep it because smell is the slowest argument, and this dish never turned smoke into performance.",
    roomPlacement:
      "Windowsill in a studio, or tile ledge beside a kettle where ventilation is honest.",
    roomTrace:
      "Proof something stopped before the room demanded more drama.",
    necessityNote:
      "When incense or palo guilt needs a humble seat that is not a souvenir temple.",
    softCorrespondence:
      "Ask after the flat river-stone smoke dish; say if you need a felt pad for rental counters.",
    editionNote: "Stones vary; each picked for weight and flatness, not matching pairs.",
    photo: {
      src: p("incense-box.jpg"),
      alt: "Small candle or wax warmth on a side table in dim indoor light",
      caption:
        "Sill two-tone paint read; object sat seasons through blinds nobody adjusted for Instagram.",
      credit: "Kate Hliznitsova",
      creditHref: "https://unsplash.com/@katehliznitsova?utm_source=taoist365&utm_medium=referral",
    },
  },
  {
    id: "taoist365-layflat-notebook",
    catalogLine: "Paper - desk",
    title: "Layflat lined notebook (oat cover)",
    livedWithPresence:
      "Spine cracked where panic and gentleness took turns writing. Pages lift slightly; layflat means honest gravity, not marketing.",
    memoryStory:
      "You return to the same margin because unfinished thinking deserves a physical seat, not a cloud icon.",
    roomPlacement:
      "Open beside a mug on a desk that is also a dining table in a one-bedroom.",
    roomTrace:
      "Dog-ears and coffee rings as continuity, not clutter charges.",
    necessityNote:
      "When digital notes feel like they belong to work, not to you.",
    softCorrespondence:
      "Mail names layflat lined notebook oat; say if you want lines or blank; we confirm what is left on the shelf.",
    editionNote: "Printed in short runs; cover scuffs in transit are ordinary.",
    photo: {
      src: p("tea-gift-box.jpg"),
      alt: "Notebook cracked open mid-page on desk as if work stopped abruptly",
      caption:
        "Swollen spine, uneven stack; paper remembers quarters without sepia filter.",
      credit: "Jan Kahanek",
      creditHref: "https://unsplash.com/@honzaouk?utm_source=taoist365&utm_medium=referral",
    },
  },
  {
    id: "taoist365-cotton-letter-sheets",
    catalogLine: "Paper - mail and drawer",
    title: "Cotton letter sheets (half-fold, pack of twelve)",
    livedWithPresence:
      "Edges feather where scissors hurried once. Cotton holds ink slower than laser printer paper; good for sentences that need to arrive softer.",
    memoryStory:
      "You keep a pack because some thoughts still deserve postage weight, not a thread.",
    roomPlacement:
      "Drawer beside stamps, or under a laptop where drafts wait for courage.",
    roomTrace:
      "Correspondence as residue, not productivity.",
    necessityNote:
      "When you owe someone a letter that should feel like a room, not a notification.",
    softCorrespondence:
      "Ask quietly for cotton letter sheets half-fold; we note paper weight in reply.",
    editionNote: "Same mill for months; when stock thins, the page says so plainly.",
    photo: {
      src: p("crystal-window-plant.jpg"),
      alt: "Open book or paper resting on fabric in soft indoor light",
      caption:
        "Drawer-thin pack imagination; feather stack, ghost ink sediment, postage weight left alone.",
      credit: "Patrick Tomasso",
      creditHref: "https://unsplash.com/@impatrickt?utm_source=taoist365&utm_medium=referral",
    },
  },
  {
    id: "taoist365-night-teacup",
    catalogLine: "Cup - night desk",
    title: "Short-handle tea cup (crackle glaze)",
    livedWithPresence:
      "Glaze hairlines where heat and cooling argued; still holds water without performance. Handle worn where one finger always leads.",
    memoryStory:
      "It stayed because night work wanted warmth without the mug that pretends to be a brand.",
    roomPlacement:
      "Beside a laptop after midnight in an apartment where the radiator ticks.",
    roomTrace:
      "Cooling tea as permission to stop rehearsing the same paragraph.",
    necessityNote:
      "When you need a small cup that agrees to sit through indecision without asking for a refill app.",
    softCorrespondence:
      "Write short-handle tea cup crackle glaze; mention if you sip left-handed; we note handle clearance.",
    editionNote: "Kiln variation expected; crackle deepens with use.",
    photo: {
      src: p("incense-box.jpg"),
      alt: "Desk with laptop, one lamp, mug beside trackpad; night energy unfinished",
      caption:
        "Half-year glow-adjacent fiction; stacked rings, crackle cartography, handle wear frozen.",
      credit: "Andrew Neel",
      creditHref: "https://unsplash.com/@andrewneel?utm_source=taoist365&utm_medium=referral",
    },
  },
  {
    id: "taoist365-maple-paperweight",
    catalogLine: "Wood - sill and stack",
    title: "Maple block paperweight (hand-oiled)",
    livedWithPresence:
      "Corners eased where it slid against glass and paper stacks. Oil darkened where palms worried it during calls.",
    memoryStory:
      "It keeps drafts from pretending to fly; weight as kindness, not authority.",
    roomPlacement:
      "Windowsill holding receipts down, or desk corner pinning one honest to-do list.",
    roomTrace:
      "Gravity without lecture.",
    necessityNote:
      "When you want one honest object that admits apartments have wind.",
    softCorrespondence:
      "Mail asks for maple block paperweight; say if you need felt bottom for painted desks.",
    editionNote: "Cut from short maple lengths; grain never matches between two blocks.",
    photo: {
      src: p("crystal-window-plant.jpg"),
      alt: "Sunlight across interior floor and furniture legs in a rental apartment",
      caption:
        "Oil moons from months of palms; same stack silhouette; corners eased without patina sermon.",
      credit: "Francesca Tosolini",
      creditHref: "https://unsplash.com/@francescotosolini?utm_source=taoist365&utm_medium=referral",
    },
  },
];
