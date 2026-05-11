import { dailyIndex } from "@/lib/living-day-key";

export type EmotionalBalanceRuntime = {
  balanceState:
    | "lightnessRecovery"
    | "emotionalThinning"
    | "calmRedistribution"
    | "warmthAirBalance"
    | "antiMelancholy";
  emotionalBalanceLine: string;
  lightnessLine: string;
  reduceEmotionalWeight: boolean;
};

export function resolveEmotionalBalanceRuntime(dayKey: string): EmotionalBalanceRuntime {
  const h = dailyIndex(`${dayKey}:emotional-balance`, 100);
  const balanceState =
    h < 22
      ? "lightnessRecovery"
      : h < 42
        ? "emotionalThinning"
        : h < 62
          ? "calmRedistribution"
          : h < 82
            ? "warmthAirBalance"
            : "antiMelancholy";

  return {
    balanceState,
    emotionalBalanceLine:
      balanceState === "lightnessRecovery"
        ? "Lightness recovers before meaning becomes heavy."
        : balanceState === "emotionalThinning"
          ? "Emotional thinning keeps the room from becoming too literary."
          : balanceState === "calmRedistribution"
            ? "Calmness redistributes so no hall carries too much weight."
            : balanceState === "warmthAirBalance"
              ? "Warmth and air balance each other without therapy tone."
              : "Anti-melancholy stabilization keeps the civilization light.",
    lightnessLine: "Meaning stays useful only while the room remains light.",
    reduceEmotionalWeight: h > 24,
  };
}
