import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationMaturityRuntime = {
  maturityState:
    | "matureSilence"
    | "restrainedContinuity"
    | "lowEgoInfrastructure"
    | "calmExistenceConfidence"
    | "nonDemonstrativeDepth";
  maturityLine: string;
  restraintLine: string;
  preferLessProof: boolean;
};

export function resolveCivilizationMaturityRuntime(dayKey: string): CivilizationMaturityRuntime {
  const h = dailyIndex(`${dayKey}:civilization-maturity`, 100);
  const maturityState =
    h < 22
      ? "matureSilence"
      : h < 44
        ? "restrainedContinuity"
        : h < 64
          ? "lowEgoInfrastructure"
          : h < 84
            ? "calmExistenceConfidence"
            : "nonDemonstrativeDepth";

  return {
    maturityState,
    maturityLine:
      maturityState === "matureSilence"
        ? "Mature silence no longer needs to announce its depth."
        : maturityState === "restrainedContinuity"
          ? "Continuity becomes more restrained as the civilization grows."
          : maturityState === "lowEgoInfrastructure"
            ? "Low-ego infrastructure supports the room without showing itself."
            : maturityState === "calmExistenceConfidence"
              ? "Calm existence confidence lets Taoist365 remain quiet."
              : "Depth stays non-demonstrative and does not perform maturity.",
    restraintLine: "The more mature the civilization becomes, the less it proves itself.",
    preferLessProof: h > 40,
  };
}
