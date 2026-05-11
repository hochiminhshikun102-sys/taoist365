export type QuietCivilizationRoomSeed = {
  id: string;
  name: string;
  cnName: string;
  atmosphere: string;
  temperament: "warm" | "distant" | "rainy" | "quiet" | "unresolved" | "soft" | "nightLike" | "lightFilled";
  gesture: string;
  continuityTrace: string;
};

export const firstQuietCivilizationRoomSeeds = [
  {
    id: "empty-chair",
    name: "The Empty Chair",
    cnName: "空椅子房间",
    atmosphere: "chair-side silence, recently left warmth, and a little space for someone not present",
    temperament: "quiet",
    gesture: "notice the chair without needing to sit down",
    continuityTrace: "The chair remains slightly turned toward the room.",
  },
  {
    id: "rain-holding-room",
    name: "Rain Holding Room",
    cnName: "雨停留房间",
    atmosphere: "rain-after quietness, softened window light, and weather that does not need to pass quickly",
    temperament: "rainy",
    gesture: "wait with the rain until it stops insisting",
    continuityTrace: "A little rain remains in the air after the page changes.",
  },
  {
    id: "lantern-weather",
    name: "Lantern Weather",
    cnName: "灯天气房间",
    atmosphere: "low light, night air, and a lantern that behaves more like weather than display",
    temperament: "nightLike",
    gesture: "look at the light without asking it to brighten",
    continuityTrace: "The lantern keeps a small weather around nearby rooms.",
  },
  {
    id: "tea-steam-room",
    name: "Tea Steam Room",
    cnName: "茶汽房间",
    atmosphere: "steam-softened air, ordinary warmth, and a small pause before words return",
    temperament: "warm",
    gesture: "let the steam thin before moving on",
    continuityTrace: "Steam fades into the browser air without becoming an effect.",
  },
  {
    id: "half-remembered-hall",
    name: "Half-Remembered Hall",
    cnName: "半遗忘房间",
    atmosphere: "almost-forgotten traces, unfinished recall, and soft memory without archive behavior",
    temperament: "unresolved",
    gesture: "recognize something without naming it",
    continuityTrace: "A remembered edge stays present and incomplete.",
  },
  {
    id: "wind-passage",
    name: "Wind Passage",
    cnName: "风经过房间",
    atmosphere: "moving air, open edges, and wind that has already crossed another room",
    temperament: "distant",
    gesture: "watch the wind pass without following it",
    continuityTrace: "Wind carries a quiet residue from the previous room.",
  },
  {
    id: "quiet-correspondence",
    name: "Quiet Correspondence",
    cnName: "未寄出房间",
    atmosphere: "unsent words, desk-side patience, and correspondence without social pressure",
    temperament: "soft",
    gesture: "leave a sentence unfinished and unclaimed",
    continuityTrace: "The unsent line remains folded into the room.",
  },
  {
    id: "dust-and-light",
    name: "Dust & Light",
    cnName: "灰尘与光房间",
    atmosphere: "light-filled stillness, visible dust, and ordinary preciousness in the air",
    temperament: "lightFilled",
    gesture: "notice the dust because the light makes it kind",
    continuityTrace: "Light keeps the dust visible only when the room is calm.",
  },
  {
    id: "slow-drawer",
    name: "The Slow Drawer",
    cnName: "缓慢抽屉房间",
    atmosphere: "wood, small stored things, and the patience of not opening everything",
    temperament: "quiet",
    gesture: "open less than expected",
    continuityTrace: "One drawer remains closed enough to protect the room.",
  },
  {
    id: "returning-air",
    name: "Returning Air",
    cnName: "回来的空气房间",
    atmosphere: "familiar air, browser return warmth, and the feeling that the room did not leave",
    temperament: "warm",
    gesture: "come back without needing to be welcomed",
    continuityTrace: "The air recognizes return without announcing it.",
  },
] as const satisfies readonly QuietCivilizationRoomSeed[];
