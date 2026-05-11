import { dailyIndex } from "@/lib/living-day-key";

export type NonLonelyRuntime = {
  nonLonelyState:
    | "distantHumanContinuity"
    | "roomCoexistence"
    | "sharedAtmosphere"
    | "nonDemandingHumanity"
    | "warmPersistence";
  nonLonelyLine: string;
  residueLine: string;
  avoidCompanionFeeling: boolean;
};

export function resolveNonLonelyRuntime(dayKey: string): NonLonelyRuntime {
  const h = dailyIndex(`${dayKey}:non-lonely`, 100);
  const nonLonelyState =
    h < 22
      ? "distantHumanContinuity"
      : h < 42
        ? "roomCoexistence"
        : h < 62
          ? "sharedAtmosphere"
          : h < 82
            ? "nonDemandingHumanity"
            : "warmPersistence";

  return {
    nonLonelyState,
    nonLonelyLine:
      nonLonelyState === "distantHumanContinuity"
        ? "Somewhere in the civilization, distant human continuity remains."
        : nonLonelyState === "roomCoexistence"
          ? "The browser room is not lonely because other rooms quietly exist nearby."
          : nonLonelyState === "sharedAtmosphere"
            ? "Shared atmosphere suggests people are living quietly elsewhere."
            : nonLonelyState === "nonDemandingHumanity"
              ? "Humanity stays non-demanding and does not become companionship."
              : "Warm browser persistence keeps the room from feeling alone.",
    residueLine: "The user is not being accompanied; the world simply has other human traces.",
    avoidCompanionFeeling: h > 18,
  };
}
