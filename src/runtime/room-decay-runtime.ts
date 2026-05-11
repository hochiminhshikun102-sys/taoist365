import { dailyIndex } from "@/lib/living-day-key";

export type RoomDecayRuntime = {
  decayState: "residueFading" | "atmosphereSoftening" | "silenceReopening" | "visualCalming" | "temporalThinning";
  decayLine: string;
  agingLine: string;
  reduceFullState: boolean;
};

export function resolveRoomDecayRuntime(dayKey: string): RoomDecayRuntime {
  const h = dailyIndex(`${dayKey}:room-decay`, 100);
  const decayState =
    h < 22
      ? "residueFading"
      : h < 42
        ? "atmosphereSoftening"
        : h < 62
          ? "silenceReopening"
          : h < 82
            ? "visualCalming"
            : "temporalThinning";

  return {
    decayState,
    decayLine:
      decayState === "residueFading"
        ? "Room residue fades before it becomes a permanent layer."
        : decayState === "atmosphereSoftening"
          ? "Atmosphere softens as the room ages."
          : decayState === "silenceReopening"
            ? "Silence reopens where the room had become too full."
            : decayState === "visualCalming"
              ? "Visual calming keeps the room from staying at full state."
              : "Temporal thinning lets the room age gently.",
    agingLine: "A room is not always at maximum presence.",
    reduceFullState: h > 28,
  };
}
