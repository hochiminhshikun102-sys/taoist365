import { dailyIndex } from "@/lib/living-day-key";

export type OrdinaryWisdomRuntime = {
  wisdomState:
    | "livedPerspective"
    | "emotionalRealism"
    | "practicalUnderstanding"
    | "nonGrandWisdom"
    | "everydayInsight";
  wisdomLine: string;
  insightLine: string;
  suppressGrandWisdomTone: boolean;
};

export function resolveOrdinaryWisdomRuntime(dayKey: string): OrdinaryWisdomRuntime {
  const h = dailyIndex(`${dayKey}:ordinary-wisdom`, 100);
  const wisdomState =
    h < 20
      ? "livedPerspective"
      : h < 40
        ? "emotionalRealism"
        : h < 60
          ? "practicalUnderstanding"
          : h < 80
            ? "nonGrandWisdom"
            : "everydayInsight";

  return {
    wisdomState,
    wisdomLine:
      wisdomState === "livedPerspective"
        ? "Lived perspective is quieter than wisdom."
        : wisdomState === "emotionalRealism"
          ? "Emotional realism keeps insight human-sized."
          : wisdomState === "practicalUnderstanding"
            ? "Practical understanding belongs close to the next ordinary step."
            : wisdomState === "nonGrandWisdom"
              ? "Non-grand wisdom sounds more like someone who has lived a little."
              : "Everyday insight should not rise above everyday life.",
    insightLine: "A normal person living longer is a better tone than big wisdom.",
    suppressGrandWisdomTone: true,
  };
}
