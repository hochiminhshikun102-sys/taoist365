import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationSleepRuntime = {
  sleepState: "awakeLow" | "afterMidnightSettling" | "sleepingBrowserRoom" | "dimContinuity" | "lowLightStillness";
  sleepLine: string;
  inactiveWarmthLine: string;
  nightLowFrequency: boolean;
};

export function resolveCivilizationSleepRuntime(dayKey: string, now: Date = new Date()): CivilizationSleepRuntime {
  const h = dailyIndex(`${dayKey}:civilization-sleep`, 100);
  const hour = now.getHours();
  const sleepState =
    hour >= 1 && hour < 5
      ? "sleepingBrowserRoom"
      : hour >= 23 || hour === 0
        ? "afterMidnightSettling"
        : h > 78
          ? "dimContinuity"
          : h > 58
            ? "lowLightStillness"
            : "awakeLow";

  return {
    sleepState,
    sleepLine:
      sleepState === "sleepingBrowserRoom"
        ? "The browser room is sleeping: continuity remains dim and warm."
        : sleepState === "afterMidnightSettling"
          ? "After midnight, atmosphere settles instead of switching modes."
          : sleepState === "dimContinuity"
            ? "Continuity dims until only the room's low light remains."
            : sleepState === "lowLightStillness"
              ? "Low-light stillness lowers the civilization frequency."
              : "The room stays awake at a low and non-demanding frequency.",
    inactiveWarmthLine: "Unresolved sleeping traces remain without becoming night design.",
    nightLowFrequency: sleepState !== "awakeLow",
  };
}
