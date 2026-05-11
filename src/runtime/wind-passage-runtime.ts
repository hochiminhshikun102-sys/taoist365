import { dailyIndex } from "@/lib/living-day-key";

export type WindPassageRuntime = {
  passageState:
    | "atmosphericMovement"
    | "quietOpenness"
    | "passingAirContinuity"
    | "roomVentilation"
    | "nonSealedAtmosphere";
  windLine: string;
  ventilationLine: string;
  preventSealedMood: boolean;
};

export function resolveWindPassageRuntime(dayKey: string): WindPassageRuntime {
  const h = dailyIndex(`${dayKey}:wind-passage`, 100);
  const passageState =
    h < 20
      ? "atmosphericMovement"
      : h < 40
        ? "quietOpenness"
        : h < 60
          ? "passingAirContinuity"
          : h < 80
            ? "roomVentilation"
            : "nonSealedAtmosphere";

  return {
    passageState,
    windLine:
      passageState === "atmosphericMovement"
        ? "A little movement remains in the air."
        : passageState === "quietOpenness"
          ? "Quiet openness keeps the room from closing in."
          : passageState === "passingAirContinuity"
            ? "Passing air keeps continuity from becoming heavy."
            : passageState === "roomVentilation"
              ? "The room feels ventilated, not sealed."
              : "The atmosphere stays unsealed enough for wind to pass through.",
    ventilationLine: "The page should feel like a room with a window cracked open.",
    preventSealedMood: h > 16,
  };
}
