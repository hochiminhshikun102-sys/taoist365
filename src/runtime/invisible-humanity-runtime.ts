import { dailyIndex } from "@/lib/living-day-key";

export type InvisibleHumanityRuntime = {
  humanityState:
    | "subtleWarmth"
    | "backgroundTenderness"
    | "nonAnnouncedCare"
    | "quietHumanTraces"
    | "ordinaryInvisibleSoftness";
  humanityLine: string;
  traceLine: string;
  suppressWarmthDisplay: boolean;
};

export function resolveInvisibleHumanityRuntime(dayKey: string): InvisibleHumanityRuntime {
  const h = dailyIndex(`${dayKey}:invisible-humanity`, 100);
  const humanityState =
    h < 20
      ? "subtleWarmth"
      : h < 40
        ? "backgroundTenderness"
        : h < 60
          ? "nonAnnouncedCare"
          : h < 80
            ? "quietHumanTraces"
            : "ordinaryInvisibleSoftness";

  return {
    humanityState,
    humanityLine:
      humanityState === "subtleWarmth"
        ? "Warmth becomes more human when it stays subtle."
        : humanityState === "backgroundTenderness"
          ? "Tenderness can sit in the background."
          : humanityState === "nonAnnouncedCare"
            ? "Care does not need an announcement."
            : humanityState === "quietHumanTraces"
              ? "Human traces remain quiet enough to feel ordinary."
              : "Softness becomes invisible by belonging to the day.",
    traceLine: "Do not display warmth; let it be found in the margins.",
    suppressWarmthDisplay: true,
  };
}
