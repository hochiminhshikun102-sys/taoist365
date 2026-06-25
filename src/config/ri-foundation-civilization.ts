import { windkeepPassingObjects } from "@/config/windkeep-continuity";

export type QuietNote = {
  id: string;
  image: string;
  line: string;
  time: string;
  city?: string;
};

export type CourierState = {
  id: string;
  objectTitle: string;
  city: string;
  state: string;
  time: string;
};

export type LongStayObject = {
  id: string;
  objectTitle: string;
  image: string;
  stayed: string;
  place: string;
  note: string;
};

const baseQuietNoteLines = [
  ["Nothing urgent tonight.", "10:42 PM", "Portland"],
  ["The room softened after rain.", "After rain", "Lisbon"],
  ["Still beside the window.", "Late afternoon", "Kyoto"],
  ["The cup stayed warm a little longer.", "Morning", "Toronto"],
  ["Someone left the lamp low.", "8:17 PM", "Chicago"],
  ["A small shelf was cleared slowly.", "Sunday", "Vancouver"],
  ["The table held quiet after lunch.", "1:36 PM", "Copenhagen"],
  ["No one moved the chair back.", "Evening", "Melbourne"],
  ["The drawer opened without hurry.", "Before noon", "Brooklyn"],
  ["Window air crossed the papers.", "3:04 PM", "Seattle"],
  ["The towel dried in pale light.", "Morning", "Bath"],
  ["One page remained folded.", "Night", "Berlin"],
  ["The hallway kept its small dust.", "After work", "Dublin"],
  ["Tea leaves settled at the bottom.", "9:20 PM", "Seoul"],
  ["The sink was quiet again.", "Dusk", "Helsinki"],
  ["A key rested where it always does.", "7:11 AM", "Prague"],
  ["The book stayed open.", "Late night", "Amsterdam"],
  ["Light reached the floor slowly.", "Afternoon", "Austin"],
  ["The bag waited by the door.", "Before leaving", "New York"],
  ["A bowl dried beside the stove.", "After dinner", "Madrid"],
  ["The curtain moved once.", "Wind hour", "Athens"],
  ["Nothing needed fixing tonight.", "11:08 PM", "Oslo"],
  ["The shelf kept its shape.", "All day", "Stockholm"],
  ["A letter waited under a stone.", "Midday", "Nara"],
  ["The room was not reset.", "Saturday", "Florence"],
  ["Someone rinsed the glass and left.", "Morning", "Vienna"],
  ["The cloth remembered its fold.", "Laundry day", "Bristol"],
  ["Rain stayed on the shoes.", "Entryway", "Glasgow"],
  ["A pencil rolled into shade.", "Desk hour", "Denver"],
  ["The plant leaned toward quiet light.", "Noon", "Taipei"],
  ["The chair held a soft coat.", "After winter", "Montreal"],
  ["A small plate dried by itself.", "Breakfast", "Rome"],
  ["The mirror caught only window light.", "Late day", "Paris"],
  ["A note stayed under the bowl.", "Evening", "Boston"],
  ["The room kept breathing after everyone left.", "Night", "Auckland"],
  ["Still here, still plain.", "Today", "Shanghai"],
] as const;

const noteLineParts = [
  "Still beside the blue cup.",
  "Rain stayed longer today.",
  "The shelf looked the same tonight.",
  "A folded cloth waited by the chair.",
  "The desk light softened after dinner.",
  "Nothing moved near the window.",
  "The room kept its small quiet.",
  "A cup dried beside the sink.",
  "The curtain moved once.",
  "Paper stayed under the bowl.",
  "The lamp was left low.",
  "A warmer corner after rain.",
] as const;

const noteTimes = [
  "Morning",
  "After lunch",
  "Late afternoon",
  "Evening",
  "10:14 PM",
  "After rain",
  "Before leaving",
  "Sunday",
  "Dusk",
  "Night",
  "All day",
  "Window hour",
] as const;

const noteCities = [
  "Portland",
  "Lisbon",
  "Kyoto",
  "Toronto",
  "Chicago",
  "Vancouver",
  "Copenhagen",
  "Melbourne",
  "Brooklyn",
  "Seattle",
  "Bath",
  "Berlin",
  "Dublin",
  "Seoul",
  "Helsinki",
  "Prague",
] as const;

function buildQuietNoteLines(count: number): readonly [string, string, string][] {
  return Array.from({ length: count }, (_, index) => [
    noteLineParts[(index * 5) % noteLineParts.length],
    noteTimes[(index * 7) % noteTimes.length],
    noteCities[(index * 3) % noteCities.length],
  ]);
}

const quietNoteLines = [...baseQuietNoteLines, ...buildQuietNoteLines(300)] as const;

const quietNoteImages = [
  "1",
  "1.1",
  "10",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108-1",
  "108-2",
  "109",
  "11",
  "12",
  "120",
  "121-1",
  "122",
  "124",
  "125",
  "127",
  "128",
  "129",
  "129-1",
  "129b-1",
  "129b-2",
  "13",
  "130",
  "131",
  "131-2",
  "132",
  "133",
  "134-1",
  "134-2",
  "135-1",
  "135-2",
  "136-1",
] as const;

export const quietNotes: readonly QuietNote[] = quietNoteLines.map(([line, time, city], index) => ({
  id: `quiet-note-${String(index + 1).padStart(2, "0")}`,
  image: `/objects-derived/${quietNoteImages[index % quietNoteImages.length]}-placement.webp`,
  line,
  time,
  city,
}));

const baseDailyVerses = [
  "The light stayed longer today.",
  "Nothing needed fixing tonight.",
  "Some things return quietly.",
  "The window kept a little wind.",
  "A cup waited beside the sink.",
  "The room did not ask for much.",
  "Rain made the table slower.",
  "The shelf held its small order.",
  "Evening arrived without pressure.",
  "One drawer stayed half open.",
  "The chair kept the shape of a coat.",
  "Paper moved when the door opened.",
  "The floor cooled before night.",
  "Tea was enough for the hour.",
  "A quiet object remained useful.",
  "The browser can stay open.",
  "Morning came in without announcement.",
  "The lamp softened the corner.",
  "No message needed answering yet.",
  "The room kept its ordinary weather.",
  "A small thing found its place.",
  "The page breathed and stayed.",
  "The glass dried in pale light.",
  "Some silence has a home shape.",
  "The table was cleared slowly.",
  "Wind crossed the window once.",
  "The day ended without display.",
  "A note can wait.",
  "The shelf looked lived in.",
  "Nothing hurried the room.",
  "The linen kept a faint fold.",
  "Light rested on the edge.",
  "A bowl stayed near the stove.",
  "The hour became easier.",
  "The door closed softly.",
  "A plain thing continued.",
  "The night stayed low.",
  "The desk held only enough.",
  "A room can be left alone.",
  "The object did not need a story.",
  "Rain returned to the window.",
  "The browser remembered the air.",
  "Someone was here, lightly.",
  "The page did not brighten itself.",
  "A quiet line was enough.",
  "The cup cooled in its own time.",
  "The room kept the pause.",
  "Tomorrow can arrive plainly.",
] as const;

const verseSubjects = ["light", "room", "desk", "window", "table", "rain", "wind", "shelf", "evening", "morning", "paper", "cup"] as const;
const verseMotions = ["stayed", "softened", "waited", "returned", "cooled", "settled", "opened", "rested", "moved slowly", "became easier"] as const;
const verseClosings = ["today.", "tonight.", "after rain.", "near the window.", "without hurry.", "in its own time.", "beside the room.", "before night."] as const;

function buildDailyVerses(count: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    const subject = verseSubjects[index % verseSubjects.length];
    const motion = verseMotions[(index * 3) % verseMotions.length];
    const closing = verseClosings[(index * 5) % verseClosings.length];
    return `The ${subject} ${motion} ${closing}`;
  });
}

export const dailyVerses = [...baseDailyVerses, ...buildDailyVerses(365)] as const;

const baseCourierStates = [
  ["Somewhere in Prague", "Still traveling", "after winter"],
  ["Near Lisbon", "Waiting quietly", "two evenings"],
  ["In a small room in Kyoto", "Arrived softly", "this week"],
  ["Between Toronto and Montreal", "Still moving", "since Monday"],
  ["Somewhere in Chicago", "Resting before reply", "late spring"],
  ["Near Vancouver", "Passed after rain", "last night"],
  ["In Copenhagen", "Waiting by a window", "morning"],
  ["Outside Melbourne", "Still traveling", "three days"],
  ["In Brooklyn", "Arrived without noise", "yesterday"],
  ["Near Seattle", "Waiting quietly", "after lunch"],
  ["Somewhere in Bath", "Still wrapped", "Sunday"],
  ["In Berlin", "Passed after winter", "early May"],
] as const;

const courierCities = [
  "Somewhere in Prague",
  "Near Lisbon",
  "In a small room in Kyoto",
  "Between Toronto and Montreal",
  "Somewhere in Chicago",
  "Near Vancouver",
  "In Copenhagen",
  "Outside Melbourne",
  "In Brooklyn",
  "Near Seattle",
  "Somewhere in Bath",
  "In Berlin",
] as const;

const courierStateLines = [
  "Still traveling",
  "Waiting quietly",
  "Arrived softly",
  "Passed after winter",
  "Resting before reply",
  "Still wrapped",
  "Moving between rooms",
  "Held near a window",
  "Paused after rain",
  "Left with a plain note",
] as const;

const courierTimes = ["this week", "after winter", "two evenings", "since Monday", "morning", "late spring", "yesterday", "Sunday"] as const;

function buildCourierStates(count: number): readonly [string, string, string][] {
  return Array.from({ length: count }, (_, index) => [
    courierCities[index % courierCities.length],
    courierStateLines[(index * 3) % courierStateLines.length],
    courierTimes[(index * 5) % courierTimes.length],
  ]);
}

const courierStates = [...baseCourierStates, ...buildCourierStates(120)] as const;

export const courierStatesLayer: readonly CourierState[] = courierStates.map(([city, state, time], index) => ({
  id: `courier-${String(index + 1).padStart(2, "0")}`,
  objectTitle: windkeepPassingObjects[index]?.title ?? "A quiet object",
  city,
  state,
  time,
}));

const longStayLines = [
  "Stayed here for 214 days",
  "Never left the room",
  "Still beside the shelf",
  "Stayed through spring",
  "Kept near the window",
  "Held the same corner",
  "Stayed after the move",
  "Still under the lamp",
  "Rested through winter",
  "Stayed beside the books",
  "Kept its ordinary place",
  "Still in the quiet drawer",
] as const;

const longStayNotes = [
  "No one needed to move it.",
  "It became part of the room without asking.",
  "The shelf looked wrong without it.",
  "It stayed useful in a small way.",
  "The room aged around it.",
  "It kept the corner gentle.",
  "Nothing about it asked to be refreshed.",
  "It became familiar before it became noticed.",
  "The season changed; it remained.",
  "It held a little dust and kept going.",
  "Its value was staying ordinary.",
  "It waited without becoming display.",
] as const;

export const longStayObjects: readonly LongStayObject[] = windkeepPassingObjects.slice(12, 144).map((object, index) => ({
  id: `long-stay-${String(index + 1).padStart(2, "0")}`,
  objectTitle: object.title,
  image: object.image.src,
  stayed: index < 12 ? longStayLines[index] : `${longStayLines[index % longStayLines.length]} / ${180 + index} days`,
  place: object.city,
  note: longStayNotes[index % longStayNotes.length],
}));

export type RoomResidue = {
  id: string;
  line: string;
  place: string;
};

export type SmallHumanMoment = {
  id: string;
  line: string;
  time: string;
};

export type PassingWeather = {
  id: string;
  line: string;
  air: string;
};

export type UnfinishedLetter = {
  id: string;
  fragment: string;
  time: string;
};

export type BrowserAirVideo = {
  id: string;
  slot: "hero" | "background" | "mobile" | "atmosphere";
  source: string;
  poster: string;
  climate: string;
};

const roomResidueLines = [
  "folded blanket near the chair",
  "desk light after rain",
  "cup near the window",
  "soft shelf corner",
  "evening curtain movement",
  "paper left under a bowl",
  "low lamp beside the books",
  "linen edge on the table",
  "quiet dust on a tray",
  "chair shadow after dinner",
] as const;

export const roomResidues: readonly RoomResidue[] = Array.from({ length: 120 }, (_, index) => ({
  id: `room-residue-${String(index + 1).padStart(3, "0")}`,
  line: roomResidueLines[index % roomResidueLines.length],
  place: noteCities[(index * 3) % noteCities.length],
}));

const humanMomentLines = [
  "someone stayed longer tonight",
  "a quieter morning than yesterday",
  "still hearing rain outside",
  "the room softened slowly",
  "someone left the cup near the lamp",
  "a chair was not pushed back",
  "the window stayed open a little",
  "someone folded the cloth twice",
  "the desk was cleared without hurry",
  "a note was left for later",
] as const;

export const smallHumanMoments: readonly SmallHumanMoment[] = Array.from({ length: 120 }, (_, index) => ({
  id: `small-human-moment-${String(index + 1).padStart(3, "0")}`,
  line: humanMomentLines[index % humanMomentLines.length],
  time: noteTimes[(index * 5) % noteTimes.length],
}));

const passingWeatherLines = [
  "colder light tonight",
  "softer wind after rain",
  "warmer than yesterday",
  "slower afternoon air",
  "pale light near the shelf",
  "rain quieted the window",
  "clearer air after noon",
  "low evening warmth",
  "cooler room before sleep",
  "wind stayed near the curtain",
] as const;

export const passingWeather: readonly PassingWeather[] = Array.from({ length: 120 }, (_, index) => ({
  id: `passing-weather-${String(index + 1).padStart(3, "0")}`,
  line: passingWeatherLines[index % passingWeatherLines.length],
  air: ["wind", "rain", "light", "room air", "evening", "window"][(index * 2) % 6],
}));

const unfinishedLetterFragments = [
  "unfinished note under a glass",
  "letter never sent",
  "forgotten draft beside the lamp",
  "folded paper fragment",
  "half line left on the desk",
  "plain card without an address",
  "a reply started too late",
  "paper kept for another morning",
  "three words left in pencil",
  "an envelope waiting open",
] as const;

export const unfinishedLetters: readonly UnfinishedLetter[] = Array.from({ length: 72 }, (_, index) => ({
  id: `unfinished-letter-${String(index + 1).padStart(3, "0")}`,
  fragment: unfinishedLetterFragments[index % unfinishedLetterFragments.length],
  time: noteTimes[(index * 7) % noteTimes.length],
}));

export const browserAirVideoRuntime: readonly BrowserAirVideo[] = [
  {
    id: "hero-window-light",
    slot: "hero",
    source: "/video/browser-air/window-light.mp4",
    poster: "/homepage-hero/windkeep-lantern-sea.png",
    climate: "muted window light, slow room air, no cuts",
  },
  {
    id: "curtain-wind-mobile",
    slot: "mobile",
    source: "/video/browser-air/curtain-wind-mobile.mp4",
    poster: "/brand/production/homepage/windkeep-section/mobile-passage.jpg",
    climate: "light curtain movement for handheld quiet rooms",
  },
  {
    id: "glass-reflection",
    slot: "background",
    source: "/video/browser-air/glass-reflection.mp4",
    poster: "/brand/production/homepage/windkeep-section/passing-things-wide.jpg",
    climate: "slow glass reflection and pale air",
  },
  {
    id: "ocean-light",
    slot: "atmosphere",
    source: "/video/browser-air/ocean-light.mp4",
    poster: "/homepage-hero/sandong-writing-sea-focus.png",
    climate: "soft ocean light with slow room pacing",
  },
] as const;
