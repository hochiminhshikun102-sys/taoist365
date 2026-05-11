import { dailyIndex } from "@/lib/living-day-key";

export type AntiAddictiveContinuityRuntime = {
  safeguardState:
    | "antiLoop"
    | "noCompulsiveChecking"
    | "noUrgencyReinforcement"
    | "calmTemporalPacing"
    | "continuityWithoutDependency";
  safeguardLine: string;
  pacingLine: string;
  suppressEngagementLoop: boolean;
};

export function resolveAntiAddictiveContinuityRuntime(dayKey: string): AntiAddictiveContinuityRuntime {
  const h = dailyIndex(`${dayKey}:anti-addictive-continuity`, 100);
  const safeguardState =
    h < 20
      ? "antiLoop"
      : h < 40
        ? "noCompulsiveChecking"
        : h < 60
          ? "noUrgencyReinforcement"
          : h < 80
            ? "calmTemporalPacing"
            : "continuityWithoutDependency";

  return {
    safeguardState,
    safeguardLine:
      safeguardState === "antiLoop"
        ? "Continuity is protected from loops."
        : safeguardState === "noCompulsiveChecking"
          ? "Nothing here should make checking feel compulsory."
          : safeguardState === "noUrgencyReinforcement"
            ? "Urgency reinforcement stays outside the civilization boundary."
            : safeguardState === "calmTemporalPacing"
              ? "Temporal pacing remains calm enough to leave."
              : "Continuity can exist without dependency.",
    pacingLine: "No streak, no pressure, no score; only time moving quietly.",
    suppressEngagementLoop: h > 10,
  };
}
