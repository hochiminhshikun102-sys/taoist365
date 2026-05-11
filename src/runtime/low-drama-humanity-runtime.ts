import { dailyIndex } from "@/lib/living-day-key";

export type LowDramaHumanityRuntime = {
  humanityState:
    | "ordinaryHumanity"
    | "nonPoeticWarmth"
    | "practicalExistence"
    | "nonDramaticAtmosphere"
    | "emotionalRealism";
  humanityLine: string;
  practicalLine: string;
  suppressCinematicHumanity: boolean;
};

export function resolveLowDramaHumanityRuntime(dayKey: string): LowDramaHumanityRuntime {
  const h = dailyIndex(`${dayKey}:low-drama-humanity`, 100);
  const humanityState =
    h < 20
      ? "ordinaryHumanity"
      : h < 40
        ? "nonPoeticWarmth"
        : h < 60
          ? "practicalExistence"
          : h < 80
            ? "nonDramaticAtmosphere"
            : "emotionalRealism";

  return {
    humanityState,
    humanityLine:
      humanityState === "ordinaryHumanity"
        ? "Humanity can stay ordinary."
        : humanityState === "nonPoeticWarmth"
          ? "Warmth does not need poetic lighting."
          : humanityState === "practicalExistence"
            ? "Practical existence keeps the room honest."
            : humanityState === "nonDramaticAtmosphere"
              ? "Atmosphere stays non-dramatic and usable."
              : "Emotional realism is softer than cinematic feeling.",
    practicalLine: "A bit of ordinary usefulness keeps the room from floating away.",
    suppressCinematicHumanity: true,
  };
}
