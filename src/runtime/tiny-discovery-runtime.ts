import { dailyIndex } from "@/lib/living-day-key";

export type TinyDiscoveryRuntime = {
  discoveryState:
    | "subtleRoomChange"
    | "continuitySurprise"
    | "smallObjectMovement"
    | "softAtmosphericShift"
    | "hiddenWarmthFragment";
  discoveryLine: string;
  traceLine: string;
  allowSmallDiscovery: boolean;
};

export function resolveTinyDiscoveryRuntime(dayKey: string): TinyDiscoveryRuntime {
  const h = dailyIndex(`${dayKey}:tiny-discovery`, 100);
  const discoveryState =
    h < 22
      ? "subtleRoomChange"
      : h < 42
        ? "continuitySurprise"
        : h < 62
          ? "smallObjectMovement"
          : h < 82
            ? "softAtmosphericShift"
            : "hiddenWarmthFragment";

  return {
    discoveryState,
    discoveryLine:
      discoveryState === "subtleRoomChange"
        ? "A subtle room change waits for someone who is not looking too hard."
        : discoveryState === "continuitySurprise"
          ? "Continuity surprises quietly, without becoming a reward."
          : discoveryState === "smallObjectMovement"
            ? "A small object movement feels discovered rather than announced."
            : discoveryState === "softAtmosphericShift"
              ? "The atmosphere shifts softly enough to be almost missed."
              : "A hidden warmth fragment remains in the room for slow noticing.",
    traceLine: "Discovery is slow noticing, not a mechanic.",
    allowSmallDiscovery: h > 24 && h < 92,
  };
}
