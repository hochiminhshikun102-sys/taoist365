import { dailyIndex } from "@/lib/living-day-key";

export type OutsideLifeRuntime = {
  lifeState:
    | "ordinaryLifePriority"
    | "browserSideExistence"
    | "digitalSecondary"
    | "realWorldContinuity"
    | "nonCentralDigitalRole";
  outsideLifeLine: string;
  priorityLine: string;
  suppressLifeReplacement: boolean;
};

export function resolveOutsideLifeRuntime(dayKey: string): OutsideLifeRuntime {
  const h = dailyIndex(`${dayKey}:outside-life`, 100);
  const lifeState =
    h < 20
      ? "ordinaryLifePriority"
      : h < 40
        ? "browserSideExistence"
        : h < 60
          ? "digitalSecondary"
          : h < 80
            ? "realWorldContinuity"
            : "nonCentralDigitalRole";

  return {
    lifeState,
    outsideLifeLine:
      lifeState === "ordinaryLifePriority"
        ? "Ordinary life keeps priority outside the browser."
        : lifeState === "browserSideExistence"
          ? "The room belongs beside the browser, not above the day."
          : lifeState === "digitalSecondary"
            ? "The digital surface stays secondary."
            : lifeState === "realWorldContinuity"
              ? "Real-world continuity continues before and after the page."
              : "The browser keeps a non-central role in human life.",
    priorityLine: "This place should make it easier to go back to life, not harder.",
    suppressLifeReplacement: true,
  };
}
