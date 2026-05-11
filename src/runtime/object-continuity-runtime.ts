import { dailyIndex } from "@/lib/living-day-key";

export type ObjectContinuityState =
  | "stillTraveling"
  | "restingTemporarily"
  | "passedQuietly"
  | "waitingForNextKeeper"
  | "continuityPreserved";

export type ObjectContinuityRuntime = {
  state: ObjectContinuityState;
  stateLine: string;
  keeperLine: string;
  storageFeelingLine: string;
  longTermFamiliarityLine: string;
  stewardshipTraceLine: string;
  realLifeTraceLine: string;
  practicalContinuityLine: string;
  everydayPassageLine: string;
  usefulMaterialLine: string;
  quietMaterialCultureLine: string;
  unnoticedContinuityLine: string;
  homepageFragment: string;
};

const stateLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "The object is still traveling, even when the page barely mentions it.",
  restingTemporarily: "The object rests for a while, held in room air rather than display pressure.",
  passedQuietly: "The object has passed quietly and keeps its surface calm.",
  waitingForNextKeeper: "The object waits for a next keeper without urgency.",
  continuityPreserved: "The object keeps continuity after leaving the visible shelf.",
};

const keeperLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "Keeper presence remains partial, like a name kept off the front of an envelope.",
  restingTemporarily: "The current keeper is a pause in the drift, not the center of the story.",
  passedQuietly: "The previous keeper leaves only a soft placement mark.",
  waitingForNextKeeper: "The next keeper enters as long-term care, not acquisition noise.",
  continuityPreserved: "Keeper changes stay below the surface; the room remembers continuity first.",
};

const storageFeelingLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "Storage feels like a shelf that has learned to stay quiet.",
  restingTemporarily: "Storage is temporary rest, not inventory management.",
  passedQuietly: "Storage preserves the handoff without turning it into an event.",
  waitingForNextKeeper: "Storage keeps the object available without making it call out.",
  continuityPreserved: "Storage becomes sediment: placement, air, and a small remaining trace.",
};

const longTermFamiliarityLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "The object becomes familiar through distance, not through display.",
  restingTemporarily: "Rest makes recognition possible without turning the object into a product.",
  passedQuietly: "Recognition remains quiet after the handoff.",
  waitingForNextKeeper: "The next keeper may recognize the object slowly, without claim pressure.",
  continuityPreserved: "Long-term familiarity survives as surface, placement, and care.",
};

const stewardshipTraceLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "Stewardship is a trace of passage, not ownership performance.",
  restingTemporarily: "The keeper leaves care in the object by letting it rest.",
  passedQuietly: "Passed hands stay below the surface as temporal stewardship.",
  waitingForNextKeeper: "The object waits for care, not acquisition.",
  continuityPreserved: "Stewardship continues after the visible shelf goes quiet.",
};

const realLifeTraceLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "The object carries real-life traces from rooms, counters, drawers, and ordinary hands.",
  restingTemporarily: "Temporary rest feels practical, like something put down during a normal day.",
  passedQuietly: "Passing through daily life matters more than collector attention.",
  waitingForNextKeeper: "The next keeper is part of ordinary use, not a collecting story.",
  continuityPreserved: "Continuity is preserved through material use, not display value.",
};

const practicalContinuityLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "Practical humanity keeps the object near life.",
  restingTemporarily: "The object can rest because useful things also pause.",
  passedQuietly: "Used presence remains quieter than rarity.",
  waitingForNextKeeper: "Care stays practical before it becomes meaningful.",
  continuityPreserved: "Ordinary material continuity resists collector atmosphere.",
};

const everydayPassageLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "The object moves through ordinary life before it moves through any system.",
  restingTemporarily: "Rest is part of everyday object passage.",
  passedQuietly: "A passed object can still be useful in someone else's day.",
  waitingForNextKeeper: "Waiting means the object has not finished being useful.",
  continuityPreserved: "Everyday continuity remains more important than possession.",
};

const usefulMaterialLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "Material usefulness keeps the object human-sized.",
  restingTemporarily: "Useful things can pause without becoming collectibles.",
  passedQuietly: "Practical value passes quietly with the object.",
  waitingForNextKeeper: "The next keeper receives usefulness, not a status signal.",
  continuityPreserved: "The material remembers use more honestly than story.",
};

const quietMaterialCultureLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "Material culture stays quiet when it looks like ordinary use.",
  restingTemporarily: "The object rests as part of a room, not a collection.",
  passedQuietly: "Unnoticed passage is still a form of care.",
  waitingForNextKeeper: "Waiting stays material and practical, not ceremonial.",
  continuityPreserved: "Everyday traces preserve culture without naming it.",
};

const unnoticedContinuityLines: Record<ObjectContinuityState, string> = {
  stillTraveling: "Continuity can remain unnoticed and still continue.",
  restingTemporarily: "A resting object does not need attention to belong.",
  passedQuietly: "The object has passed without needing a story on the surface.",
  waitingForNextKeeper: "The next use matters more than visible drama.",
  continuityPreserved: "The quieter the trace, the more ordinary the continuity feels.",
};

export function resolveObjectContinuityRuntime(dayKey: string): ObjectContinuityRuntime {
  const h = dailyIndex(`${dayKey}:object-continuity`, 100);
  const state: ObjectContinuityState =
    h < 18
      ? "stillTraveling"
      : h < 38
        ? "restingTemporarily"
        : h < 58
          ? "passedQuietly"
          : h < 78
            ? "waitingForNextKeeper"
            : "continuityPreserved";

  return {
    state,
    stateLine: stateLines[state],
    keeperLine: keeperLines[state],
    storageFeelingLine: storageFeelingLines[state],
    longTermFamiliarityLine: longTermFamiliarityLines[state],
    stewardshipTraceLine: stewardshipTraceLines[state],
    realLifeTraceLine: realLifeTraceLines[state],
    practicalContinuityLine: practicalContinuityLines[state],
    everydayPassageLine: everydayPassageLines[state],
    usefulMaterialLine: usefulMaterialLines[state],
    quietMaterialCultureLine: quietMaterialCultureLines[state],
    unnoticedContinuityLine: unnoticedContinuityLines[state],
    homepageFragment: h % 2 === 0 ? stateLines[state] : keeperLines[state],
  };
}
