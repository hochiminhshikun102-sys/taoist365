import { dailyIndex } from "@/lib/living-day-key";

export type OutsideWorldRuntime = {
  worldState:
    | "weatherContinuity"
    | "passingDaylight"
    | "externalTemporalFlow"
    | "outsideLifePresence"
    | "worldBeyondBrowser";
  worldLine: string;
  daylightLine: string;
  suppressEscapeWorldFeeling: boolean;
};

export function resolveOutsideWorldRuntime(dayKey: string): OutsideWorldRuntime {
  const h = dailyIndex(`${dayKey}:outside-world`, 100);
  const worldState =
    h < 20
      ? "weatherContinuity"
      : h < 40
        ? "passingDaylight"
        : h < 60
          ? "externalTemporalFlow"
          : h < 80
            ? "outsideLifePresence"
            : "worldBeyondBrowser";

  return {
    worldState,
    worldLine:
      worldState === "weatherContinuity"
        ? "Weather remains connected to the page without becoming a system."
        : worldState === "passingDaylight"
          ? "Daylight passes outside the browser and keeps the room ordinary."
          : worldState === "externalTemporalFlow"
            ? "External time keeps flowing beyond the interface."
            : worldState === "outsideLifePresence"
              ? "Outside life stays present, even when the room is quiet."
              : "The browser room remembers there is always a world beyond it.",
    daylightLine: "Real daylight still belongs to the world outside the tab.",
    suppressEscapeWorldFeeling: true,
  };
}
