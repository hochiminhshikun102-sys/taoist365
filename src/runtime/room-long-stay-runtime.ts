import { dailyIndex } from "@/lib/living-day-key";

export type RoomLongStayRuntime = {
  longStayState: "passiveRoomCompanionship" | "longOpenCalmness" | "nonFatiguingStillness" | "browserSideAir" | "quietBreathing";
  roomLongStayLine: string;
  visualBreathingLine: string;
  reduceRoomStimulation: boolean;
};

export function resolveRoomLongStayRuntime(dayKey: string): RoomLongStayRuntime {
  const h = dailyIndex(`${dayKey}:room-long-stay`, 100);
  const longStayState =
    h < 22
      ? "passiveRoomCompanionship"
      : h < 42
        ? "longOpenCalmness"
        : h < 62
          ? "nonFatiguingStillness"
          : h < 82
            ? "browserSideAir"
            : "quietBreathing";

  return {
    longStayState,
    roomLongStayLine:
      longStayState === "passiveRoomCompanionship"
        ? "A room may keep quiet company without becoming a companion."
        : longStayState === "longOpenCalmness"
          ? "Long-open calmness lets the room remain beside the browser."
          : longStayState === "nonFatiguingStillness"
            ? "Non-fatiguing stillness matters more than activity."
            : longStayState === "browserSideAir"
              ? "Browser-side atmosphere stays low and breathable."
              : "Quiet visual breathing keeps a room open for a long time.",
    visualBreathingLine: "Some rooms are made to stay open.",
    reduceRoomStimulation: h > 30,
  };
}
