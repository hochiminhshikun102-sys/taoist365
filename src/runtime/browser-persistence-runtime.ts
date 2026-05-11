import { dailyIndex } from "@/lib/living-day-key";

export type BrowserTimeBand = "preDawn" | "morning" | "daylight" | "afternoon" | "evening" | "lateNight";
export type BrowserStillOpenDuration =
  | "recentlyOpened"
  | "quietlySettled"
  | "longPresent"
  | "nightResidual"
  | "nearlyForgottenOpenRoom";

export type BrowserPersistenceRuntime = {
  timeBand: BrowserTimeBand;
  stillOpenDuration: BrowserStillOpenDuration;
  daylightLine: string;
  roomTemperatureLine: string;
  roomAirShiftLine: string;
  passiveContinuityLine: string;
  browserInertiaLine: string;
  homepagePresenceLine: string;
  reduceHomepageAtmosphere: boolean;
};

function timeBandForHour(hour: number): BrowserTimeBand {
  if (hour < 5) return "preDawn";
  if (hour < 10) return "morning";
  if (hour < 15) return "daylight";
  if (hour < 19) return "afternoon";
  if (hour < 23) return "evening";
  return "lateNight";
}

const daylightLines: Record<BrowserTimeBand, string> = {
  preDawn: "Pre-dawn leaves the room almost empty, but still open.",
  morning: "Morning light enters the tab without asking the page to restart.",
  daylight: "The room stays pale through the open browser day.",
  afternoon: "Afternoon leaves a softer edge on the shelf.",
  evening: "Evening reduces contrast rather than changing the world.",
  lateNight: "Late night makes the page feel left open, not newly visited.",
};

const temperatureLines: Record<BrowserTimeBand, string> = {
  preDawn: "Air is nearly blank before morning arrives.",
  morning: "Room temperature feels lightly reset, but the shelf remains the same.",
  daylight: "Air stays even, white, and readable.",
  afternoon: "Warmth gathers slowly around objects without becoming a scene.",
  evening: "The page cools into quiet persistence.",
  lateNight: "The browser room lowers its voice and keeps existing.",
};

export function resolveBrowserPersistenceRuntime(dayKey: string, now: Date = new Date()): BrowserPersistenceRuntime {
  const timeBand = timeBandForHour(now.getHours());
  const h = dailyIndex(`${dayKey}:browser-persistence`, 100);
  const stillOpenDuration: BrowserStillOpenDuration =
    timeBand === "preDawn"
      ? "nearlyForgottenOpenRoom"
      : h < 18
        ? "recentlyOpened"
        : h < 46
          ? "quietlySettled"
          : h < 72
            ? "longPresent"
            : timeBand === "lateNight"
              ? "nightResidual"
              : "nearlyForgottenOpenRoom";

  return {
    timeBand,
    stillOpenDuration,
    daylightLine: daylightLines[timeBand],
    roomTemperatureLine: temperatureLines[timeBand],
    roomAirShiftLine:
      timeBand === "afternoon"
        ? "Room air flattens slightly around the shelf."
        : timeBand === "evening"
          ? "Evening warmth sits low in the browser room."
          : timeBand === "lateNight"
            ? "Late-night blue silence stays very slight."
            : timeBand === "preDawn"
              ? "Pre-dawn emptiness keeps the page barely awake."
              : "Morning clarity opens without becoming a weather state.",
    passiveContinuityLine:
      stillOpenDuration === "nearlyForgottenOpenRoom"
        ? "The tab is almost forgotten and still lightly breathing."
        : "Passive continuity remains faint: alive, not animated.",
    browserInertiaLine:
      h > 68
        ? "The homepage behaves like an old open tab: present, quiet, and not waiting."
        : "The page can stay open while attention moves elsewhere.",
    homepagePresenceLine:
      h % 2 === 0 ? daylightLines[timeBand] : "Time passes through the browser room as low brightness, not a mode switch.",
    reduceHomepageAtmosphere: timeBand === "lateNight" || timeBand === "preDawn" || h > 74,
  };
}
