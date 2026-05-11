import { dailyIndex } from "@/lib/living-day-key";

export type PracticalCalmRuntime = {
  calmState:
    | "ordinaryCalmAssistance"
    | "nonIntrusiveUsefulness"
    | "quietPracticalComfort"
    | "lowPressureSupport"
    | "everydayLightness";
  calmLine: string;
  homepageLine: string;
  suppressProblemSolvingTone: boolean;
};

export function resolvePracticalCalmRuntime(dayKey: string): PracticalCalmRuntime {
  const h = dailyIndex(`${dayKey}:practical-calm`, 100);
  const calmState =
    h < 20
      ? "ordinaryCalmAssistance"
      : h < 40
        ? "nonIntrusiveUsefulness"
        : h < 60
          ? "quietPracticalComfort"
          : h < 80
            ? "lowPressureSupport"
            : "everydayLightness";

  return {
    calmState,
    calmLine:
      calmState === "ordinaryCalmAssistance"
        ? "A little ordinary calm can be useful."
        : calmState === "nonIntrusiveUsefulness"
          ? "Usefulness stays non-intrusive and small."
          : calmState === "quietPracticalComfort"
            ? "Quiet comfort becomes practical when it leaves room to breathe."
            : calmState === "lowPressureSupport"
              ? "Support stays low-pressure and does not ask for improvement."
              : "The day can feel a little lighter without being solved.",
    homepageLine: "A small quiet place that can make an ordinary day a little lighter.",
    suppressProblemSolvingTone: true,
  };
}
