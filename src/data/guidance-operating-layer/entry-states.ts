import type { SessionWeatherId } from "./session-weather";
import { guidanceRouting } from "./guidance-routing";

export type GuidanceSoftRoute = { label: string; href: string };

export type ObjectCoordinateKey = keyof typeof guidanceRouting.objectCoordinates;

export type GuidanceEntryState = {
  id: string;
  /** Night-clickable state line — not a tag */
  label: string;
  weatherId: SessionWeatherId;
  noticingLines: readonly [string, string, string];
  softRoutes: readonly GuidanceSoftRoute[];
  /** Emotional coordinate for Objects gravity */
  objectCoordinateKey?: ObjectCoordinateKey;
};

/**
 * Twelve entry states — which feeling is nearest right now.
 */
export const guidanceEntryStates: readonly GuidanceEntryState[] = [
  {
    id: "something-unresolved",
    label: "Something unresolved",
    weatherId: "temporary-uncertainty",
    noticingLines: [
      "Unfinished business leaves a cooler patch in the air—no verdict required yet.",
      "The chair still turned toward the window like a sentence paused mid-line.",
      "You can carry the knot without naming it for anyone tonight.",
    ],
    softRoutes: [
      { label: "Draw a lot", href: "/rituals/draw-a-lot" },
      { label: "Moon block", href: "/rituals/moon-block" },
      { label: "Desk", href: "/desk" },
    ],
    objectCoordinateKey: "notebook",
  },
  {
    id: "low-energy",
    label: "Low energy",
    weatherId: "low-inner-noise",
    noticingLines: [
      "Even low wattage still warms the mug rim a fraction.",
      "The radiator ticks without asking you to perform gratitude.",
      "Rest can look like doing less without a spreadsheet for it.",
    ],
    softRoutes: [
      { label: "Daily guidance", href: "/rituals/daily-guidance" },
      { label: "Home harmony", href: "/rituals/home-harmony" },
      { label: "Objects", href: "/objects" },
    ],
    objectCoordinateKey: "nightCup",
  },
  {
    id: "difficult-decision",
    label: "A difficult decision",
    weatherId: "temporary-uncertainty",
    noticingLines: [
      "Two futures sit on the sill like mismatched socks—both ordinary.",
      "No clock here insists you choose before the kettle finishes.",
      "Paper can stay blank; the room does not grade hesitation.",
    ],
    softRoutes: [
      { label: "Moon block", href: "/rituals/moon-block" },
      { label: "Draw a lot", href: "/rituals/draw-a-lot" },
      { label: "Mail", href: "/mail" },
    ],
    objectCoordinateKey: "mapleBlock",
  },
  {
    id: "thinking-about-someone",
    label: "Thinking about someone",
    weatherId: "emotional-static",
    noticingLines: [
      "Their name can sit on the desk without being solved like homework.",
      "Street noise carries other kitchens—you are not the only one replaying.",
      "Distance does not need a moral; it is sometimes just geometry.",
    ],
    softRoutes: [
      { label: "Mail", href: "/mail" },
      { label: "Home harmony", href: "/rituals/home-harmony" },
      { label: "Daily guidance", href: "/rituals/daily-guidance" },
    ],
    objectCoordinateKey: "cottonSheets",
  },
  {
    id: "home-feels-heavy",
    label: "Home feels heavy",
    weatherId: "overfull-room",
    noticingLines: [
      "Corners hold more than light—surfaces honest about weight.",
      "A room can feel borrowed even when the lease has your name.",
      "Opening a window is sometimes the only ritual that fits.",
    ],
    softRoutes: [
      { label: "Home harmony", href: "/rituals/home-harmony" },
      { label: "Desk", href: "/desk" },
      { label: "Objects", href: "/objects" },
    ],
    objectCoordinateKey: "linenChair",
  },
  {
    id: "cant-settle-tonight",
    label: "Can’t settle tonight",
    weatherId: "quiet-evening",
    noticingLines: [
      "Sheets ask twice; the body answers slower than the thumb scroll.",
      "The ceiling keeps its opinion to itself—small mercy.",
      "Not settling is still a position in the room; nobody marks attendance.",
    ],
    softRoutes: [
      { label: "Daily guidance", href: "/rituals/daily-guidance" },
      { label: "Draw a lot", href: "/rituals/draw-a-lot" },
      { label: "Objects", href: "/objects" },
    ],
    objectCoordinateKey: "cottonSheets",
  },
  {
    id: "avoiding-something",
    label: "Avoiding something",
    weatherId: "drifting-attention",
    noticingLines: [
      "Avoidance has its own temperature—cooler near the inbox edge.",
      "The thing you skip still casts a shadow the lamp cone catches.",
      "Circumnavigating is a shape of movement, not a failure grade.",
    ],
    softRoutes: [
      { label: "Desk", href: "/desk" },
      { label: "Mail", href: "/mail" },
      { label: "Moon block", href: "/rituals/moon-block" },
    ],
    objectCoordinateKey: "oakTray",
  },
  {
    id: "too-much-noise-lately",
    label: "Too much noise lately",
    weatherId: "crowded-mind",
    noticingLines: [
      "Feeds stack like plates nobody agreed to wash.",
      "Quiet here is structural—plain type, no autoplay, no scoreboard.",
      "You can lower brightness and still be allowed to exist.",
    ],
    softRoutes: [
      { label: "Daily guidance", href: "/rituals/daily-guidance" },
      { label: "Home harmony", href: "/rituals/home-harmony" },
      { label: "Draw a lot", href: "/rituals/draw-a-lot" },
    ],
    objectCoordinateKey: "stoneSill",
  },
  {
    id: "returning-same-thought",
    label: "Returning to the same thought",
    weatherId: "crowded-mind",
    noticingLines: [
      "Loops are weather too—old web, old rain, same crack in the sill paint.",
      "The thought returns without a subscription fee; boring loyalty.",
      "Not every spiral needs a name tonight—sometimes orbit is enough data.",
    ],
    softRoutes: [
      { label: "Moon block", href: "/rituals/moon-block" },
      { label: "Desk", href: "/desk" },
      { label: "Daily guidance", href: "/rituals/daily-guidance" },
    ],
    objectCoordinateKey: "notebook",
  },
  {
    id: "emotionally-crowded",
    label: "Feeling emotionally crowded",
    weatherId: "overfull-room",
    noticingLines: [
      "Too many feelings in one square foot of chest—hall closet energy.",
      "Nothing here asks you to sort them into jars with labels.",
      "Breathing room can mean fewer sentences, not more insight.",
    ],
    softRoutes: [
      { label: "Home harmony", href: "/rituals/home-harmony" },
      { label: "Objects", href: "/objects" },
      { label: "Mail", href: "/mail" },
    ],
    objectCoordinateKey: "sandMug",
  },
  {
    id: "quieter-rhythm-needed",
    label: "Needing a quieter rhythm",
    weatherId: "low-inner-noise",
    noticingLines: [
      "Rhythm can shrink to kettle, radiator, one lamp cone—no manifesto.",
      "Slower is not lesser; the site loads the same whether you rush or not.",
      "Thumb distance to calm can be one scroll, not seventeen cards.",
    ],
    softRoutes: [
      { label: "Daily guidance", href: "/rituals/daily-guidance" },
      { label: "Objects", href: "/objects" },
      { label: "Desk", href: "/desk" },
    ],
    objectCoordinateKey: "nightCup",
  },
  {
    id: "perspective-not-advice",
    label: "Not wanting advice—just perspective",
    weatherId: "emotional-static",
    noticingLines: [
      "Perspective here is angled light, not a prescription pad.",
      "No one on this domain grades your coping stack.",
      "Sometimes the gentlest move is reading one paragraph and stopping.",
    ],
    softRoutes: [
      { label: "Mail", href: "/mail" },
      { label: "Draw a lot", href: "/rituals/draw-a-lot" },
      { label: "Daily guidance", href: "/rituals/daily-guidance" },
    ],
    objectCoordinateKey: "stoneSill",
  },
] as const;

export function getGuidanceEntryById(id: string): GuidanceEntryState | undefined {
  return guidanceEntryStates.find((s) => s.id === id);
}
