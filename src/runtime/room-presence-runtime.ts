import { dailyIndex } from "@/lib/living-day-key";

export type RoomPresenceRuntime = {
  presenceState: "recentWarmth" | "fadedBrowserPresence" | "settledDesk" | "longOpenRoom" | "objectPositionCalm";
  roomMemoryLine: string;
  previousAtmosphereLine: string;
  reducePersonalLanguage: boolean;
};

export function resolveRoomPresenceRuntime(dayKey: string): RoomPresenceRuntime {
  const h = dailyIndex(`${dayKey}:room-presence`, 100);
  const presenceState =
    h < 20
      ? "recentWarmth"
      : h < 40
        ? "fadedBrowserPresence"
        : h < 60
          ? "settledDesk"
          : h < 80
            ? "longOpenRoom"
            : "objectPositionCalm";

  return {
    presenceState,
    roomMemoryLine:
      presenceState === "recentWarmth"
        ? "The room remembers warmth, not a user."
        : presenceState === "fadedBrowserPresence"
          ? "Browser presence fades into the walls of the page."
          : presenceState === "settledDesk"
            ? "Desk continuity sits quietly below the visible surface."
            : presenceState === "longOpenRoom"
              ? "The room feels long-open without needing history."
              : "Objects keep calm through placement, not profile memory.",
    previousAtmosphereLine: "The space remembers air that passed through, not behavior that should be tracked.",
    reducePersonalLanguage: h > 48,
  };
}
