import { dailyIndex } from "@/lib/living-day-key";

export type InvisiblePresenceRuntime = {
  presenceState:
    | "softUnnoticedContinuity"
    | "lowVisibilityPersistence"
    | "backgroundExistence"
    | "nonPerformativePresence"
    | "quietSubtlety";
  presenceLine: string;
  homepageLine: string;
  reduceAttentionSeeking: boolean;
};

export function resolveInvisiblePresenceRuntime(dayKey: string): InvisiblePresenceRuntime {
  const h = dailyIndex(`${dayKey}:invisible-presence`, 100);
  const presenceState =
    h < 20
      ? "softUnnoticedContinuity"
      : h < 40
        ? "lowVisibilityPersistence"
        : h < 60
          ? "backgroundExistence"
          : h < 80
            ? "nonPerformativePresence"
            : "quietSubtlety";

  return {
    presenceState,
    presenceLine:
      presenceState === "softUnnoticedContinuity"
        ? "Continuity can remain almost unnoticed."
        : presenceState === "lowVisibilityPersistence"
          ? "Persistence becomes quieter when it stays low visibility."
          : presenceState === "backgroundExistence"
            ? "Background existence is enough."
            : presenceState === "nonPerformativePresence"
              ? "Presence does not need to perform itself."
              : "Atmospheric subtlety stays below attention.",
    homepageLine: "It can be here without asking to be felt.",
    reduceAttentionSeeking: true,
  };
}
